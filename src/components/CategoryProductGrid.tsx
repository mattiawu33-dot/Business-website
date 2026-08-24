"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import ComingSoonCard from "@/components/ComingSoonCard";

const PRICE_BANDS = [
  { label: "All prices", test: () => true },
  { label: "Under €75", test: (p: number) => p < 75 },
  { label: "€75 – €150", test: (p: number) => p >= 75 && p <= 150 },
  { label: "Over €150", test: (p: number) => p > 150 },
];

function styleOf(name: string) {
  const words = name.split(" ");
  return words[words.length - 1];
}

export default function CategoryProductGrid({
  products,
  comingSoonCount = 0,
}: {
  products: Product[];
  comingSoonCount?: number;
}) {
  const [size, setSize] = useState("all");
  const [style, setStyle] = useState("all");
  const [priceBand, setPriceBand] = useState(0);

  const styles = useMemo(
    () => Array.from(new Set(products.map((p) => styleOf(p.name)))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (size !== "all" && !p.sizes.includes(size)) return false;
      if (style !== "all" && styleOf(p.name) !== style) return false;
      if (!PRICE_BANDS[priceBand].test(p.price)) return false;
      return true;
    });
  }, [products, size, style, priceBand]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-y border-neutral-200 py-4">
        <span className="text-sm text-neutral-500">Filter:</span>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border border-neutral-300 bg-white px-3 py-1.5 text-sm"
          aria-label="Filter by size"
        >
          <option value="all">Size</option>
          {["XS", "S", "M", "L", "XL"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="border border-neutral-300 bg-white px-3 py-1.5 text-sm"
          aria-label="Filter by style"
        >
          <option value="all">Style</option>
          {styles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={priceBand}
          onChange={(e) => setPriceBand(Number(e.target.value))}
          className="border border-neutral-300 bg-white px-3 py-1.5 text-sm"
          aria-label="Filter by price"
        >
          {PRICE_BANDS.map((band, i) => (
            <option key={band.label} value={i}>
              {band.label}
            </option>
          ))}
        </select>
        <span className="ml-auto text-sm text-neutral-500">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {filtered.length === 0 && comingSoonCount === 0 ? (
        <p className="py-16 text-center text-sm text-neutral-500">No items match those filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-8 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
          {Array.from({ length: comingSoonCount }).map((_, i) => (
            <ComingSoonCard key={`coming-soon-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
