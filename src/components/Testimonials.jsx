import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaTimes, FaPen, FaCheckCircle } from "react-icons/fa";
import { useStore } from "../context/StoreContext";

/* ─── Avatar ─────────────────────────────────────────────────── */
const Avatar = ({ avatar, name, size = "w-11 h-11" }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatar) {
    return <img src={avatar} alt={name} className={`${size} rounded-full object-cover flex-shrink-0`} />;
  }
  return (
    <div className={`${size} rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-semibold text-sm flex-shrink-0`}>
      {initials}
    </div>
  );
};

/* ─── Review card ────────────────────────────────────────────── */
const ReviewCard = ({ review }) => (
  <div className="w-[360px] flex-shrink-0 bg-white/5 border border-white/10 rounded-3xl p-7 flex flex-col gap-5 hover:border-[#D4AF37]/40 transition duration-300 mx-3">
    <FaQuoteLeft className="text-[#D4AF37] text-xl opacity-50" />
    <p className="text-gray-300 leading-relaxed text-sm flex-1">"{review.text}"</p>
    <div className="flex gap-1">
      {Array.from({ length: review.rating }).map((_, i) => (
        <FaStar key={i} className="text-[#D4AF37] text-xs" />
      ))}
    </div>
    <div className="flex items-center gap-3 border-t border-white/10 pt-5">
      <Avatar avatar={review.avatar} name={review.name} />
      <div>
        <p className="font-semibold text-sm">{review.name}</p>
        <p className="text-gray-500 text-xs mt-0.5">{review.location}</p>
      </div>
    </div>
  </div>
);

/* ─── Star selector ──────────────────────────────────────────── */
const StarSelector = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition"
        >
          <FaStar className={star <= (hovered || value) ? "text-[#D4AF37]" : "text-gray-700"} />
        </button>
      ))}
    </div>
  );
};

/* ─── Submit modal ───────────────────────────────────────────── */
const SubmitModal = ({ onClose }) => {
  const { addTestimonial } = useStore();
  const [form, setForm] = useState({ name: "", location: "", rating: 0, text: "" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.rating) { setError("Please select a star rating."); return; }
    addTestimonial({ name: form.name, location: form.location, rating: form.rating, text: form.text, avatar: null });
    setDone(true);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition";

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl" style={{ fontFamily: "Playfair Display" }}>
            {done ? "Thank You" : "Write a Review"}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-white/50 transition">
            <FaTimes className="text-xs" />
          </button>
        </div>

        {done ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
              <FaCheckCircle className="text-[#D4AF37] text-2xl" />
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Your review has been submitted and is awaiting approval. Thank you for sharing your experience with ÉLIXIR.
            </p>
            <button onClick={onClose} className="mt-2 border border-[#D4AF37]/40 text-[#D4AF37] px-7 py-2.5 rounded-full text-sm hover:bg-[#D4AF37] hover:text-black transition">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Your Name</label>
                <input required value={form.name} onChange={set("name")} placeholder="Sophia Laurent" className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Location</label>
                <input required value={form.location} onChange={set("location")} placeholder="Paris, France" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Rating</label>
              <StarSelector value={form.rating} onChange={(r) => { setForm((p) => ({ ...p, rating: r })); setError(""); }} />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Your Review</label>
              <textarea
                required
                rows={4}
                value={form.text}
                onChange={set("text")}
                placeholder="Share your experience with this fragrance…"
                className={`${inputClass} resize-none`}
              />
            </div>

            <button type="submit" className="w-full bg-[#D4AF37] text-black font-semibold py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition">
              Submit Review
            </button>
            <p className="text-gray-600 text-xs text-center">Reviews are approved before appearing on the site.</p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────────── */
const Testimonials = () => {
  const { testimonials } = useStore();
  const [paused, setPaused]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const approved = testimonials.filter((t) => t.status === "approved");
  const doubled  = [...approved, ...approved];

  return (
    <section className="bg-[#050505] py-24 overflow-hidden">

      <div className="px-6 max-w-7xl mx-auto mb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="uppercase tracking-[6px] text-[#D4AF37] text-sm"
        >
          Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-6xl mt-4"
          style={{ fontFamily: "Playfair Display" }}
        >
          What They Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-sm mt-4"
        >
          {approved.length} verified reviews
        </motion.p>
      </div>

      {/* Marquee */}
      {approved.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No reviews yet — be the first!</p>
      ) : (
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div
            className="flex"
            style={{
              animation: "marquee 50s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {doubled.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      )}

      {/* Write a review CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12 px-6"
      >
        <button
          onClick={() => setModalOpen(true)}
          className="group inline-flex items-center gap-3 border border-white/20 px-8 py-3.5 rounded-full text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition duration-300"
        >
          <FaPen className="text-xs" />
          Write a Review
        </button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <SubmitModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
