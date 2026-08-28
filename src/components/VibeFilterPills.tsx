"use client";

import { VIBE_TAGS, type VibeTag } from "@/lib/tags";
import { useLocale } from "@/context/LocaleContext";
import type { DictKey } from "@/lib/i18n/dictionary";

const LABEL_KEY: Record<VibeTag, DictKey> = {
  Casual: "vibe.casual",
  Everyday: "vibe.everyday",
  "Going Out": "vibe.goingOut",
  Statement: "vibe.statement",
  Layering: "vibe.layering",
};

export default function VibeFilterPills({
  vibe,
  setVibe,
}: {
  vibe: string;
  setVibe: (v: string) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {VIBE_TAGS.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => setVibe(vibe === tag ? "all" : tag)}
          aria-pressed={vibe === tag}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            vibe === tag
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-neutral-600 hover:border-accent hover:text-accent"
          }`}
        >
          {t(LABEL_KEY[tag])}
        </button>
      ))}
    </div>
  );
}
