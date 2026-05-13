# CBP-141 — Reduce whitespace below section headers

## Source
User observation — the section headers have too much whitespace surrounding them; the training app (`fsad-training.html`) has a tighter feel that should be matched.

## Summary
The `section` CSS rule in `fsad-playbook.html` uses symmetrical `padding: 5rem 2.5rem` (5rem top and bottom), while the training app uses `padding: 1.5rem 2.5rem 5rem` (1.5rem top, 5rem bottom). Adopting the training file's value reduces the space that appears before and around each section's label/title block, making the page feel more compact and content-forward.

## Assessment
Compared both files against the reference path provided by the user.

All section-header CSS — `.section-label`, `.section-title`, `.section-subtitle` — is **identical** between the two files. The single difference is in the base `section` rule:

| File | Rule |
|------|------|
| `fsad-playbook.html` (line 625) | `padding: 5rem 2.5rem;` |
| `fsad-training.html` (line 625) | `padding: 1.5rem 2.5rem 5rem;` |

Responsive breakpoints (`@media max-width: 900px` → `3rem 1.2rem` and `@media max-width: 600px` → `2rem 1rem`) are identical and do not need to change.

**Location:** `fsad-playbook.html` — line 625 inside the `section { … }` rule

## Plan

1. In `fsad-playbook.html` at line 625, change:
   ```
   padding: 5rem 2.5rem;
   ```
   to:
   ```
   padding: 1.5rem 2.5rem 5rem;
   ```
2. Run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.
3. Visually verify one section in the browser — confirm the header area is tighter at the top and the bottom still has ample breathing room.

All criteria verified 2026-05-13 before commit.

## Acceptance Criteria
- [x] `fsad-playbook.html` line 625 reads `padding: 1.5rem 2.5rem 5rem;`
- [x] `dist/fsad-playbook.html` is regenerated and contains the updated value
- [x] Opening the playbook in a browser shows reduced top-of-section whitespace matching the training file's visual rhythm
