"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { products } from "@/data/products";
import { styleOf } from "@/lib/style";
import { translateTag, type DictKey } from "@/lib/i18n/dictionary";
import SearchOverlay from "@/components/SearchOverlay";
import LanguageToggle from "@/components/LanguageToggle";
import { CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";

type NavLink = {
  labelKey: DictKey;
  href: string;
  subsections?: { style: string; href: string }[];
};

function subsectionsFor(category: "men" | "women") {
  const names = products.filter((p) => p.category === category).map((p) => styleOf(p.name));
  return Array.from(new Set(names))
    .sort()
    .map((style) => ({
      style,
      href: `/category/${category}?style=${encodeURIComponent(style)}`,
    }));
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { email, isLoggedIn, logout, promptLogin } = useAuth();
  const { locale, t } = useLocale();

  const navLinks: NavLink[] = useMemo(
    () => [
      { labelKey: "nav.men", href: "/category/men", subsections: subsectionsFor("men") },
      { labelKey: "nav.women", href: "/category/women", subsections: subsectionsFor("women") },
      { labelKey: "nav.promotion", href: "/category/promotion" },
      { labelKey: "nav.kids", href: "/category/kids" },
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
              aria-label={mobileMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
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
                placeholder={t("header.searchPlaceholder")}
                aria-label={t("header.searchPlaceholder")}
                className="w-40 rounded-full border border-border bg-neutral-50 py-2 pl-9 pr-3 text-sm text-neutral-800 transition focus:w-56 focus:border-accent focus:outline-none lg:w-56"
              />
            </form>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t("search.title")}
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
                  {t(link.labelKey)}
                </Link>
                {link.subsections && link.subsections.length > 0 && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition delay-150 group-hover:visible group-hover:opacity-100 group-hover:delay-0 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-border bg-white p-5 shadow-lg">
                      <Link
                        href={link.href}
                        className="mb-3 block text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:text-accent"
                      >
                        {t("header.shopAll", { category: t(link.labelKey) })}
                      </Link>
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted">
                        {t("header.shopByStyle")}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {link.subsections.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="py-1 text-sm text-neutral-600 transition hover:text-accent"
                          >
                            {translateTag("style", s.style, locale)}
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
            <LanguageToggle />
            <div className="relative">
              <button
                type="button"
                onClick={() => (isLoggedIn ? setAccountMenuOpen((v) => !v) : promptLogin())}
                aria-label={isLoggedIn ? t("header.accountMenu") : t("header.logIn")}
                aria-expanded={isLoggedIn ? accountMenuOpen : undefined}
                className="flex items-center gap-1.5 text-neutral-700 transition hover:text-accent"
              >
                {isLoggedIn ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-medium uppercase text-white">
                    {email?.[0]}
                  </span>
                ) : (
                  <>
                    <UserIcon className="h-5 w-5" />
                    <span className="hidden text-sm md:inline">{t("header.logIn")}</span>
                  </>
                )}
              </button>
              {isLoggedIn && accountMenuOpen && (
                <div className="absolute right-0 top-full z-50 w-48 pt-2">
                  <div className="border border-border bg-white p-3 shadow-lg">
                    <p className="truncate px-1 pb-2 text-xs text-muted">{email}</p>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setAccountMenuOpen(false);
                      }}
                      className="w-full rounded px-1 py-1.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent"
                    >
                      {t("header.logOut")}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/favorites"
              aria-label={t("header.favorites")}
              className="relative text-neutral-700 transition hover:text-accent"
            >
              <HeartIcon className="h-5 w-5" />
              {isLoggedIn && favorites.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  {favorites.length}
                </span>
              )}
            </Link>
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
                      {t(link.labelKey)}
                      <span className="text-muted">{openMobileGroup === link.href ? "−" : "+"}</span>
                    </button>
                    {openMobileGroup === link.href && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-3">
                        <Link href={link.href} onClick={closeMobileMenu} className="text-sm text-accent">
                          {t("header.shopAll", { category: t(link.labelKey) })}
                        </Link>
                        {link.subsections.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={closeMobileMenu}
                            className="text-sm text-neutral-600"
                          >
                            {translateTag("style", s.style, locale)}
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
                    {t(link.labelKey)}
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
