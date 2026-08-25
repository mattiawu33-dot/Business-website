#!/usr/bin/env python3
"""One-off: resize/compress the fourth batch of real product photos into
public/images/products/<slug>/N.jpg. Most map to brand-new products; three
map as additional images onto products created in earlier batches."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted4"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_1a07bbb8bb.jpeg": ("polka-dot-flutter-sleeve-dress", 1),
    "p0002_0_6336x9504_965eb33d20.jpeg": ("rust-balloon-hem-dress", 1),
    "p0003_0_1280x1920_d675cb6c93.jpeg": ("strapless-polka-dot-mini-dress", 2),
    "p0004_0_6336x9504_1e7c78ff34.jpeg": ("chevron-wrap-maxi-skirt", 1),
    "p0005_0_1280x1920_c70352bb00.jpeg": ("blush-tie-waist-wide-leg-jumpsuit", 1),
    "p0006_0_6336x9504_7976bf87f8.jpeg": ("pinstripe-suit-set", 1),
    "p0007_0_6336x9504_67d65b3da4.jpeg": ("floral-skirt-halter-dress", 1),
    "p0008_0_6241x9361_769a53deb4.jpeg": ("polka-dot-vest-trouser-set", 2),
    "p0009_0_6336x9504_68a4a9616d.jpeg": ("black-cutout-slip-dress", 1),
    "p0010_0_6336x9504_98fe9b6c47.jpeg": ("olive-tie-dye-kimono", 1),
    "p0011_0_1280x1920_3fcaeba152.jpeg": ("halter-polka-dot-maxi-dress", 2),
    "p0012_0_1280x1920_6575f17758.jpeg": ("navy-tailored-blazer", 3),
    "p0013_0_6336x9504_24032c4368.jpeg": ("chevron-knit-halter-maxi-dress", 1),
    "p0014_0_1280x1920_7aafe91051.jpeg": ("halter-polka-dot-maxi-dress", 1),
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
