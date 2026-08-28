"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { getProduct } from "@/data/products";
import ArrowProductRow from "@/components/ArrowProductRow";

/**
 * Client-only, localStorage-backed — renders nothing on the server and on
 * a first visit, then fills in once a visitor has actually opened a few
 * product pages. Excludes the product currently being viewed, if any.
 */
export default function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const { t } = useLocale();
  const { recentlyViewed } = useRecentlyViewed();

  const products = useMemo(
    () =>
      recentlyViewed
        .filter((slug) => slug !== excludeSlug)
        .map((slug) => getProduct(slug))
        .filter((p): p is NonNullable<typeof p> => !!p),
    [recentlyViewed, excludeSlug]
  );

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <ArrowProductRow title={t("home.recentlyViewed")} products={products} />
    </section>
  );
}
