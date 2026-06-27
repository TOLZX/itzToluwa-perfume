import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaMapMarkerAlt, FaClock,
  FaInstagram, FaFacebookF, FaPinterestP, FaYoutube, FaCheckCircle,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { useStore } from "../context/StoreContext";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition";

const ContactInfo = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
      <Icon className="text-[#D4AF37] text-sm" />
    </div>
    <div>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="text-sm text-gray-200 leading-relaxed">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const { settings } = useStore();
  const [form, setForm]         = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const socials = [
    { icon: FaInstagram, href: settings.instagram || "#", label: "Instagram" },
    { icon: FaTiktok,    href: settings.tiktok    || "#", label: "TikTok" },
    { icon: FaFacebookF, href: settings.facebook  || "#", label: "Facebook" },
    { icon: FaPinterestP,href: settings.pinterest || "#", label: "Pinterest" },
    { icon: FaYoutube,   href: settings.youtube   || "#", label: "YouTube" },
  ];

  return (
    <section id="contact" className="bg-[#050505] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[6px] text-[#D4AF37] text-sm"
          >
            Contact Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl mt-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            Get in Touch
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ── Left: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-gray-400 leading-relaxed text-sm">
              Have a question about a fragrance, need help with an order, or want
              to learn more about our heritage? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <ContactInfo icon={FaEnvelope} label="Email">
                <a
                  href={`mailto:${settings.contactEmail || "hello@elixir.com"}`}
                  className="hover:text-[#D4AF37] transition"
                >
                  {settings.contactEmail || "hello@elixir.com"}
                </a>
              </ContactInfo>

              <ContactInfo icon={FaMapMarkerAlt} label="Boutique">
                12 Rue du Faubourg Saint-Honoré<br />
                Paris, France 75008
              </ContactInfo>

              <ContactInfo icon={FaClock} label="Hours">
                Mon – Fri: 9:00 am – 6:00 pm<br />
                Saturday: 10:00 am – 4:00 pm
              </ContactInfo>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111] border border-white/8 rounded-3xl p-12 flex flex-col items-center text-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                  <FaCheckCircle className="text-[#D4AF37] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl" style={{ fontFamily: "Playfair Display" }}>
                    Message Sent
                  </h3>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-sm">
                    Thank you for reaching out. Our team will respond to you within
                    24 hours at {settings.contactEmail || "hello@elixir.com"}.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 border border-[#D4AF37]/40 text-[#D4AF37] px-7 py-3 rounded-full text-sm hover:bg-[#D4AF37] hover:text-black transition"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#111] border border-white/8 rounded-3xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Your Name</label>
                    <input required placeholder="e.g. Sophia Laurent" className={inputClass} {...f("name")} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                    <input required type="email" placeholder="you@email.com" className={inputClass} {...f("email")} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Subject</label>
                  <input required placeholder="e.g. Order enquiry" className={inputClass} {...f("subject")} />
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help…"
                    className={`${inputClass} resize-none`}
                    {...f("message")}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-gray-600 text-xs">
                    We'll reply within 24 hours.
                  </p>
                  <button
                    type="submit"
                    className="group relative bg-[#D4AF37] text-black px-9 py-3.5 rounded-full font-semibold overflow-hidden hover:scale-105 transition-transform duration-300 text-sm"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
