"use client";

import { useLocale } from "@/context/LocaleContext";
import { categoryLabelKey } from "@/data/categories";
import Breadcrumb from "@/components/Breadcrumb";
import type { CategorySlug } from "@/lib/types";

export default function ProductBreadcrumb({
  categorySlug,
  categoryHref,
  productName,
}: {
  categorySlug: CategorySlug;
  categoryHref: string;
  productName: string;
}) {
  const { t } = useLocale();

  return (
    <Breadcrumb
      items={[
        { label: t("breadcrumb.home"), href: "/" },
        { label: t(categoryLabelKey(categorySlug)), href: categoryHref },
        { label: productName },
      ]}
    />
  );
}
