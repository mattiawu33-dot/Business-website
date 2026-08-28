"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { useLocale } from "@/context/LocaleContext";
import ArrowProductRow from "@/components/ArrowProductRow";
import StyleSelector from "@/components/StyleSelector";
import BrandStrip from "@/components/BrandStrip";
import PromoSection from "@/components/PromoSection";
import ShopTheLook from "@/components/ShopTheLook";
import RecentlyViewed from "@/components/RecentlyViewed";
import EditorialBanner from "@/components/EditorialBanner";

export default function HomeContent({
  products,
  promotionPicks,
  bestSellers,
}: {
  products: Product[];
  promotionPicks: Product[];
  bestSellers: Product[];
}) {
  const { t } = useLocale();

  return (
    <>
      {/* Hero — brand/lifestyle led, with a small secondary promo line
          rather than a hero-dominating discount callout (see build spec
          Section 8: hero promo prominence). Wrapped at the same max-w-6xl
          footprint as the promo strip below it, instead of full-bleed,
          so it reads as proportional to the rest of the homepage. */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 sm:aspect-[21/9]">
          <Image
            src="/images/hero.svg"
            alt="Ishue lifestyle campaign"
            fill
            priority
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-6 pb-8 sm:p-8 sm:pb-10">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent-foreground">
              {t("hero.tag")}
            </span>
            <h1 className="text-2xl font-semibold text-white sm:text-4xl">{t("hero.headline")}</h1>
            <p className="max-w-md text-sm text-white/90 sm:text-base">{t("hero.subtext")}</p>
          </div>
        </div>
      </section>

      <EditorialBanner />

      <PromoSection />

      <ArrowSection>
        <ArrowProductRow title={t("home.currentPromotion")} viewAllHref="/category/promotion" products={promotionPicks} />
      </ArrowSection>

      <ArrowSection>
        <ArrowProductRow title={t("home.bestsellers")} viewAllHref="/category/best-sellers" products={bestSellers} />
      </ArrowSection>

      <RecentlyViewed />

      <ShopTheLook />

      <StyleSelector products={products} />

      <BrandStrip />
    </>
  );
}

function ArrowSection({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>;
}
