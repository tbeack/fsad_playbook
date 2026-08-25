#!/usr/bin/env python3
"""
build-assistant-index.py — Build the retrieval index for the playbook-assistant skill.

Reuses extract_chunks() from build-embeddings.py (same chunk boundaries the
in-app semantic search uses) and adds each chunk's top-level page (from
sectionToPageMap) plus an in-app anchor, so a Claude Code skill can grep the
index and cite a real `#page/sectionId` link back into the playbook.

Produces:
  skills/playbook-assistant/index/playbook-index.jsonl — one JSON object per
    line ({sectionId, title, label, page, anchor, text}), so Grep can match
    individual chunks instead of the whole file being a single match.
  skills/playbook-assistant/index/meta.json — {playbook_version, generated_at,
    chunk_count}, used by the skill to flag a stale index.

Requirements: Python 3.6+, stdlib only.
"""

import importlib.util
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "fsad-playbook.html"
INDEX_DIR = ROOT / "skills" / "playbook-assistant" / "index"
JSONL_OUT = INDEX_DIR / "playbook-index.jsonl"
META_OUT = INDEX_DIR / "meta.json"

# build-embeddings.py has a hyphen in its filename, so it can't be a normal
# `import` target — load it by path instead to reuse extract_chunks().
_spec = importlib.util.spec_from_file_location(
    "build_embeddings", Path(__file__).parent / "build-embeddings.py"
)
_build_embeddings = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_build_embeddings)
extract_chunks = _build_embeddings.extract_chunks


def extract_section_to_page_map(content):
    """Parse the `const sectionToPageMap = {...};` JS object literal into a dict."""
    m = re.search(r"const sectionToPageMap\s*=\s*\{(.*?)\};", content, re.DOTALL)
    if not m:
        print("  WARNING: sectionToPageMap not found — pages will be empty.", file=sys.stderr)
        return {}
    body = m.group(1)
    pairs = re.findall(r"'([^']+)'\s*:\s*'([^']+)'", body)
    return dict(pairs)


def extract_version(content):
    m = re.search(r"<title>.*?\(v([\d.]+)\)</title>", content)
    return m.group(1) if m else "unknown"


def main():
    if not SRC.exists():
        print(f"ERROR: source not found: {SRC}", file=sys.stderr)
        sys.exit(1)

    print(f"Source: {SRC} ({SRC.stat().st_size:,} bytes)")
    content = SRC.read_text(encoding="utf-8")

    print("Extracting chunks...")
    # Untruncated: unlike embeddings.json, this index isn't shipped to the
    # browser, so there's no payload-size reason to cap chunk length.
    chunks = extract_chunks(content, max_chars=None)

    print("Resolving sections to pages...")
    section_to_page = extract_section_to_page_map(content)

    INDEX_DIR.mkdir(parents=True, exist_ok=True)

    with open(JSONL_OUT, "w", encoding="utf-8") as f:
        for chunk in chunks:
            page = section_to_page.get(chunk["sectionId"], "")
            record = {
                "sectionId": chunk["sectionId"],
                "title": chunk["title"],
                "label": chunk["label"],
                "page": page,
                "anchor": f"#{page}/{chunk['sectionId']}" if page else "",
                "text": chunk["text"],
            }
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    version = extract_version(content)
    meta = {
        "playbook_version": version,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "chunk_count": len(chunks),
    }
    with open(META_OUT, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
        f.write("\n")

    size_kb = JSONL_OUT.stat().st_size / 1024
    print(f"Chunks: {len(chunks)}")
    print(f"Output: {JSONL_OUT} ({size_kb:.1f} KB)")
    print(f"Meta: {META_OUT} (playbook_version={version})")


if __name__ == "__main__":
    main()
