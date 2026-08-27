"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

/**
 * Closing "About Us / mission" banner — the plain-language version of the
 * brand's three pillars (styling versatility, affordable, fast), placed at
 * the very bottom of the homepage per the build spec.
 */
export default function BrandStrip() {
  const { t } = useLocale();

  return (
    <section className="bg-neutral-900 px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-medium text-white sm:text-3xl">{t("hero.headline")}</h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-300">{t("brand.body")}</p>
        <Link
          href="/about"
          className="mt-6 inline-block border border-white px-5 py-2 text-sm text-white transition hover:bg-accent hover:border-accent"
        >
          {t("brand.moreLink")}
        </Link>
      </div>
    </section>
  );
}
