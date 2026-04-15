# CBP-033 — Add `Workflows` section to the left nav (new top-level page)

## Source
Own idea — teams getting started need concrete workflow examples beyond the methodology overview.

## Summary
Add a new top-level page `Workflows` to the playbook, positioned in the left nav immediately after `Pod Compositions` and before `Claude Best Practices`. The page serves as an example library for teams getting started — initial content is sourced verbatim from screenshots in `markdown/examples/`, rendered using the playbook's existing visual language (typography, spacing, accent color, card patterns) rather than as raw images.

## Assessment
The playbook currently has 5 top-level pages (`FSAD`, `Pod Compositions`, `Claude Best Practices`, `Codex Best Practices`, `KPIs to Measure Impact`). No `Workflows` page exists. Source material lives as 4 screenshots in `markdown/examples/`:

- `Screenshot 2026-04-14 at 17.12.02.png`
- `Screenshot 2026-04-14 at 17.12.12.png`
- `Screenshot 2026-04-14 at 17.12.20.png`
- `Screenshot 2026-04-14 at 17.12.31.png`

Content from these screenshots should be transcribed "as is" into the new page, but visually restyled to match the playbook's existing card/section patterns (see `page-pods` for the closest analog — pod explorer cards, section headers, collapsibles).

**Location:** `fsad-playbook.html` — new `<section id="page-workflows">` block + left nav entry + router entry.

## Plan

1. **Read the 4 screenshots** in `markdown/examples/` to extract the workflow content (titles, steps, descriptions, diagrams).
2. **Add left nav entry** — insert a new nav group for `Workflows` directly after the `Pod Compositions` group in the sidebar. Match existing nav group markup (icon + label + sub-sections).
3. **Add new page container** — create `<section id="page-workflows" class="page">` after `page-pods` in the DOM, following the same structural pattern (page header, intro, section anchors for scroll-spy).
4. **Transcribe screenshot content** into semantic HTML — use existing playbook components (cards, grids, collapsibles, step lists) rather than raw image embeds. One section per screenshot, with anchor IDs for scroll-spy and search.
5. **Register in router** — add `workflows` to the page list in `switchPage()` and update `sectionToPageMap` for any new section IDs so search navigation works.
6. **Register in scroll spy** — ensure new section anchors are picked up by `sectionObserver`.
7. **Search index** — confirm the new content is indexed by the existing full-text search (it reads the DOM, so this should be automatic — verify).
8. **Bump version** — update the title tag + `README.md` version history.
9. **Verify in browser** — open `fsad-playbook.html`, click through `FSAD → Pod Compositions → Workflows → Claude Best Practices` to confirm nav order, scroll-spy behavior, search, and theme (light/dark/auto) all work on the new page.

## Acceptance Criteria
- [x] `Workflows` appears in the left nav immediately after `Pod Compositions` and before `Claude Best Practices`
- [x] Clicking the nav entry routes to `#workflows` and shows the new page
- [x] Content from all 4 screenshots in `markdown/examples/` is transcribed into the page as semantic HTML (not embedded images)
- [x] Visual styling matches existing playbook patterns (cards, typography, spacing, accent color) — no bespoke one-off styles
- [x] Scroll-spy highlights the correct nav entry as the user scrolls through sections on the Workflows page
- [x] Full-text search returns results from the new Workflows content and navigates correctly
- [x] Page renders correctly in light, dark, and auto theme modes
- [x] Version tag updated in the `<title>` and `README.md`
