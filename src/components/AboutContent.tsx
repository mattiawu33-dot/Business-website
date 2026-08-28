"use client";

import { useLocale } from "@/context/LocaleContext";

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/5] w-full items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-center">
      <span className="px-4 text-xs uppercase tracking-wide text-neutral-400">{label}</span>
    </div>
  );
}

export default function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-medium text-neutral-900">{t("about.h1")}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PhotoPlaceholder label={t("about.photoStorefront")} />
        <PhotoPlaceholder label={t("about.photoInterior")} />
      </div>
      <div className="mt-8 max-w-2xl">
        <p className="text-base leading-relaxed text-neutral-700">{t("about.p1")}</p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">{t("about.p2")}</p>
      </div>
    </div>
  );
}
