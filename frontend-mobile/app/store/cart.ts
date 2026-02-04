// app/store/cart.ts
import { useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  size: string;
  ml: number;
  qty: number;
  price: number; // per item price
};

let cartData: CartItem[] = [];

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(cartData);

  const addItem = (item: CartItem) => {
    const existing = cartData.find(
      (c) => c.id === item.id && c.size === item.size
    );

    if (existing) {
      existing.qty += item.qty;
    } else {
      cartData.push(item);
    }
    setCart([...cartData]);
  };

  const updateQty = (id: string, size: string, qty: number) => {
    cartData = cartData
      .map((c) =>
        c.id === id && c.size === size ? { ...c, qty: Math.max(qty, 0) } : c
      )
      .filter((c) => c.qty > 0);

    setCart([...cartData]);
  };

  const clearCart = () => {
    cartData = [];
    setCart([]);
  };

  return { cart, addItem, updateQty, clearCart };
};
