import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import perfumeHeroVideo from "../assets/perfume-hero.mp4";
import { useStore } from "../context/StoreContext";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
  const { settings } = useStore();
  const s = settings;

  return (
    <section id="home" className="relative h-screen overflow-hidden">

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105"
      >
        <source src={perfumeHeroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradient fade to black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black" />

      {/* Ambient gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.07)_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="text-center px-6 max-w-4xl">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-[#D4AF37]" />
            <p className="uppercase tracking-[8px] text-[#D4AF37] text-sm">
              {s.tagline?.split(".")[0] || "Luxury Fragrance Collection"}
            </p>
            <span className="h-px w-10 bg-[#D4AF37]" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-7xl md:text-9xl lg:text-[11rem] mt-5 leading-none tracking-tight"
            style={{ fontFamily: "Playfair Display" }}
          >
            {s.heroHeadline || "ÉLIXIR"}
          </motion.h1>

          {/* Thin gold decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="max-w-md mx-auto mt-6 text-gray-300 text-lg leading-relaxed"
          >
            {s.heroSubtitle || "Crafted for those who leave an unforgettable impression."}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-10 flex justify-center gap-4 flex-wrap"
          >
            <button
              onClick={() => scrollTo("collections")}
              className="group relative bg-[#D4AF37] text-black px-9 py-4 rounded-full font-semibold overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">{s.heroPrimaryBtn || "Shop Collection"}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>

            <button
              onClick={() => scrollTo("about")}
              className="border border-white/60 px-9 py-4 rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              {s.heroSecondaryBtn || "Discover More"}
            </button>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollTo("collections")}
        className="absolute bottom-10 left-1/2 animate-bounce-slow flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-xs uppercase tracking-[4px] text-gray-400">Scroll</span>
        <FaChevronDown className="text-[#D4AF37] text-sm" />
      </motion.div>

    </section>
  );
};

export default Hero;
