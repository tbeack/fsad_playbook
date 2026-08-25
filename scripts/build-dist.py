#!/usr/bin/env python3
"""
build-dist.py — produce dist/fsad-playbook.html as a fully self-contained file.

Steps:
  1. Inline Google Fonts: fetch the CSS, download each WOFF2 file, replace
     src URLs with data: URIs, swap the <link> tag for a <style> block.
  2. Inline playgrounds: HTML-escape each playground file and replace the
     <object data="...">...</object> block with <iframe srcdoc="...">.
     Any remaining <a href="filename"> links are replaced with href="#".
  3. Write dist/fsad-playbook.html.

Requirements: Python 3.6+, stdlib only.
"""

import base64
import html
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "fsad-playbook.html"
DIST_DIR = ROOT / "dist"
OUT = DIST_DIR / "fsad-playbook.html"
EMBEDDINGS_JSON = DIST_DIR / "embeddings.json"
EMBEDDINGS_SCRIPT = Path(__file__).parent / "build-embeddings.py"
ASSISTANT_INDEX_SCRIPT = Path(__file__).parent / "build-assistant-index.py"

FONTS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Inter:wght@300;400;500;600;700;800"
    "&family=IBM+Plex+Mono:wght@400;500"
    "&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400"
    "&display=swap"
)

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

PLAYGROUNDS = [
    "add-task-playground.html",
    "commit-changes-playground.html",
]


def fetch_bytes(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def inline_fonts(content):
    print("  Fetching Google Fonts CSS...")
    css_bytes = fetch_bytes(FONTS_URL, {"User-Agent": USER_AGENT})
    css = css_bytes.decode("utf-8")

    # Collect unique WOFF2 URLs (preserving order)
    woff2_urls = list(dict.fromkeys(re.findall(r"url\((https://[^)]+\.woff2[^)]*)\)", css)))
    print(f"  Downloading {len(woff2_urls)} font file(s)...")

    url_to_data_uri = {}
    for url in woff2_urls:
        data = fetch_bytes(url)
        b64 = base64.b64encode(data).decode("ascii")
        url_to_data_uri[url] = f"data:font/woff2;base64,{b64}"
        name = url.split("/")[-1].split("?")[0] or url[-40:]
        print(f"    {name}: {len(data):,} bytes")

    def _replace_url(m):
        original_url = m.group(1)
        return f"url({url_to_data_uri.get(original_url, original_url)})"

    inlined_css = re.sub(r"url\((https://[^)]+\.woff2[^)]*)\)", _replace_url, css)

    # Replace the <link> tag with a <style> block
    link_re = re.compile(
        r'<link\s+href="https://fonts\.googleapis\.com/[^"]+"\s+rel="stylesheet">'
    )
    replacement = f"<style>\n{inlined_css}\n</style>"
    result, n = link_re.subn(replacement, content)
    if n == 0:
        print("  WARNING: Google Fonts <link> tag not found — nothing replaced.")
    else:
        print(f"  Google Fonts inlined ({n} substitution(s)).")
    return result


def inline_playground(content, filename):
    path = ROOT / filename
    if not path.exists():
        print(f"  WARNING: {filename} not found — skipping.")
        return content

    pg_html = path.read_text(encoding="utf-8")
    escaped = html.escape(pg_html, quote=True)

    # Replace <object data="filename" ...>...</object> with <iframe srcdoc="...">
    obj_re = re.compile(
        rf'<object\s+data="{re.escape(filename)}"[^>]*>.*?</object>',
        re.DOTALL,
    )
    iframe_tag = (
        f'<iframe srcdoc="{escaped}" '
        f'width="100%" height="720" '
        f'style="display:block; color-scheme:dark; border:none;"></iframe>'
    )
    result, n = obj_re.subn(iframe_tag, content)
    if n == 0:
        print(f"  WARNING: <object> for {filename} not found.")
    else:
        print(f"  {filename}: <object> → <iframe srcdoc> ({n} substitution(s)).")

    # Replace any remaining href="filename" (standalone "open in new tab" links)
    href_re = re.compile(rf'href="{re.escape(filename)}"')
    result, m = href_re.subn('href="#"', result)
    if m:
        print(f"  {filename}: replaced {m} standalone href(s) with href=\"#\".")

    return result


def build_embeddings():
    print(f"  Running {EMBEDDINGS_SCRIPT.name}...")
    result = subprocess.run(
        [sys.executable, str(EMBEDDINGS_SCRIPT)],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    for line in result.stdout.strip().splitlines():
        print(f"    {line}")


def build_assistant_index():
    print(f"  Running {ASSISTANT_INDEX_SCRIPT.name}...")
    result = subprocess.run(
        [sys.executable, str(ASSISTANT_INDEX_SCRIPT)],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    for line in result.stdout.strip().splitlines():
        print(f"    {line}")


def inject_embeddings(content):
    chunks = json.loads(EMBEDDINGS_JSON.read_text(encoding="utf-8"))
    payload = json.dumps(chunks, ensure_ascii=False, separators=(",", ":"))
    old = "if (typeof PLAYBOOK_EMBEDDINGS === 'undefined') { var PLAYBOOK_EMBEDDINGS = []; }"
    new = f"var PLAYBOOK_EMBEDDINGS = {payload};"
    if old not in content:
        print("  WARNING: PLAYBOOK_EMBEDDINGS fallback not found — nothing injected.")
        return content
    print(f"  Injected PLAYBOOK_EMBEDDINGS ({len(chunks)} chunks, {len(payload):,} chars).")
    return content.replace(old, new, 1)


def main():
    if not SRC.exists():
        print(f"ERROR: source file not found: {SRC}")
        sys.exit(1)

    print(f"Source: {SRC} ({SRC.stat().st_size:,} bytes)")

    content = SRC.read_text(encoding="utf-8")

    print("\nStep 1 — Inlining Google Fonts")
    content = inline_fonts(content)

    print("\nStep 2 — Inlining playground files")
    for filename in PLAYGROUNDS:
        content = inline_playground(content, filename)

    print("\nStep 3 — Injecting PLAYBOOK_EMBEDDINGS")
    DIST_DIR.mkdir(exist_ok=True)
    build_embeddings()
    content = inject_embeddings(content)

    print("\nStep 4 — Rebuilding playbook-assistant index")
    build_assistant_index()

    print("\nStep 5 — Writing output")
    OUT.write_text(content, encoding="utf-8")
    size_mb = OUT.stat().st_size / 1_048_576
    print(f"  Written: {OUT} ({size_mb:.1f} MB)")

    print("\nDone. Open dist/fsad-playbook.html to verify.")


if __name__ == "__main__":
    main()
