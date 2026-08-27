"use client";

import { useLocale } from "@/context/LocaleContext";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("header.language")}
      className="flex items-center overflow-hidden rounded-full border border-border text-xs font-medium"
    >
      <button
        type="button"
        onClick={() => setLocale("it")}
        aria-pressed={locale === "it"}
        className={`px-2 py-1 transition ${
          locale === "it" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-accent"
        }`}
      >
        IT
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-2 py-1 transition ${
          locale === "en" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-accent"
        }`}
      >
        EN
      </button>
    </div>
  );
}
