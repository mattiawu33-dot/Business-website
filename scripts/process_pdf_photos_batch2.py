#!/usr/bin/env python3
"""One-off: resize/compress the second batch of real product photos into
public/images/products/<slug>/N.jpg. Some map to brand-new products; two map
as a second (back-view) image onto products created in batch 1."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted2"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_1280x1920_a7d485391e.jpeg": ("navy-tailored-blazer", 1),
    "p0002_0_6336x9504_725dc3d664.jpeg": ("floral-halter-maxi-dress", 1),
    "p0003_0_1280x1920_e1496b2a0a.jpeg": ("slouchy-wide-leg-jeans", 1),
    "p0004_0_6336x9504_74dc1362ef.jpeg": ("distressed-raw-hem-denim-shorts", 1),
    "p0005_0_6336x9504_43a0b23834.jpeg": ("pinstripe-two-piece-set", 1),
    "p0006_0_1280x1920_5f6795b021.jpeg": ("baggy-cuffed-denim-joggers", 1),
    "p0007_0_1280x1920_411de8e3e2.jpeg": ("butterfly-print-blouse", 1),
    "p0008_0_1280x1920_8effaff420.jpeg": ("balloon-sleeve-chiffon-blouse", 1),
    "p0009_0_1280x1920_9999615918.jpeg": ("strapless-polka-dot-mini-dress", 1),
    "p0010_0_1280x1920_945223fe5e.jpeg": ("lace-trim-silk-cami", 1),
    "p0011_0_6336x9504_bd1e97edba.jpeg": ("linen-tank-skirt-set", 1),
    "p0012_0_1280x1920_11d2f70c34.jpeg": ("corset-bustier-top", 1),
    "p0013_0_6336x9504_01e2bd268f.jpeg": ("polka-dot-wide-leg-trousers", 2),
    "p0014_0_1280x1920_04aca9b040.jpeg": ("polka-dot-halter-top", 2),
    "p0015_0_1280x1920_90a874d4a6.jpeg": ("polka-dot-halter-top", 1),
    "p0016_0_6336x9504_7a8029a7f6.jpeg": ("studded-denim-shorts", 2),
    "p0017_0_6336x9504_f640caf8b9.jpeg": ("pinstripe-two-piece-set", 2),
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
