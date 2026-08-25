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
          Ishue is for people who want to stay current without paying premium prices for it. We carry the same
          styles and quality you&apos;d find at the bigger names, priced lower — not because it&apos;s cheap, but
          because it doesn&apos;t need to cost more.
        </p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          Our catalog spans a wide range of styles and ages, so there&apos;s something here whether you&apos;re
          dressing for a night out or a Tuesday. And because we move fast, the catalog keeps turning over — new
          styles arrive often instead of waiting on a single seasonal drop.
        </p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          Three things guide everything we make: styling versatility, affordable pricing, and speed.
        </p>
      </div>
    </div>
  );
}
