import type { Product } from "@/lib/types";

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
