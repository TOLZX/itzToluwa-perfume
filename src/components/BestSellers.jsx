import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronDown, FaChevronUp, FaSortAmountDown, FaSearch, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

/* ─── Expandable search bar ──────────────────────────────────── */
const SearchBar = ({ value, onChange }) => {
  const inputRef           = useRef(null);
  const [expanded, setExpanded] = useState(value.length > 0);

  // Keep expanded whenever there's a value
  useEffect(() => {
    if (value.length > 0) setExpanded(true);
  }, [value]);

  const open = () => {
    setExpanded(true);
    // slight delay lets the width animation start before focus
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const handleMouseLeave = () => {
    if (document.activeElement !== inputRef.current && !value) {
      setExpanded(false);
    }
  };

  const handleBlur = () => {
    if (!value) setExpanded(false);
  };

  const clear = (e) => {
    e.stopPropagation();
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <motion.div
      animate={{ width: expanded ? 220 : 36 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex items-center h-9 rounded-full border overflow-hidden cursor-pointer flex-shrink-0 transition-colors duration-300
        ${expanded ? "bg-white/5 border-[#D4AF37]/50" : "bg-white/5 border-white/10 hover:border-white/30"}`}
      style={{ minWidth: 36 }}
      onMouseEnter={open}
      onMouseLeave={handleMouseLeave}
      onClick={open}
    >
      {/* Icon — always left */}
      <FaSearch
        className={`absolute left-[10px] text-[11px] pointer-events-none z-10 transition-colors duration-300
          ${expanded ? "text-[#D4AF37]" : "text-gray-500"}`}
      />

      {/* Input — visible when expanded */}
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setExpanded(true)}
        onBlur={handleBlur}
        placeholder="Search fragrances…"
        className="w-full pl-7 pr-7 py-1.5 text-xs bg-transparent outline-none text-white placeholder-gray-600"
      />

      {/* Clear button */}
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            type="button"
            onClick={clear}
            className="absolute right-2.5 text-gray-500 hover:text-white transition flex-shrink-0"
          >
            <FaTimes className="text-[10px]" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Product card ───────────────────────────────────────────── */
const ProductCard = ({ product, addToCart }) => {
  const outOfStock = product.status === "Out of Stock";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer"
    >
      <div
        className={`relative overflow-hidden rounded-2xl h-[340px] transition-shadow duration-500
          ${outOfStock
            ? "opacity-70"
            : "shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
          }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition duration-700
            ${outOfStock ? "grayscale" : "group-hover:scale-110"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="border border-white/30 text-gray-400 text-xs uppercase tracking-[3px] px-5 py-2 rounded-full bg-black/60">
              Sold Out
            </span>
          </div>
        )}

        {product.badge && !outOfStock && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {product.badge}
            </span>
          </div>
        )}

        {product.status === "Low Stock" && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-medium px-2.5 py-1 rounded-full">
              Low Stock
            </span>
          </div>
        )}

        {!outOfStock && (
          <button
            onClick={() =>
              addToCart({ name: product.name, category: product.category, price: `$${product.price}`, image: product.image })
            }
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-sm font-semibold px-7 py-2.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap"
          >
            Add to Cart
          </button>
        )}
      </div>

      <div className="mt-4 px-1">
        <p className="text-gray-500 text-[11px] uppercase tracking-widest">{product.category}</p>
        <div className="flex justify-between items-center mt-1.5">
          <h3
            className={`text-base transition duration-300 ${outOfStock ? "text-gray-500" : "group-hover:text-[#D4AF37]"}`}
            style={{ fontFamily: "Playfair Display" }}
          >
            {product.name}
          </h3>
          <span className={`font-semibold text-sm ${outOfStock ? "text-gray-600 line-through" : "text-[#D4AF37]"}`}>
            ${product.price}
          </span>
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: product.rating }).map((_, i) => (
            <FaStar key={i} className={`text-xs ${outOfStock ? "text-gray-700" : "text-[#D4AF37]"}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Constants ──────────────────────────────────────────────── */
const CATEGORY_ORDER = ["All", "Men", "Women", "Unisex", "Limited Edition"];
const SORT_OPTIONS   = [
  { value: "default",    label: "Featured" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name",       label: "Name: A–Z" },
];

/* ─── Section ────────────────────────────────────────────────── */
const BestSellers = () => {
  const { addToCart } = useCart();
  const { products }  = useStore();

  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy]             = useState("default");
  const [showAll, setShowAll]           = useState(false);
  const [search, setSearch]             = useState("");

  const tabs = CATEGORY_ORDER.filter(
    (c) => c === "All" || products.some((p) => p.category === c)
  );

  const countFor = (cat) =>
    cat === "All" ? products.length : products.filter((p) => p.category === cat).length;

  // 1 — category
  const categoryFiltered =
    activeFilter === "All" ? products : products.filter((p) => p.category === activeFilter);

  // 2 — search
  const q = search.trim().toLowerCase();
  const searchFiltered = q
    ? categoryFiltered.filter((p) => p.name.toLowerCase().includes(q))
    : categoryFiltered;

  // 3 — sort
  const sorted = [...searchFiltered].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name")       return a.name.localeCompare(b.name);
    return 0;
  });

  // 4 — limit (bypass when searching)
  const isSearching  = q.length > 0;
  const displayed    = (showAll || isSearching) ? sorted : sorted.filter((p) => p.status !== "Out of Stock").slice(0, 4);
  const hiddenCount  = sorted.length - 4;

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setShowAll(false);
  };

  const handleSearch = (val) => {
    setSearch(val);
    setShowAll(false);
  };

  const clearSearch = () => setSearch("");

  return (
    <section id="bestsellers" className="bg-[#080808] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[6px] text-[#D4AF37] text-sm"
          >
            Best Sellers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl mt-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            Our Most Loved
          </motion.h2>
        </div>

        {/* ── Filter / Search / Sort bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
        >
          {/* Category pills */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {tabs.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider border transition duration-300
                  ${activeFilter === cat
                    ? "bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#D4AF37]"
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
              >
                {cat}
                <span className={`ml-1.5 text-[10px] ${activeFilter === cat ? "text-[#D4AF37]/70" : "text-gray-600"}`}>
                  ({countFor(cat)})
                </span>
              </button>
            ))}
          </div>

          {/* Right controls: search + sort */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <SearchBar value={search} onChange={handleSearch} />

            {/* Sort */}
            <div className="relative flex items-center gap-2">
              <FaSortAmountDown className="text-gray-500 text-xs" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-white/10 rounded-full px-4 py-2 text-xs text-gray-400 uppercase tracking-wider outline-none hover:border-white/30 focus:border-[#D4AF37] transition duration-300 cursor-pointer appearance-none pr-8"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#111] text-white normal-case tracking-normal">
                    {o.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 text-gray-600 text-[10px] pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Active search label */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 mb-8"
            >
              <p className="text-gray-400 text-sm">
                {sorted.length === 0
                  ? "No results for"
                  : `${sorted.length} result${sorted.length !== 1 ? "s" : ""} for`}{" "}
                <span className="text-[#D4AF37] font-medium">"{search}"</span>
              </p>
              <button
                onClick={clearSearch}
                className="text-xs text-gray-600 hover:text-[#D4AF37] transition flex items-center gap-1"
              >
                <FaTimes className="text-[10px]" /> Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Grid ── */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No products available right now.</p>
        ) : displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Playfair Display" }}>
              {isSearching
                ? `No fragrances match "${search}"`
                : `No ${activeFilter} fragrances available.`}
            </p>
            <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="text-sm text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-2.5 rounded-full hover:bg-[#D4AF37] hover:text-black transition duration-300"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => handleFilter("All")}
                className="text-sm text-gray-400 border border-white/20 px-6 py-2.5 rounded-full hover:border-white/40 hover:text-white transition duration-300"
              >
                View All
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {displayed.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── View All / Show Less ── */}
        {!isSearching && sorted.length > 4 && displayed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group border border-white/20 px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition duration-300 flex items-center gap-3 mx-auto"
            >
              {showAll ? (
                <>Show Less <FaChevronUp className="text-xs" /></>
              ) : (
                <>
                  View All{activeFilter !== "All" ? ` ${activeFilter}` : " Products"}
                  <span className="text-[#D4AF37] font-semibold">
                    ({hiddenCount > 0 ? `+${hiddenCount}` : sorted.length})
                  </span>
                  <FaChevronDown className="text-xs" />
                </>
              )}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default BestSellers;
