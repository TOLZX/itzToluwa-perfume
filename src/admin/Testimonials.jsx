import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCheck, FaTimes, FaTrash, FaClock, FaCheckCircle, FaBan } from "react-icons/fa";
import { useStore } from "../context/StoreContext";

const Avatar = ({ avatar, name }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  if (avatar) return <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />;
  return (
    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-xs font-bold flex-shrink-0">
      {initials}
    </div>
  );
};

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FaStar key={s} className={`text-xs ${s <= rating ? "text-[#D4AF37]" : "text-gray-700"}`} />
    ))}
  </div>
);

const statusBadge = {
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  pending:  "bg-yellow-500/15  text-yellow-400  border-yellow-500/20",
  rejected: "bg-red-500/15    text-red-400     border-red-500/20",
};

const TABS = ["pending", "approved", "rejected", "all"];

const Testimonials = () => {
  const { testimonials, updateTestimonialStatus, deleteTestimonial } = useStore();
  const [activeTab, setActiveTab] = useState("pending");

  const counts = {
    pending:  testimonials.filter((t) => t.status === "pending").length,
    approved: testimonials.filter((t) => t.status === "approved").length,
    rejected: testimonials.filter((t) => t.status === "rejected").length,
    all:      testimonials.length,
  };

  const displayed =
    activeTab === "all" ? testimonials : testimonials.filter((t) => t.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-medium" style={{ fontFamily: "Playfair Display" }}>Testimonials</h2>
        <p className="text-gray-500 text-sm mt-0.5">Approve reviews to display them on the website</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending",  value: counts.pending,  icon: FaClock,       color: "text-yellow-400" },
          { label: "Approved", value: counts.approved, icon: FaCheckCircle, color: "text-emerald-400" },
          { label: "Rejected", value: counts.rejected, icon: FaBan,         color: "text-red-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-center gap-4">
            <Icon className={`text-xl ${color}`} />
            <div>
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm capitalize transition border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab}
            {counts[tab] > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                tab === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-white/10 text-gray-400"
              }`}>
                {counts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Review cards */}
      {displayed.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          No {activeTab === "all" ? "" : activeTab} reviews.
        </div>
      ) : (
        <div className="space-y-4">
          {displayed.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#111] border border-white/8 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: reviewer info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Avatar avatar={t.avatar} name={t.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{t.name}</p>
                      <span className="text-gray-600 text-xs">·</span>
                      <p className="text-gray-500 text-xs">{t.location}</p>
                      <span className="text-gray-600 text-xs">·</span>
                      <p className="text-gray-600 text-xs">{t.date}</p>
                    </div>
                    <Stars rating={t.rating} />
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">{t.text}</p>
                  </div>
                </div>

                {/* Right: status + actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${statusBadge[t.status]}`}>
                    {t.status}
                  </span>

                  <div className="flex items-center gap-2">
                    {t.status !== "approved" && (
                      <button
                        onClick={() => updateTestimonialStatus(t.id, "approved")}
                        title="Approve"
                        className="w-8 h-8 flex items-center justify-center border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition text-xs"
                      >
                        <FaCheck />
                      </button>
                    )}
                    {t.status !== "rejected" && (
                      <button
                        onClick={() => updateTestimonialStatus(t.id, "rejected")}
                        title="Reject"
                        className="w-8 h-8 flex items-center justify-center border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition text-xs"
                      >
                        <FaTimes />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center border border-white/10 text-gray-500 rounded-lg hover:border-red-400 hover:text-red-400 transition text-xs"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
