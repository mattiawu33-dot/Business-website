import type { Product } from "@/lib/types";
import { styleOf } from "@/lib/style";

// Fit/Features/Color have no structured field in the catalog, so they're
// derived from the real product name + description text (same spirit as
// styleOf in style.ts) rather than invented — a product only gets a tag if
// the word genuinely appears in its own copy. Color is further bucketed
// into a small set of standard, instantly-recognizable names (rather than
// exposing raw descriptive words like "blush" or "ivory" directly) so the
// filter reads as plain colors, not designer-tone jargon.
const COLOR_BUCKETS: Record<string, string> = {
  black: "Black",
  white: "White",
  ivory: "White",
  cream: "White",
  khaki: "Brown",
  tan: "Brown",
  beige: "Brown",
  brown: "Brown",
  navy: "Blue",
  blue: "Blue",
  olive: "Green",
  green: "Green",
  grey: "Gray",
  gray: "Gray",
  charcoal: "Gray",
  silver: "Gray",
  rust: "Orange",
  orange: "Orange",
  blush: "Pink",
  pink: "Pink",
  lavender: "Purple",
  purple: "Purple",
  burgundy: "Red",
  wine: "Red",
  red: "Red",
  gold: "Yellow",
  mustard: "Yellow",
  yellow: "Yellow",
};
// Pattern words imply more than one color at once, so they take priority
// over any single color word also present in the same text.
const PATTERN_WORDS = [
  "polka dot", "floral", "tie-dye", "leopard print", "chevron knit", "striped", "colorblock", "abstract print", "plaid",
];

const FIT_OVERSIZED_WORDS = ["oversized", "baggy", "loose", "relaxed", "slouchy", "wide-leg", "wide leg"];
const FIT_SLIM_WORDS = ["slim", "skinny", "fitted", "bodycon", "cropped", "corset", "tailored", "bustier"];
const FEATURE_WORDS = [
  "rhinestone", "sequin", "beaded", "embroidered", "polka dot", "floral", "tie-dye", "leopard print",
  "chevron knit", "pleated", "ruffle", "drawstring", "linen", "denim", "silk", "lace", "mesh",
  "applique", "striped", "colorblock", "cutout", "halter", "strapless", "off-shoulder", "puff sleeve",
];

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

function textOf(p: Product) {
  return `${p.name} ${p.description ?? ""}`.toLowerCase();
}

export function colorOf(p: Product): string | null {
  const t = textOf(p);
  if (PATTERN_WORDS.some((w) => t.includes(w))) return "Multicolor";
  const hit = Object.keys(COLOR_BUCKETS).find((word) => t.includes(word));
  return hit ? COLOR_BUCKETS[hit] : null;
}

export function fitOf(p: Product): string {
  const t = textOf(p);
  if (FIT_OVERSIZED_WORDS.some((w) => t.includes(w))) return "Oversized";
  if (FIT_SLIM_WORDS.some((w) => t.includes(w))) return "Slim / Fitted";
  return "Regular";
}

export function featuresOf(p: Product): string[] {
  const t = textOf(p);
  return FEATURE_WORDS.filter((w) => t.includes(w)).map(capitalize);
}

// Vibe/occasion tags (Round 11) — a lightweight, intentionally imprecise
// browsing shortcut, distinct from the detailed sidebar filters above. Like
// color/fit/features, tags are derived from the product's own name/style
// rather than invented per-product; "Everyday" is a broader catch for
// otherwise-untagged basic styles so the shortcut stays useful without
// fabricating occasion data that doesn't exist in the catalog.
const GOING_OUT_WORDS = [
  "halter", "strapless", "off-shoulder", "bodycon", "cutout", "corset", "bustier", "mini", "sequin", "rhinestone", "slip dress",
];
const STATEMENT_WORDS = [
  "rhinestone", "sequin", "leopard print", "applique", "embroidered", "colorblock", "chevron knit", "beaded", "tie-dye",
];
const LAYERING_WORDS = ["blazer", "kimono", "cami", "vest", "cardigan"];
const LAYERING_STYLES = ["Blazer", "Kimono", "Cami"];
const CASUAL_WORDS = ["oversized", "baggy", "loose", "relaxed", "slouchy", "jogger", "drawstring", "denim", "tee", "linen", "track"];
const CASUAL_STYLES = ["Joggers", "Tee", "Shorts"];
const EVERYDAY_STYLES = ["Trousers", "Shirt", "Jeans", "Skirt", "Top", "Dress", "Blouse"];

export const VIBE_TAGS = ["Casual", "Everyday", "Going Out", "Statement", "Layering"] as const;
export type VibeTag = (typeof VIBE_TAGS)[number];

export function vibesOf(p: Product): VibeTag[] {
  const t = textOf(p);
  const style = styleOf(p.name);
  const tags: VibeTag[] = [];

  if (GOING_OUT_WORDS.some((w) => t.includes(w))) tags.push("Going Out");
  if (STATEMENT_WORDS.some((w) => t.includes(w))) tags.push("Statement");
  if (LAYERING_WORDS.some((w) => t.includes(w)) || LAYERING_STYLES.includes(style)) tags.push("Layering");
  if (CASUAL_WORDS.some((w) => t.includes(w)) || CASUAL_STYLES.includes(style)) tags.push("Casual");
  if (tags.length === 0 && EVERYDAY_STYLES.includes(style)) tags.push("Everyday");

  return tags;
}
