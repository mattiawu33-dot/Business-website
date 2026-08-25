import Image from "next/image";
import { products, getPromotionPicks, getBestSellers } from "@/data/products";
import ArrowProductRow from "@/components/ArrowProductRow";
import StyleSelector from "@/components/StyleSelector";
import BrandStrip from "@/components/BrandStrip";
import PromoSection from "@/components/PromoSection";

export default function Home() {
  const promotionPicks = getPromotionPicks();
  const bestSellers = getBestSellers();

  return (
    <>
      {/* Hero — brand/lifestyle led, with a small secondary promo line
          rather than a hero-dominating discount callout (see build spec
          Section 8: hero promo prominence). */}
      <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-neutral-100">
        <Image
          src="/images/hero.svg"
          alt="Ishue lifestyle campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-6 pb-12 sm:p-10 sm:pb-16">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent-foreground">
            New season, just in
          </span>
          <h1 className="text-3xl font-semibold text-white sm:text-5xl">Style that keeps up with you</h1>
          <p className="max-w-md text-sm text-white/90 sm:text-base">
            The looks you want, at a price that lets you shop for every occasion.
          </p>
        </div>
      </section>

      <PromoSection />

      <ArrowSection>
        <ArrowProductRow title="Current promotion" viewAllHref="/category/promotion" products={promotionPicks} />
      </ArrowSection>

      <ArrowSection>
        <ArrowProductRow title="Bestsellers" viewAllHref="/category/best-sellers" products={bestSellers} />
      </ArrowSection>

      <StyleSelector products={products} />

      <BrandStrip />
    </>
  );
}

function ArrowSection({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>;
}
