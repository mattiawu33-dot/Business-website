#!/usr/bin/env python3
"""One-off: resize/compress the eighth batch of real product photos into
public/images/products/<slug>/N.jpg. Six map as additional images onto
products created in earlier batches; two cover brand-new garments."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted8"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_304ab417b1.jpeg": ("chevron-knit-wide-leg-trousers", 3),
    "p0002_0_1280x1920_f792c358d9.jpeg": ("lilac-silk-pajama-set", 1),
    "p0003_0_1280x1920_c7150995f1.jpeg": ("patchwork-print-wrap-dress", 2),
    "p0004_0_6336x9504_9b8c70a303.jpeg": ("striped-puff-sleeve-set", 2),
    "p0005_0_1280x1920_64d67cc29a.jpeg": ("ruffle-hem-corset-top", 2),
    "p0006_0_1280x1920_c59ae86d18.jpeg": ("ruffle-hem-corset-top", 3),
    "p0007_0_6336x9504_0fc8327d93.jpeg": ("rust-linen-tank-shorts-set", 1),
    "p0008_0_6336x9504_1003b4c775.jpeg": ("floral-belted-shirt-dress", 3),
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
