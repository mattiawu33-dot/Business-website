"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import Breadcrumb from "@/components/Breadcrumb";
import { MinusIcon, PlusIcon } from "@/components/icons";

export default function CartPage() {
  const { lines, setQty, removeLine, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Bag" }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">Your Bag</h1>

      {lines.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-neutral-500">Your bag is empty.</p>
          <Link href="/" className="mt-4 inline-block text-sm text-neutral-900 underline underline-offset-2">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <ul className="flex flex-col gap-6 lg:col-span-2">
            {lines.map((line) => {
              const product = getProduct(line.productId);
              if (!product) return null;
              return (
                <li key={`${line.productId}-${line.size}`} className="flex gap-4 border-b border-neutral-200 pb-6">
                  <div className="relative h-36 w-28 shrink-0 overflow-hidden bg-neutral-100">
                    <Image src={product.images[0]} alt={product.name} fill sizes="112px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${product.slug}`} className="text-sm text-neutral-900">
                          {product.name}
                        </Link>
                        <span className="text-sm text-neutral-900">
                          {formatPrice(product.price * line.qty, product.currency)}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500">Size {line.size}</span>
                    </div>
                    <div className="flex items-center gap-3">
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

          <div className="h-fit border border-neutral-200 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">Shipping and taxes calculated at checkout.</p>
            <button
              type="button"
              disabled
              title="Checkout is coming soon"
              className="mt-6 w-full cursor-not-allowed bg-neutral-300 py-3.5 text-sm font-medium text-neutral-500"
            >
              Checkout — coming soon
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
