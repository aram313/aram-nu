"""Make the web copies of the kufi tile photos for aram.nu.

Usage: python scripts/prepare-images.py <source folder> [<source folder> ...]
Needs Pillow. Writes src/img/<name>-s.jpg (480 px, the grid) and <name>-l.jpg (1600 px, opened).
ORDER maps every photo to a page name (colours dark to light, then the two "muhammadun rasulu
llah" tiles); only the names in SHOWN are written, since the page shows one row of four.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ORDER = [  # camera file -> page name
    ("DSC03746", "sort"), ("DSC03751", "marine"), ("DSC03750", "blaa"), ("DSC03749", "lyseblaa"),
    ("DSC03757", "lilla"), ("DSC03758", "roed"), ("DSC03756", "orange"), ("DSC03755", "gul"),
    ("DSC03753", "groen"), ("DSC03752", "oliven"), ("DSC03747", "graa"), ("DSC03748", "sand"),
    ("DSC03745", "beige"), ("DSC03763", "sort-paa-sand"),
    ("DSC03762", "rasul-sand"), ("DSC03761", "rasul-sort"),
]
SHOWN = {"sort", "rasul-sort", "roed", "sort-paa-sand"}

out = Path(__file__).resolve().parent.parent / "src" / "img"
out.mkdir(parents=True, exist_ok=True)
found = {p.stem.split("-", 1)[-1]: p for d in sys.argv[1:] for p in Path(d).glob("*.jpg")}

for cam, name in ORDER:
    if name not in SHOWN:
        continue
    im = ImageOps.exif_transpose(Image.open(found[cam])).convert("RGB")
    side = min(im.size)
    im = im.crop(((im.width - side) // 2, (im.height - side) // 2,
                  (im.width + side) // 2, (im.height + side) // 2))
    for suffix, size, quality in (("s", 480, 80), ("l", 1600, 84)):
        im.resize((size, size), Image.LANCZOS).save(out / f"{name}-{suffix}.jpg", quality=quality,
                                                     optimize=True, progressive=True)
    print(name)
