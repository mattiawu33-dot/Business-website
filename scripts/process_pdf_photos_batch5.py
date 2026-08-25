#!/usr/bin/env python3
"""One-off: resize/compress the fifth batch of real product photos into
public/images/products/<slug>/N.jpg. Most map to brand-new products; six map
as additional images onto products created in earlier batches. Two extracted
photos are near-duplicate crops of shots already used for
baggy-cuffed-denim-joggers and are skipped."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted5"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_d0c78bf228.jpeg": ("distressed-raw-hem-denim-shorts", 2),
    "p0003_0_6336x9504_0e3f150b79.jpeg": ("pleated-floral-midi-dress", 1),
    "p0004_0_6336x9504_e8b0307534.jpeg": ("floral-tie-neck-cami", 1),
    "p0005_0_6336x9504_be553d7794.jpeg": ("polka-dot-wide-leg-trousers", 3),
    "p0007_0_6336x9504_a98dd23f17.jpeg": ("oversized-floral-print-top", 1),
    "p0008_0_6336x9504_8479885456.jpeg": ("rhinestone-pocket-denim-shorts", 1),
    "p0009_0_6336x9504_d5b8386f6e.jpeg": ("burgundy-wrap-top", 1),
    "p0010_0_6336x9504_91ff936a0a.jpeg": ("pinstripe-suit-set", 2),
    "p0011_0_1280x1920_6447f0f82c.jpeg": ("patchwork-print-wrap-dress", 1),
    "p0012_0_1280x1920_2e3e4d4c71.jpeg": ("brown-cutout-ruffle-mini-dress", 1),
    "p0013_0_1280x1920_aeee3c809b.jpeg": ("dog-print-shirt", 2),
    "p0014_0_6336x9504_1fa7ca0105.jpeg": ("chevron-knit-halter-dress", 2),
    "p0015_0_6105x9158_eecaf753a6.jpeg": ("floral-print-maxi-skirt", 1),
    "p0016_0_6336x9504_06e8d44d34.jpeg": ("polka-dot-vest-trouser-set", 3),
}

TARGET_W = 1100

for fname, (slug, index) in MAPPING.items():
    src = os.path.join(SRC_DIR, fname)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    target_h = round(TARGET_W * h / w)
    im = im.resize((TARGET_W, target_h), Image.LANCZOS)
    out_dir = os.path.join(DEST_ROOT, slug)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{index}.jpg")
    im.save(out_path, "JPEG", quality=84, optimize=True, progressive=True)
    print(slug, index, im.size, os.path.getsize(out_path) // 1024, "KB")
