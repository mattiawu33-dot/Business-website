import type { CategorySlug } from "@/lib/types";
import type { DictKey } from "@/lib/i18n/dictionary";

const NAV_KEY: Record<CategorySlug, DictKey> = {
  men: "nav.men",
  women: "nav.women",
  promotion: "nav.promotion",
  kids: "nav.kids",
  new: "nav.new",
  "best-sellers": "nav.bestSellers",
};

const DESC_KEY: Record<CategorySlug, DictKey> = {
  men: "category.men.desc",
  women: "category.women.desc",
  promotion: "category.promotion.desc",
  kids: "category.kids.desc",
  new: "category.new.desc",
  "best-sellers": "category.bestSellers.desc",
};

export function categoryLabelKey(slug: CategorySlug): DictKey {
  return NAV_KEY[slug];
}

export function categoryDescriptionKey(slug: CategorySlug): DictKey {
  return DESC_KEY[slug];
}

export type CategoryMeta = {
  slug: CategorySlug;
  label: string;
  tileImage: string;
  description: string;
};

export const categories: CategoryMeta[] = [
  {
    slug: "men",
    label: "Men",
    tileImage: "/images/tiles/men.svg",
    description: "Fast-turnover styles for everyday wear, priced to keep up with your rotation.",
  },
  {
    slug: "women",
    label: "Women",
    tileImage: "/images/tiles/women.svg",
    description: "A wide range of styles for every occasion, at a price that lets you shop often.",
  },
  {
    slug: "promotion",
    label: "Promotion",
    tileImage: "/images/tiles/new.svg",
    description: "This season's picks, marked down. Updated as promotions change.",
  },
  {
    slug: "kids",
    label: "Kids",
    tileImage: "/images/tiles/best-sellers.svg",
    description: "Coming soon — the kids line is on its way.",
  },
  {
    slug: "new",
    label: "New",
    tileImage: "/images/tiles/new.svg",
    description: "The latest arrivals, in one place.",
  },
  {
    slug: "best-sellers",
    label: "Best Sellers",
    tileImage: "/images/tiles/best-sellers.svg",
    description: "What keeps selling out.",
  },
];

export function getCategory(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
