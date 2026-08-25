#!/usr/bin/env python3
"""Baut die fertige Website aus der Quelldatei.

  bageri-liss.html   Quelle mit Platzhaltern (__FONTS__, __IMG_*__)
  -> dist/artifact.html   flach, fuer den Artifact-Rahmen
  -> index.html           vollstaendiges Dokument zum Hochladen

Schriften und Fotos werden als data:-URIs eingebettet, damit die Seite
ohne externe Requests laeuft (die Artifact-CSP blockiert fremde Hosts).
"""
import base64
import json
import pathlib
import re
import sys

from PIL import Image, ImageEnhance, ImageOps

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "bageri-liss.html"
PHOTOS = ROOT / "fotos_liss"
CACHE = ROOT / ".build-cache"
FONT_CSS = CACHE / "fonts.css"

# Platzhalter -> (Dateiname, Zielbreite, JPEG-Qualitaet[, Helligkeit])
# Helligkeit: 1.0 = unveraendert, >1 heller
IMAGES = {
    "HERO":    ("titelbild/skyltfonster-ki-genererad.jpg", 1400, 72, 1.20),
    "BROD":    ("705627408_977162161897970_2812071038942022372_n.jpg",  760, 68),
    "BAKVERK": ("707436519_981302488150604_8022735275371271103_n.jpg",  760, 68),
    "LAUGEN":  ("705375965_977162148564638_2608902765081764732_n.jpg",  760, 68),
    "G1":      ("654724830_922777907336396_2841304630204599132_n.jpg",  660, 66),
    "G2":      ("715972154_1469944301127107_4800732813618603439_n.png.jpeg", 660, 66),
    "G3":      ("718174148_989661297314723_7818835706728873960_n.jpg",  660, 66),
    "G4":      ("718190683_1702185041110830_897474714893100010_n.png.jpeg", 660, 66),
    "G5":      ("703055376_977162151897971_6085624537148873085_n.jpg",  660, 66),
}


def encode_image(name: str, width: int, quality: int, brightness: float = 1.0) -> str:
    src = (ROOT / name) if "/" in name else (PHOTOS / name)
    if not src.exists():
        sys.exit(f"Foto fehlt: {src}")
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(width * im.height / im.width)), Image.LANCZOS)
    if brightness != 1.0:
        im = ImageEnhance.Brightness(im).enhance(brightness)
        # Aufhellen flacht den Kontrast ab, ein Hauch zurueck
        im = ImageEnhance.Contrast(im).enhance(1.05)
    CACHE.mkdir(exist_ok=True)
    safe = name.replace("/", "__")
    tmp = CACHE / f"{safe}.{width}.{brightness}.jpg"
    im.save(tmp, "JPEG", quality=quality, optimize=True, progressive=True)
    data = tmp.read_bytes()
    print(f"  {name[:28]:28} {im.width:>5}px  {len(data) // 1024:>4} KB")
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()


def split_head(src: str):
    """Trennt Kopf-Tags und <style> vom Rumpf, fuer das vollstaendige Dokument."""
    head, body = [], src
    patterns = [
        r'<meta charset="utf-8">\s*',
        r"<title>.*?</title>\s*",
        r'<meta name="viewport"[^>]*>\s*',
        r'<meta name="description"[^>]*>\s*',
    ]
    for pat in patterns:
        m = re.search(pat, body, re.S)
        if m:
            head.append(m.group(0).strip())
            body = body[: m.start()] + body[m.end():]
    m = re.search(r"<style>.*?</style>", body, re.S)
    style = m.group(0)
    body = (body[: m.start()] + body[m.end():]).strip()
    body = re.sub(r"<script>document\.documentElement\.lang[^<]*</script>\s*", "", body)
    return head, style, body


def main() -> None:
    if not FONT_CSS.exists():
        sys.exit(f"Schriften fehlen: {FONT_CSS}\nEinmalig mit fetch_fonts.py laden.")

    src = SRC.read_text(encoding="utf-8")

    print("Fotos:")
    for slot, spec in IMAGES.items():
        name, width, quality = spec[0], spec[1], spec[2]
        brightness = spec[3] if len(spec) > 3 else 1.0
        token = f"__IMG_{slot}__"
        if token not in src:
            print(f"  (uebersprungen, {token} nicht in der Quelle)")
            continue
        src = src.replace(token, encode_image(name, width, quality, brightness))

    src = src.replace("__FONTS__", FONT_CSS.read_text(encoding="utf-8"))

    leftover = re.findall(r"__[A-Z_]+__", src)
    if leftover:
        sys.exit(f"Nicht ersetzte Platzhalter: {sorted(set(leftover))}")

    dist = ROOT / "dist"
    dist.mkdir(exist_ok=True)
    (dist / "artifact.html").write_text(src, encoding="utf-8")

    head, style, body = split_head(src)
    doc = (
        "<!DOCTYPE html>\n"
        '<html lang="sv">\n<head>\n'
        + "\n".join(head) + "\n" + style + "\n"
        "</head>\n<body>\n" + body + "\n</body>\n</html>\n"
    )
    (ROOT / "index.html").write_text(doc, encoding="utf-8")

    print(f"\ndist/artifact.html  {len(src.encode()) // 1024} KB")
    print(f"index.html          {len(doc.encode()) // 1024} KB")


if __name__ == "__main__":
    main()
