import { createContext, useContext, useState } from "react";
import { useStore } from "./StoreContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addOrder } = useStore();
  const [items, setItems]           = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  const removeFromCart = (name) =>
    setItems((prev) => prev.filter((i) => i.name !== name));

  const updateQty = (name, delta) =>
    setItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );

  const total = items.reduce(
    (sum, i) => sum + parseFloat(String(i.price).replace(/[^0-9.]/g, "")) * i.qty,
    0
  );
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const checkout = ({ name, email } = {}) => {
    if (!items.length) return;
    addOrder({
      customer: name?.trim() || "Guest",
      email:    email?.trim() || "",
      avatar:   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40",
      product:
        items.length === 1
          ? items[0].name
          : `${items[0].name} +${items.length - 1} more`,
      total: Math.round(total),
      items: count,
    });
    setItems([]);
    setDrawerOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items, addToCart, removeFromCart, updateQty,
        total, count, drawerOpen, setDrawerOpen, checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
