import { useState, useEffect } from "react";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

const navLinks = [
  { label: "Home",        id: "home" },
  { label: "Collections", id: "collections" },
  { label: "About",       id: "about" },
  { label: "Contact",     id: "contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setDrawerOpen } = useCart();
  const { settings } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, menuOpen ? 300 : 0);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/80 border-white/10"
          : "backdrop-blur-sm bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <h1
          onClick={() => scrollTo("home")}
          className="text-3xl tracking-[6px] hover:text-[#D4AF37] transition duration-300 cursor-pointer"
          style={{ fontFamily: "Playfair Display" }}
        >
          {settings.storeName || "ÉLIXIR"}
        </h1>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 text-sm uppercase tracking-wider">
          {navLinks.map(({ label, id }) => (
            <li
              key={id}
              onClick={() => scrollTo(id)}
              className="relative cursor-pointer group"
            >
              <span className="hover:text-[#D4AF37] transition duration-300">
                {label}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {/* Cart icon */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative text-xl hover:text-[#D4AF37] transition duration-300"
            aria-label="Open cart"
          >
            <FaShoppingBag />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-xl hover:text-[#D4AF37] transition duration-300"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <ul className="flex flex-col px-6 py-8 gap-7 text-sm uppercase tracking-wider">
              {navLinks.map(({ label, id }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(id)}
                  className="cursor-pointer hover:text-[#D4AF37] transition duration-300"
                >
                  {label}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
