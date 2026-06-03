# CBP-220 — Replace CSS pod diagram in Section 03 — The FSAD Pod with FSAD Operating Model design images (dark + light)

## Source
User request — new FSAD Operating Model design images (dark + light variants) are available and should replace the existing CSS-based pod diagram in the FSAD page.

## Summary
Section 03 of the FSAD page currently renders a CSS emoji ring (`.pod-visual` / `.pod-circle`) to illustrate the pod. The new FSAD Operating Model PNGs (dark + light) are richer design illustrations that better convey the operating model. Replace the CSS diagram with these images, following the same pattern used for pod images on the Pod Compositions page (base64-embedded, theme-switching via `html[data-theme]` selectors, 405px-wide column).

## Assessment
**Existing content:** Lines 2267–2283 in `fsad-playbook.html`:
```html
<div class="pod-visual">
  <div class="pod-circle">
    <div class="pod-center">...</div>
    <div class="pod-member pm">...</div>
    <div class="pod-member ux">...</div>
    <div class="pod-member eng">...</div>
    <div class="pod-member eng2">...</div>
  </div>
  <div class="pod-description">...</div>
</div>
```
The `.pod-visual` is a flex container — left side is the CSS circle, right side is `.pod-description` text.

**Source images:**
- `markdown/images/FSAD Operating Model - Dark.png`
- `markdown/images/FSAD Operating Model - Light.png`

**Action needed:** Replace `.pod-circle` div with dark + light `<img>` tags (base64-encoded), add CSS for theme-switching and sizing matching the pod image pattern.

## Plan

1. Base64-encode both images.
2. Add CSS (after the existing pod-image CSS blocks):
   - `.fsad-pod-diagram` — `width: 100%`, `border-radius: var(--radius)`, `display: block`
   - `html[data-theme="dark"] .fsad-pod-diagram-light { display: none; }`
   - `html[data-theme="light"] .fsad-pod-diagram-dark { display: none; }`
3. Replace the `.pod-circle` div in `.pod-visual` with the two `<img>` tags. Keep `.pod-description` intact.
4. Adjust `.pod-visual` layout CSS if needed so the image + description sit side by side (same grid/flex pattern as the pod panels).
5. Run `python3 scripts/build-dist.py` to rebuild dist.

All criteria verified 2026-06-03 before commit.

## Acceptance Criteria
- [x] Section 03 shows the FSAD Operating Model illustration instead of the CSS emoji ring
- [x] Dark theme displays the dark image; light theme displays the light image
- [x] `.pod-description` text remains visible alongside the image
- [x] No subtitle labels added below the image
- [x] `dist/fsad-playbook.html` rebuilt and in sync
