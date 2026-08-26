"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { getProduct } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { isLoggedIn, promptLogin } = useAuth();
  const products = favorites.map((slug) => getProduct(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Favorites" }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">Favorites</h1>

      {!isLoggedIn ? (
        <div className="py-16 text-center">
          <p className="text-sm text-neutral-500">Log in to see the items you&apos;ve saved.</p>
          <button
            type="button"
            onClick={promptLogin}
            className="mt-4 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:brightness-95"
          >
            Log in
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-neutral-500">You haven&apos;t saved anything yet.</p>
          <Link href="/" className="mt-4 inline-block text-sm text-neutral-900 underline underline-offset-2">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
