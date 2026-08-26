/**
 * "How to get this" prompt for the browse-only site (Round 8). The real
 * contact channel (Instagram DM / WhatsApp / phone / in-store only) hasn't
 * been decided yet, so this is a single reusable, honestly-placeholder
 * button — swapping CONTACT_CHANNEL below is the only change needed once
 * the real channel is confirmed.
 */
const CONTACT_CHANNEL = {
  label: "Message us to buy",
  href: "https://instagram.com/ishue",
};

export default function ContactButton() {
  return (
    <a
      href={CONTACT_CHANNEL.href}
      target="_blank"
      rel="noreferrer"
      className="mt-6 flex w-full items-center justify-center rounded-md bg-accent py-3.5 text-sm font-medium text-accent-foreground transition hover:brightness-95"
    >
      {CONTACT_CHANNEL.label}
    </a>
  );
}
