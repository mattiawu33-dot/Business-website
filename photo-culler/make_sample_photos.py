"""
make_sample_photos.py - create a folder of fake "game day" photos for testing.

Each fake photo is a blurred background (like a shallow depth-of-field shot)
with a sharp "player" in front. Some frames get motion blur, some are too dark
or blown out, and the capture times (saved in EXIF, just like the camera does)
are set so the photos form bursts.

    python make_sample_photos.py sample_photos
    python cull_photos.py sample_photos --top 5
"""

import sys
from datetime import datetime, timedelta
from pathlib import Path

import cv2
import numpy as np
from PIL import Image  # Pillow is used here only because it can write EXIF

WIDTH, HEIGHT = 6000, 4000  # same size as a Sony A6100 JPEG
START = datetime(2026, 9, 27, 10, 0, 0)

# Each entry: (seconds after START, motion blur in pixels, exposure, label)
# exposure is "ok", "dark" or "blown". Photos < 1 s apart form a burst.
SHOTS = [
    # Burst A: 10 frames/second, the middle frame is the sharp one
    (0.0, 80, "ok", "burstA_1"),
    (0.1, 50, "ok", "burstA_2"),
    (0.2, 0, "ok", "burstA_3_SHARP"),
    (0.3, 30, "ok", "burstA_4"),
    (0.4, 120, "ok", "burstA_5"),
    # Burst B: the sharpest frame is badly underexposed
    (5.0, 0, "dark", "burstB_1_sharp_but_dark"),
    (5.1, 12, "ok", "burstB_2_GOOD"),
    (5.2, 60, "ok", "burstB_3"),
    # Burst C: the sharpest frame has blown highlights
    (12.0, 40, "ok", "burstC_1"),
    (12.1, 0, "blown", "burstC_2_sharp_but_blown"),
    (12.2, 10, "ok", "burstC_3_GOOD"),
    # Slow chain: each photo is 0.8 s after the previous one, so they
    # still count as one burst even though the first and last are 1.6 s apart
    (20.0, 70, "ok", "chain_1"),
    (20.8, 0, "ok", "chain_2_SHARP"),
    (21.6, 90, "ok", "chain_3"),
    # Two single shots, 1.5 s apart (separate bursts)
    (30.0, 0, "ok", "single_1_sharp"),
    (31.5, 100, "ok", "single_2_blurry"),
]


def make_background(rng):
    """A green field with a busy crowd on top, heavily blurred (bokeh)."""
    small = np.zeros((HEIGHT // 8, WIDTH // 8, 3), np.uint8)
    small[:] = (40, 140, 60)  # grass green (OpenCV uses Blue, Green, Red)
    crowd_h = small.shape[0] // 3
    small[:crowd_h] = rng.integers(40, 220, (crowd_h, small.shape[1], 3))
    # Blur the small image, then scale it up: cheap way to get a soft background.
    small = cv2.GaussianBlur(small, (0, 0), 6)
    return cv2.resize(small, (WIDTH, HEIGHT), interpolation=cv2.INTER_CUBIC)


def make_player(rng):
    """A sharp, detailed 'player': jersey with a number and fine texture."""
    h, w = 1600, 900
    player = np.full((h, w, 3), (30, 30, 200), np.uint8)  # red jersey
    # Fine fabric-like texture gives the Laplacian something to find.
    texture = rng.integers(-40, 40, (h, w, 1))
    player = np.clip(player.astype(int) + texture, 0, 255).astype(np.uint8)
    cv2.putText(player, "10", (130, 900), cv2.FONT_HERSHEY_SIMPLEX, 18,
                (255, 255, 255), 40, cv2.LINE_AA)
    return player


def motion_blur(image, length):
    """Smear the image sideways by `length` pixels, like a moving subject."""
    if length <= 1:
        return image
    kernel = np.zeros((1, length), np.float32)
    kernel[0, :] = 1.0 / length
    return cv2.filter2D(image, -1, kernel)


def save_with_exif(image_bgr, path, taken):
    """Save a JPEG with DateTimeOriginal + SubSecTimeOriginal EXIF tags."""
    rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(rgb)
    exif = Image.Exif()
    exif[0x010F] = "SONY"  # Make
    exif[0x0110] = "ILCE-6100"  # Model
    exif_ifd = exif.get_ifd(0x8769)  # the "EXIF" sub-section
    exif_ifd[0x9003] = taken.strftime("%Y:%m:%d %H:%M:%S")  # DateTimeOriginal
    exif_ifd[0x9291] = f"{taken.microsecond // 10000:02d}"  # SubSecTimeOriginal
    pil_image.save(path, "JPEG", quality=92, exif=exif)


def main():
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "sample_photos")
    out.mkdir(exist_ok=True)
    rng = np.random.default_rng(42)
    background = make_background(rng)
    player = make_player(rng)

    for number, (seconds, blur, exposure, label) in enumerate(SHOTS, start=1):
        frame = background.copy()
        x = 1500 + number * 150  # the player runs across the frame
        y = 1600
        region = frame[y:y + player.shape[0], x:x + player.shape[1]]
        region[:] = player
        # Blur only the area around the player (the subject is moving).
        pad = 200
        area = frame[y - pad:y + player.shape[0] + pad,
                     x - pad:x + player.shape[1] + pad]
        area[:] = motion_blur(area, blur)

        if exposure == "dark":
            frame = (frame * 0.2).astype(np.uint8)
        elif exposure == "blown":
            frame = cv2.add(frame, np.full_like(frame, 150))

        taken = START + timedelta(seconds=seconds)
        name = f"DSC{number:05d}_{label}.JPG"
        save_with_exif(frame, out / name, taken)
        print("wrote", out / name)


if __name__ == "__main__":
    main()
