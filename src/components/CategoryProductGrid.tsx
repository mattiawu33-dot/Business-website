"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import { styleOf } from "@/lib/style";
import { colorOf, fitOf, featuresOf, vibesOf, type VibeTag } from "@/lib/tags";
import { useLocale } from "@/context/LocaleContext";
import type { DictKey } from "@/lib/i18n/dictionary";
import ProductCard from "@/components/ProductCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import CategorySidebarFilters, { PRICE_BANDS } from "@/components/CategorySidebarFilters";
import VibeFilterPills from "@/components/VibeFilterPills";
import { CloseIcon } from "@/components/icons";

const PAGE_SIZE = 12;

const SORTS: { value: string; labelKey: DictKey }[] = [
  { value: "featured", labelKey: "grid.sortFeatured" },
  { value: "newest", labelKey: "grid.sortNewest" },
  { value: "price-asc", labelKey: "grid.sortPriceAsc" },
  { value: "price-desc", labelKey: "grid.sortPriceDesc" },
];

export default function CategoryProductGrid({
  products,
  comingSoonCount = 0,
  slug,
}: {
  products: Product[];
  comingSoonCount?: number;
  slug?: string;
}) {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get("style");
  const { t } = useLocale();

  const [size, setSize] = useState("all");
  const [style, setStyle] = useState(styleParam ?? "all");
  const [priceBand, setPriceBand] = useState(0);
  const [color, setColor] = useState("all");
  const [fit, setFit] = useState("all");
  const [feature, setFeature] = useState("all");
  const [vibe, setVibe] = useState("all");
  const [promoOnly, setPromoOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const styles = useMemo(
    () => Array.from(new Set(products.map((p) => styleOf(p.name)))).sort(),
    [products]
  );
  const colors = useMemo(
    () => Array.from(new Set(products.map(colorOf).filter((c): c is string => !!c))).sort(),
    [products]
  );
  const fits = useMemo(() => Array.from(new Set(products.map(fitOf))).sort(), [products]);
  const features = useMemo(
    () => Array.from(new Set(products.flatMap(featuresOf))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (size !== "all" && !p.sizes.includes(size)) return false;
      if (style !== "all" && styleOf(p.name) !== style) return false;
      if (color !== "all" && colorOf(p) !== color) return false;
      if (fit !== "all" && fitOf(p) !== fit) return false;
      if (feature !== "all" && !featuresOf(p).includes(feature)) return false;
      if (vibe !== "all" && !vibesOf(p).includes(vibe as VibeTag)) return false;
      if (promoOnly && !p.onPromotion) return false;
      if (!PRICE_BANDS[priceBand].test(p.price)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "newest") sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return sorted;
  }, [products, size, style, color, fit, feature, vibe, promoOnly, priceBand, sort]);

  const filterKey = `${size}|${style}|${color}|${fit}|${feature}|${vibe}|${promoOnly}|${priceBand}|${sort}`;

  const hasActiveFilters =
    size !== "all" ||
    style !== "all" ||
    color !== "all" ||
    fit !== "all" ||
    feature !== "all" ||
    promoOnly ||
    priceBand !== 0;
  function clearAll() {
    setSize("all");
    setStyle("all");
    setColor("all");
    setFit("all");
    setFeature("all");
    setPromoOnly(false);
    setPriceBand(0);
  }

  const sidebarProps = {
    styles,
    size,
    setSize,
    style,
    setStyle,
    priceBand,
    setPriceBand,
    colors,
    color,
    setColor,
    fits,
    fit,
    setFit,
    features,
    feature,
    setFeature,
    promoOnly,
    setPromoOnly,
    showPromoToggle: slug !== "promotion",
    hasActiveFilters,
    onClearAll: clearAll,
  };

  return (
    <div className="grid grid-cols-1 gap-8 py-6 lg:grid-cols-[220px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <CategorySidebarFilters {...sidebarProps} />
      </aside>

      {/* Mobile filters trigger + drawer */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-accent hover:text-accent"
        >
          {t("filters.mobileButton")}{hasActiveFilters ? " •" : ""}
        </button>
      </div>
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={t("filters.mobileClose")}
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/30"
          />
          <div className="absolute inset-y-0 left-0 w-[85vw] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                {t("filters.title")}
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label={t("filters.mobileClose")}
                className="text-neutral-600"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <CategorySidebarFilters {...sidebarProps} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-medium text-accent-foreground transition hover:brightness-95"
            >
              {t("filters.showItems", {
                count: filtered.length,
                item: t(filtered.length === 1 ? "grid.itemSingular" : "grid.itemPlural"),
              })}
            </button>
          </div>
        </div>
      )}

      <div>
        <VibeFilterPills vibe={vibe} setVibe={setVibe} />
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <span className="text-sm text-muted">
            {t("grid.itemCount", {
              count: filtered.length,
              item: t(filtered.length === 1 ? "grid.itemSingular" : "grid.itemPlural"),
            })}
          </span>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <span className="text-muted">{t("grid.sortBy")}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-border bg-white px-3 py-1.5 text-sm transition-colors hover:border-accent"
              aria-label={t("grid.sortBy")}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {t(s.labelKey)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 && comingSoonCount === 0 ? (
          <p className="py-16 text-center text-sm text-muted">{t("grid.noMatches")}</p>
        ) : (
          <PaginatedResults key={filterKey} products={filtered} comingSoonCount={comingSoonCount} />
        )}
      </div>
    </div>
  );
}

function PaginatedResults({
  products,
  comingSoonCount,
}: {
  products: Product[];
  comingSoonCount: number;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
        {!hasMore &&
          Array.from({ length: comingSoonCount }).map((_, i) => <ComingSoonCard key={`coming-soon-${i}`} />)}
      </div>
      {hasMore && <div ref={sentinelRef} className="h-1" aria-hidden />}
    </>
  );
}
