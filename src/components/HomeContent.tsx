"use client";

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
      {/* Round 18: the hero banner was removed entirely — the editorial
          banner (formerly the second section) is now the top of the page. */}
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
