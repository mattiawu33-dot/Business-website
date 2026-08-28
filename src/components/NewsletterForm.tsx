"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();

  if (submitted) {
    return <p className="text-sm text-neutral-700">{t("newsletter.thanks")}</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex border border-neutral-300 bg-white transition-colors focus-within:border-accent"
    >
      <input
        type="email"
        required
        placeholder={t("newsletter.placeholder")}
        className="w-full px-3 py-2 text-sm outline-none placeholder:text-neutral-400"
      />
      <button
        type="submit"
        className="shrink-0 px-3 text-sm text-neutral-700 transition-colors hover:text-accent"
      >
        {t("newsletter.join")}
      </button>
    </form>
  );
}
