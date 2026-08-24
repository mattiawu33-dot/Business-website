import Image from "next/image";
import Link from "next/link";

/**
 * Self-contained promotional block. Independent from the rest of the
 * homepage layout so it can be swapped, reordered, or removed without
 * touching hero/tiles/carousel/brand-strip.
 */
export default function PromoSection() {
  return (
    <section className="relative isolate mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-neutral-100">
        <Image
          src="/images/promo.svg"
          alt="Current promotion"
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 bg-black/25 px-6 sm:px-12">
          <span className="text-xs uppercase tracking-widest text-white/90">Limited time</span>
          <h2 className="max-w-md text-2xl font-medium text-white sm:text-3xl">
            Free shipping on orders over €120
          </h2>
          <Link
            href="/category/new"
            className="mt-1 border border-white px-5 py-2 text-sm text-white transition hover:bg-white hover:text-neutral-900"
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}
