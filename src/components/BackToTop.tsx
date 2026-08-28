"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

const SHOW_AFTER_PX = 600;

function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("backToTop.label")}
      className={`fixed bottom-6 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-neutral-700 shadow-md transition-all duration-300 hover:border-accent hover:text-accent sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  );
}
