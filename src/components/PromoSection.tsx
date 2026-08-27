"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

/**
 * Secondary promo strip: two images tied to whatever the current
 * promotion/event is. Self-contained and independent from the rest of the
 * homepage layout so content here can be swapped as promotions change,
 * without touching hero/product-row sections.
 */
export default function PromoSection() {
  const { t } = useLocale();

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:px-8">
      <Link href="/category/promotion" className="group relative block aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src="/images/promo.svg"
          alt="Current promotion — Women"
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
        <span className="absolute bottom-4 left-4 text-base font-medium text-white">{t("promo.shopEditWomen")}</span>
      </Link>
      <Link href="/category/promotion" className="group relative block aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src="/images/brand-strip.svg"
          alt="Current promotion — Men"
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
        <span className="absolute bottom-4 left-4 text-base font-medium text-white">{t("promo.shopEditMen")}</span>
      </Link>
    </section>
  );
}
