import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlus, FaMinus, FaShoppingBag, FaCheckCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const { items, removeFromCart, updateQty, total, count, drawerOpen, setDrawerOpen, checkout } =
    useCart();

  // "cart" | "checkout" | "success"
  const [step, setStep] = useState("cart");
  const [form, setForm] = useState({ name: "", email: "" });

  // reset to cart view whenever drawer closes
  useEffect(() => {
    if (!drawerOpen) {
      const t = setTimeout(() => { setStep("cart"); setForm({ name: "", email: "" }); }, 400);
      return () => clearTimeout(t);
    }
  }, [drawerOpen]);

  const handleClose = () => setDrawerOpen(false);

  const browseCollections = () => {
    setDrawerOpen(false);
    setTimeout(() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" }), 350);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    checkout(form);
    setStep("success");
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-[#0d0d0d] border-l border-white/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-7 py-6 border-b border-white/10">
              <div>
                <h2 className="text-xl" style={{ fontFamily: "Playfair Display" }}>
                  {step === "checkout" ? "Checkout" : step === "success" ? "Order Placed" : "Your Cart"}
                </h2>
                {step === "cart" && (
                  <p className="text-gray-500 text-xs mt-0.5">{count} {count === 1 ? "item" : "items"}</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:border-white/50 transition"
                aria-label="Close cart"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* ── Cart step ── */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto px-7 py-6">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center gap-5 text-center">
                      <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                        <FaShoppingBag className="text-gray-500 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium">Your cart is empty</p>
                        <p className="text-gray-600 text-sm mt-1">Discover a fragrance that defines you.</p>
                      </div>
                      <button onClick={browseCollections} className="border border-[#D4AF37]/60 text-[#D4AF37] px-7 py-3 rounded-full text-sm hover:bg-[#D4AF37] hover:text-black transition">
                        Browse Collection
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <motion.div key={item.name} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                            <p className="text-sm mt-0.5" style={{ fontFamily: "Playfair Display" }}>{item.name}</p>
                            <p className="text-[#D4AF37] text-sm mt-1 font-semibold">{item.price}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center border border-white/20 rounded-full">
                                <button onClick={() => updateQty(item.name, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition rounded-l-full">
                                  <FaMinus className="text-[10px]" />
                                </button>
                                <span className="w-8 text-center text-sm select-none">{item.qty}</span>
                                <button onClick={() => updateQty(item.name, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition rounded-r-full">
                                  <FaPlus className="text-[10px]" />
                                </button>
                              </div>
                              <button onClick={() => removeFromCart(item.name)} className="text-gray-600 text-xs hover:text-red-400 transition">
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="px-7 py-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-sm">Subtotal</span>
                      <span className="text-[#D4AF37] font-semibold text-lg">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-5">Shipping & taxes calculated at checkout</p>
                    <button onClick={() => setStep("checkout")} className="w-full bg-[#D4AF37] text-black font-semibold py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition">
                      Proceed to Checkout
                    </button>
                    <button onClick={handleClose} className="w-full mt-3 border border-white/20 text-gray-400 py-3.5 rounded-full text-sm hover:border-white/40 hover:text-white transition">
                      Continue Shopping
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── Checkout step ── */}
            {step === "checkout" && (
              <form onSubmit={handlePlaceOrder} className="flex flex-col flex-1">
                <div className="flex-1 px-7 py-6 space-y-4">
                  <p className="text-gray-400 text-sm">Enter your details to place the order.</p>

                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "e.g. Sophia Laurent" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "you@email.com" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37] transition"
                      />
                    </div>
                  ))}

                  {/* Order summary */}
                  <div className="mt-2 bg-white/5 border border-white/8 rounded-xl p-4 space-y-2">
                    {items.map((i) => (
                      <div key={i.name} className="flex justify-between text-xs">
                        <span className="text-gray-400">{i.name} × {i.qty}</span>
                        <span className="text-gray-300">{i.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/8 pt-2 flex justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="px-7 py-6 border-t border-white/10 space-y-3">
                  <button type="submit" className="w-full bg-[#D4AF37] text-black font-semibold py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition">
                    Place Order
                  </button>
                  <button type="button" onClick={() => setStep("cart")} className="w-full border border-white/20 text-gray-400 py-3.5 rounded-full text-sm hover:border-white/40 hover:text-white transition">
                    ← Back to Cart
                  </button>
                </div>
              </form>
            )}

            {/* ── Success step ── */}
            {step === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center px-7 text-center gap-5">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                  <FaCheckCircle className="text-5xl text-[#D4AF37]" />
                </motion.div>
                <div>
                  <h3 className="text-xl" style={{ fontFamily: "Playfair Display" }}>Order Confirmed</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}! Your order has been placed and is now visible in the admin dashboard.
                  </p>
                </div>
                <button onClick={handleClose} className="border border-[#D4AF37]/60 text-[#D4AF37] px-8 py-3 rounded-full text-sm hover:bg-[#D4AF37] hover:text-black transition">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
