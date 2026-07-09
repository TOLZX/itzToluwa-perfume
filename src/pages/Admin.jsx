import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine, FaBox, FaShoppingBag, FaUsers, FaCog,
  FaSignOutAlt, FaBars, FaTimes, FaEye, FaEyeSlash, FaStar,
} from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import Overview     from "../admin/Overview";
import Products     from "../admin/Products";
import Orders       from "../admin/Orders";
import Customers    from "../admin/Customers";
import AdminTestimonials from "../admin/Testimonials";
import Settings     from "../admin/Settings";

const navItems = [
  { id: "overview",      label: "Overview",      icon: FaChartLine },
  { id: "products",      label: "Products",      icon: FaBox },
  { id: "orders",        label: "Orders",        icon: FaShoppingBag },
  { id: "customers",     label: "Customers",     icon: FaUsers },
  { id: "testimonials",  label: "Testimonials",  icon: FaStar },
];

/* ─── Login Gate ─────────────────────────────────────────────── */
const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem("elixir_admin_password") || "admin123";
    if (password === saved) {
      onLogin();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="text-4xl tracking-[6px] hover:text-[#D4AF37] transition duration-300" style={{ fontFamily: "Playfair Display" }}>
            ÉLIXIR
          </Link>
          <p className="text-gray-500 text-sm mt-3 uppercase tracking-widest">Admin Portal</p>
          <div className="h-px w-16 bg-[#D4AF37]/50 mx-auto mt-4" />
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl mb-6" style={{ fontFamily: "Playfair Display" }}>Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition pr-11"
                />
                <button type="button" onClick={() => setShow((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition">
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>
            <button type="submit"
              className="w-full bg-[#D4AF37] text-black font-semibold py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition duration-200 mt-2">
              Enter Dashboard
            </button>
          </form>
          {/* <p className="text-gray-600 text-xs text-center mt-6">
            Default password: <span className="text-gray-400">admin123</span>
          </p> */}
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="text-gray-500 text-sm hover:text-[#D4AF37] transition">
            ← Back to website
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

/* ─── Sidebar nav (needs useStore for pending badge) ─────────── */
const SidebarNav = ({ active, setActive, setOpen }) => {
  const { testimonials } = useStore();
  const pendingCount = testimonials.filter((t) => t.status === "pending").length;

  return (
    <nav className="flex-1 px-3 space-y-1">
      {navItems.map(({ id, label, icon: Icon }) => {
        const badge = id === "testimonials" && pendingCount > 0 ? pendingCount : null;
        return (
          <button
            key={id}
            onClick={() => { setActive(id); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition duration-200 group
              ${active === id ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
          >
            <Icon className={`text-base flex-shrink-0 ${active === id ? "text-[#D4AF37]" : "group-hover:text-white"}`} />
            {label}
            <span className="ml-auto flex items-center gap-1.5">
              {badge && (
                <span className="bg-yellow-500/20 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
              {active === id && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

/* ─── Sidebar ─────────────────────────────────────────────────── */
const Sidebar = ({ active, setActive, onLogout, open, setOpen }) => (
  <>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </AnimatePresence>

    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0d0d0d] border-r border-white/8 flex flex-col transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="px-6 py-7 border-b border-white/8 flex items-center justify-between">
        <Link to="/" className="text-2xl tracking-[5px] hover:text-[#D4AF37] transition" style={{ fontFamily: "Playfair Display" }}>
          ÉLIXIR
        </Link>
        <button className="lg:hidden text-gray-500 hover:text-white transition" onClick={() => setOpen(false)}>
          <FaTimes />
        </button>
      </div>

      <div className="px-6 py-3">
        <span className="text-[10px] uppercase tracking-[3px] text-gray-600">Admin Panel</span>
      </div>

      <SidebarNav active={active} setActive={setActive} setOpen={setOpen} />

      <div className="p-3 border-t border-white/8 space-y-1">
        {/* Settings as a proper nav item */}
        <button
          onClick={() => { setActive("settings"); setOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition duration-200 group
            ${active === "settings" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
        >
          <FaCog className={`text-base ${active === "settings" ? "text-[#D4AF37]" : "group-hover:text-white"}`} />
          Settings
          {active === "settings" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <FaSignOutAlt className="text-base" /> Logout
        </button>
      </div>
    </aside>
  </>
);

/* ─── Main Admin Page ─────────────────────────────────────────── */
const Admin = () => {
  const [authed, setAuthed]           = useState(false);
  const [active, setActive]           = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const pages = {
    overview:     <Overview />,
    products:     <Products />,
    orders:       <Orders />,
    customers:    <Customers />,
    testimonials: <AdminTestimonials />,
    settings:     <Settings />,
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar
        active={active} setActive={setActive}
        onLogout={() => setAuthed(false)}
        open={sidebarOpen} setOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-white/8 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white transition" onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </button>
            <h1 className="text-sm font-medium capitalize text-gray-300">{active}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
              A
            </div>
            <span className="text-sm text-gray-400 hidden sm:block">Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {pages[active]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Admin;
