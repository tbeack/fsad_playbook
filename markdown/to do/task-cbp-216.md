# CBP-216 — Incorporate new Triad pod design images

## Summary

Replace the CSS ring diagram in the Triad pod panel (Pod Explorer page) with the new PNG design images. Two variants exist — dark and light — and need to switch with the app's theme.

## Assessment

The Pod Explorer's `#pod-triad` panel currently uses a CSS-only ring visualization (`.pod-ring` with emoji-labeled members). New design images now exist at:
- `markdown/images/Pod - Triad - Dark.png` (~1.4 MB)
- `markdown/images/Pod - Triad - Light.png` (~1.3 MB)

The playbook is a single self-contained HTML file; images must be embedded as base64 data URIs. Theme switching is driven by `html[data-theme="dark"|"light"]` (set by `applyTheme()` in JS). The `data-theme` attribute is the correct hook for CSS-based image swapping.

**Location:** `fsad-playbook.html` lines 2471–2494 (pod-triad panel) and ~1114 (pod CSS).

## Plan

1. Base64-encode both PNG files:
   ```bash
   python3 -c "import base64; d=base64.b64encode(open('markdown/images/Pod - Triad - Dark.png','rb').read()).decode(); open('/tmp/triad-dark.b64','w').write(d)"
   python3 -c "import base64; d=base64.b64encode(open('markdown/images/Pod - Triad - Light.png','rb').read()).decode(); open('/tmp/triad-light.b64','w').write(d)"
   ```

2. Add CSS rules immediately after the existing `.pod-visual-wrap` block (~line 1119):
   ```css
   .triad-diagram { width: 100%; border-radius: var(--radius); display: block; }
   html[data-theme="dark"]  .triad-diagram-light { display: none; }
   html[data-theme="light"] .triad-diagram-dark  { display: none; }
   ```

3. Replace the `<div class="pod-ring">…</div>` block inside `#pod-triad`'s `.pod-visual-wrap` with two `<img>` elements (one dark, one light), keeping the existing `.pod-type-label`, `.pod-type-name`, and `.pod-type-count` divs unchanged below the image.

4. Run the dist build: `python3 scripts/build-dist.py`

5. Update CHANGELOG and bump version from v2.81.5 → v2.82.0.

## Acceptance Criteria

All criteria verified 2026-06-02 before commit.

- [x] The Pod - Triad panel shows the PNG image instead of the CSS ring diagram
- [x] When theme is dark, only the dark image is visible; when light, only the light image
- [x] The pod-type label row (Configuration A · The Triad · 3 humans + N agents) remains visible below the image
- [x] The pod detail section (role cards, meta boxes) is unchanged
- [x] The image fills the `.pod-visual-wrap` column width and looks correct at default zoom
- [x] CHANGELOG updated, version bumped to v2.82.0 in title, sidebar badge, and CHANGELOG modal
- [x] `dist/fsad-playbook.html` is rebuilt and in sync
