"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { STORES } from "@/data/stores";
import Breadcrumb from "@/components/Breadcrumb";

export default function StoresContent() {
  const { t } = useLocale();
  const [selectedId, setSelectedId] = useState<string>(STORES[0].id);
  const selected = STORES.find((s) => s.id === selectedId) ?? STORES[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: t("breadcrumb.home"), href: "/" }, { label: t("stores.title") }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">{t("stores.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">{t("stores.subtext")}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-[16rem_1fr]">
        <ul className="border border-border">
          {STORES.map((store) => (
            <li key={store.id} className="border-b border-border last:border-b-0">
              <button
                type="button"
                onClick={() => setSelectedId(store.id)}
                aria-pressed={store.id === selectedId}
                className={`block w-full px-4 py-3 text-left text-sm transition ${
                  store.id === selectedId
                    ? "bg-neutral-900 font-medium text-white"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {store.name}
              </button>
            </li>
          ))}
        </ul>

        <div>
          {selected ? (
            <div className="border border-border">
              <div className="aspect-[4/3] w-full sm:aspect-[16/9]">
                <iframe
                  key={selected.id}
                  title={selected.name}
                  src={`https://maps.google.com/maps?q=${selected.lat},${selected.lng}&z=15&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <h2 className="text-base font-medium text-neutral-900">{selected.name}</h2>
                <a
                  href={selected.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-sm font-medium text-accent hover:underline"
                >
                  {t("stores.viewOnMaps")}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-neutral-300 text-sm text-neutral-400 sm:aspect-[16/9]">
              {t("stores.selectPrompt")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
