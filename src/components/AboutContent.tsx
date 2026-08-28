"use client";

import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";

export default function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-medium text-neutral-900">{t("about.h1")}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/images/brand/about-storefront.jpg"
            alt={t("about.photoStorefront")}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="product-photo object-cover"
          />
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/images/brand/about-interior.jpg"
            alt={t("about.photoInterior")}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="product-photo object-cover"
          />
        </div>
      </div>
      <div className="mt-8 max-w-2xl">
        <p className="text-base leading-relaxed text-neutral-700">{t("about.p1")}</p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">{t("about.p2")}</p>
      </div>
    </div>
  );
}
