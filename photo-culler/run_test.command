#!/bin/bash
# Double-click this file (macOS) or run "bash run_test.command" (Linux)
# to install everything and test the culler on the sample photos.
cd "$(dirname "$0")" || exit 1

if [ ! -d .venv ]; then
    echo "First run: installing the libraries (takes a minute)..."
    python3 -m venv .venv && .venv/bin/pip install -r requirements.txt || {
        echo "Install failed. Is Python 3 installed? Get it from https://www.python.org"
        read -r -p "Press Enter to close"; exit 1; }
fi

# Make the fake sample photos if they aren't there yet.
[ -d sample_photos ] || .venv/bin/python make_sample_photos.py sample_photos

# Remove keepers from an earlier test run (these are only copies).
rm -rf sample_photos/keepers
.venv/bin/python cull_photos.py sample_photos --top 3

# Show the results.
if command -v open >/dev/null; then open sample_photos/keepers sample_photos/cull_report.csv
elif command -v xdg-open >/dev/null; then xdg-open sample_photos/keepers; fi
read -r -p "Done. Press Enter to close"
