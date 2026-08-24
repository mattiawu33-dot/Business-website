"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon } from "@/components/icons";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.slug);

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
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleFavorite(product.slug)}
        aria-pressed={favorited}
        aria-label={favorited ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition hover:bg-white"
      >
        <HeartIcon filled={favorited} className="h-4 w-4" />
      </button>
      <Link href={`/product/${product.slug}`} className="mt-3 flex flex-col gap-0.5">
        <span className="text-sm text-neutral-800">{product.name}</span>
        <span className="text-sm text-neutral-500">{formatPrice(product.price, product.currency)}</span>
      </Link>
    </div>
  );
}
