#!/usr/bin/env python3
"""One-off: resize/compress real product photos extracted from the client's
PDF export into public/images/products/<slug>/1.jpg. Source files stay in
the scratchpad; this only writes the resized copies into the repo."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_42eabcea4b.jpeg": "chevron-knit-halter-dress",
    "p0002_0_1280x1920_e85ae984ed.jpeg": "tiered-ruffle-mini-dress",
    "p0003_0_1280x1920_cacd64b57d.jpeg": "blush-wide-leg-cargo-trousers",
    "p0004_0_6336x9504_f65703fd74.jpeg": "beaded-strap-slip-dress",
    "p0005_0_1280x1920_04e20d0b9f.jpeg": "floral-wrap-mini-dress",
    "p0006_0_6336x9504_88a4f902a4.jpeg": "polka-dot-wrap-maxi-dress",
    "p0007_0_1280x1920_dde392a296.jpeg": "cross-strap-fitted-top",
    "p0008_0_6336x9504_1e0c267d25.jpeg": "striped-puff-sleeve-set",
    "p0009_0_6336x9504_991d7327fb.jpeg": "tie-dye-slip-maxi-dress",
    "p0010_0_1280x1920_b87a08a775.jpeg": "ivory-tailored-vest-set",
    "p0011_0_6336x9504_d03d604e9c.jpeg": "floral-belted-shirt-dress",
    "p0012_0_1280x1920_a77f88eced.jpeg": "leopard-print-cami",
    "p0013_0_6336x9504_622128a2b9.jpeg": "polka-dot-wide-leg-trousers",
    "p0014_0_6336x9504_516ecf001e.jpeg": "tie-dye-tie-front-blouse",
    "p0015_0_1280x1920_c6e2316c7b.jpeg": "polka-dot-ruffle-blouse",
    "p0016_0_6083x9124_1308a128a1.jpeg": "studded-denim-shorts",
}

TARGET_W = 1100

for fname, slug in MAPPING.items():
    src = os.path.join(SRC_DIR, fname)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    target_h = round(TARGET_W * h / w)
    im = im.resize((TARGET_W, target_h), Image.LANCZOS)
    out_dir = os.path.join(DEST_ROOT, slug)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "1.jpg")
    im.save(out_path, "JPEG", quality=84, optimize=True, progressive=True)
    print(slug, im.size, os.path.getsize(out_path) // 1024, "KB")
