# CBP-032 Phase 3 — Typography, Consistency, Polish

**Parent:** [task-cbp-032.md](task-cbp-032.md)

## Goal
Close out the overhaul. Commit to a typographic identity, resolve inconsistencies (hub pattern one-off, depth dots, 3-state theme toggle), polish small details, and ship as v18.

## Scope (what changes)
Typography rules, Hub pattern decision (apply or remove), depth-dot legend, theme toggle JS, version badge behavior, mobile media queries, topic-footer prev/next styling, `CHANGELOG.md`, `README.md`.

## Plan

### 1. Typography — apply DM Serif Display or remove
- Check Google Fonts import for `DM Serif Display`.
- **Option A:** Apply to hero `<h1>` and major section headlines. Use Inter for sub-headings and body. IBM Plex Mono strictly for typed commands.
- **Option B:** Remove the import entirely. Use Inter for all headlines.
- Pick one. Delete the dead code if Option B.

### 2. Type scale — 4 sizes max
Document in CSS:
```css
/* Type scale (4 sizes max):
   --type-display: 2.5rem  (hero h1)
   --type-heading: 1.5rem  (h2)
   --type-body: 1rem       (default prose, h3)
   --type-small: 0.875rem  (captions, metadata)
*/
```
Audit existing font-size declarations and consolidate.

### 3. Hub pattern — backport or remove
Two options:
- **Option A (recommended if cheap):** Backport Hub cards to Codex, Pod Compositions, KPIs, FSAD pages. Each page opens on a grid of topic cards with chip previews.
- **Option B:** Remove the Hub from Claude Best Practices. Use a single consistent pattern (probably a clean TOC with in-page anchors) across all 5 pages.

Pick one. Don't leave the Hub as a one-off.

### 4. Depth dots — label or remove
- If depth dots (`●●○`) are kept: add a legend once near the top of the Hub page explaining what they mean (reading time? difficulty?).
- Otherwise: remove them from all hub cards.

### 5. Theme toggle — 2 states
- Locate the theme toggle JS (likely cycles `auto → light → dark`).
- Change to 2 states: `light` and `dark`. Default to OS preference on first load (no explicit "auto" mode).
- Update the toggle button icon/label to match.
- Confirm `localStorage` still persists the user's manual choice.

### 6. Version badge — clickable
- Find the `· v17` (or current) badge in the sidebar header.
- Wrap in a button/link that scrolls to a changelog section (or opens a modal with changelog content).
- Add a changelog section at the bottom of the FSAD page, or link to `CHANGELOG.md` in the repo.

### 7. Mobile audit
- Test at 320px, 375px, 768px.
- Confirm hub grid reflows to single column.
- Confirm sidebar collapses correctly (hamburger or drawer).
- Fix any double-wrapping pill rows.
- Fix any horizontal scroll on narrow widths.

### 8. Topic-footer prev/next differentiation
- Current: both are pills in the same style, making direction ambiguous.
- Fix: "← Previous" left-aligned with left arrow, muted style. "Next →" right-aligned with right arrow, slightly more prominent (primary accent).

### 9. Version bump + changelog
- Update `<title>` tag and sidebar version badge to `v18`.
- Add `v18` entry to `CHANGELOG.md` summarizing all 3 phases.
- Bump version in `README.md`.

### 10. Final `/critique` re-run
- Run the critique pass again on the v18 file.
- Goal: the "AI made this" verdict is no longer applicable.
- Capture output in `markdown/research/UX_critique_v18.md` for future reference.

## Acceptance Criteria
- [x] DM Serif Display either applied to headlines or removed from Google Fonts import (no dead code)
- [x] Type scale limited to 4 sizes; documented in CSS comment
- [x] Hub pattern is consistent across all 5 pages (either applied everywhere or removed)
- [x] Depth dots labeled with a legend or removed
- [x] Theme toggle reduced to 2 states (light/dark); defaults to OS; persists user choice
- [x] Version badge clickable and surfaces changelog
- [ ] Mobile layout verified at 320px, 375px, 768px — no double-wraps, no horizontal scroll
- [x] Topic-footer prev/next visually differentiated (direction + weight)
- [x] `<title>`, sidebar badge, `CHANGELOG.md`, and `README.md` all bumped to v18
- [x] `/critique` re-run captured in `markdown/research/UX_critique_v18.md`; "AI made this" verdict flipped
- [x] Committed as a single atomic commit referencing CBP-032 Phase 3
