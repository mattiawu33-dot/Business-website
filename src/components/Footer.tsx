"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">{t("footer.shopHeader")}</h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            <li><Link href="/category/men" className="hover:text-neutral-900">{t("nav.men")}</Link></li>
            <li><Link href="/category/women" className="hover:text-neutral-900">{t("nav.women")}</Link></li>
            <li><Link href="/category/promotion" className="hover:text-neutral-900">{t("nav.promotion")}</Link></li>
            <li><Link href="/category/kids" className="hover:text-neutral-900">{t("nav.kids")}</Link></li>
            <li><Link href="/category/new" className="hover:text-neutral-900">{t("nav.new")}</Link></li>
            <li><Link href="/category/best-sellers" className="hover:text-neutral-900">{t("nav.bestSellers")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">{t("footer.helpHeader")}</h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            <li><Link href="/about" className="hover:text-neutral-900">{t("footer.about")}</Link></li>
            <li><span className="text-neutral-400">{t("footer.shippingReturns")}</span></li>
            <li><span className="text-neutral-400">{t("footer.sizeGuide")}</span></li>
            <li><span className="text-neutral-400">{t("footer.contact")}</span></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">{t("footer.followHeader")}</h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            <li><span className="text-neutral-400">{t("footer.instagram")}</span></li>
            <li><span className="text-neutral-400">{t("footer.pinterest")}</span></li>
            <li><span className="text-neutral-400">{t("footer.tiktok")}</span></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-900">{t("footer.newsletterHeader")}</h3>
          <p className="mb-3 text-sm text-neutral-600">{t("footer.newsletterBlurb")}</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-neutral-200 px-4 py-4 text-center text-xs text-neutral-400 sm:px-6 lg:px-8">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
