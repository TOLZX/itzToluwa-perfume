import { motion } from "framer-motion";

const collections = [
  {
    title: "Men",
    subtitle: "Bold & Commanding",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900",
  },
  {
    title: "Women",
    subtitle: "Elegant & Timeless",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=700",
  },
  {
    title: "Unisex",
    subtitle: "Fluid & Modern",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700",
  },
  {
    title: "Limited Edition",
    subtitle: "Rare & Extraordinary",
    image: "https://media.istockphoto.com/id/2236000880/photo/rose-perfume.webp?a=1&b=1&s=612x612&w=0&k=20&c=_WW4o-aqdafvIXTGpDAzihgraKFXcC3h6n8tsnUBpHo=",
  },
];

const FeaturedCollection = () => {
  const scrollToBestSellers = () =>
    document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="collections" className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[6px] text-[#D4AF37] text-sm"
          >
            Collections
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl mt-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            Curated Fragrances
          </motion.h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {collections.map((item, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${isWide ? "md:col-span-2" : "md:col-span-1"} h-[460px] relative overflow-hidden rounded-3xl cursor-pointer group`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition duration-500" />

                <div className="absolute bottom-8 left-8">
                  <p className="text-xs uppercase tracking-[4px] text-[#D4AF37] mb-2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {item.subtitle}
                  </p>
                  <h3
                    className="text-3xl md:text-4xl"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={scrollToBestSellers}
                      className="border border-white px-5 py-2 rounded-full text-sm hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition duration-300"
                    >
                      Explore
                    </button>
                    <span className="w-0 h-px bg-[#D4AF37] group-hover:w-12 transition-all duration-500" />
                  </div>
                </div>

                <div className="absolute top-6 right-6 text-xs text-white/30 font-mono">
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
