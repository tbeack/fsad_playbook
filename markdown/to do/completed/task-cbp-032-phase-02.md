# CBP-032 Phase 2 — Hierarchy, Semantic Colors, Sidebar

**Parent:** [task-cbp-032.md](task-cbp-032.md)

## Goal
Make the content skimmable. Establish a three-tier visual hierarchy, enforce a semantic color contract so color means something, and commit the sidebar to a single pattern (docs-tree everywhere).

## Scope (what changes)
CSS for callouts, step cards, overview cards, chips, pills, tables, and sidebar. HTML markup for the sidebar tree structure. The page-indicator row above main content is either removed or repurposed as a breadcrumb.

## Plan

### 1. Establish a 3-tier hierarchy in CSS
Document the tier system as a CSS comment near `:root`:
```css
/* Visual hierarchy contract:
   Tier 1 (quiet default): prose, body text, inline code — neutral colors, no borders, no backgrounds
   Tier 2 (structured exceptions): callouts, code blocks, tables — muted borders, subtle backgrounds
   Tier 3 (rare punctuation): pull-quotes, diagrams, hero elements — accent color allowed
*/
```

### 2. Demote ~70% of decoration
Audit these elements and reduce their visual weight to Tier 1 unless they earn Tier 2:
- **Step cards** (`.step-card`, `.step-card-number`) — flatten backgrounds, remove gradient numbers, reduce border weight to 1px neutral grey.
- **Overview cards** (`.overview-card`, hub cards on Claude page) — remove colored borders, use neutral `var(--border)` only.
- **Chips / pill lists** that are not navigation — strip accent backgrounds, convert to inline text with a subtle background tint or nothing.
- **Tip / best-practice / warning callouts** — keep as Tier 2 but standardize border treatment (left border only, neutral background, no glow).

### 3. Enforce semantic color contract
Document in CSS:
```css
/* Color semantic contract:
   --accent-primary: links, active nav, primary buttons only
   --accent-success (emerald): positive examples, best-practice callouts, do-this patterns
   --accent-warning (amber): caution, deprecated patterns, anti-patterns
   (Retired: rose, pink — replaced with neutral greys)
*/
```

Audit steps:
- Grep for every accent color usage (`emerald`, `amber`, `rose`, `pink`, any `--accent-*`).
- For each hit: confirm it matches the contract. If not, replace with neutral grey or the correct semantic color.
- Retire `rose` and `pink` entirely unless they map to a concrete semantic role.

### 4. Convert sidebar to docs-tree
- Locate the sidebar markup (likely `.sidebar-nav` or similar).
- Remove node-graph styling: pill borders, blue glow box-shadows, connector lines between items, junction dots.
- Replace with a plain indented tree:
  - Topic-level items: plain text, bold weight, no pill.
  - Nested items: indented, lighter weight, active state is a left border + accent text color.
  - Hover: subtle background tint, no glow.
- Keep the existing hash-routing and scroll-spy JS intact — only CSS and class names change.

### 5. Reconcile the page-indicator row
- The pill row above main content currently duplicates the sidebar. Options:
  - **Option A (recommended):** Remove entirely. Sidebar is enough.
  - **Option B:** Convert to breadcrumb (`FSAD / Claude Best Practices / Integrations`).
- Pick one and execute. Remove the original pill markup and CSS.

### 6. Verify in browser
- Navigate all 5 pages. Confirm:
  - Prose reads as quiet default; decoration recedes.
  - Only emerald (success) and amber (warning) accents appear semantically.
  - Sidebar is a clean docs-tree with no pills/connectors.
  - No duplicate navigation artifact above main content.
  - Scroll spy still highlights the active item.
  - Hash deep links still work.

## Acceptance Criteria
- [x] 3-tier hierarchy contract documented in CSS comment
- [x] Step cards, overview cards, chips, hub cards demoted to Tier 1 or Tier 2 consistently
- [x] ~70% of decorative borders/backgrounds/accents flattened to neutral greys
- [x] Semantic color contract documented in CSS; every accent usage audited
- [x] Rose and pink retired; amber reserved for warnings; emerald reserved for positive
- [x] Sidebar fully docs-tree — no pills, no connector lines, no glow shadows
- [x] Page-indicator pills row hidden (Option A); breadcrumb row retained
- [x] Hash routing + scroll spy + theme toggle still function
- [x] Browser-verified in dark and light themes across all 5 pages
- [x] Committed as a single atomic commit referencing CBP-032 Phase 2
