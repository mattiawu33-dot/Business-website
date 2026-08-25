import type { CategorySlug } from "@/lib/types";

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
    description: "Tailored essentials and everyday staples.",
  },
  {
    slug: "women",
    label: "Women",
    tileImage: "/images/tiles/women.svg",
    description: "Considered pieces built to last a season and beyond.",
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
