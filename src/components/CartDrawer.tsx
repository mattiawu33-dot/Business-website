"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, removeLine, subtotal } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/30 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-base font-medium">Your Bag ({lines.reduce((n, l) => n + l.qty, 0)})</h2>
          <button type="button" onClick={close} aria-label="Close cart" className="text-neutral-500">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-neutral-500">Your bag is empty.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {lines.map((line) => {
                const product = getProduct(line.productId);
                if (!product) return null;
                return (
                  <li key={`${line.productId}-${line.size}`} className="flex gap-4">
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-neutral-100">
                      <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${product.slug}`} onClick={close} className="text-sm text-neutral-800">
                          {product.name}
                        </Link>
                        <span className="text-sm text-neutral-800">
                          {formatPrice(product.price * line.qty, product.currency)}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500">Size {line.size}</span>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.size, line.qty - 1)}
                            className="p-1.5 text-neutral-600"
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.size, line.qty + 1)}
                            className="p-1.5 text-neutral-600"
                            aria-label="Increase quantity"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.productId, line.size)}
                          className="text-xs text-neutral-500 underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-neutral-200 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/cart"
              onClick={close}
              className="block w-full bg-neutral-900 py-3 text-center text-sm text-white transition hover:bg-neutral-700"
            >
              View bag & checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
