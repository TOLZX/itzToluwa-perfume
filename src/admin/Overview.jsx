import { FaDollarSign, FaShoppingBag, FaBox, FaUsers, FaArrowUp } from "react-icons/fa";
import { revenueData } from "./data";
import { useStore } from "../context/StoreContext";

const statusColors = {
  Delivered:  "bg-emerald-500/15 text-emerald-400",
  Shipped:    "bg-blue-500/15 text-blue-400",
  Processing: "bg-yellow-500/15 text-yellow-400",
  Cancelled:  "bg-red-500/15 text-red-400",
};

const RevenueChart = () => {
  const max = Math.max(...revenueData.map((d) => d.amount));
  return (
    <div className="bg-[#111] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-medium">Revenue</h3>
          <p className="text-gray-500 text-xs mt-0.5">Last 7 days</p>
        </div>
        <span className="text-[#D4AF37] text-sm font-semibold">$37,800</span>
      </div>
      <div className="flex items-end gap-2 h-36">
        {revenueData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end" style={{ height: "120px" }}>
              <div
                className="w-full bg-[#D4AF37]/25 hover:bg-[#D4AF37]/70 rounded-t-lg transition duration-300 cursor-pointer group relative"
                style={{ height: `${(d.amount / max) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                  ${d.amount.toLocaleString()}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-600">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Overview = () => {
  const { products, orders, customers } = useStore();

  const revenue  = orders.reduce((s, o) => s + o.total, 0);
  const topProds = [...products]
    .sort((a, b) => b.stock - a.stock)   // proxy for popularity
    .slice(0, 4);
  const recent   = orders.slice(0, 5);

  const stats = [
    { label: "Total Revenue", value: `$${revenue.toLocaleString()}`, change: "+12.5%", icon: FaDollarSign },
    { label: "Total Orders",  value: orders.length.toLocaleString(),   change: "+8.2%",  icon: FaShoppingBag },
    { label: "Products",      value: products.length.toString(),         change: `${products.length} active`, icon: FaBox },
    { label: "Customers",     value: customers.length.toLocaleString(),  change: "+5.1%",  icon: FaUsers },
  ];

  const maxStock = Math.max(...topProds.map((p) => p.stock), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium" style={{ fontFamily: "Playfair Display" }}>Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-0.5">All numbers update live as you make changes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="bg-[#111] border border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <Icon className="text-[#D4AF37] text-sm" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{value}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
              <FaArrowUp className="text-[10px]" />
              <span>{change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + top products */}
      <div className="grid xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <RevenueChart />
        </div>
        <div className="xl:col-span-2 bg-[#111] border border-white/8 rounded-2xl p-6">
          <h3 className="font-medium mb-5">Top Products</h3>
          <div className="space-y-4">
            {topProds.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-300">{p.name}</span>
                  <span className="text-gray-500">{p.stock} in stock</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${(p.stock / maxStock) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
          <h3 className="font-medium">Recent Orders</h3>
          <span className="text-xs text-gray-500">{recent.length} shown of {orders.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Product", "Date", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/2 transition">
                  <td className="px-6 py-4 text-[#D4AF37] font-mono text-xs">{o.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={o.avatar} alt={o.customer} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-gray-300">{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs max-w-[120px] truncate">{o.product}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{o.date}</td>
                  <td className="px-6 py-4 font-medium">${o.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
