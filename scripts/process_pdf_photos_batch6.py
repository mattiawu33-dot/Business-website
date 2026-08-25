#!/usr/bin/env python3
"""One-off: resize/compress the sixth batch of real product photos into
public/images/products/<slug>/N.jpg. Most map as additional images onto
products created in earlier batches (this shoot revisited a lot of the same
garments from new angles); four cover brand-new garments."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted6"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_0fc1639bad.jpeg": ("oversized-floral-print-top", 2),
    "p0002_0_1280x1920_f807aa5903.jpeg": ("floral-bustier-trouser-set", 1),
    "p0003_0_6336x9504_84b42ceee9.jpeg": ("floral-print-maxi-skirt", 2),
    "p0004_0_6336x9504_a4682bf8c5.jpeg": ("leopard-print-tie-front-blouse", 2),
    "p0005_0_1280x1920_21b061c2f2.jpeg": ("ivory-tailored-vest-set", 2),
    "p0006_0_6336x9504_fff770a550.jpeg": ("leopard-print-slip-dress", 2),
    "p0007_0_1280x1920_efc5180ba2.jpeg": ("leopard-print-cami", 2),
    "p0008_0_1280x1920_6e9fcff0e0.jpeg": ("pleated-floral-midi-dress", 2),
    "p0009_0_1280x1920_64527a12cb.jpeg": ("brown-cutout-ruffle-mini-dress", 2),
    "p0010_0_6336x9504_2b7e4b8296.jpeg": ("distressed-raw-hem-denim-shorts", 3),
    "p0011_0_1280x1920_7c63c644be.jpeg": ("halter-polka-dot-maxi-dress", 3),
    "p0012_0_1280x1920_33c18cd16c.jpeg": ("halter-polka-dot-maxi-dress", 4),
    "p0013_0_6336x9504_dc62ea1e3e.jpeg": ("leopard-print-slip-dress", 1),
    "p0014_0_6336x9504_f498e0e04f.jpeg": ("off-shoulder-ruffle-set", 3),
    "p0015_0_1280x1920_6ccd903219.jpeg": ("slouchy-wide-leg-jeans", 3),
    "p0016_0_6336x9504_2b31724f15.jpeg": ("black-slit-slip-dress", 1),
    "p0017_0_1280x1920_d3a9d172ba.jpeg": ("floral-bustier-trouser-set", 2),
    "p0018_0_1280x1920_dd1ff8109b.jpeg": ("sequin-pocket-denim-skirt", 1),
    "p0019_0_6336x9504_ec3a275303.jpeg": ("olive-tie-dye-kimono", 2),
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
