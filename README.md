# Ishue — Brand Website

Next.js (App Router) + TypeScript + Tailwind CSS. Built skeleton-first per
`websitebuildspec.md`: full structure, nav, and reusable templates are live.
Both the Women's and Men's lines now use real photography sourced from the
client's existing product shots.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/app` — routes: `/` (home), `/category/[slug]`, `/product/[slug]`,
  `/about`, `/favorites`, `/cart`
- `src/components` — Header (nav with Men/Women dropdown subsections + left
  search), Footer, ProductCard, CategoryProductGrid (filter bar + grid +
  coming-soon slots), ArrowProductRow (arrow-scrolled product row, used for
  Promotion/Bestsellers/Style rows), StyleSelector, ProductDetail, CartDrawer,
  SearchOverlay, BrandStrip (closing mission banner), PromoSection (secondary
  promo strip)
- `src/context` — `CartContext` / `FavoritesContext`, persisted to
  `localStorage` (no backend yet — see Phase 2 notes)
- `src/data/products.ts` — the catalog (real photography throughout: 7 Men,
  67+ Women), tagged `isNew` / `isBestSeller`. `src/data/categories.ts` drives
  nav + tiles.
- `scripts/generate-placeholder-images.mjs` — generates the consistent-style
  placeholder SVG art in `public/images` for any product still pointing at a
  `.svg` path (skips products with real `.jpg` photography). Only needed again
  if a brand-new category/product line starts without photography yet.
- `scripts/process_pdf_photos*.py` — one-off scripts used to resize/compress
  each real photo batch (sourced as PDF exports from the client, one photo per
  page, extracted at full resolution) down to web-appropriate JPEGs. Useful as
  a reference for processing the next photography batch the same way.

## Phase 1 (initial build)

- Sticky header, full nav always visible (no hamburger, desktop or mobile)
- Homepage: hero, category tiles, product carousel, brand strip, promo
  section (its own independent block), footer
- Category template: breadcrumb, filter bar (size/style/price), product
  grid, "coming soon" cards for unfilled slots
- PDP template: gallery, size selector, add-to-bag, favorite, related items

## Phase 2 (revision pass, per `websitebuildspec_1.md`)

- Nav: Men/Women/Promotion/Kids, Men/Women each with real-data-driven
  subsection dropdowns (derived from product names via `src/lib/style.ts`),
  search moved into a visible input on the left
- Homepage reordered: hero (brand-led, small promo tag, no invented
  discount %) → secondary promo strip → Current Promotion row → Bestsellers
  row → Style selector row ("styling versatility" pillar) → mission banner
- Copy rewritten off the sustainability/slow-fashion tone toward the three
  real brand pillars: styling versatility, affordable, fast
- Kids added to nav with an honest all-"coming soon" category page (no
  confirmed real inventory yet); Promotion is a curated `onPromotion` flag
  on real products, no fabricated discount percentages
- Light/energetic visual theme (accent color, bolder hero type) chosen over
  a dark/luxury direction — see Section 8 of the spec for why this was a
  flagged decision rather than a default
- Working client-side cart (drawer + `/cart` page) and favorites
  (`/favorites`), both `localStorage`-backed — checkout is intentionally a
  disabled "coming soon" state since no payment backend was in scope
- Client-side search overlay over the product catalog

## Phase 2 — filling in

1. Drop real photography into `public/images/products/<slug>/`,
   `public/images/tiles/`, `public/images/hero.svg`-equivalent, etc.,
   replacing the placeholder files 1:1 by path (see Women's line for the
   pattern — real product photos, resized to ~1100px wide JPEGs).
2. Add the remaining catalog to `src/data/products.ts` — category and PDP
   pages are data-driven, so new products need no template changes.
3. Once a category has enough real products, lower/remove its `comingSoonCount`
   in `src/app/category/[slug]/page.tsx`.

No real backend (payments, inventory, accounts) is wired up — that's a
deliberate skeleton-first boundary, not an oversight.
