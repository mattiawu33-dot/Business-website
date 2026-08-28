"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { HeartIcon, CloseIcon, ZoomIcon } from "@/components/icons";
import ContactButton from "@/components/ContactButton";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLoggedIn, promptLogin } = useAuth();
  const { locale, t } = useLocale();
  const { addRecentlyViewed } = useRecentlyViewed();
  const favorited = isFavorite(product.slug);

  useEffect(() => {
    addRecentlyViewed(product.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  useEffect(() => {
    if (!zoomOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setZoomOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomOpen]);

  function handleFavoriteClick() {
    if (!isLoggedIn) {
      promptLogin();
      return;
    }
    toggleFavorite(product.slug);
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* Gallery */}
      <div>
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label={t("pdp.zoomOpen")}
          className="group relative aspect-[2/3] w-full cursor-zoom-in overflow-hidden bg-neutral-100"
        >
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="product-photo object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
            <ZoomIcon className="h-4 w-4" />
          </span>
        </button>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={t("pdp.showImage", { n: i + 1 })}
                aria-current={activeImage === i}
                className={`relative aspect-[2/3] w-16 shrink-0 overflow-hidden bg-neutral-100 ring-1 transition ${
                  activeImage === i ? "ring-neutral-900" : "ring-transparent hover:ring-neutral-300"
                }`}
              >
                <Image src={img} alt="" fill sizes="64px" className="product-photo object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        {(product.isNew || product.isBestSeller || product.isBackInStock) && (
          <span
            className={`mb-2 w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              product.isNew
                ? "bg-accent-secondary text-accent-secondary-foreground"
                : product.isBestSeller
                  ? "bg-accent text-accent-foreground"
                  : "bg-neutral-900 text-white"
            }`}
          >
            {product.isNew ? t("badge.new") : product.isBestSeller ? t("badge.bestSeller") : t("badge.backInStock")}
          </span>
        )}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-medium text-neutral-900">{product.name}</h1>
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-pressed={favorited}
            aria-label={t(favorited ? "fav.remove" : "fav.add")}
            className="shrink-0 text-neutral-700 transition-transform hover:scale-110 active:scale-90"
          >
            <HeartIcon filled={favorited} className="h-6 w-6 transition-colors" />
          </button>
        </div>
        <p className="mt-2 text-lg text-muted">{formatPrice(product.price, product.currency, locale)}</p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">{t("pdp.size")}</span>
            <Link href="/size-guide" className="text-xs text-neutral-500 underline-offset-2 transition hover:text-accent hover:underline">
              {t("pdp.sizeGuide")}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`h-11 min-w-11 rounded-md border px-3 text-sm transition-all ${
                  size === s
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-neutral-800 hover:border-accent hover:scale-[1.03]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ContactButton />

        <p className="mt-8 text-sm leading-relaxed text-neutral-600">{product.description}</p>
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label={t("pdp.zoomClose")}
            className="absolute right-4 top-4 text-white/90 transition hover:text-white"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
          <div
            className="relative h-full max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              sizes="90vw"
              className="product-photo object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
