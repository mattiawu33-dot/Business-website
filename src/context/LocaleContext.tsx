"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "@/lib/localStore";
import { dictionaries, type DictKey, type Locale } from "@/lib/i18n/dictionary";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
// Default is Italian — first-time visitors see the site in Italian, not
// English-with-a-switch (per Round 9 requirement #2).
const localeStore = createLocalStore<Locale>("locale", "it");

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(localeStore.subscribe, localeStore.getSnapshot, localeStore.getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value: LocaleContextValue = {
    locale,
    setLocale: (next) => localeStore.set(next),
    t: (key, vars) => interpolate(dictionaries[locale][key], vars),
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
