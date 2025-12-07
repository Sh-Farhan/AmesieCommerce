// app/store/cart.ts

import { useState } from "react";

let cartData = [];

export const useCart = () => {
  const [cart, setCart] = useState(cartData);

  const addItem = (item) => {
    cartData.push(item);
    setCart([...cartData]);
  };

  const updateQty = (id, qty) => {
    cartData = cartData.map((c) =>
      c.id === id ? { ...c, qty } : c
    );
    setCart([...cartData]);
  };

  const clearCart = () => {
    cartData = [];
    setCart([]);
  };

  return { cart, addItem, updateQty, clearCart };
};
