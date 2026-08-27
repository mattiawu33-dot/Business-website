import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import CategoryHeader from "@/components/CategoryHeader";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  // Kids has no confirmed real inventory yet (see build spec Section 8) — show
  // an honest, fully "coming soon" grid rather than fabricating products.
  const comingSoonCount =
    slug === "kids" ? 8 : products.length < 6 ? 6 - products.length : slug === "promotion" ? 0 : 2;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <CategoryHeader slug={category.slug} />
      <Suspense fallback={null}>
        <CategoryProductGrid products={products} comingSoonCount={comingSoonCount} slug={slug} />
      </Suspense>
    </div>
  );
}
