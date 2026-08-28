import type { DictKey } from "@/lib/i18n/dictionary";

// Round 11 placeholder "Shop the Look" pairings — manual groupings from the
// existing catalog (no real outfit photography from Instagram yet). This is
// a working, reusable layout meant to be revisited with real pairings/
// photos later, not a final content decision.
export type Look = {
  id: string;
  titleKey: DictKey;
  slugs: string[];
};

export const LOOKS: Look[] = [
  {
    id: "casual-tee-jeans",
    titleKey: "look.casual",
    slugs: ["soy-loco-graphic-tee", "panel-seam-wide-leg-jeans"],
  },
  {
    id: "going-out-top-skirt",
    titleKey: "look.goingOut",
    slugs: ["cross-strap-fitted-top", "sequin-pocket-denim-skirt"],
  },
  {
    id: "layered-blazer-trousers",
    titleKey: "look.layered",
    slugs: ["navy-tailored-blazer", "blush-wide-leg-cargo-trousers"],
  },
];
