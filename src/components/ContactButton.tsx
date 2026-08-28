"use client";

import { useLocale } from "@/context/LocaleContext";

/**
 * "How to get this" prompt for the browse-only site (Round 8). Instagram is
 * the one live channel for now (Round 11); a WhatsApp number will be added
 * as a second CONTACT_CHANNELS entry once provided — the row layout already
 * supports more than one button without restructuring.
 */
const CONTACT_CHANNELS = [
  { key: "instagram", href: "https://www.instagram.com/ishuemoda/", labelKey: "pdp.contactInstagram" as const },
];

export default function ContactButton() {
  const { t } = useLocale();
  return (
    <div className="mt-6 flex w-full flex-wrap gap-3">
      {CONTACT_CHANNELS.map((channel) => (
        <a
          key={channel.key}
          href={channel.href}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-md bg-accent py-3.5 text-sm font-medium text-accent-foreground transition hover:brightness-95"
        >
          {t(channel.labelKey)}
        </a>
      ))}
    </div>
  );
}
