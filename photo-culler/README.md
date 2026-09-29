# Photo Culler

A command-line tool that picks the best shots from a youth-football shoot on a
Sony A6100 (works with `.JPG` and `.ARW` files).

For every photo it measures:

- **Sharpness**: the variance of the Laplacian (an edge filter), measured on
  the *sharpest region* of the frame. A blurred background therefore doesn't
  count against a photo.
- **Exposure**: flags photos that are **too dark** or have **blown highlights**
  (big areas of pure white).

Then it groups photos taken less than 1 second apart (using the capture time
the camera stores in each file) into **bursts**. It keeps the best photo from
each burst and copies the keepers into a `keepers` subfolder.
**Your originals are never moved, changed or deleted.**

## 1. Install (one time)

You need Python 3.9 or newer. In a terminal:

```bash
cd photo-culler

# Create a private "virtual environment" so these packages don't clash
# with anything else on your computer
python3 -m venv .venv

# Turn it on (do this every time you open a new terminal)
source .venv/bin/activate          # macOS / Linux
# .venv\Scripts\activate           # Windows

# Install the libraries
pip install -r requirements.txt
```

## 2. Run it

```bash
python cull_photos.py "/path/to/Saturday game" --top 50
```

| Option | What it does |
| --- | --- |
| `folder` | The folder with your photos (subfolders are ignored). |
| `--top 50` | Keep at most 50 photos in total: the 50 best burst winners. Leave it out to keep the winner of every burst. |
| `--burst-gap 1.0` | Photos closer together than this many seconds count as one burst (default 1.0). |

When it finishes, you'll find inside your photo folder:

- `keepers/`: copies of the chosen photos. If you shot RAW+JPEG, both files
  of each keeper are copied.
- `cull_report.csv`: one row per photo. Open it in Excel, Numbers or Google
  Sheets.

### The report columns

| Column | Meaning |
| --- | --- |
| `filename` | The file that was analysed. |
| `companion_files` | The matching JPEG of a RAW+JPEG pair (copied along with it). |
| `capture_time` | When the photo was taken, from EXIF (including fractions of a second). |
| `burst_group` / `burst_size` | Which burst the photo belongs to and how many shots are in it. |
| `sharpness` | Raw Laplacian variance of the sharpest region (higher = sharper). |
| `sharpness_pct` | Sharpness as a % of the sharpest photo in the folder. |
| `brightness` | Average brightness, from 0 (black) to 255 (white). |
| `blown_pct` | % of pixels that are pure white. |
| `exposure_problem` | `too dark`, `blown highlights`, or empty if exposure is fine. |
| `score` | `sharpness_pct`, halved if there's an exposure problem. Used for ranking. |
| `kept` / `reason` | Whether it was copied to `keepers`, and why or why not. |

## 3. Try it on fake sample photos first

`make_sample_photos.py` creates 16 fake photos with known answers. Each has a
blurred background with a sharp "player", and some frames get motion blur,
darkness or blown highlights:

```bash
python make_sample_photos.py sample_photos
python cull_photos.py sample_photos --top 3
```

Photos with `SHARP` or `GOOD` in their name are the ones that should be kept.

## How it works (a quick tour of `cull_photos.py`)

1. `find_photos`: lists the `.JPG`/`.ARW` files and pairs up RAW+JPEG files
   that share a name.
2. `load_grayscale`: for `.ARW` it reads the ~1616×1080 JPEG preview that the
   camera stores inside the raw file (fast, with no raw decoding). For `.JPG`
   it decodes at 1/4 size. Both are resized to 1500 px on the long side so
   their scores are comparable.
3. `sharpness_score`: runs the Laplacian filter, slides a tile (1/6 of the
   width × 1/4 of the height) across the picture, and returns the highest
   variance found.
4. `exposure_check`: average brightness plus the share of pure-white pixels.
5. `capture_time` and `assign_bursts`: read `DateTimeOriginal` +
   `SubSecTimeOriginal` from EXIF, sort by time, and start a new burst
   whenever the gap to the previous shot is 1 second or more.
6. `choose_keepers`, `copy_keepers` and `write_report`: pick the best of each
   burst, keep the top N, copy them, and save the CSV.

All the tunable numbers (tile grid, "too dark" level, blown-highlight %,
exposure penalty) are listed at the top of `cull_photos.py` with comments.

## Tips and limitations

- **Keep the camera clock right.** Burst grouping relies on the EXIF time.
  If a file has no EXIF date, the tool falls back to the file's modified time
  and prints a warning.
- **Compare like with like.** A folder of only JPEGs, only ARWs, or RAW+JPEG
  pairs is scored consistently. Mixing *standalone* ARWs and *standalone*
  JPEGs works, but the two kinds of file don't produce exactly the same
  sharpness numbers.
- **Sharpness isn't everything.** The tool can't tell whether the ball is in
  the frame or a player's eyes are closed. Treat `keepers` as a strong first
  pass and skim the "best in burst, but not in the top N" rows in the report
  for hidden gems.
- **Busy high-contrast backgrounds** (sharp advertising boards or text) can
  score as "sharp" even when the player is soft. A wider aperture helps.
- Running it again adds to the existing `keepers` folder. Delete that folder
  first if you want a fresh set.
