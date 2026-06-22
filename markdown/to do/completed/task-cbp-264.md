# CBP-264 — Do the rebuild to include the two updated "Builder Duo" pod images

**Todoist ID:** 6gwVPQF8cvpMJFWG

## Summary

Two updated Builder Duo pod images (`Pod - Builder Duo - Dark - v2.png` and `Pod - Builder Duo - Light - v2.png`) have been modified locally and need to be re-embedded into `fsad-playbook.html` and the dist rebuilt. The images are embedded as base64 data URIs in the HTML source; the dist artifact must be regenerated afterward to stay in sync.

## Assessment

The modified images are tracked files with local uncommitted changes:
- `markdown/images/Pod - Builder Duo - Dark - v2.png` — modified
- `markdown/images/Pod - Builder Duo - Light - v2.png` — modified

The playbook embeds pod images as base64 `data:image/png;base64,...` strings directly in `fsad-playbook.html`. The existing Builder Duo entries need their base64 payloads replaced with the new image content.

**Location:** `fsad-playbook.html` — search for `Builder Duo` to find the `<img>` tags with embedded base64.

## Plan

1. Find the Builder Duo `<img>` tags in `fsad-playbook.html` (grep for "Builder Duo").
2. Re-encode the updated PNGs as base64:
   ```bash
   base64 -i "markdown/images/Pod - Builder Duo - Dark - v2.png"
   base64 -i "markdown/images/Pod - Builder Duo - Light - v2.png"
   ```
3. Replace the existing base64 payloads in the Dark and Light `<img src="data:image/png;base64,...">` tags.
4. Run the build script:
   ```bash
   python3 scripts/build-dist.py
   ```
5. Bump version and add changelog entry (patch bump: vX.Y.Z → vX.Y.Z+1).
6. Stage and commit `fsad-playbook.html`, `dist/fsad-playbook.html`, `dist/embeddings.json`, and the two PNG files.

All criteria verified 2026-06-22 before commit.

## Acceptance Criteria

- [x] Builder Duo Dark and Light images visually updated in the browser (open `fsad-playbook.html`, navigate to Pod Compositions)
- [x] Both theme variants (dark/light toggle) show the correct updated image
- [x] `dist/fsad-playbook.html` regenerated and in sync with source
- [x] PNG files staged and committed alongside the HTML changes
- [x] Version bumped and changelog entry added
