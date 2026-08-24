"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { CloseIcon, SearchIcon } from "@/components/icons";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q)).slice(0, 8);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30" role="dialog" aria-modal="true" aria-label="Search">
      <div className="mx-auto max-w-2xl bg-white px-4 pt-6 shadow-lg sm:px-6">
        <div className="flex items-center gap-3 border-b border-neutral-300 pb-4">
          <SearchIcon className="h-5 w-5 text-neutral-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search products"
            className="w-full text-base outline-none placeholder:text-neutral-400"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-neutral-500">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto py-4">
          {query.trim() && results.length === 0 && (
            <p className="py-8 text-center text-sm text-neutral-500">No results for &ldquo;{query}&rdquo;.</p>
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
                    <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-800">{p.name}</span>
                    <span className="text-sm text-neutral-500">{formatPrice(p.price, p.currency)}</span>
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
