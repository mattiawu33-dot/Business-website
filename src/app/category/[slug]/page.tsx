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
  // Phase 1: a handful of "coming soon" slots signal more is on the way
  // without shipping a half-broken grid.
  const comingSoonCount = products.length < 6 ? 6 - products.length : 2;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: category.label }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">{category.label}</h1>
      <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
      <CategoryProductGrid products={products} comingSoonCount={comingSoonCount} />
    </div>
  );
}
