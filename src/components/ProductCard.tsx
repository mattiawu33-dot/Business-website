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
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
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
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition hover:bg-white"
      >
        <HeartIcon filled={favorited} className="h-4 w-4" />
      </button>
      <Link href={`/product/${product.slug}`} className="mt-3 flex flex-col gap-0.5">
        <span className="text-sm text-neutral-800">{product.name}</span>
        <span className="text-sm text-muted">{formatPrice(product.price, product.currency, locale)}</span>
      </Link>
    </div>
  );
}
