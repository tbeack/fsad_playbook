# CBP-235 — "What's new this week?" sidebar widget

## Summary
Add a compact, collapsible infographic widget in the sidebar header — between the `sidebar-tagline` and the `sidebar-search` input. The widget auto-populates from the existing changelog modal: each entry becomes a styled card with a category icon, feature headline, one-line impact summary, and version + date badge. Related changes that already ship as a single changelog section are naturally "paired" — multi-CBP auto-update batches render as one card. Clicking any card opens the full changelog.

## Assessment
The sidebar header (around line 2057) currently has: `sidebar-brand` (version link), `sidebar-tagline` ("Methodology Guide"), then `sidebar-search`. The new widget inserts between tagline and search.

The changelog modal (`#changelogModal .changelog-body section`) already has all the data:
- Each `<section>` has `<h3>` with version + `.changelog-date` span (`· YYYY-MM-DD`)
- First `<strong>` in `<p>` = feature headline
- Paragraph text after the `<strong>` = full description (we extract the first sentence as the impact line)
- Entries are newest-first

This week's entries (all within 7 days of 2026-06-05):
- v2.93.0 (2026-06-05): hooks additionalContext + plugin list + skills escape syntax + managed settings keys
- v2.92.0 (2026-06-04): Deeplinks to all playbook content
- v2.91.0 (2026-06-04): Security Review moved to Skills Library
- v2.90.0 (2026-06-04): Open Source promoted to top-level nav
- v2.89.1 (2026-06-04): claude agents done/total progress counts
- v2.89.0 (2026-06-04): Claude Code v2.1.162 auto-update (4 Cheat Sheet rows)
- v2.88.0 (2026-06-03): Practical Best Practices page
- v2.87.0 (2026-06-03): Pod image hover + lightbox expand

**Location:** `fsad-playbook.html` — sidebar header (~line 2059) and CSS section (~line 387)

## Plan

### Phase 1 — HTML widget shell
Insert between `<span class="sidebar-tagline">` and `<div class="sidebar-search">`.

### Phase 2 — CSS (infographic card style)
Add after the `.sidebar-tagline { ... }` block. Includes `.sidebar-whats-new`, `.swn-card`, `.swn-category`, `.swn-headline`, `.swn-impact`, category color tokens (swn-cat-hooks/nav/skills/ui/cli/config/auto).

### Phase 3 — JavaScript: `initWhatsNew()`
Category detection uses case-insensitive keyword matching. Impact extracted as first sentence from paragraph text after the strong element. `detectCategory()`, `extractImpact()`, `_swnSetOpen()`, `toggleWhatsNew()` functions added.

### Phase 4 — Wire up DOMContentLoaded
`initWhatsNew()` called at end of existing DOMContentLoaded handler.

### Phase 5 — Version bump
v2.93.0 → v2.94.0 in title tag, sidebar brand badge, changelog modal, README.md, and CHANGELOG.md.

All criteria verified 2026-06-05 before commit.

## Acceptance Criteria
- [x] Widget appears in sidebar header between tagline and search bar
- [x] Infographic cards render for all changelog entries within the past 7 days (≥4 cards this week)
- [x] Each card shows: category icon + label, version badge + date, bold feature headline, one-line impact summary
- [x] Category + accent color are auto-detected from headline/impact keywords (hooks/nav/skills/UI/CLI/config/auto-update)
- [x] Clicking any card opens the changelog modal
- [x] Widget collapses/expands by clicking the header; state persists in localStorage
- [x] If no entries exist for the current week, the widget is hidden
- [x] Widget renders correctly in both dark and light themes
- [x] Version bumped to v2.94.0 in all three locations
