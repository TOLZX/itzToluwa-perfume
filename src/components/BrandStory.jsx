import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const stats = [
  { value: "1987", label: "Est." },
  { value: "40+",  label: "Fragrances" },
  { value: "120+", label: "Countries" },
  { value: "2M+",  label: "Customers" },
];

const timeline = [
  {
    year: "1987",
    title: "The Beginning",
    body: "Jean-Claude Moreau founded ÉLIXIR in a small Parisian atelier, driven by a singular vision: that a fragrance should tell the story of whoever wears it.",
  },
  {
    year: "1992",
    title: "First International Steps",
    body: "ÉLIXIR opened its first boutiques in Milan and London, introducing European clientele to a new standard of olfactory luxury.",
  },
  {
    year: "1998",
    title: "Award of Excellence",
    body: "Awarded 'House of the Year' by the International Fragrance Foundation, cementing ÉLIXIR's place among the world's finest perfume houses.",
  },
  {
    year: "2003",
    title: "The Grasse Atelier",
    body: "We established our private atelier in Grasse, France — the perfume capital of the world — granting us direct access to the finest florals on earth.",
  },
  {
    year: "2010",
    title: "Signature Collection",
    body: "The launch of the Signature Collection redefines modern luxury: 12 compositions that balance Eastern depth with Western elegance.",
  },
  {
    year: "2018",
    title: "One Million Strong",
    body: "ÉLIXIR reached one million loyal customers across 120 countries, a testament to our unwavering commitment to quality over quantity.",
  },
  {
    year: "2024",
    title: "Sustainable Future",
    body: "We launched our Conscious Luxury initiative — refillable bottles, carbon-neutral shipping, and ethically sourced ingredients across our entire range.",
  },
];

const perfumers = [
  {
    name: "Jean-Claude Moreau",
    title: "Founder & Chief Perfumer",
    bio: "Trained at ISIPCA in Versailles, Jean-Claude spent a decade learning the ancient craft before founding ÉLIXIR. His philosophy: every fragrance must evoke a memory that hasn't happened yet.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    specialty: "Woody & Amber accords",
  },
  {
    name: "Isabelle Laurent",
    title: "Head of Women's Collection",
    bio: "A third-generation perfumer from Grasse, Isabelle's intuitive understanding of florals has produced some of the house's most celebrated feminine compositions.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200",
    specialty: "Floral & Chypre accords",
  },
  {
    name: "Karim Al-Hassan",
    title: "Oriental & Oud Specialist",
    bio: "Raised in Dubai, Karim bridges two worlds — the ancient oud traditions of the Middle East and the precision of modern French perfumery. His work is the heart of our Oud collection.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    specialty: "Oud, Resin & Oriental",
  },
];

const ingredients = [
  { name: "Bulgarian Rose",   origin: "Kazanlak, Bulgaria",    note: "Heart" },
  { name: "Oud Wood",         origin: "Assam, India",           note: "Base" },
  { name: "Bergamot",         origin: "Calabria, Italy",        note: "Top" },
  { name: "Jasmine Absolute", origin: "Grasse, France",         note: "Heart" },
  { name: "Sandalwood",       origin: "Mysore, India",          note: "Base" },
  { name: "Ambergris",        origin: "Ethical synthesis",      note: "Base" },
];

/* ─── Heritage Modal ─────────────────────────────────────────── */
const HeritageModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-md overflow-y-auto"
  >
    {/* Close */}
    <button
      onClick={onClose}
      className="fixed top-6 right-6 z-10 w-11 h-11 flex items-center justify-center border border-white/20 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition duration-300"
    >
      <FaTimes />
    </button>

    <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">

      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="uppercase tracking-[8px] text-[#D4AF37] text-sm">Since 1987</p>
        <h2
          className="text-6xl md:text-8xl mt-4"
          style={{ fontFamily: "Playfair Display" }}
        >
          Our Heritage
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        <p className="text-gray-400 max-w-xl mx-auto mt-6 leading-relaxed">
          Nearly four decades of obsession, craft, and artistry — this is the story
          of how ÉLIXIR became one of the world's most revered fragrance houses.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm text-center mb-16">Milestones</p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`flex items-start gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span
                    className="text-4xl text-[#D4AF37]/20"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="text-xl mt-1"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.body}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-4 h-4 rounded-full border-2 border-[#D4AF37] bg-black flex-shrink-0 mt-6 relative z-10" />

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Master Perfumers */}
      <div>
        <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm text-center mb-4">The Creators</p>
        <h3
          className="text-4xl md:text-5xl text-center mb-14"
          style={{ fontFamily: "Playfair Display" }}
        >
          Our Master Perfumers
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {perfumers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-[#D4AF37]/30 transition duration-300"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]/30 mb-5"
              />
              <h4 className="text-lg" style={{ fontFamily: "Playfair Display" }}>{p.name}</h4>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">{p.title}</p>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">{p.bio}</p>
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Specialty</p>
                <p className="text-gray-300 text-sm mt-1">{p.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ingredient sourcing */}
      <div>
        <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm text-center mb-4">Sourcing</p>
        <h3
          className="text-4xl md:text-5xl text-center mb-14"
          style={{ fontFamily: "Playfair Display" }}
        >
          Ingredients From the World
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 bg-white/5 border border-white/8 rounded-2xl p-5 hover:border-[#D4AF37]/30 transition duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-glow-pulse" />
              </div>
              <div>
                <p className="font-medium text-sm">{ing.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{ing.origin}</p>
                <span className="mt-2 inline-block text-[10px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                  {ing.note} note
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pb-8"
      >
        <p
          className="text-3xl md:text-4xl text-gray-200 leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "Playfair Display" }}
        >
          "A fragrance is the invisible part of your personality — choose it with intention."
        </p>
        <p className="text-[#D4AF37] text-sm mt-6 uppercase tracking-widest">
          — Jean-Claude Moreau, Founder
        </p>
        <button
          onClick={onClose}
          className="mt-14 border border-[#D4AF37]/60 text-[#D4AF37] px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition duration-300"
        >
          Return to Site
        </button>
      </motion.div>

    </div>
  </motion.div>
);

/* ─── Brand Story Section ────────────────────────────────────── */
const BrandStory = () => {
  const [heritageOpen, setHeritageOpen] = useState(false);

  return (
    <>
      <section id="about" className="bg-black py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-[540px]"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] rounded-full bg-[#D4AF37]/8 blur-[80px]" />
            </div>

            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700"
              alt="Perfume crafting"
              className="absolute top-0 left-0 w-[68%] h-[72%] object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
              alt="Ingredients"
              className="absolute bottom-0 right-0 w-[55%] h-[55%] object-cover rounded-3xl border-4 border-black shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            />

            <div className="absolute top-[35%] left-[58%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-glow-pulse" />
              <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Our Story</p>

            <h2
              className="text-5xl md:text-6xl mt-4 leading-tight"
              style={{ fontFamily: "Playfair Display" }}
            >
              Art in Every <br /> Bottle
            </h2>

            <div className="flex items-center gap-3 mt-8 mb-6">
              <div className="h-px w-10 bg-[#D4AF37]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-gray-400 leading-relaxed">
              Born from a passion for the extraordinary, ÉLIXIR was founded with
              a single belief — that fragrance is the invisible part of your
              identity. Each bottle is the result of months of craftsmanship,
              sourcing the world's finest raw ingredients and marrying them into
              compositions that transcend the ordinary.
            </p>
            <p className="text-gray-400 mt-4 leading-relaxed">
              From the oud markets of the Middle East to the flower fields of
              Grasse, France, every note in our collection tells a story.
            </p>

            <div className="grid grid-cols-4 gap-4 mt-12 pt-10 border-t border-white/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                >
                  <p
                    className="text-3xl text-[#D4AF37]"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setHeritageOpen(true)}
              className="mt-12 group border border-[#D4AF37]/60 text-[#D4AF37] px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition duration-300 flex items-center gap-3"
            >
              Our Heritage
              <span className="h-px w-0 bg-current group-hover:w-6 transition-all duration-300" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* Heritage modal */}
      <AnimatePresence>
        {heritageOpen && <HeritageModal onClose={() => setHeritageOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default BrandStory;
