"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "@/lib/localStore";

type AuthContextValue = {
  email: string | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  promptOpen: boolean;
  promptLogin: () => void;
  closePrompt: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const authStore = createLocalStore<string | null>("auth:email", null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const email = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, authStore.getServerSnapshot);
  const [promptOpen, setPromptOpen] = useState(false);

  const login = (nextEmail: string) => {
    authStore.set(nextEmail);
    setPromptOpen(false);
  };

  const logout = () => authStore.set(null);

  const value: AuthContextValue = {
    email,
    isLoggedIn: email !== null,
    login,
    logout,
    promptOpen,
    promptLogin: () => setPromptOpen(true),
    closePrompt: () => setPromptOpen(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
