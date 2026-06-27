import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram, FaFacebookF, FaPinterestP, FaYoutube,
  FaCheckCircle, FaExclamationTriangle, FaEye, FaEyeSlash,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { useStore, initialSettings } from "../context/StoreContext";
import { initialProducts, initialOrders } from "./data";

/* ─── Shared UI helpers ─────────────────────────────────────── */
const Label = ({ children }) => (
  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">
    {children}
  </label>
);

const Input = ({ value, onChange, type = "text", placeholder = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition"
  />
);

const Textarea = ({ value, onChange, placeholder = "", rows = 2 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition resize-none"
  />
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#D4AF37] text-black font-semibold px-8 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition text-sm"
  >
    Save Changes
  </button>
);

const Card = ({ title, description, children }) => (
  <div className="bg-[#111] border border-white/8 rounded-2xl p-6 space-y-5">
    <div className="border-b border-white/8 pb-4">
      <h3 className="font-medium text-base">{title}</h3>
      {description && <p className="text-gray-500 text-xs mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

/* ─── Toast ─────────────────────────────────────────────────── */
const Toast = ({ message, type = "success" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium
      ${type === "success" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300" : "bg-red-500/20 border border-red-500/30 text-red-300"}`}
  >
    {type === "success"
      ? <FaCheckCircle className="text-emerald-400" />
      : <FaExclamationTriangle className="text-red-400" />}
    {message}
  </motion.div>
);

/* ─── Confirm Dialog ─────────────────────────────────────────── */
const ConfirmDialog = ({ title, message, onConfirm, onCancel, danger = true }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onCancel}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${danger ? "bg-red-500/20" : "bg-yellow-500/20"}`}>
        <FaExclamationTriangle className={danger ? "text-red-400" : "text-yellow-400"} />
      </div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 border border-white/20 py-2.5 rounded-xl text-sm hover:border-white/40 transition">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition
            ${danger ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" : "bg-[#D4AF37] text-black hover:scale-[1.02]"}`}
        >
          Confirm
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Tab: General ───────────────────────────────────────────── */
const GeneralTab = ({ settings, updateSettings, showToast }) => {
  const [form, setForm] = useState({
    storeName:    settings.storeName,
    tagline:      settings.tagline,
    contactEmail: settings.contactEmail,
    currency:     settings.currency,
  });
  const [pwForm, setPwForm]     = useState({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw]     = useState(false);
  const [pwError, setPwError]   = useState("");

  const f = (key) => ({ value: form[key], onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })) });

  const saveGeneral = () => {
    updateSettings(form);
    showToast("General settings saved");
  };

  const savedPassword = localStorage.getItem("elixir_admin_password") || "admin123";
  const changePassword = () => {
    setPwError("");
    if (pwForm.current !== savedPassword) { setPwError("Current password is incorrect."); return; }
    if (pwForm.next.length < 6)           { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.next !== pwForm.confirm)    { setPwError("Passwords do not match."); return; }
    localStorage.setItem("elixir_admin_password", pwForm.next);
    setPwForm({ current: "", next: "", confirm: "" });
    showToast("Password updated");
  };

  return (
    <div className="space-y-5">
      <Card title="Store Information" description="Displayed in the navbar, footer, and throughout the site.">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Store Name</Label><Input {...f("storeName")} placeholder="ÉLIXIR" /></div>
          <div><Label>Currency Symbol</Label><Input {...f("currency")} placeholder="$" /></div>
        </div>
        <div><Label>Footer Tagline</Label><Textarea {...f("tagline")} placeholder="Luxury fragrances since 1987." /></div>
        <div><Label>Contact Email</Label><Input {...f("contactEmail")} type="email" placeholder="hello@elixir.com" /></div>
        <div className="flex justify-end"><SaveBtn onClick={saveGeneral} /></div>
      </Card>

      <Card title="Change Password" description="Update your admin login password.">
        <div className="space-y-3">
          {[
            { label: "Current Password", key: "current" },
            { label: "New Password",     key: "next"    },
            { label: "Confirm Password", key: "confirm" },
          ].map(({ label, key }) => (
            <div key={key}>
              <Label>{label}</Label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pwForm[key]}
                  onChange={(e) => { setPwForm((p) => ({ ...p, [key]: e.target.value })); setPwError(""); }}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition pr-10"
                />
                {key === "current" && (
                  <button type="button" onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition">
                    {showPw ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                )}
              </div>
            </div>
          ))}
          {pwError && <p className="text-red-400 text-xs">{pwError}</p>}
          <div className="flex justify-end pt-1"><SaveBtn onClick={changePassword} /></div>
        </div>
      </Card>
    </div>
  );
};

/* ─── Tab: Hero ──────────────────────────────────────────────── */
const HeroTab = ({ settings, updateSettings, showToast }) => {
  const [form, setForm] = useState({
    heroHeadline:     settings.heroHeadline,
    heroSubtitle:     settings.heroSubtitle,
    heroPrimaryBtn:   settings.heroPrimaryBtn,
    heroSecondaryBtn: settings.heroSecondaryBtn,
  });
  const f = (key) => ({ value: form[key], onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })) });

  return (
    <div className="space-y-5">
      <Card title="Hero Section" description="Controls the text displayed in the main hero banner.">
        <div>
          <Label>Main Headline</Label>
          <Input {...f("heroHeadline")} placeholder="ÉLIXIR" />
          <p className="text-gray-600 text-xs mt-1">The large centrepiece text. Keep it short.</p>
        </div>
        <div>
          <Label>Subtitle</Label>
          <Textarea {...f("heroSubtitle")} placeholder="Crafted for those who leave an unforgettable impression." />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Primary Button</Label><Input {...f("heroPrimaryBtn")} placeholder="Shop Collection" /></div>
          <div><Label>Secondary Button</Label><Input {...f("heroSecondaryBtn")} placeholder="Discover More" /></div>
        </div>

        {/* Live preview */}
        <div className="bg-black/40 border border-white/8 rounded-xl p-6 text-center">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[6px] mb-3">Preview</p>
          <p className="text-4xl" style={{ fontFamily: "Playfair Display" }}>{form.heroHeadline || "ÉLIXIR"}</p>
          <p className="text-gray-400 text-sm mt-3 max-w-xs mx-auto">{form.heroSubtitle}</p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <span className="bg-[#D4AF37] text-black text-xs font-semibold px-5 py-2 rounded-full">{form.heroPrimaryBtn}</span>
            <span className="border border-white/50 text-xs px-5 py-2 rounded-full">{form.heroSecondaryBtn}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <SaveBtn onClick={() => { updateSettings(form); showToast("Hero content saved"); }} />
        </div>
      </Card>
    </div>
  );
};

/* ─── Tab: Social Media ──────────────────────────────────────── */
const SocialTab = ({ settings, updateSettings, showToast }) => {
  const [form, setForm] = useState({
    instagram: settings.instagram,
    facebook:  settings.facebook,
    pinterest: settings.pinterest,
    youtube:   settings.youtube,
    tiktok:    settings.tiktok,
  });

  const socials = [
    { key: "instagram", label: "Instagram", icon: FaInstagram,  placeholder: "https://instagram.com/yourpage" },
    { key: "tiktok",    label: "TikTok",    icon: FaTiktok,     placeholder: "https://tiktok.com/@yourpage" },
    { key: "facebook",  label: "Facebook",  icon: FaFacebookF,  placeholder: "https://facebook.com/yourpage" },
    { key: "pinterest", label: "Pinterest", icon: FaPinterestP, placeholder: "https://pinterest.com/yourpage" },
    { key: "youtube",   label: "YouTube",   icon: FaYoutube,    placeholder: "https://youtube.com/@yourchannel" },
  ];

  return (
    <div className="space-y-5">
      <Card title="Social Media Links" description="These appear in the website footer. Use '#' to hide a platform.">
        <div className="space-y-4">
          {socials.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key}>
              <Label>{label}</Label>
              <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="url"
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <SaveBtn onClick={() => { updateSettings(form); showToast("Social links saved"); }} />
        </div>
      </Card>
    </div>
  );
};

/* ─── Tab: Data Management ───────────────────────────────────── */
const DataTab = ({ resetData, showToast }) => {
  const [confirm, setConfirm] = useState(null); // { type, title, message }

  const actions = [
    {
      type:    "products",
      label:   "Reset Products",
      desc:    "Restore the original 8 demo products. All products you added or edited will be lost.",
      color:   "yellow",
    },
    {
      type:    "orders",
      label:   "Reset Orders",
      desc:    "Restore the original 8 demo orders. All checkout orders will be removed.",
      color:   "yellow",
    },
    {
      type:    "settings",
      label:   "Reset Settings",
      desc:    "Restore all store settings, hero text, and social links to their defaults.",
      color:   "yellow",
    },
    {
      type:    "all",
      label:   "Reset Everything",
      desc:    "Wipes all products, orders, and settings back to factory defaults. This cannot be undone.",
      color:   "red",
    },
  ];

  const colorMap = {
    yellow: "border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5",
    red:    "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5",
  };
  const btnColorMap = {
    yellow: "border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10",
    red:    "border border-red-500/30 text-red-400 hover:bg-red-500/10",
  };

  return (
    <div className="space-y-5">
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex gap-3">
        <FaExclamationTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-yellow-300 text-sm">
          These actions affect data stored in your browser. Changes are permanent and cannot be undone.
        </p>
      </div>

      <Card title="Data Management" description="Reset individual data sets or wipe everything at once.">
        <div className="space-y-3">
          {actions.map((a) => (
            <div key={a.type} className={`flex items-center justify-between gap-4 border rounded-xl p-4 transition ${colorMap[a.color]}`}>
              <div>
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{a.desc}</p>
              </div>
              <button
                onClick={() => setConfirm(a)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition ${btnColorMap[a.color]}`}
              >
                Reset
              </button>
            </div>
          ))}
        </div>
      </Card>

      <AnimatePresence>
        {confirm && (
          <ConfirmDialog
            title={confirm.label}
            message={confirm.desc + " Are you sure?"}
            danger={confirm.color === "red"}
            onConfirm={() => {
              resetData(confirm.type);
              showToast(`${confirm.label} complete`, confirm.color === "red" ? "error" : "success");
              setConfirm(null);
            }}
            onCancel={() => setConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Settings Page ─────────────────────────────────────── */
const TABS = [
  { id: "general", label: "General" },
  { id: "hero",    label: "Hero Content" },
  { id: "social",  label: "Social Media" },
  { id: "data",    label: "Data" },
];

const Settings = () => {
  const { settings, updateSettings, resetData } = useStore();
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const tabProps = { settings, updateSettings, showToast, resetData };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium" style={{ fontFamily: "Playfair Display" }}>Settings</h2>
        <p className="text-gray-500 text-sm mt-0.5">Changes save instantly and reflect on the live site</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-white/8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2.5 text-sm transition border-b-2 -mb-px ${
              activeTab === t.id
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "general" && <GeneralTab {...tabProps} />}
          {activeTab === "hero"    && <HeroTab    {...tabProps} />}
          {activeTab === "social"  && <SocialTab  {...tabProps} />}
          {activeTab === "data"    && <DataTab    {...tabProps} />}
        </motion.div>
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
