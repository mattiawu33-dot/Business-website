#!/usr/bin/env node
// Generates consistent-style placeholder SVG imagery (product shots, hero,
// tiles, brand/about art) so the skeleton can be built and styled before
// real photography is dropped in. Re-run after editing src/data/products.ts
// to generate art for any newly added "coming soon" SKUs.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "..", "public", "images");

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

const PALETTES = {
  men: ["#e7e2da", "#3f3a34"],
  women: ["#f1e4e0", "#6b3f3a"],
  new: ["#e4e8e2", "#38473f"],
  "best-sellers": ["#efe6d8", "#5a4a2c"],
};

function productSvg({ label, category, seed }) {
  const [bg, fg] = PALETTES[category] || ["#f2f0ec", "#3a3a3a"];
  const h = hash(seed);
  const shoulderW = 90 + (h % 20);
  const silhouette = category === "women"
    ? `M ${180 - shoulderW / 2} 170 Q 200 140 ${180 + shoulderW / 2} 170 L 250 260 Q 260 420 235 560 L 165 560 Q 140 420 150 260 Z`
    : `M ${180 - shoulderW / 2} 165 Q 200 130 ${180 + shoulderW / 2} 165 L 260 250 L 235 280 L 215 250 L 220 560 L 145 560 L 150 250 L 130 280 L 105 250 Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="800" height="1200">
  <rect width="400" height="600" fill="${bg}"/>
  <path d="${silhouette}" fill="none" stroke="${fg}" stroke-width="2.5" opacity="0.55"/>
  <text x="200" y="595" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" letter-spacing="1.5" fill="${fg}" opacity="0.45">${label}</text>
</svg>`;
}

function bannerSvg({ label, tone = "#e7e2da", accent = "#3f3a34", w, h }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tone}"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(h * 0.045)}" letter-spacing="2" fill="${accent}" opacity="0.4">${label}</text>
</svg>`;
}

import { products } from "../src/data/products.ts";

mkdirSync(path.join(publicDir, "products"), { recursive: true });
mkdirSync(path.join(publicDir, "tiles"), { recursive: true });

for (const p of products) {
  const dir = path.join(publicDir, "products", p.slug);
  mkdirSync(dir, { recursive: true });
  p.images.forEach((_, i) => {
    const svg = productSvg({ label: p.name.toUpperCase(), category: p.category, seed: `${p.slug}-${i}` });
    writeFileSync(path.join(dir, `${i + 1}.svg`), svg);
  });
}

const tiles = [
  { file: "men.svg", label: "MEN", tone: "#e7e2da", accent: "#3f3a34" },
  { file: "women.svg", label: "WOMEN", tone: "#f1e4e0", accent: "#6b3f3a" },
  { file: "new.svg", label: "NEW", tone: "#e4e8e2", accent: "#38473f" },
  { file: "best-sellers.svg", label: "BEST SELLERS", tone: "#efe6d8", accent: "#5a4a2c" },
];
for (const t of tiles) {
  writeFileSync(path.join(publicDir, "tiles", t.file), bannerSvg({ label: t.label, tone: t.tone, accent: t.accent, w: 800, h: 1000 }));
}

writeFileSync(path.join(publicDir, "hero.svg"), bannerSvg({ label: "LIFESTYLE PHOTOGRAPHY — PLACEHOLDER", tone: "#ded7cb", accent: "#2b2b2b", w: 1600, h: 1000 }));
writeFileSync(path.join(publicDir, "brand-strip.svg"), bannerSvg({ label: "BRAND IMAGERY — PLACEHOLDER", tone: "#e2ddd2", accent: "#2b2b2b", w: 1200, h: 800 }));
writeFileSync(path.join(publicDir, "about.svg"), bannerSvg({ label: "STUDIO / ATELIER — PLACEHOLDER", tone: "#e9e4da", accent: "#2b2b2b", w: 1000, h: 1200 }));
writeFileSync(path.join(publicDir, "promo.svg"), bannerSvg({ label: "PROMOTION — PLACEHOLDER", tone: "#efe6d8", accent: "#5a4a2c", w: 1600, h: 700 }));

console.log("Generated placeholder imagery.");
