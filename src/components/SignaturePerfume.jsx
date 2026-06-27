import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

const notes = [
  { label: "Top",   items: ["Bergamot", "Black Pepper"] },
  { label: "Heart", items: ["Lavender", "Cedarwood"] },
  { label: "Base",  items: ["Amber", "Musk"] },
];

const SignaturePerfume = () => {
  const { addToCart } = useCart();
  const { products }  = useStore();

  // Always show the first product in the store as the signature piece
  const signature = products[0];
  if (!signature) return null;

  return (
    <section className="bg-[#050505] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Image with glow orb + float */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center relative"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[340px] h-[340px] rounded-full bg-[#D4AF37]/15 blur-[90px] animate-glow-pulse" />
          </div>
          <div className="animate-float relative z-10">
            <img
              src={signature.image}
              alt={signature.name}
              className="w-[300px] md:w-[400px] drop-shadow-[0_0_80px_rgba(212,175,55,0.3)]"
            />
          </div>
          <div className="absolute w-[380px] h-[380px] rounded-full border border-[#D4AF37]/10 pointer-events-none" />
          <div className="absolute w-[460px] h-[460px] rounded-full border border-[#D4AF37]/5 pointer-events-none" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <span
            className="absolute -top-10 -left-4 text-[160px] text-[#D4AF37]/5 leading-none select-none pointer-events-none"
            style={{ fontFamily: "Playfair Display" }}
          >
            "
          </span>

          <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">Signature Collection</p>

          <h2
            className="text-5xl md:text-7xl mt-4 leading-tight"
            style={{ fontFamily: "Playfair Display" }}
          >
            {signature.name}
          </h2>

          <div className="flex items-center gap-4 mt-8">
            <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/60 to-transparent" />
          </div>

          <p className="text-gray-400 mt-6 leading-relaxed max-w-sm">
            An elegant composition crafted for those who command attention. A balance
            of freshness, warmth, and mystery designed to linger long after the
            moment has passed.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            {notes.map((note) => (
              <div
                key={note.label}
                className="border border-white/10 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition duration-300"
              >
                <h3 className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">{note.label}</h3>
                {note.items.map((item) => (
                  <p key={item} className="text-gray-300 text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 mt-12">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#D4AF37]">${signature.price}</span>
              <button
                onClick={() =>
                  addToCart({
                    name:     signature.name,
                    category: signature.category,
                    price:    `$${signature.price}`,
                    image:    signature.image,
                  })
                }
                className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
            <button className="text-sm uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition duration-300 flex items-center gap-2">
              View Notes <span className="h-px w-8 bg-current" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SignaturePerfume;
