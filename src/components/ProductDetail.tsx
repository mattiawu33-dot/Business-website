"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { HeartIcon } from "@/components/icons";
import ContactButton from "@/components/ContactButton";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
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
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* Gallery */}
      <div>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-100">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={t("pdp.showImage", { n: i + 1 })}
                aria-current={activeImage === i}
                className={`relative aspect-[2/3] w-16 overflow-hidden bg-neutral-100 ring-1 ${
                  activeImage === i ? "ring-neutral-900" : "ring-transparent"
                }`}
              >
                <Image src={img} alt="" fill sizes="64px" className="object-cover" />
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
            className="shrink-0 text-neutral-700"
          >
            <HeartIcon filled={favorited} className="h-6 w-6" />
          </button>
        </div>
        <p className="mt-2 text-lg text-muted">{formatPrice(product.price, product.currency, locale)}</p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">{t("pdp.size")}</span>
            <span className="text-xs text-neutral-400">{t("pdp.sizeGuide")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`h-11 min-w-11 rounded-md border px-3 text-sm transition ${
                  size === s
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-neutral-800 hover:border-accent"
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
    </div>
  );
}
