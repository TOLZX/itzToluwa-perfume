import { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative bg-[#080808] py-32 px-6 overflow-hidden">

      {/* Decorative ambient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#D4AF37]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] rounded-full bg-[#D4AF37]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-[#D4AF37]/5 blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto text-center"
      >
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-glow-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">
          Stay Connected
        </p>
        <h2
          className="text-4xl md:text-5xl mt-4 leading-tight"
          style={{ fontFamily: "Playfair Display" }}
        >
          The Art of Scent, <br /> Delivered to You
        </h2>
        <p className="text-gray-400 mt-6 leading-relaxed">
          Subscribe for exclusive launches, fragrance stories, and members-only
          offers. Be the first to experience our newest creations.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 border border-[#D4AF37]/40 rounded-3xl px-8 py-10"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p
              className="text-[#D4AF37] text-xl"
              style={{ fontFamily: "Playfair Display" }}
            >
              Welcome to the ÉLIXIR family.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Watch your inbox for something special.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:bg-white/8 transition duration-300"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-black font-semibold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-gray-600 text-xs mt-5">
          No spam, ever. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
