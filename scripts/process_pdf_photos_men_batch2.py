#!/usr/bin/env python3
"""One-off: resize/compress the second Men's real-photo batch into
public/images/products/<slug>/N.jpg. All 10 are brand-new products."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted_m2"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_a35aad63ca.jpeg": ("khaki-wash-wide-leg-jeans", 1),
    "p0002_0_6336x9504_5840d432cc.jpeg": ("brunettes-graphic-tee", 1),
    "p0003_0_6336x9504_9f9c616b43.jpeg": ("panel-seam-denim-shorts", 1),
    "p0004_0_5967x8951_d2b4535294.jpeg": ("cross-applique-wide-leg-jeans", 1),
    "p0005_0_6336x9504_4f9fd98f9f.jpeg": ("cross-print-colorblock-jeans", 1),
    "p0006_0_6336x9504_6666a6200d.jpeg": ("paisley-embroidered-shirt", 1),
    "p0007_0_6336x9504_fd04347a33.jpeg": ("tu-si-bell-graphic-tee", 1),
    "p0008_0_6336x9504_d1d1e31f79.jpeg": ("panel-seam-wide-leg-jeans", 1),
    "p0009_0_6336x9504_c73eed7a9a.jpeg": ("distressed-black-shorts", 1),
    "p0010_0_6336x9504_cf6bdd8f81.jpeg": ("brown-track-trousers", 1),
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
