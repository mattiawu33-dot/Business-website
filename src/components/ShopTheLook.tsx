"use client";

import Image from "next/image";
import Link from "next/link";
import { LOOKS } from "@/data/looks";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/context/LocaleContext";

/**
 * Placeholder "Shop the Look" section (Round 11) — manual pairings from the
 * existing catalog, built as a reusable layout to revisit once real outfit
 * photography is available. Each look just lists product slugs, so adding
 * real looks later is a data change, not a rebuild.
 */
export default function ShopTheLook() {
  const { locale, t } = useLocale();
  const looks = LOOKS.map((look) => ({
    ...look,
    products: look.slugs.map((slug) => getProduct(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)),
  })).filter((look) => look.products.length > 0);

  if (looks.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900">{t("shopTheLook.header")}</h2>
        <p className="mt-1 text-sm text-neutral-500">{t("shopTheLook.subtext")}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {looks.map((look) => (
          <div key={look.id} className="border border-border p-4 transition-colors hover:border-neutral-300">
            <p className="mb-3 text-sm font-medium text-neutral-900">{t(look.titleKey)}</p>
            <div className="flex gap-3">
              {look.products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group block w-1/2">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 15vw, 30vw"
                      className="product-photo object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="mt-2 block text-xs text-neutral-800 transition-colors group-hover:text-accent">{product.name}</span>
                  <span className="block text-xs text-muted">{formatPrice(product.price, product.currency, locale)}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
