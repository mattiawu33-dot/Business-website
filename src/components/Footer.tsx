import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">Shop</h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            <li><Link href="/category/men" className="hover:text-neutral-900">Men</Link></li>
            <li><Link href="/category/women" className="hover:text-neutral-900">Women</Link></li>
            <li><Link href="/category/new" className="hover:text-neutral-900">New</Link></li>
            <li><Link href="/category/best-sellers" className="hover:text-neutral-900">Best Sellers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">Help</h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            <li><Link href="/about" className="hover:text-neutral-900">About</Link></li>
            <li><span className="text-neutral-400">Shipping &amp; Returns</span></li>
            <li><span className="text-neutral-400">Size Guide</span></li>
            <li><span className="text-neutral-400">Contact</span></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">Follow</h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            <li><span className="text-neutral-400">Instagram</span></li>
            <li><span className="text-neutral-400">Pinterest</span></li>
            <li><span className="text-neutral-400">TikTok</span></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">Newsletter</h3>
          <p className="mb-3 text-sm text-neutral-600">Sign up for early access to new arrivals.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-neutral-200 px-4 py-4 text-center text-xs text-neutral-400 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Ishue. All rights reserved.
      </div>
    </footer>
  );
}
