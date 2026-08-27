"use client";

import { useLocale } from "@/context/LocaleContext";
import { categoryLabelKey, categoryDescriptionKey } from "@/data/categories";
import Breadcrumb from "@/components/Breadcrumb";
import type { CategorySlug } from "@/lib/types";

export default function CategoryHeader({ slug }: { slug: CategorySlug }) {
  const { t } = useLocale();
  const label = t(categoryLabelKey(slug));

  return (
    <>
      <Breadcrumb items={[{ label: t("breadcrumb.home"), href: "/" }, { label }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">{label}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t(categoryDescriptionKey(slug))}</p>
    </>
  );
}
