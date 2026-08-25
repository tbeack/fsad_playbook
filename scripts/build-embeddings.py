#!/usr/bin/env python3
"""
build-embeddings.py — Extract playbook text chunks for semantic search.

Parses fsad-playbook.html, strips HTML tags, and produces:
  dist/embeddings.json  — array of {id, sectionId, title, label, text} objects

These chunks are injected into dist/fsad-playbook.html as PLAYBOOK_EMBEDDINGS.
At runtime, Transformers.js (lazy-loaded from CDN) embeds both the chunks and
user queries in the browser; cosine similarity is computed entirely in JS.

Requirements: Python 3.6+, stdlib only.
"""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "fsad-playbook.html"
DIST_DIR = ROOT / "dist"
OUT = DIST_DIR / "embeddings.json"

SKIP_TAGS = frozenset(["script", "style", "svg", "noscript"])
MAX_CHUNK_CHARS = 2000  # truncate text per chunk to keep payload reasonable


class TextStripper(HTMLParser):
    """Strip HTML tags; skip content inside script/style/svg blocks."""

    def __init__(self):
        super().__init__()
        self._parts = []
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self._skip_depth += 1

    def handle_endtag(self, tag):
        if tag in SKIP_TAGS and self._skip_depth > 0:
            self._skip_depth -= 1

    def handle_data(self, data):
        if self._skip_depth == 0:
            self._parts.append(data)

    def result(self):
        text = " ".join(self._parts)
        return re.sub(r"\s+", " ", text).strip()


def strip_html(html_str):
    p = TextStripper()
    p.feed(html_str)
    return p.result()


def find_attr(tag_html, attr):
    """Extract attribute value from an opening tag string."""
    m = re.search(rf'\b{attr}="([^"]*)"', tag_html)
    return m.group(1) if m else ""


def balanced_end(content, start, tag):
    """
    Find the position of the closing </tag> that matches the opening tag
    already consumed at position start (depth=1 entering this function).
    Returns index of the start of </tag>, or -1 if not found.
    """
    depth = 1
    pos = start
    open_pat = re.compile(rf"<{tag}\b", re.IGNORECASE)
    close_pat = re.compile(rf"</{tag}>", re.IGNORECASE)
    while depth > 0 and pos < len(content):
        m_open = open_pat.search(content, pos)
        m_close = close_pat.search(content, pos)
        if m_close is None:
            return -1
        if m_open is not None and m_open.start() < m_close.start():
            depth += 1
            pos = m_open.end()
        else:
            depth -= 1
            if depth == 0:
                return m_close.start()
            pos = m_close.end()
    return -1


def extract_chunks(content, max_chars=MAX_CHUNK_CHARS):
    """Extract section/collapsible chunks from the playbook HTML.

    max_chars truncates each chunk's text (default MAX_CHUNK_CHARS, sized for
    the in-browser embeddings payload). Pass None for untruncated text, e.g.
    for an offline index that isn't shipped to the browser.
    """
    chunks = []

    # Find every <section id="..."> opening tag
    section_pat = re.compile(r'<section\b([^>]*)>', re.IGNORECASE)

    for sm in section_pat.finditer(content):
        attrs_str = sm.group(1)
        sec_id = find_attr(attrs_str, "id")
        if not sec_id:
            continue

        body_start = sm.end()
        body_end = balanced_end(content, body_start, "section")
        if body_end == -1:
            continue
        body = content[body_start:body_end]

        # Title: look for .section-title, h1, or h2
        title = ""
        for pat in [
            r'class="[^"]*section-title[^"]*"[^>]*>(.*?)</(?:span|div|h\d)',
            r'<h1[^>]*>(.*?)</h1>',
            r'<h2[^>]*>(.*?)</h2>',
        ]:
            m = re.search(pat, body, re.DOTALL)
            if m:
                title = strip_html(m.group(1))
                break
        if not title:
            title = sec_id.replace("-", " ").title()

        # Label: look for .section-label or .hero-badge
        label = ""
        for pat in [
            r'class="[^"]*section-label[^"]*"[^>]*>(.*?)</(?:span|div)',
            r'class="[^"]*hero-badge[^"]*"[^>]*>(.*?)</(?:span|div)',
        ]:
            m = re.search(pat, body, re.DOTALL)
            if m:
                label = strip_html(m.group(1))
                break

        clean = strip_html(body)
        if max_chars is not None:
            clean = clean[:max_chars]

        chunks.append({
            "id": f"sec_{sec_id}",
            "sectionId": sec_id,
            "title": title,
            "label": label,
            "text": clean,
        })

        # Collapsibles within this section
        col_pat = re.compile(r'<div\b([^>]*)class="([^"]*\bcollapsible\b[^"]*)"([^>]*)>', re.IGNORECASE)
        for ci, cm in enumerate(col_pat.finditer(body)):
            col_body_start = cm.end()
            col_body_end = balanced_end(body, col_body_start, "div")
            if col_body_end == -1:
                continue
            col_body = body[col_body_start:col_body_end]

            # Collapsible header h3
            hdr = re.search(r'<h3[^>]*>(.*?)</h3>', col_body, re.DOTALL)
            col_title = strip_html(hdr.group(0)) if hdr else ""
            if not col_title:
                continue

            col_clean = strip_html(col_body)
            if max_chars is not None:
                col_clean = col_clean[:max_chars]
            chunks.append({
                "id": f"col_{sec_id}_{ci}",
                "sectionId": sec_id,
                "title": col_title,
                "label": label,
                "text": col_clean,
            })

    return chunks


def main():
    if not SRC.exists():
        print(f"ERROR: source not found: {SRC}", file=sys.stderr)
        sys.exit(1)

    print(f"Source: {SRC} ({SRC.stat().st_size:,} bytes)")
    content = SRC.read_text(encoding="utf-8")

    print("Extracting chunks…")
    chunks = extract_chunks(content)

    DIST_DIR.mkdir(exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, separators=(",", ":"))

    total_chars = sum(len(c["text"]) for c in chunks)
    size_kb = OUT.stat().st_size / 1024
    print(f"Chunks: {len(chunks)}")
    print(f"Total text: {total_chars:,} chars (~{total_chars // 4:,} tokens estimated)")
    print(f"Output: {OUT} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
