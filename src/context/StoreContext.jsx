import { createContext, useContext, useState, useEffect } from "react";
import { initialProducts, initialOrders, initialCustomers, initialTestimonials } from "../admin/data";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const initialSettings = {
  storeName:       "ÉLIXIR",
  tagline:         "Luxury fragrances crafted for those who leave an unforgettable impression. Since 1987.",
  heroHeadline:    "ÉLIXIR",
  heroSubtitle:    "Crafted for those who leave an unforgettable impression.",
  heroPrimaryBtn:  "Shop Collection",
  heroSecondaryBtn:"Discover More",
  contactEmail:    "hello@elixir.com",
  currency:        "$",
  instagram:       "#",
  facebook:        "#",
  pinterest:       "#",
  youtube:         "#",
  tiktok:          "#",
};

export const StoreProvider = ({ children }) => {
  const [products,      setProducts]      = useState(() => load("elixir_products",     initialProducts));
  const [orders,        setOrders]        = useState(() => load("elixir_orders",       initialOrders));
  const [settings,      setSettings]      = useState(() => load("elixir_settings",     initialSettings));
  const [testimonials,  setTestimonials]  = useState(() => load("elixir_testimonials", initialTestimonials));
  const [customers]                       = useState(() => load("elixir_customers",    initialCustomers));

  useEffect(() => { localStorage.setItem("elixir_products",     JSON.stringify(products));     }, [products]);
  useEffect(() => { localStorage.setItem("elixir_orders",       JSON.stringify(orders));       }, [orders]);
  useEffect(() => { localStorage.setItem("elixir_settings",     JSON.stringify(settings));     }, [settings]);
  useEffect(() => { localStorage.setItem("elixir_testimonials", JSON.stringify(testimonials)); }, [testimonials]);

  /* ── Products ──────────────────────────────────────────────── */
  const addProduct = (data) =>
    setProducts((prev) => [{
      id: Date.now(), name: data.name, category: data.category,
      price: Number(data.price), stock: Number(data.stock),
      status: data.status, badge: data.badge || null,
      image: data.image?.trim() || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
      rating: 5,
    }, ...prev]);

  const updateProduct = (id, data) =>
    setProducts((prev) => prev.map((p) => p.id === id ? {
      ...p, name: data.name, category: data.category,
      price: Number(data.price), stock: Number(data.stock),
      status: data.status, badge: data.badge || null,
      image: data.image?.trim() || p.image,
    } : p));

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  /* ── Orders ────────────────────────────────────────────────── */
  const addOrder = (order) =>
    setOrders((prev) => {
      const maxNum = prev.reduce((max, o) => {
        const n = parseInt(o.id.replace("ORD-", ""), 10);
        return n > max ? n : max;
      }, 91);
      const id  = `ORD-${String(maxNum + 1).padStart(4, "0")}`;
      const now = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return [{ ...order, id, date: now, status: "Processing" }, ...prev];
    });

  const updateOrderStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  /* ── Testimonials ──────────────────────────────────────────── */
  const addTestimonial = (review) => {
    const now = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setTestimonials((prev) => [...prev, { ...review, id: Date.now(), status: "pending", date: now }]);
  };

  const updateTestimonialStatus = (id, status) =>
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  const deleteTestimonial = (id) =>
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

  /* ── Settings ──────────────────────────────────────────────── */
  const updateSettings = (updates) =>
    setSettings((prev) => ({ ...prev, ...updates }));

  /* ── Data reset ────────────────────────────────────────────── */
  const resetData = (type) => {
    if (type === "products")     { setProducts(initialProducts); }
    else if (type === "orders")  { setOrders(initialOrders); }
    else if (type === "settings"){ setSettings(initialSettings); }
    else if (type === "all") {
      setProducts(initialProducts);
      setOrders(initialOrders);
      setSettings(initialSettings);
      setTestimonials(initialTestimonials);
    }
  };

  return (
    <StoreContext.Provider value={{
      products,     addProduct,     updateProduct,     deleteProduct,
      orders,       addOrder,       updateOrderStatus,
      testimonials, addTestimonial, updateTestimonialStatus, deleteTestimonial,
      customers,
      settings,     updateSettings,
      resetData,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
