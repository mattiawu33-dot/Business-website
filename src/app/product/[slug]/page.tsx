import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/data/products";
import { categories, getCategory } from "@/data/categories";
import Breadcrumb from "@/components/Breadcrumb";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const category = getCategory(product.category) ?? categories[0];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: category.label, href: `/category/${category.slug}` },
            { label: product.name },
          ]}
        />
      </div>
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-lg font-medium text-neutral-900">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
