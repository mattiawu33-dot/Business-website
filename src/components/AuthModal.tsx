"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { AppleIcon, CloseIcon } from "@/components/icons";

export default function AuthModal() {
  const { promptOpen, closePrompt, login } = useAuth();
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [appleNote, setAppleNote] = useState(false);

  if (!promptOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim());
    setEmail("");
    setAppleNote(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("auth.title")}
      onClick={closePrompt}
    >
      <div className="w-full max-w-sm bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-medium text-neutral-900">{t("auth.title")}</h2>
          <button
            type="button"
            onClick={closePrompt}
            aria-label={t("auth.close")}
            className="text-neutral-500 transition hover:text-neutral-900"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">{t("auth.subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm text-neutral-700">
            {t("auth.emailLabel")}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className="rounded-md border border-border px-3 py-2.5 text-sm text-neutral-900 focus:border-accent focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-md bg-accent py-2.5 text-sm font-medium text-accent-foreground transition hover:brightness-95"
          >
            {t("auth.continue")}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" />
          {t("auth.or")}
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() => setAppleNote(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          <AppleIcon className="h-4 w-4" />
          {t("auth.appleSignIn")}
        </button>
        {appleNote && <p className="mt-2 text-xs leading-relaxed text-muted">{t("auth.appleNote")}</p>}

        <p className="mt-4 text-xs leading-relaxed text-muted">{t("auth.disclaimer")}</p>
      </div>
    </div>
  );
}
