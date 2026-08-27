"use client";

import { useLocale } from "@/context/LocaleContext";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({ products }: { products: Product[] }) {
  const { t } = useLocale();
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-lg font-medium text-neutral-900">{t("pdp.youMightAlsoLike")}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
