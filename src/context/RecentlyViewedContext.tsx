"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "@/lib/localStore";

const MAX_ITEMS = 8;

type RecentlyViewedContextValue = {
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);
const recentlyViewedStore = createLocalStore<string[]>("recently-viewed:ids", []);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const recentlyViewed = useSyncExternalStore(
    recentlyViewedStore.subscribe,
    recentlyViewedStore.getSnapshot,
    recentlyViewedStore.getServerSnapshot
  );

  const addRecentlyViewed = (productId: string) => {
    const current = recentlyViewedStore.getSnapshot();
    const next = [productId, ...current.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
    recentlyViewedStore.set(next);
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}
