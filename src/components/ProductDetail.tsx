"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon } from "@/components/icons";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.slug);

  const handleAddToCart = () => {
    if (!size) {
      setError(true);
      return;
    }
    addToCart(product.slug, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
                aria-label={`Show image ${i + 1}`}
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
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-medium text-neutral-900">{product.name}</h1>
          <button
            type="button"
            onClick={() => toggleFavorite(product.slug)}
            aria-pressed={favorited}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            className="shrink-0 text-neutral-700"
          >
            <HeartIcon filled={favorited} className="h-6 w-6" />
          </button>
        </div>
        <p className="mt-2 text-lg text-neutral-700">{formatPrice(product.price, product.currency)}</p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">Size</span>
            <span className="text-xs text-neutral-400">Size guide</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                aria-pressed={size === s}
                className={`h-11 min-w-11 border px-3 text-sm transition ${
                  size === s
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 text-neutral-800 hover:border-neutral-900"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="mt-2 text-xs text-red-600">Please select a size.</p>}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-6 w-full bg-neutral-900 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          {added ? "Added to bag" : "Add to bag"}
        </button>

        <p className="mt-8 text-sm leading-relaxed text-neutral-600">{product.description}</p>
      </div>
    </div>
  );
}
