"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getProduct } from "@/data/products";
import { createLocalStore } from "@/lib/localStore";

export type CartLine = {
  productId: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  addToCart: (productId: string, size: string, qty?: number) => void;
  removeLine: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const cartStore = createLocalStore<CartLine[]>("cart:lines", []);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (productId: string, size: string, qty = 1) => {
    const current = cartStore.getSnapshot();
    const existing = current.find((l) => l.productId === productId && l.size === size);
    const next = existing
      ? current.map((l) => (l.productId === productId && l.size === size ? { ...l, qty: l.qty + qty } : l))
      : [...current, { productId, size, qty }];
    cartStore.set(next);
    setIsOpen(true);
  };

  const removeLine = (productId: string, size: string) => {
    cartStore.set(cartStore.getSnapshot().filter((l) => !(l.productId === productId && l.size === size)));
  };

  const setQty = (productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeLine(productId, size);
      return;
    }
    cartStore.set(
      cartStore.getSnapshot().map((l) => (l.productId === productId && l.size === size ? { ...l, qty } : l))
    );
  };

  const clear = () => cartStore.set([]);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.productId);
      count += line.qty;
      if (product) subtotal += product.price * line.qty;
    }
    return { count, subtotal };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    addToCart,
    removeLine,
    setQty,
    clear,
    count,
    subtotal,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
