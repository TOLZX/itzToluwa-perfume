import { useState, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaLink, FaCloudUploadAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";

const statusColors = {
  "Active":       "bg-emerald-500/15 text-emerald-400",
  "Out of Stock": "bg-red-500/15 text-red-400",
  "Low Stock":    "bg-yellow-500/15 text-yellow-400",
};

const categories = ["Men", "Women", "Unisex", "Limited Edition"];
const statuses   = ["Active", "Out of Stock", "Low Stock"];
const badges     = ["", "Best Seller", "New", "Exclusive", "Limited"];

const emptyForm = { name: "", category: "Men", price: "", stock: "", status: "Active", badge: "", image: "" };

/* ─── Modal wrapper ──────────────────────────────────────────── */
const Modal = ({ title, onClose, wide = false, children }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className={`bg-[#111] border border-white/10 rounded-2xl w-full p-6 max-h-[90vh] overflow-y-auto ${wide ? "max-w-lg" : "max-w-md"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg" style={{ fontFamily: "Playfair Display" }}>{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-white/50 transition">
            <FaTimes className="text-xs" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ─── Image picker ───────────────────────────────────────────── */
const ImagePicker = ({ value, onChange }) => {
  const fileRef              = useRef(null);
  const [mode, setMode]      = useState(() => value?.startsWith("data:") ? "upload" : "url");
  const [dragOver, setDragOver] = useState(false);
  const [error, setError]    = useState("");

  const processFile = (file) => {
    setError("");
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 3 * 1024 * 1024)    { setError("Image must be under 3 MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const switchMode = (m) => {
    setMode(m);
    setError("");
  };

  return (
    <div>
      <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">
        Product Image
      </label>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => switchMode("url")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs border transition
            ${mode === "url"
              ? "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]"
              : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"}`}
        >
          <FaLink className="text-[10px]" /> Image URL
        </button>
        <button
          type="button"
          onClick={() => switchMode("upload")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs border transition
            ${mode === "upload"
              ? "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]"
              : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"}`}
        >
          <FaCloudUploadAlt className="text-[10px]" /> Upload from Gallery
        </button>
      </div>

      {/* URL input */}
      {mode === "url" && (
        <input
          type="text"
          value={value?.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition"
        />
      )}

      {/* Upload drop-zone */}
      {mode === "upload" && (
        <>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && processFile(e.target.files[0])}
          />

          {value && !value.startsWith("data:https") ? (
            /* Preview */
            <div className="relative rounded-xl overflow-hidden border border-white/10 group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="bg-[#D4AF37] text-black text-xs font-semibold px-4 py-2 rounded-full hover:scale-105 transition"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-4 py-2 rounded-full hover:bg-red-500/30 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            /* Drop zone */
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) processFile(file);
              }}
              className={`cursor-pointer rounded-xl border-2 border-dashed transition py-8 text-center
                ${dragOver
                  ? "border-[#D4AF37] bg-[#D4AF37]/5"
                  : "border-white/10 hover:border-white/25 hover:bg-white/3"}`}
            >
              <FaCloudUploadAlt className={`text-3xl mx-auto mb-2 transition ${dragOver ? "text-[#D4AF37]" : "text-gray-500"}`} />
              <p className="text-gray-300 text-sm font-medium">
                {dragOver ? "Drop image here" : "Click to browse"}
              </p>
              <p className="text-gray-600 text-xs mt-1">or drag & drop · PNG, JPG, WebP · max 3 MB</p>
            </div>
          )}
        </>
      )}

      {/* Current image preview when in URL mode */}
      {mode === "url" && value && !value.startsWith("data:") && (
        <div className="mt-2 rounded-xl overflow-hidden border border-white/8">
          <img
            src={value}
            alt="Preview"
            className="w-full h-28 object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
};

/* ─── Reusable field/select helpers ─────────────────────────── */
const Field = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div>
    <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">{label}</label>
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37] transition"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1.5">{label}</label>
    <select
      value={value} onChange={onChange}
      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37] transition"
    >
      {options.map((o) => <option key={o} value={o}>{o || "No Badge"}</option>)}
    </select>
  </div>
);

/* ─── Product form ───────────────────────────────────────────── */
const ProductForm = ({ form, setForm, onSubmit, submitLabel }) => {
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Product Name"  value={form.name}  onChange={set("name")}  placeholder="e.g. Midnight Noir" />

      <div className="grid grid-cols-2 gap-3">
        <Select label="Category" value={form.category} onChange={set("category")} options={categories} />
        <Select label="Status"   value={form.status}   onChange={set("status")}   options={statuses} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Price ($)" value={form.price} onChange={set("price")} type="number" placeholder="185" />
        <Field label="Stock"     value={form.stock} onChange={set("stock")} type="number" placeholder="50" />
      </div>

      <Select label="Badge" value={form.badge} onChange={set("badge")} options={badges} />

      <ImagePicker
        value={form.image}
        onChange={(img) => setForm((f) => ({ ...f, image: img }))}
      />

      <button
        type="submit"
        className="w-full bg-[#D4AF37] text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition mt-1"
      >
        {submitLabel}
      </button>
    </form>
  );
};

/* ─── Main Products page ─────────────────────────────────────── */
const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [search, setSearch]             = useState("");
  const [addOpen, setAddOpen]           = useState(false);
  const [editTarget, setEditTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm]                 = useState(emptyForm);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct(form);
    setForm(emptyForm);
    setAddOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateProduct(editTarget.id, form);
    setEditTarget(null);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name, category: product.category,
      price: product.price, stock: product.stock,
      status: product.status, badge: product.badge || "",
      image: product.image,
    });
    setEditTarget(product);
  };

  const confirmDelete = () => {
    deleteProduct(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium" style={{ fontFamily: "Playfair Display" }}>Products</h2>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} total · changes reflect on the website instantly</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setAddOpen(true); }}
          className="flex items-center gap-2 bg-[#D4AF37] text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition"
        >
          <FaPlus className="text-xs" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full bg-[#111] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] transition"
        />
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Product", "Category", "Price", "Stock", "Status", "Badge", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      <span className="font-medium text-gray-200">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{p.category}</td>
                  <td className="px-6 py-4 text-[#D4AF37] font-semibold">${p.price}</td>
                  <td className="px-6 py-4 text-gray-300">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{p.badge || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => openEdit(p)} className="w-7 h-7 flex items-center justify-center border border-white/20 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition text-xs">
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteTarget(p)} className="w-7 h-7 flex items-center justify-center border border-white/20 rounded-lg hover:border-red-400 hover:text-red-400 transition text-xs">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {addOpen && (
        <Modal title="Add Product" wide onClose={() => setAddOpen(false)}>
          <ProductForm form={form} setForm={setForm} onSubmit={handleAdd} submitLabel="Add Product" />
        </Modal>
      )}
      {editTarget && (
        <Modal title={`Edit — ${editTarget.name}`} wide onClose={() => setEditTarget(null)}>
          <ProductForm form={form} setForm={setForm} onSubmit={handleEdit} submitLabel="Save Changes" />
        </Modal>
      )}
      {deleteTarget && (
        <Modal title="Delete Product" onClose={() => setDeleteTarget(null)}>
          <p className="text-gray-400 text-sm mb-6">
            Are you sure you want to delete <span className="text-white font-medium">{deleteTarget.name}</span>? This will also remove it from the website.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 border border-white/20 py-2.5 rounded-xl text-sm hover:border-white/40 transition">Cancel</button>
            <button onClick={confirmDelete} className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
