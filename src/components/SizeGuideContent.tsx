"use client";

import { useLocale } from "@/context/LocaleContext";
import Breadcrumb from "@/components/Breadcrumb";

const WOMEN_ROWS = [
  { size: "XS", eu: "36", bust: "82–85", waist: "62–65", hips: "88–91" },
  { size: "S", eu: "38", bust: "86–89", waist: "66–69", hips: "92–95" },
  { size: "M", eu: "40", bust: "90–93", waist: "70–73", hips: "96–99" },
  { size: "L", eu: "42", bust: "94–97", waist: "74–77", hips: "100–103" },
  { size: "XL", eu: "44", bust: "98–101", waist: "78–81", hips: "104–107" },
];

const MEN_ROWS = [
  { size: "S", eu: "46", chest: "88–92", waist: "76–80" },
  { size: "M", eu: "48", chest: "93–97", waist: "81–85" },
  { size: "L", eu: "50", chest: "98–102", waist: "86–90" },
  { size: "XL", eu: "52", chest: "103–107", waist: "91–95" },
];

export default function SizeGuideContent() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: t("breadcrumb.home"), href: "/" }, { label: t("sizeGuide.title") }]} />
      <h1 className="mt-3 text-2xl font-medium text-neutral-900">{t("sizeGuide.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">{t("sizeGuide.subtext")}</p>

      <h2 className="mt-10 text-lg font-medium text-neutral-900">{t("sizeGuide.womenHeader")}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-4">{t("sizeGuide.colSize")}</th>
              <th className="py-2 pr-4">{t("sizeGuide.colEu")}</th>
              <th className="py-2 pr-4">{t("sizeGuide.colBust")}</th>
              <th className="py-2 pr-4">{t("sizeGuide.colWaist")}</th>
              <th className="py-2">{t("sizeGuide.colHips")}</th>
            </tr>
          </thead>
          <tbody>
            {WOMEN_ROWS.map((row) => (
              <tr key={row.size} className="border-b border-border text-neutral-700">
                <td className="py-2 pr-4 font-medium text-neutral-900">{row.size}</td>
                <td className="py-2 pr-4">{row.eu}</td>
                <td className="py-2 pr-4">{row.bust}</td>
                <td className="py-2 pr-4">{row.waist}</td>
                <td className="py-2">{row.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-medium text-neutral-900">{t("sizeGuide.menHeader")}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-4">{t("sizeGuide.colSize")}</th>
              <th className="py-2 pr-4">{t("sizeGuide.colEu")}</th>
              <th className="py-2 pr-4">{t("sizeGuide.colChest")}</th>
              <th className="py-2">{t("sizeGuide.colWaist")}</th>
            </tr>
          </thead>
          <tbody>
            {MEN_ROWS.map((row) => (
              <tr key={row.size} className="border-b border-border text-neutral-700">
                <td className="py-2 pr-4 font-medium text-neutral-900">{row.size}</td>
                <td className="py-2 pr-4">{row.eu}</td>
                <td className="py-2 pr-4">{row.chest}</td>
                <td className="py-2">{row.waist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 max-w-2xl text-xs text-neutral-500">{t("sizeGuide.note")}</p>
    </div>
  );
}
