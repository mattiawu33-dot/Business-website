import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import Breadcrumb from "@/components/Breadcrumb";
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: category.label }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">{category.label}</h1>
      <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
      <Suspense fallback={null}>
        <CategoryProductGrid products={products} comingSoonCount={comingSoonCount} slug={slug} />
      </Suspense>
    </div>
  );
}
