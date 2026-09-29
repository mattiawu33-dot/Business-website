@echo off
REM Double-click this file (Windows) to install everything and
REM test the culler on the sample photos.
cd /d "%~dp0"

if not exist .venv (
    echo First run: installing the libraries ^(takes a minute^)...
    python -m venv .venv
    if errorlevel 1 (
        echo Install failed. Is Python 3 installed? Get it from https://www.python.org
        pause
        exit /b 1
    )
    .venv\Scripts\pip install -r requirements.txt
)

REM Make the fake sample photos if they aren't there yet.
if not exist sample_photos .venv\Scripts\python make_sample_photos.py sample_photos

REM Remove keepers from an earlier test run (these are only copies).
if exist sample_photos\keepers rmdir /s /q sample_photos\keepers
.venv\Scripts\python cull_photos.py sample_photos --top 3

REM Show the results.
start "" sample_photos\keepers
start "" sample_photos\cull_report.csv
pause
