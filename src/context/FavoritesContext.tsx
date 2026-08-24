"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "@/lib/localStore";

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const favoritesStore = createLocalStore<string[]>("favorites:ids", []);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot
  );

  const toggleFavorite = (productId: string) => {
    const current = favoritesStore.getSnapshot();
    favoritesStore.set(
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
