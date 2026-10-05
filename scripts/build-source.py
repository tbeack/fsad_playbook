#!/usr/bin/env python3
"""
build-source.py — assemble fsad-playbook.html from src/ (template + includes).

Assembly model (markdown/refactor/architecture.md §2): verbatim textual
substitution into src/playbook.tmpl.html. No ES modules, no <script src>,
no reformatting, no renaming.

Directives:
  1. Line directive, on its own line:
       <!-- @include src/<path> -->
     Replaced by the referenced file's bytes verbatim. The directive line,
     including its newline, is consumed.
  2. In-attribute directive, inside an attribute value:
       @asset(<name>)
     Replaced by "data:<mime>;base64,<encoded bytes of src/assets/<name>>".
     A "<name>.b64" file holds verbatim base64 text (used when re-encoding
     a decoded binary is not byte-identical); its text is used as-is.

Divergence guard: src/.build-stamp (local, gitignored) holds two lines:
the sha256 of the last build's output, and "src <sha256>" over every file
under src/. If fsad-playbook.html exists and does not match line 1, the
build aborts — the generated file was edited directly; port the edit into
src/ or pass --force. build-dist.py checks both lines before it builds.
The stamp is untracked so a merge can never change it (CBP-650).

Requirements: Python 3.6+, stdlib only. Single pass, deterministic.
"""

import base64
import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC_DIR = ROOT / "src"
TEMPLATE = SRC_DIR / "playbook.tmpl.html"
ASSETS_DIR = SRC_DIR / "assets"
OUT = ROOT / "fsad-playbook.html"
STAMP = SRC_DIR / ".build-stamp"

INCLUDE_RE = re.compile(rb"(?m)^[ \t]*<!-- @include ([^\s]+) -->\r?\n?")
ASSET_RE = re.compile(rb"@asset\(([A-Za-z0-9._-]+)\)")

MIME_TYPES = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
}


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def src_digest():
    """sha256 over every file under src/ (path + content), dotfiles skipped."""
    h = hashlib.sha256()
    for path in sorted(SRC_DIR.rglob("*")):
        rel = path.relative_to(SRC_DIR)
        if not path.is_file() or any(p.startswith(".") for p in rel.parts):
            continue
        h.update(rel.as_posix().encode("utf-8") + b"\0")
        h.update(sha256_file(path).encode("ascii") + b"\n")
    return h.hexdigest()


def read_stamp():
    """Return (output sha256, src digest or None), or (None, None) if absent."""
    if not STAMP.exists():
        return None, None
    lines = STAMP.read_text().split()
    out_hash = lines[0] if lines else None
    src_hash = lines[2] if len(lines) >= 3 and lines[1] == "src" else None
    return out_hash, src_hash


def check_divergence(force):
    stamped, _ = read_stamp()
    if not OUT.exists() or stamped is None:
        return
    actual = sha256_file(OUT)
    if actual != stamped:
        if force:
            print(f"  WARNING: {OUT.name} diverged from .build-stamp — overwriting (--force).")
            return
        sys.exit(
            f"ERROR: {OUT.name} does not match src/.build-stamp\n"
            f"  stamped: {stamped}\n"
            f"  actual:  {actual}\n"
            "The generated file was edited directly — port the edit into src/ "
            "or pass --force."
        )


def include_directive(m):
    rel = m.group(1).decode("utf-8")
    path = ROOT / rel
    if not path.is_file():
        sys.exit(f"ERROR: @include target not found: {rel}")
    include_directive.count += 1
    return path.read_bytes()


def asset_directive(m):
    name = m.group(1).decode("utf-8")
    path = ASSETS_DIR / name
    if not path.is_file():
        sys.exit(f"ERROR: @asset target not found: src/assets/{name}")
    if name.endswith(".b64"):
        ext = Path(name[: -len(".b64")]).suffix.lower()
        encoded = path.read_bytes().decode("ascii").strip()
    else:
        ext = path.suffix.lower()
        encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    mime = MIME_TYPES.get(ext)
    if mime is None:
        sys.exit(f"ERROR: no MIME type known for asset: src/assets/{name}")
    asset_directive.count += 1
    return f"data:{mime};base64,{encoded}".encode("ascii")


def main():
    force = "--force" in sys.argv[1:]
    if not TEMPLATE.is_file():
        sys.exit(f"ERROR: template not found: {TEMPLATE}")

    check_divergence(force)

    include_directive.count = 0
    asset_directive.count = 0

    content = TEMPLATE.read_bytes()
    content = INCLUDE_RE.sub(include_directive, content)
    content = ASSET_RE.sub(asset_directive, content)

    OUT.write_bytes(content)
    digest = hashlib.sha256(content).hexdigest()
    STAMP.write_text(f"{digest}\nsrc {src_digest()}\n")

    print(f"  Includes: {include_directive.count}, assets: {asset_directive.count}")
    print(f"  Written: {OUT} ({len(content):,} bytes)")
    print(f"  sha256: {digest}")


if __name__ == "__main__":
    main()
