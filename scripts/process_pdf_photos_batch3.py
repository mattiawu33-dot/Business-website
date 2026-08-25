#!/usr/bin/env python3
"""One-off: resize/compress the third batch of real product photos into
public/images/products/<slug>/N.jpg. Most map to brand-new products; two map
as a second image onto products created in earlier batches. One extracted
photo (a near-duplicate crop of the existing studded-denim-shorts front shot)
is intentionally skipped."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted3"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_54c7c8eefb.jpeg": ("polka-dot-vest-trouser-set", 1),
    "p0002_0_1280x1920_593c354f51.jpeg": ("baggy-cuffed-denim-joggers", 2),
    "p0003_0_6336x9504_8003a1a9bb.jpeg": ("chevron-knit-wide-leg-trousers", 1),
    "p0004_0_6336x9504_1cd3c4a235.jpeg": ("chevron-knit-belted-maxi-dress", 1),
    "p0005_0_1280x1920_035016ab88.jpeg": ("dog-print-shirt", 1),
    "p0007_0_1280x1920_22bf4086ce.jpeg": ("lavender-wide-leg-trousers", 1),
    "p0008_0_6336x9504_170d2b62bd.jpeg": ("off-shoulder-ruffle-set", 2),
    "p0009_0_1280x1920_a0379082d3.jpeg": ("navy-tailored-blazer", 2),
    "p0010_0_6336x9504_2d1617df4d.jpeg": ("leopard-print-tie-front-blouse", 1),
    "p0011_0_6336x9504_16060bd449.jpeg": ("black-sleeveless-maxi-dress", 1),
    "p0012_0_6336x9504_2dc1f92d8f.jpeg": ("abstract-print-halter-maxi-dress", 1),
    "p0013_0_6336x9504_1a215367df.jpeg": ("off-shoulder-ruffle-set", 1),
    "p0014_0_6336x9504_5cb22b617f.jpeg": ("tie-neck-rust-midi-dress", 1),
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
