import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import CategoryTile from "@/components/CategoryTile";
import ProductCard from "@/components/ProductCard";
import BrandStrip from "@/components/BrandStrip";
import PromoSection from "@/components/PromoSection";

const FEATURED_SLUGS = [
  "rhinestone-panel-wide-leg-jeans",
  "chevron-knit-halter-dress",
  "khaki-drawstring-wide-leg-trousers",
  "polka-dot-wrap-maxi-dress",
  "soy-loco-graphic-tee",
  "ivory-tailored-vest-set",
  "come-ti-soffro-graphic-tee",
  "tie-dye-slip-maxi-dress",
];

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-neutral-100">
        <Image
          src="/images/hero.svg"
          alt="Ishue lifestyle campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 bg-gradient-to-t from-black/40 via-black/0 to-transparent p-6 pb-12 sm:p-10 sm:pb-16">
          <h1 className="text-3xl font-medium text-white sm:text-5xl">Made to be worn</h1>
          <p className="max-w-md text-sm text-white/90 sm:text-base">
            Considered clothing in natural fabrics, cut for everyday life.
          </p>
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {categories.map((category) => (
          <CategoryTile key={category.slug} category={category} />
        ))}
      </section>

      {/* Product carousel */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-900">New arrivals</h2>
          <Link href="/category/new" className="text-sm text-neutral-500 hover:text-neutral-900">
            View all
          </Link>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {featured.map((product, i) => (
            <div key={product.id} className="w-[45vw] shrink-0 snap-start sm:w-auto">
              <ProductCard product={product} priority={i < 4} />
            </div>
          ))}
        </div>
      </section>

      <BrandStrip />
      <PromoSection />
    </>
  );
}
