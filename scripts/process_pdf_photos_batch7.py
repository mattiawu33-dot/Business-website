#!/usr/bin/env python3
"""One-off: resize/compress the seventh batch of real product photos into
public/images/products/<slug>/N.jpg. Ten of these map as additional images
onto products created in earlier batches; five cover brand-new garments."""
import os
from PIL import Image

SRC_DIR = "/tmp/claude-0/-home-user-Business-website/4e069f30-09a8-5d01-bcb3-16aa62718469/scratchpad/extracted7"
DEST_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "p0001_0_6336x9504_714c516f3f.jpeg": ("pinstripe-corset-trouser-set", 1),
    "p0002_0_1280x1920_c3248b08b0.jpeg": ("ruffle-hem-corset-top", 1),
    "p0003_0_6336x9504_7022dab8c7.jpeg": ("chevron-knit-wide-leg-trousers", 2),
    "p0004_0_6336x9504_d3a6043000.jpeg": ("floral-belted-shirt-dress", 2),
    "p0005_0_6336x9504_2c8071a754.jpeg": ("floral-print-maxi-skirt", 3),
    "p0006_0_1280x1920_f93217d844.jpeg": ("floral-bustier-trouser-set", 3),
    "p0007_0_6336x9504_fc09438487.jpeg": ("burgundy-floral-mesh-midi-dress", 1),
    "p0008_0_6336x9504_c1370a8dd3.jpeg": ("oversized-floral-print-top", 3),
    "p0009_0_6336x9504_3e1ea333d1.jpeg": ("leopard-print-slip-dress", 3),
    "p0010_0_6336x9504_60a0f0404c.jpeg": ("brown-trapeze-mini-dress", 1),
    "p0011_0_1280x1920_4f42c132ef.jpeg": ("tiered-ruffle-mini-dress", 2),
    "p0012_0_1280x1920_5e88d75ad4.jpeg": ("blush-wide-leg-cargo-trousers", 2),
    "p0013_0_6336x9504_229bfdae17.jpeg": ("floral-skirt-halter-dress", 2),
    "p0014_0_6336x9504_a6601c0496.jpeg": ("leopard-print-cami", 3),
    "p0015_0_1280x1920_a7f91a1bd5.jpeg": ("pink-strapless-ruffle-dress", 1),
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
