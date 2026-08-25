"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/data/products";
import { styleOf } from "@/lib/style";
import SearchOverlay from "@/components/SearchOverlay";
import { BagIcon, HeartIcon, SearchIcon } from "@/components/icons";

type NavLink = {
  label: string;
  href: string;
  subsections?: { label: string; href: string }[];
};

function subsectionsFor(category: "men" | "women") {
  const names = products.filter((p) => p.category === category).map((p) => styleOf(p.name));
  return Array.from(new Set(names))
    .sort()
    .map((style) => ({
      label: style,
      href: `/category/${category}?style=${encodeURIComponent(style)}`,
    }));
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count, open: openCart } = useCart();
  const { favorites } = useFavorites();

  const navLinks: NavLink[] = useMemo(
    () => [
      { label: "Men", href: "/category/men", subsections: subsectionsFor("men") },
      { label: "Women", href: "/category/women", subsections: subsectionsFor("women") },
      { label: "Promotion", href: "/category/promotion" },
      { label: "Kids", href: "/category/kids" },
    ],
    []
  );

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(true);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-semibold tracking-wide text-neutral-900">
              ISHUE
            </Link>
            <form onSubmit={submitSearch} className="relative hidden sm:block">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search products"
                aria-label="Search products"
                className="w-40 rounded-full border border-neutral-300 bg-neutral-50 py-2 pl-9 pr-3 text-sm text-neutral-800 transition focus:w-56 focus:border-neutral-500 focus:outline-none lg:w-56"
              />
            </form>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-neutral-700 transition hover:text-neutral-900 sm:hidden"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-neutral-800 transition hover:text-accent"
                >
                  {link.label}
                </Link>
                {link.subsections && link.subsections.length > 0 && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 border border-neutral-200 bg-white p-4 shadow-lg">
                      {link.subsections.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="py-1 text-sm text-neutral-600 transition hover:text-accent"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/favorites" aria-label="Favorites" className="relative text-neutral-700 transition hover:text-accent">
              <HeartIcon className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="relative text-neutral-700 transition hover:text-accent"
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav aria-label="Primary mobile" className="flex items-center justify-center gap-6 border-t border-neutral-100 px-4 py-2.5 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-medium text-neutral-700">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {searchOpen && (
        <SearchOverlay
          initialQuery={query}
          onClose={() => {
            setSearchOpen(false);
          }}
        />
      )}
    </>
  );
}
