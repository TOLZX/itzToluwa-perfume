import { useState } from "react";
import { FaSearch, FaEnvelope } from "react-icons/fa";
import { initialCustomers } from "./data";

const Customers = () => {
  const [search, setSearch] = useState("");

  const filtered = initialCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium" style={{ fontFamily: "Playfair Display" }}>Customers</h2>
          <p className="text-gray-500 text-sm mt-0.5">{initialCustomers.length} total customers</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: initialCustomers.length },
          { label: "Avg. Orders",     value: (initialCustomers.reduce((s, c) => s + c.orders, 0) / initialCustomers.length).toFixed(1) },
          { label: "Avg. Spent",      value: `$${Math.round(initialCustomers.reduce((s, c) => s + c.totalSpent, 0) / initialCustomers.length).toLocaleString()}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#111] border border-white/8 rounded-2xl p-5">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">{label}</p>
            <p className="text-2xl font-semibold text-[#D4AF37]">{value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers…"
          className="w-full bg-[#111] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] transition"
        />
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Customer", "Location", "Orders", "Total Spent", "Member Since", ""].map((h, i) => (
                  <th key={i} className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/2 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="text-gray-200 font-medium text-xs">{c.name}</p>
                        <p className="text-gray-600 text-[10px]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{c.location}</td>
                  <td className="px-6 py-4 text-gray-300">{c.orders}</td>
                  <td className="px-6 py-4 text-[#D4AF37] font-semibold">${c.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{c.joined}</td>
                  <td className="px-6 py-4">
                    <button className="w-7 h-7 flex items-center justify-center border border-white/20 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition text-xs opacity-0 group-hover:opacity-100">
                      <FaEnvelope />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No customers found.</div>
        )}
      </div>
    </div>
  );
};

export default Customers;
