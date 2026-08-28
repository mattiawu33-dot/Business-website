"use client";

import { useLocale } from "@/context/LocaleContext";

export default function ComingSoonCard({ label }: { label?: string }) {
  const { t } = useLocale();
  const text = label ?? t("comingSoon.label");

  return (
    <div className="flex w-full flex-col">
      <div className="flex aspect-[2/3] w-full items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-center transition-colors hover:border-neutral-400">
        <span className="px-4 text-xs uppercase tracking-wide text-neutral-400">{text}</span>
      </div>
      <div className="mt-3 h-4" />
    </div>
  );
}
