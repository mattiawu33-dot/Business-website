"use client";

import { useLocale } from "@/context/LocaleContext";
import { STORES } from "@/data/stores";
import Breadcrumb from "@/components/Breadcrumb";

export default function StoresContent() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: t("breadcrumb.home"), href: "/" }, { label: t("stores.title") }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">{t("stores.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">{t("stores.subtext")}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STORES.map((store) => (
          <div key={store.id} className="border border-border p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">{store.region}</p>
            <h2 className="mt-1 text-lg font-medium text-neutral-900">{store.city}</h2>
            <p className="mt-2 text-sm text-neutral-700">{store.address}</p>
            <p className="mt-1 text-sm text-neutral-700">{store.phone}</p>
            <p className="mt-3 text-xs text-neutral-500">{t("stores.hoursWeekday")}</p>
            <p className="text-xs text-neutral-500">{t("stores.hoursSunday")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
