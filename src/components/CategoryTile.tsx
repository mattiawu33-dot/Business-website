import Image from "next/image";
import Link from "next/link";
import type { CategoryMeta } from "@/data/categories";

export default function CategoryTile({ category }: { category: CategoryMeta }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-neutral-100"
    >
      <Image
        src={category.tileImage}
        alt={category.label}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
      <span className="absolute bottom-4 left-4 text-base font-medium tracking-wide text-white sm:text-lg">
        {category.label}
      </span>
    </Link>
  );
}
