const SIZES = ["XS", "S", "M", "L", "XL"];

export type PriceBand = { label: string; test: (p: number) => boolean };

export const PRICE_BANDS: PriceBand[] = [
  { label: "All prices", test: () => true },
  { label: "Under €75", test: (p) => p < 75 },
  { label: "€75 – €150", test: (p) => p >= 75 && p <= 150 },
  { label: "Over €150", test: (p) => p > 150 },
];

function RadioGroup({
  title,
  allLabel,
  options,
  value,
  onChange,
}: {
  title: string;
  allLabel: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <details open className="border-b border-border pb-4">
      <summary className="cursor-pointer list-none text-sm font-medium text-neutral-900">{title}</summary>
      <div className="mt-3 flex flex-col gap-2">
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
            {o}
          </label>
        ))}
      </div>
    </details>
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
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">Filters</h2>
        {hasActiveFilters && (
          <button type="button" onClick={onClearAll} className="text-xs text-accent underline underline-offset-2">
            Clear all
          </button>
        )}
      </div>

      {showPromoToggle && (
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={promoOnly}
            onChange={(e) => setPromoOnly(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          Only show promotions
        </label>
      )}

      <details open className="border-b border-border pb-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-neutral-900">Price</summary>
        <div className="mt-3 flex flex-col gap-2">
          {PRICE_BANDS.map((band, i) => (
            <label key={band.label} className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="radio"
                name="price-band"
                checked={priceBand === i}
                onChange={() => setPriceBand(i)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              {band.label}
            </label>
          ))}
        </div>
      </details>

      <RadioGroup title="Type" allLabel="All types" options={styles} value={style} onChange={setStyle} />
      <RadioGroup title="Color" allLabel="All colors" options={colors} value={color} onChange={setColor} />
      {fits.length > 1 && (
        <RadioGroup title="Fit" allLabel="All fits" options={fits} value={fit} onChange={setFit} />
      )}
      <RadioGroup title="Features" allLabel="All features" options={features} value={feature} onChange={setFeature} />

      <details open className="pb-2">
        <summary className="cursor-pointer list-none text-sm font-medium text-neutral-900">Size</summary>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSize("all")}
            aria-pressed={size === "all"}
            className={`rounded-md border px-3 py-1.5 text-xs ${
              size === "all" ? "border-accent bg-accent text-accent-foreground" : "border-border text-neutral-700"
            }`}
          >
            All
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
      </details>
    </div>
  );
}
