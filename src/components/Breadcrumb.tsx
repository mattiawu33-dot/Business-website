import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-neutral-500">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRightIcon className="h-3 w-3" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-neutral-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
