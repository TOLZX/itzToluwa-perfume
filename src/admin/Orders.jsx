import { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";

const statusColors = {
  Delivered:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Shipped:    "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Processing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  Cancelled:  "bg-red-500/15 text-red-400 border-red-500/20",
};

const allStatuses = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

const Orders = () => {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = orders.filter((o) => {
    const matchesStatus = filter === "All" || o.status === filter;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id, status) => {
    updateOrderStatus(id, status);
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-medium" style={{ fontFamily: "Playfair Display" }}>Orders</h2>
        <p className="text-gray-500 text-sm mt-0.5">{orders.length} total orders · new checkouts appear here instantly</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition border ${
                filter === s
                  ? "bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {s}
              {s !== "All" && (
                <span className="ml-1.5 opacity-60">
                  ({orders.filter((o) => o.status === s).length})
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders…"
            className="bg-[#111] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] transition w-52"
          />
        </div>
      </div>

      <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Product", "Date", "Total", "Status", ""].map((h, i) => (
                  <th key={i} className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/2 transition cursor-pointer" onClick={() => setSelected(o)}>
                  <td className="px-6 py-4 text-[#D4AF37] font-mono text-xs">{o.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={o.avatar} alt={o.customer} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-gray-200 text-xs font-medium">{o.customer}</p>
                        <p className="text-gray-600 text-[10px]">{o.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs max-w-[120px] truncate">{o.product}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{o.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-200">${o.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-xs hover:text-[#D4AF37] transition">View →</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 text-sm">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-[#0d0d0d] border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/8">
                <div>
                  <p className="text-[#D4AF37] font-mono text-sm">{selected.id}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{selected.date}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-white/50 transition">
                  <FaTimes className="text-xs" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Customer</p>
                  <div className="flex items-center gap-3">
                    <img src={selected.avatar} alt={selected.customer} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium">{selected.customer}</p>
                      <p className="text-gray-500 text-xs">{selected.email || "No email"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Order Details</p>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/8">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{selected.product}</p>
                        <p className="text-gray-500 text-xs mt-0.5">Qty: {selected.items}</p>
                      </div>
                      <p className="text-[#D4AF37] font-semibold">${selected.total}</p>
                    </div>
                    <div className="border-t border-white/8 mt-4 pt-4 flex justify-between text-sm">
                      <span className="text-gray-400">Total</span>
                      <span className="font-semibold">${selected.total}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selected.id, s)}
                        className={`py-2 rounded-xl text-xs font-medium border transition ${
                          selected.status === s
                            ? statusColors[s]
                            : "border-white/10 text-gray-500 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
