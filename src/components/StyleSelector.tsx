"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { styleOf } from "@/lib/style";
import { translateTag } from "@/lib/i18n/dictionary";
import { useLocale } from "@/context/LocaleContext";
import ArrowProductRow from "@/components/ArrowProductRow";

/**
 * The direct, visible expression of the "styling versatility" brand pillar:
 * pick a style and see the range of products that fit it, spanning both
 * the men's and women's catalog.
 */
export default function StyleSelector({ products }: { products: Product[] }) {
  const { locale, t } = useLocale();
  const styleCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const style = styleOf(p.name);
      counts.set(style, (counts.get(style) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([style]) => style);
  }, [products]);

  const [selected, setSelected] = useState(styleCounts[0] ?? "");

  const filtered = useMemo(
    () => products.filter((p) => styleOf(p.name) === selected),
    [products, selected]
  );

  if (styleCounts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900">{t("style.header")}</h2>
        <p className="mt-1 text-sm text-neutral-500">{t("style.subtext")}</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {styleCounts.map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setSelected(style)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              selected === style
                ? "border-accent bg-accent text-accent-foreground"
                : "border-neutral-300 text-neutral-700 hover:border-accent hover:text-accent"
            }`}
          >
            {translateTag("style", style, locale)}
          </button>
        ))}
      </div>
      {filtered.length > 0 && (
        <ArrowProductRow title={translateTag("style", selected, locale)} products={filtered} />
      )}
    </section>
  );
}
