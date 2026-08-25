# Ishue — Brand Website

Next.js (App Router) + TypeScript + Tailwind CSS. Built skeleton-first per
`websitebuildspec.md`: full structure, nav, and reusable templates are live.
The Women's line (16 items) uses real photography sourced from the client's
existing product shots; Men's still uses placeholder art pending real photos.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/app` — routes: `/` (home), `/category/[slug]`, `/product/[slug]`,
  `/about`, `/favorites`, `/cart`
- `src/components` — Header, Footer, ProductCard, CategoryTile,
  CategoryProductGrid (filter bar + grid + coming-soon slots), ProductDetail,
  CartDrawer, SearchOverlay, BrandStrip, PromoSection
- `src/context` — `CartContext` / `FavoritesContext`, persisted to
  `localStorage` (no backend yet — see Phase 2 notes)
- `src/data/products.ts` — the catalog (24 items: 8 Men placeholder, 16 Women
  real photos), tagged `isNew` / `isBestSeller`. `src/data/categories.ts`
  drives nav + tiles.
- `scripts/generate-placeholder-images.mjs` — generates the consistent-style
  placeholder SVG art in `public/images` for any product still pointing at a
  `.svg` path (skips products with real `.jpg` photography). Re-run after
  adding placeholder products: `node scripts/generate-placeholder-images.mjs`
- `scripts/process_pdf_photos.py` — one-off script used to resize/compress the
  real Women's photos (sourced as a PDF export from the client, one photo per
  page, extracted at full resolution) down to web-appropriate JPEGs. Useful as
  a reference for processing the next photography batch the same way.

## Phase 1 (this build)

- Sticky header, full nav always visible (no hamburger, desktop or mobile)
- Homepage: hero, category tiles, product carousel, brand strip, promo
  section (its own independent block), footer
- Category template: breadcrumb, filter bar (size/style/price), product
  grid, "coming soon" cards for unfilled slots
- PDP template: gallery, size selector, add-to-bag, favorite, related items
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
