"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/data/products";
import { styleOf } from "@/lib/style";
import SearchOverlay from "@/components/SearchOverlay";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/icons";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
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

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setOpenMobileGroup(null);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="text-neutral-700 transition hover:text-accent md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
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
                className="w-40 rounded-full border border-border bg-neutral-50 py-2 pl-9 pr-3 text-sm text-neutral-800 transition focus:w-56 focus:border-accent focus:outline-none lg:w-56"
              />
            </form>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-neutral-700 transition hover:text-accent sm:hidden"
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
                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition delay-150 group-hover:visible group-hover:opacity-100 group-hover:delay-0 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-border bg-white p-5 shadow-lg">
                      <Link
                        href={link.href}
                        className="mb-3 block text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:text-accent"
                      >
                        Shop all {link.label}
                      </Link>
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted">
                        Shop by style
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
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

        {mobileMenuOpen && (
          <nav aria-label="Primary mobile" className="border-t border-border px-4 pb-4 md:hidden">
            {navLinks.map((link) => (
              <div key={link.href} className="border-b border-border py-1 last:border-b-0">
                {link.subsections && link.subsections.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup((g) => (g === link.href ? null : link.href))}
                      aria-expanded={openMobileGroup === link.href}
                      className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-neutral-900"
                    >
                      {link.label}
                      <span className="text-muted">{openMobileGroup === link.href ? "−" : "+"}</span>
                    </button>
                    {openMobileGroup === link.href && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-3">
                        <Link href={link.href} onClick={closeMobileMenu} className="text-sm text-accent">
                          Shop all {link.label}
                        </Link>
                        {link.subsections.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={closeMobileMenu}
                            className="text-sm text-neutral-600"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm font-medium text-neutral-900"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
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
