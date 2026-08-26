import type { Product } from "@/lib/types";

// Color/Fit/Features have no structured field in the catalog, so they're
// derived from the real product name + description text (same spirit as
// styleOf in style.ts) rather than invented — a product only gets a tag if
// the word genuinely appears in its own copy.
const COLOR_WORDS = [
  "black", "white", "ivory", "cream", "khaki", "grey", "gray", "navy", "olive", "rust",
  "blush", "lavender", "burgundy", "brown", "tan", "beige", "pink", "red", "green", "blue",
  "purple", "yellow", "orange", "gold", "silver", "charcoal", "wine", "mustard",
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
  const hit = COLOR_WORDS.find((c) => t.includes(c));
  return hit ? capitalize(hit) : null;
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
