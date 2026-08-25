"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { ChevronRightIcon } from "@/components/icons";

export default function ArrowProductRow({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref?: string;
  products: Product[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-neutral-900">{title}</h2>
        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link href={viewAllHref} className="text-sm text-neutral-500 hover:text-accent">
              View all
            </Link>
          )}
          <div className="hidden items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={`Scroll ${title} left`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-accent hover:text-accent"
            >
              <ChevronRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={`Scroll ${title} right`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-accent hover:text-accent"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {products.map((product, i) => (
          <div key={product.id} className="w-[45vw] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)]">
            <ProductCard product={product} priority={i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}
