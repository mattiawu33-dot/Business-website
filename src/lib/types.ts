export type CategorySlug = "men" | "women" | "new" | "best-sellers" | "promotion" | "kids";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "men" | "women";
  isNew: boolean;
  isBestSeller: boolean;
  onPromotion?: boolean;
  price: number;
  currency: "EUR";
  sizes: string[];
  description: string;
  images: string[];
};

export type ComingSoonSlot = {
  comingSoon: true;
  label: string;
};
