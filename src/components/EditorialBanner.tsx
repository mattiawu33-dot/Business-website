"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import type { DictKey } from "@/lib/i18n/dictionary";

/**
 * Reusable, swappable campaign block — the equivalent of a seasonal
 * "editorial" banner (Nike/Adidas-style). Content is passed as props so a
 * future round can drop in a new season/drop without touching layout;
 * these defaults are just the current placeholder theme.
 */
export default function EditorialBanner({
  eyebrowKey = "editorial.eyebrow",
  titleKey = "editorial.title",
  subtitleKey = "editorial.subtitle",
  ctaKey = "editorial.cta",
  ctaHref = "/category/new",
  image = "/images/about.svg",
  imageAlt = "Ishue seasonal campaign",
}: {
  eyebrowKey?: DictKey;
  titleKey?: DictKey;
  subtitleKey?: DictKey;
  ctaKey?: DictKey;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
}) {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href={ctaHref}
        className="group relative block aspect-[16/9] w-full overflow-hidden bg-neutral-100 sm:aspect-[21/9]"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-6 pb-8 sm:p-8 sm:pb-10">
          <span className="text-xs font-medium uppercase tracking-wide text-white/80">{t(eyebrowKey)}</span>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t(titleKey)}</h2>
          <p className="max-w-md text-sm text-white/90">{t(subtitleKey)}</p>
          <span className="mt-2 inline-flex items-center border-b border-white pb-0.5 text-sm font-medium text-white transition group-hover:border-accent-secondary group-hover:text-accent-secondary">
            {t(ctaKey)}
          </span>
        </div>
      </Link>
    </section>
  );
}
