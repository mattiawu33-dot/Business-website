"use client";

import { useLocale } from "@/context/LocaleContext";
import { translateTag, type Locale } from "@/lib/i18n/dictionary";

const SIZES = ["XS", "S", "M", "L", "XL"];

export type PriceBand = { labelKey: "filters.priceAll" | "filters.priceUnder75" | "filters.price75to150" | "filters.priceOver150"; test: (p: number) => boolean };

export const PRICE_BANDS: PriceBand[] = [
  { labelKey: "filters.priceAll", test: () => true },
  { labelKey: "filters.priceUnder75", test: (p) => p < 75 },
  { labelKey: "filters.price75to150", test: (p) => p >= 75 && p <= 150 },
  { labelKey: "filters.priceOver150", test: (p) => p > 150 },
];

export const COLOR_SWATCHES: Record<string, string> = {
  Black: "#111111",
  Blue: "#2563eb",
  Brown: "#7b4b2a",
  Green: "#16a34a",
  Gray: "#6b7280",
  Multicolor: "conic-gradient(#e8483a, #ffc845, #16a34a, #2563eb, #9333ea, #e8483a)",
  Orange: "#f97316",
  Pink: "#ec4899",
  Purple: "#9333ea",
  Red: "#dc2626",
  White: "#ffffff",
  Yellow: "#facc15",
};

function ExpandIcon() {
  return (
    <span className="ml-auto text-neutral-400">
      <span className="hidden group-open:inline">−</span>
      <span className="inline group-open:hidden">+</span>
    </span>
  );
}

function FilterDetails({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-border pb-4">
      <summary className="flex cursor-pointer list-none items-center text-sm font-medium text-neutral-900">
        {title}
        <ExpandIcon />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function RadioGroup({
  title,
  allLabel,
  options,
  value,
  onChange,
  swatches,
  tagKind,
  locale,
}: {
  title: string;
  allLabel: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  swatches?: Record<string, string>;
  tagKind?: "style" | "color" | "fit" | "feature";
  locale: Locale;
}) {
  if (options.length === 0) return null;
  return (
    <FilterDetails title={title}>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="radio"
            name={title}
            checked={value === "all"}
            onChange={() => onChange("all")}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          {allLabel}
        </label>
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="radio"
              name={title}
              checked={value === o}
              onChange={() => onChange(o)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            {swatches && (
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-border"
                style={{ background: swatches[o] }}
                aria-hidden
              />
            )}
            {tagKind ? translateTag(tagKind, o, locale) : o}
          </label>
        ))}
      </div>
    </FilterDetails>
  );
}

export default function CategorySidebarFilters({
  styles,
  size,
  setSize,
  style,
  setStyle,
  priceBand,
  setPriceBand,
  colors,
  color,
  setColor,
  fits,
  fit,
  setFit,
  features,
  feature,
  setFeature,
  promoOnly,
  setPromoOnly,
  showPromoToggle,
  hasActiveFilters,
  onClearAll,
}: {
  styles: string[];
  size: string;
  setSize: (v: string) => void;
  style: string;
  setStyle: (v: string) => void;
  priceBand: number;
  setPriceBand: (v: number) => void;
  colors: string[];
  color: string;
  setColor: (v: string) => void;
  fits: string[];
  fit: string;
  setFit: (v: string) => void;
  features: string[];
  feature: string;
  setFeature: (v: string) => void;
  promoOnly: boolean;
  setPromoOnly: (v: boolean) => void;
  showPromoToggle: boolean;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}) {
  const { locale, t } = useLocale();

  return (
    <div className="flex flex-col gap-6 [&>details:last-of-type]:border-b-0 [&>details:last-of-type]:pb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">{t("filters.title")}</h2>
        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className="text-xs underline underline-offset-2 text-accent disabled:text-muted disabled:no-underline"
        >
          {t("filters.clearAll")}
        </button>
      </div>

      {showPromoToggle && (
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={promoOnly}
            onChange={(e) => setPromoOnly(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          {t("filters.promoOnly")}
        </label>
      )}

      <FilterDetails title={t("filters.price")}>
        <div className="flex flex-col gap-2">
          {PRICE_BANDS.map((band, i) => (
            <label key={band.labelKey} className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="radio"
                name="price-band"
                checked={priceBand === i}
                onChange={() => setPriceBand(i)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              {t(band.labelKey)}
            </label>
          ))}
        </div>
      </FilterDetails>

      <RadioGroup
        title={t("filters.type")}
        allLabel={t("filters.typeAll")}
        options={styles}
        value={style}
        onChange={setStyle}
        tagKind="style"
        locale={locale}
      />
      <RadioGroup
        title={t("filters.color")}
        allLabel={t("filters.colorAll")}
        options={colors}
        value={color}
        onChange={setColor}
        swatches={COLOR_SWATCHES}
        tagKind="color"
        locale={locale}
      />
      {fits.length > 1 && (
        <RadioGroup
          title={t("filters.fit")}
          allLabel={t("filters.fitAll")}
          options={fits}
          value={fit}
          onChange={setFit}
          tagKind="fit"
          locale={locale}
        />
      )}
      <RadioGroup
        title={t("filters.features")}
        allLabel={t("filters.featuresAll")}
        options={features}
        value={feature}
        onChange={setFeature}
        tagKind="feature"
        locale={locale}
      />

      <FilterDetails title={t("filters.size")}>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSize("all")}
            aria-pressed={size === "all"}
            className={`rounded-md border px-3 py-1.5 text-xs ${
              size === "all" ? "border-accent bg-accent text-accent-foreground" : "border-border text-neutral-700"
            }`}
          >
            {t("filters.sizeAll")}
          </button>
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`rounded-md border px-3 py-1.5 text-xs ${
                size === s ? "border-accent bg-accent text-accent-foreground" : "border-border text-neutral-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterDetails>
    </div>
  );
}
