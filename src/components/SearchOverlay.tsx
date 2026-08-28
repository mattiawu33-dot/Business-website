"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { styleOf } from "@/lib/style";
import { translateTag } from "@/lib/i18n/dictionary";
import { useLocale } from "@/context/LocaleContext";
import { CloseIcon, SearchIcon } from "@/components/icons";

const SUGGESTED_TERMS = (() => {
  const counts = new Map<string, number>();
  for (const p of products) {
    const s = styleOf(p.name).toLowerCase();
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([s]) => s);
})();

function highlight(name: string, query: string) {
  if (!query) return name;
  const i = name.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return name;
  return (
    <>
      {name.slice(0, i)}
      <mark className="rounded-sm bg-accent-secondary text-accent-secondary-foreground">
        {name.slice(i, i + query.length)}
      </mark>
      {name.slice(i + query.length)}
    </>
  );
}

export default function SearchOverlay({
  onClose,
  initialQuery = "",
}: {
  onClose: () => void;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLocale();

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q)).slice(0, 8);
  }, [q]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-label={t("search.title")}
      onClick={onClose}
    >
      <div className="mx-auto max-w-2xl bg-white px-4 pt-6 shadow-lg sm:px-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <SearchIcon className="h-5 w-5 text-neutral-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            className="w-full text-base outline-none placeholder:text-neutral-400"
          />
          <button type="button" onClick={onClose} aria-label={t("search.closeAria")} className="text-neutral-500">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto py-4">
          {!q && (
            <div className="px-2">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                {t("search.popularSearches")}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TERMS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-neutral-700 transition hover:border-accent hover:text-accent"
                  >
                    {translateTag("style", term[0].toUpperCase() + term.slice(1), locale)}
                  </button>
                ))}
              </div>
            </div>
          )}
          {q && results.length === 0 && (
            <div className="px-2 py-8 text-center">
              <p className="text-sm text-muted">
                {t("search.noMatches", {
                  query,
                  term1: translateTag("style", SUGGESTED_TERMS[0][0].toUpperCase() + SUGGESTED_TERMS[0].slice(1), locale),
                  term2: translateTag("style", SUGGESTED_TERMS[1][0].toUpperCase() + SUGGESTED_TERMS[1].slice(1), locale),
                })}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTED_TERMS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-neutral-700 transition hover:border-accent hover:text-accent"
                  >
                    {translateTag("style", term[0].toUpperCase() + term.slice(1), locale)}
                  </button>
                ))}
              </div>
            </div>
          )}
          <ul className="flex flex-col gap-1">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded px-2 py-2 hover:bg-neutral-50"
                >
                  <div className="relative h-14 w-11 shrink-0 overflow-hidden bg-neutral-100">
                    <Image src={p.images[0]} alt="" fill sizes="44px" className="product-photo object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-800">{highlight(p.name, query.trim())}</span>
                    <span className="text-sm text-muted">{formatPrice(p.price, p.currency)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
