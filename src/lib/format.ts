import type { Locale } from "@/lib/i18n/dictionary";

export function formatPrice(amount: number, currency: string = "EUR", locale: Locale = "en") {
  const intlLocale = locale === "it" ? "it-IT" : "en-IE";
  return new Intl.NumberFormat(intlLocale, { style: "currency", currency }).format(amount);
}
