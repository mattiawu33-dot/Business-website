import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/data/products";
import { categories, getCategory } from "@/data/categories";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts";

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
        <ProductBreadcrumb
          categorySlug={category.slug}
          categoryHref={`/category/${category.slug}`}
          productName={product.name}
        />
      </div>
      <ProductDetail product={product} />

      <RelatedProducts products={related} />
    </div>
  );
}
