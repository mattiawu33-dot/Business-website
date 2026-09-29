"""
cull_photos.py - pick the best sports photos out of a big folder.

What it does, step by step:
  1. Finds every JPEG and Sony .ARW file in a folder.
  2. Loads a small version of each picture (for .ARW raw files it uses the
     JPEG preview the camera stores inside the file, which is much faster
     than decoding the whole raw image).
  3. Scores each photo:
       - sharpness: how crisp the sharpest part of the picture is
       - exposure:  whether the photo is too dark or has big blown-out areas
  4. Groups photos into "bursts" (shots taken less than 1 second apart,
     based on the capture time saved by the camera) and keeps only the
     best photo from each burst.
  5. Copies the keepers into a "keepers" subfolder (originals are never
     moved or deleted) and writes a CSV report explaining every decision.

Example:
    python cull_photos.py /path/to/game_photos --top 50
"""

import argparse
import csv
import shutil
import sys
from datetime import datetime
from pathlib import Path

import cv2  # OpenCV: image loading and the Laplacian sharpness filter
import exifread  # reads the capture time saved inside JPEG and ARW files
import numpy as np
import rawpy  # opens camera raw files such as Sony .ARW


# ---------------------------------------------------------------------------
# Settings. Tweak these if the results don't match your taste.
# ---------------------------------------------------------------------------

# File types we look at (compared in lowercase, so .JPG and .jpg both work).
PHOTO_EXTENSIONS = {".jpg", ".jpeg", ".arw"}

# Every photo is shrunk so its longest side is this many pixels before
# scoring. This keeps things fast, and it means a big camera JPEG and the
# smaller preview inside an .ARW file are judged at the same size.
# (Sharpness numbers are only comparable between images of the same size.)
ANALYSIS_SIZE = 1500

# The picture is checked tile by tile. A tile is 1/GRID_COLUMNS of the width
# and 1/GRID_ROWS of the height. The photo's sharpness is the score of its
# sharpest tile, so a nicely blurred background doesn't drag the score down.
GRID_COLUMNS = 6
GRID_ROWS = 4

# Exposure checks. Brightness is measured from 0 (black) to 255 (white).
TOO_DARK_BRIGHTNESS = 60  # average brightness below this = "too dark"
BLOWN_PIXEL_LEVEL = 250  # a pixel this bright or brighter counts as blown out
MAX_BLOWN_PERCENT = 5.0  # more than this % of blown pixels = "blown out"

# A photo with an exposure problem has its score multiplied by this number,
# so it only wins its burst if the other shots are clearly worse.
EXPOSURE_PENALTY = 0.5

# Default burst gap: photos taken less than this many seconds after the
# previous photo belong to the same burst.
DEFAULT_BURST_GAP_SECONDS = 1.0


# ---------------------------------------------------------------------------
# Step 1: find the photos
# ---------------------------------------------------------------------------

def find_photos(folder):
    """Return a list of photos in `folder` (not in its subfolders).

    If the camera saved RAW+JPEG pairs (DSC01234.ARW and DSC01234.JPG),
    they are treated as one photo: we analyse the .ARW and later copy both.
    Each photo is a dict; more information is added to it as we go.
    """
    files_by_name = {}
    for path in sorted(folder.iterdir()):
        if path.is_file() and path.suffix.lower() in PHOTO_EXTENSIONS:
            # path.stem is the file name without its extension, e.g. "DSC01234"
            files_by_name.setdefault(path.stem, []).append(path)

    photos = []
    for files in files_by_name.values():
        # Put the .ARW first (if there is one) so it's the file we analyse.
        files.sort(key=lambda p: p.suffix.lower() != ".arw")
        photos.append({"path": files[0], "companions": files[1:]})
    return photos


# ---------------------------------------------------------------------------
# Step 2: load a (small) grayscale version of each photo
# ---------------------------------------------------------------------------

def load_grayscale(path):
    """Load a photo as a grayscale image, shrunk to ANALYSIS_SIZE.

    Returns a 2D numpy array of brightness values (0-255), or None if the
    file can't be read.
    """
    if path.suffix.lower() == ".arw":
        # Raw file: pull out the JPEG preview the camera embedded in it.
        with rawpy.imread(str(path)) as raw:
            thumb = raw.extract_thumb()
        if thumb.format == rawpy.ThumbFormat.JPEG:
            # thumb.data is the JPEG file's bytes; decode them in memory.
            jpeg_bytes = np.frombuffer(thumb.data, dtype=np.uint8)
            image = cv2.imdecode(jpeg_bytes, cv2.IMREAD_GRAYSCALE)
        else:
            # Rare: the preview is stored as plain RGB pixels instead.
            image = cv2.cvtColor(thumb.data, cv2.COLOR_RGB2GRAY)
    else:
        # Normal JPEG. IMREAD_REDUCED_GRAYSCALE_4 decodes it at 1/4 size,
        # which is far faster than loading all 24 megapixels.
        image = cv2.imread(str(path), cv2.IMREAD_REDUCED_GRAYSCALE_4)

    if image is None:
        return None

    # Resize so the longest side is exactly ANALYSIS_SIZE pixels.
    height, width = image.shape
    scale = ANALYSIS_SIZE / max(height, width)
    new_size = (round(width * scale), round(height * scale))
    return cv2.resize(image, new_size, interpolation=cv2.INTER_AREA)


# ---------------------------------------------------------------------------
# Step 3: score sharpness and exposure
# ---------------------------------------------------------------------------

def sharpness_score(gray):
    """Variance of the Laplacian, measured on the sharpest tile of the image.

    The Laplacian filter highlights edges. A sharp photo has strong, crisp
    edges, so the filtered image varies a lot (high variance). A blurry photo
    has soft edges, so the variance is low.
    """
    # A tiny blur first, so random sensor noise (common at high ISO under
    # stadium lights) isn't mistaken for fine detail.
    gray = cv2.GaussianBlur(gray, (3, 3), 0)
    edges = cv2.Laplacian(gray, cv2.CV_64F)

    height, width = edges.shape
    tile_h = height // GRID_ROWS
    tile_w = width // GRID_COLUMNS

    # Slide the tile across the image in half-tile steps. The tiles overlap,
    # so a player standing on the line between two tiles still ends up
    # fully inside one of them.
    best = 0.0
    for top in range(0, height - tile_h + 1, tile_h // 2):
        for left in range(0, width - tile_w + 1, tile_w // 2):
            tile = edges[top:top + tile_h, left:left + tile_w]
            best = max(best, tile.var())
    return best


def exposure_check(gray):
    """Measure brightness and blown-out highlights.

    Returns (average_brightness, blown_percent, problem) where `problem` is
    "" if the exposure looks fine, otherwise a short description.
    """
    brightness = float(gray.mean())
    blown_percent = float((gray >= BLOWN_PIXEL_LEVEL).mean() * 100)

    problems = []
    if brightness < TOO_DARK_BRIGHTNESS:
        problems.append("too dark")
    if blown_percent > MAX_BLOWN_PERCENT:
        problems.append("blown highlights")
    return brightness, blown_percent, ", ".join(problems)


# ---------------------------------------------------------------------------
# Step 4: capture time and burst grouping
# ---------------------------------------------------------------------------

def capture_time(path):
    """Return the moment the photo was taken, as a datetime.

    Uses the EXIF "DateTimeOriginal" tag (whole seconds) plus
    "SubSecTimeOriginal" (fractions of a second) when the camera saved it.
    Falls back to the file's modified time if there is no EXIF date.
    """
    with open(path, "rb") as f:
        tags = exifread.process_file(f, details=False)

    date_tag = tags.get("EXIF DateTimeOriginal")
    if date_tag is None:
        return datetime.fromtimestamp(path.stat().st_mtime), False

    # EXIF dates look like "2026:09:27 10:15:32"
    taken = datetime.strptime(str(date_tag).strip(), "%Y:%m:%d %H:%M:%S")

    subsec_tag = tags.get("EXIF SubSecTimeOriginal")
    if subsec_tag is not None:
        digits = "".join(ch for ch in str(subsec_tag) if ch.isdigit())
        if digits:
            # "25" means 0.25 seconds, "250" also means 0.25 seconds.
            taken = taken.replace(microsecond=int(float("0." + digits) * 1_000_000))
    return taken, True


def assign_bursts(photos, max_gap_seconds):
    """Give every photo a burst number.

    Photos are sorted by capture time. Whenever the gap to the previous photo
    is `max_gap_seconds` or more, a new burst starts. This chains shots, so a
    long burst at 11 frames per second stays one group.
    """
    photos.sort(key=lambda p: p["time"])
    burst = 0
    previous_time = None
    for photo in photos:
        if previous_time is not None:
            gap = (photo["time"] - previous_time).total_seconds()
            if gap >= max_gap_seconds:
                burst += 1
        photo["burst"] = burst + 1  # start counting at 1 for humans
        previous_time = photo["time"]


# ---------------------------------------------------------------------------
# Step 5: choose keepers, copy them, write the report
# ---------------------------------------------------------------------------

def choose_keepers(photos, top):
    """Mark the best photo of each burst, then keep the `top` best of those."""
    # Group photos by burst number.
    bursts = {}
    for photo in photos:
        bursts.setdefault(photo["burst"], []).append(photo)

    for photo in photos:
        photo["burst_size"] = len(bursts[photo["burst"]])

    # The winner of each burst is the readable photo with the highest score.
    # (Files we couldn't open are skipped, so they can never be a keeper.)
    winners = []
    for group in bursts.values():
        readable = [p for p in group if not p.get("error")]
        if readable:
            winners.append(max(readable, key=lambda p: p["score"]))

    # Rank the winners from best to worst and keep the first `top` of them.
    winners.sort(key=lambda p: p["score"], reverse=True)
    if top is not None:
        keepers = winners[:top]
    else:
        keepers = winners

    winner_ids = {id(p) for p in winners}
    keeper_ids = {id(p) for p in keepers}
    for photo in photos:
        if photo.get("error"):
            photo["kept"] = False
            photo["reason"] = photo["error"]
        elif id(photo) in keeper_ids:
            photo["kept"] = True
            photo["reason"] = "best in burst"
        elif id(photo) in winner_ids:
            photo["kept"] = False
            photo["reason"] = f"best in burst, but not in the top {top}"
        else:
            photo["kept"] = False
            photo["reason"] = "a sharper/better shot in the same burst was kept"
    return keepers


def copy_keepers(keepers, keepers_folder):
    """Copy each keeper (and its RAW/JPEG companion) into `keepers_folder`."""
    keepers_folder.mkdir(exist_ok=True)
    for photo in keepers:
        for path in [photo["path"]] + photo["companions"]:
            # copy2 also keeps the original file's dates.
            shutil.copy2(path, keepers_folder / path.name)


def write_report(photos, report_path):
    """Save one row per photo to a CSV file you can open in Excel/Numbers."""
    columns = [
        "filename", "companion_files", "capture_time", "burst_group",
        "burst_size", "sharpness", "sharpness_pct", "brightness",
        "blown_pct", "exposure_problem", "score", "kept", "reason",
    ]
    with open(report_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(columns)
        for p in sorted(photos, key=lambda p: p["time"]):
            writer.writerow([
                p["path"].name,
                " ".join(c.name for c in p["companions"]),
                p["time"].isoformat(sep=" ", timespec="milliseconds"),
                p["burst"],
                p["burst_size"],
                round(p["sharpness"], 1),
                round(p["sharpness_pct"], 1),
                round(p["brightness"], 1),
                round(p["blown_pct"], 2),
                p["exposure_problem"],
                round(p["score"], 1),
                "yes" if p["kept"] else "no",
                p["reason"],
            ])


# ---------------------------------------------------------------------------
# Main program
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Cull sports photos: keep the sharpest, well-exposed "
                    "shot from each burst.")
    parser.add_argument("folder", type=Path,
                        help="folder containing your .JPG and/or .ARW files")
    parser.add_argument("--top", type=int, default=None,
                        help="how many keepers you want in total "
                             "(default: the best photo of every burst)")
    parser.add_argument("--burst-gap", type=float,
                        default=DEFAULT_BURST_GAP_SECONDS,
                        help="photos closer together than this many seconds "
                             "count as one burst (default: %(default)s)")
    args = parser.parse_args()

    folder = args.folder
    if not folder.is_dir():
        sys.exit(f"Error: '{folder}' is not a folder.")
    if args.top is not None and args.top < 1:
        sys.exit("Error: --top must be 1 or more.")

    photos = find_photos(folder)
    if not photos:
        sys.exit(f"No .JPG or .ARW files found in '{folder}'.")
    print(f"Found {len(photos)} photos in {folder}")

    # --- Score every photo -------------------------------------------------
    missing_exif = 0
    for number, photo in enumerate(photos, start=1):
        path = photo["path"]
        # "\r" returns to the start of the line, so the counter updates in place.
        print(f"\rAnalysing {number}/{len(photos)}: {path.name}      ",
              end="", flush=True)

        photo["time"], has_exif = capture_time(path)
        if not has_exif:
            missing_exif += 1

        try:
            gray = load_grayscale(path)
        except Exception as error:  # e.g. a corrupt or unsupported raw file
            gray = None
            print(f"\n  Could not read {path.name}: {error}")

        if gray is None:
            photo.update(sharpness=0.0, brightness=0.0, blown_pct=0.0,
                         exposure_problem="", error="could not read file")
            continue

        photo["sharpness"] = sharpness_score(gray)
        (photo["brightness"], photo["blown_pct"],
         photo["exposure_problem"]) = exposure_check(gray)
    print()  # finish the progress line

    if missing_exif:
        print(f"Warning: {missing_exif} photos had no EXIF capture time; "
              "used the file date instead (burst grouping may be off).")

    # --- Turn the measurements into one score per photo ---------------------
    # Raw sharpness numbers depend on the scene, so we express each one as a
    # percentage of the sharpest photo in this folder (100 = sharpest).
    sharpest = max(p["sharpness"] for p in photos) or 1.0
    for photo in photos:
        photo["sharpness_pct"] = photo["sharpness"] / sharpest * 100
        photo["score"] = photo["sharpness_pct"]
        if photo["exposure_problem"]:
            photo["score"] *= EXPOSURE_PENALTY
        if photo.get("error"):
            photo["score"] = 0.0  # unreadable files can never win

    # --- Bursts, keepers, copying, report ----------------------------------
    assign_bursts(photos, args.burst_gap)
    keepers = choose_keepers(photos, args.top)

    keepers_folder = folder / "keepers"
    if keepers_folder.exists() and any(keepers_folder.iterdir()):
        print(f"Note: '{keepers_folder}' already has files in it from an "
              "earlier run. Delete that folder first for a clean set.")
    copy_keepers(keepers, keepers_folder)

    report_path = folder / "cull_report.csv"
    write_report(photos, report_path)

    burst_count = len({p["burst"] for p in photos})
    flagged = sum(1 for p in photos if p["exposure_problem"])
    print(f"Bursts found:        {burst_count}")
    print(f"Exposure problems:   {flagged}")
    print(f"Keepers copied:      {len(keepers)}  ->  {keepers_folder}")
    print(f"Report saved:        {report_path}")


if __name__ == "__main__":
    main()
