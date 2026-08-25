import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ishue",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 md:w-1/2">
        <Image
          src="/images/about.svg"
          alt="Inside the Ishue studio"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-medium text-neutral-900">Our approach</h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          Ishue makes clothing meant to be worn often, not just bought once. We work with natural fabrics —
          cotton, linen, wool, and cashmere blends — chosen for how they age, not just how they photograph.
        </p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          Every piece is cut from a small set of shapes we keep returning to and refining, rather than chasing a
          new silhouette every season. The result is a wardrobe that holds together, piece to piece, year to year.
        </p>
      </div>
    </div>
  );
}
