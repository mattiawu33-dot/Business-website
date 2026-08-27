"use client";

import { useLocale } from "@/context/LocaleContext";

/**
 * "How to get this" prompt for the browse-only site (Round 8). The real
 * contact channel (Instagram DM / WhatsApp / phone / in-store only) hasn't
 * been decided yet, so this is a single reusable, honestly-placeholder
 * button — swapping CONTACT_HREF below is the only change needed once the
 * real channel is confirmed. The label is translated; the link itself
 * isn't locale-specific.
 */
const CONTACT_HREF = "https://instagram.com/ishue";

export default function ContactButton() {
  const { t } = useLocale();
  return (
    <a
      href={CONTACT_HREF}
      target="_blank"
      rel="noreferrer"
      className="mt-6 flex w-full items-center justify-center rounded-md bg-accent py-3.5 text-sm font-medium text-accent-foreground transition hover:brightness-95"
    >
      {t("pdp.contactButton")}
    </a>
  );
}
