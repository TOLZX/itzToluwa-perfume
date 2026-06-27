import { FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Map footer link labels to their scroll targets or actions
const linkAction = (item) => {
  const map = {
    "Men":              () => scrollTo("bestsellers"),
    "Women":            () => scrollTo("bestsellers"),
    "Unisex":           () => scrollTo("bestsellers"),
    "Limited Edition":  () => scrollTo("bestsellers"),
    "Gift Sets":        () => scrollTo("bestsellers"),
    "Our Story":        () => scrollTo("about"),
    "Craftsmanship":    () => scrollTo("about"),
    "Sustainability":   () => scrollTo("about"),
    "Contact Us":       () => scrollTo("contact"),
    "FAQ":              () => scrollTo("contact"),
    "Store Locator":    () => scrollTo("contact"),
    "Shipping & Returns": () => scrollTo("contact"),
    "Careers":          () => scrollTo("about"),
  };
  return map[item] || (() => {});
};

const links = {
  Collections: ["Men", "Women", "Unisex", "Limited Edition", "Gift Sets"],
  Company:     ["Our Story", "Craftsmanship", "Sustainability", "Careers"],
  Support:     ["Contact Us", "Shipping & Returns", "FAQ", "Store Locator"],
};

const Footer = () => {
  const { settings } = useStore();
  const socials = [
    { icon: <FaInstagram />, href: settings.instagram || "#" },
    { icon: <FaTiktok />,    href: settings.tiktok    || "#" },
    { icon: <FaFacebookF />, href: settings.facebook  || "#" },
    { icon: <FaPinterestP />, href: settings.pinterest || "#" },
    { icon: <FaYoutube />,   href: settings.youtube   || "#" },
  ];

  return (
    <footer className="bg-[#080808] border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <h2
              className="text-3xl tracking-[6px] text-white cursor-pointer hover:text-[#D4AF37] transition"
              style={{ fontFamily: "Playfair Display" }}
              onClick={() => scrollTo("home")}
            >
              {settings.storeName || "ÉLIXIR"}
            </h2>
            <p className="text-gray-500 mt-5 leading-relaxed text-sm max-w-xs">
              {settings.tagline || "Luxury fragrances crafted for those who leave an unforgettable impression. Since 1987."}
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">
                {heading}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={linkAction(item)}
                      className="text-gray-500 text-sm hover:text-[#D4AF37] transition text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
          <p>© {new Date().getFullYear()} {settings.storeName || "ÉLIXIR"}. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => scrollTo("contact")} className="hover:text-gray-400 transition">Privacy Policy</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-gray-400 transition">Terms of Service</button>
            <Link to="/admin" className="hover:text-[#D4AF37] transition">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
