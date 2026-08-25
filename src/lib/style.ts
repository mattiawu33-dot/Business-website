// Derives a filterable "style" label from a product name (e.g. "Jeans", "Dress")
// so nav subsections and filter dropdowns stay driven by real catalog data
// instead of a hand-maintained, easily-stale category list.
export function styleOf(name: string) {
  const words = name.split(" ");
  return words[words.length - 1];
}
