"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { HeartIcon } from "@/components/icons";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLoggedIn, promptLogin } = useAuth();
  const { locale, t } = useLocale();
  const favorited = isFavorite(product.slug);

  function handleFavoriteClick() {
    if (!isLoggedIn) {
      promptLogin();
      return;
    }
    toggleFavorite(product.slug);
  }

  return (
    <div className="group relative flex w-full flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="product-photo object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
          {/* Quick view: on hover, crossfade to the second photo (if any)
              and reveal a size preview — a peek at the product without
              leaving the grid. Purely informational (pointer-events-none)
              so it can never intercept the click — the card's default click
              behavior is always full navigation to the PDP, on every input
              type; hover is the only thing that reveals this overlay, and
              hover doesn't stick on touch, so it degrades to a plain tap
              through to the PDP there too. */}
          {product.images.length > 1 && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
              className="product-photo pointer-events-none object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-2.5 py-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="mb-1 text-[10px] uppercase tracking-wide text-muted">{t("pdp.size")}</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((s) => (
                <span key={s} className="rounded border border-border px-1.5 py-0.5 text-[10px] text-neutral-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
          {(product.isNew || product.isBestSeller || product.isBackInStock) && (
            <span
              className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
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
        </div>
      </Link>
      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-pressed={favorited}
        aria-label={t(favorited ? "fav.removeCard" : "fav.addCard", { name: product.name })}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-all hover:scale-110 hover:bg-white active:scale-95"
      >
        <HeartIcon filled={favorited} className="h-4 w-4 transition-colors" />
      </button>
      <Link href={`/product/${product.slug}`} className="mt-3 flex flex-col gap-0.5">
        <span className="text-sm text-neutral-800 transition-colors group-hover:text-accent">{product.name}</span>
        <span className="text-sm text-muted">{formatPrice(product.price, product.currency, locale)}</span>
      </Link>
    </div>
  );
}
