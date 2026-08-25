#!/usr/bin/env python3
"""One-off: resize/compress the first Men's real-photo batch into
public/images/products/<slug>/N.jpg. All 7 are brand-new products replacing
the Men's placeholder line (mirrors the Women's Phase-2 swap in batch 1)."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted_m1"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_5576x8364_0ad66cf0a6.jpeg": ("rhinestone-panel-wide-leg-jeans", 1),
    "p0002_0_6336x9504_f82b5b2c4b.jpeg": ("khaki-drawstring-wide-leg-trousers", 1),
    "p0003_0_6181x9271_35e515ff86.jpeg": ("rhinestone-wash-denim-shorts", 1),
    "p0004_0_5987x8980_9b2c1db9ec.jpeg": ("grey-wash-denim-shorts", 1),
    "p0005_0_6336x9504_16de05c236.jpeg": ("soy-loco-graphic-tee", 1),
    "p0006_0_6336x9504_1aeda46438.jpeg": ("rhinestone-pocket-wide-leg-jeans", 1),
    "p0007_0_6336x9504_6df3d02b12.jpeg": ("come-ti-soffro-graphic-tee", 1),
    "p0008_0_5681x8521_f3371278a5.jpeg": ("rhinestone-wash-denim-shorts", 2),
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
