"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import SearchOverlay from "@/components/SearchOverlay";
import { BagIcon, HeartIcon, SearchIcon } from "@/components/icons";

const NAV_LINKS = [
  { label: "Men", href: "/category/men" },
  { label: "Women", href: "/category/women" },
  { label: "New", href: "/category/new" },
  { label: "Best Sellers", href: "/category/best-sellers" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, open: openCart } = useCart();
  const { favorites } = useFavorites();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-wide text-neutral-900">
            ISHUE
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-700 transition hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-neutral-700 transition hover:text-neutral-900"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <Link href="/favorites" aria-label="Favorites" className="relative text-neutral-700 transition hover:text-neutral-900">
              <HeartIcon className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="relative text-neutral-700 transition hover:text-neutral-900"
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav aria-label="Primary mobile" className="flex items-center justify-center gap-6 border-t border-neutral-100 px-4 py-2.5 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs text-neutral-700">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
