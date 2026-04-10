# CBP-010 — Move Search into the Sidebar

Replace the current full-screen search overlay with a permanent inline search bar in the left sidebar, and render results as a floating popover anchored to that bar.

## Current Behavior

- Search trigger (button / keyboard shortcut) opens a full-screen overlay covering the main page content
- Overlay hosts both the input and the results
- Clicking a result closes the overlay and routes via `sectionToPageMap`

## Desired Behavior

1. **Permanent inline search bar** in the left sidebar, positioned directly under the "Methodology Guide" header (above the first nav group).
2. **Typing** filters the existing search index in real time — same matching logic, same index, no ranking changes in this task.
3. **Results render as a popover** that overlays the left sidebar (covering the nav list below the search bar). The main page content is NOT dimmed or covered.
4. **Selecting a result** (click or Enter):
   - Dismisses the popover
   - Navigates to the target section (reuse existing `sectionToPageMap` + `switchPage` + scroll logic)
5. **Dismissal**:
   - Clicking outside the popover (anywhere in main content, top bar, or another sidebar element)
   - Pressing `Esc`
   - Clearing the input (empty query → no popover)
6. **Keyboard navigation** within the popover: `↑ ↓` to move selection, `Enter` to pick, `Esc` to close. (Match current overlay behavior.)
7. **The old full-screen overlay is removed** along with its trigger button (or the top bar button becomes a shortcut that just focuses the new sidebar input).

## Research

Before coding, read `fsad-playbook.html` and confirm:

1. Sidebar markup location — where "Methodology Guide" header lives and the DOM slot for the new input.
2. Existing search implementation:
   - Overlay markup + toggle function (`toggleSearch`)
   - Input element id and event listeners
   - Index building function
   - Results rendering (`search-result-item` around line ~5010)
   - Keyboard handling (arrow/enter/esc)
   - `sectionToPageMap` click handler
3. Sidebar CSS: width (`--sidebar-w: 290px`), padding, background, border, z-index layering — popover must sit above the nav list but below modals.
4. Existing keyboard shortcut that opened the old overlay (likely `/` or `Cmd+K`) — decide whether to keep it as "focus the sidebar input" or drop it.
5. Theme variables already in use for overlay/popover surfaces so the new popover matches light/dark/auto.
6. Mobile behavior — does the sidebar collapse on small screens? If so, the new search bar needs a fallback. (Confirm whether current app supports mobile; if not, note as out of scope.)

## Plan

### 1. Add the inline search bar to the sidebar
- Insert an `<input type="search" id="sidebar-search-input">` (with a small icon) right below the "Methodology Guide" header, above the first `.nav-group`.
- Wrap in a container `.sidebar-search` with appropriate padding/margin to match sidebar rhythm.
- Style: match existing inputs (border, radius, focus ring using `--accent-blue` / `--accent-violet`, background from theme vars).

### 2. Build the popover container
- Add an absolutely positioned `<div id="sidebar-search-popover">` that anchors under the input.
- Width: full sidebar width minus padding. Height: capped with `max-height` + internal scroll.
- z-index: above `.nav-group`, below any modal.
- Background, border, shadow: reuse existing overlay styles where possible.
- Hidden by default (`display: none` or `hidden` attribute).

### 3. Wire up the index + filtering
- Reuse the existing search index build. Do NOT rebuild the index or change matching logic.
- On `input` event: filter, re-render results into the popover, show the popover if there are results or a "no results" message.
- On empty input: hide the popover.

### 4. Result rendering
- Render each result as a clickable row inside the popover using the existing `.search-result-item` markup/styling, adjusted for the narrower sidebar width (truncate long snippets, smaller font if needed).
- Highlight the active keyboard selection.

### 5. Selection + navigation
- Click or Enter → call the existing navigation flow (`switchPage` + `scrollToSection` via `sectionToPageMap`), then:
  - Hide the popover
  - Clear the input (decide during implementation — clearing is cleaner)
  - Blur the input

### 6. Dismissal
- `Esc` key: hide popover, keep input value, keep focus on input (or blur — pick one).
- Click outside: `document` mousedown listener that hides the popover if the click target is outside `.sidebar-search` and `#sidebar-search-popover`.
- Empty input → hide popover.

### 7. Remove the old overlay
- Delete the full-screen search overlay markup.
- Delete `toggleSearch()` and its button/binding in the top bar (or repurpose the keyboard shortcut to focus the new input).
- Remove unused CSS for the old overlay.
- Confirm nothing else references the removed ids/functions.

### 8. Verification
- Light, dark, and auto themes render the bar and popover correctly.
- Results appear on first keystroke, disappear on clear.
- Keyboard: `↑ ↓ Enter Esc` all work.
- Click outside dismisses.
- Selecting a result from every page (FSAD, Pods, Claude Best Practices, Codex Best Practices, KPIs) lands on the correct section with sidebar expanded (no CBP-009 regression).
- Popover overlays only the sidebar nav — main content is unaffected.
- No console errors.

### 9. Update docs
- README.md changelog entry for CBP-010.
- Mark CBP-010 complete in `todo.md`.

## Guardrails

- Vanilla JS only, inline in `fsad-playbook.html`.
- Theme variables only — no hardcoded colors.
- Do not change the search index or ranking.
- Preserve hash routing / shareable URLs.
- Do not regress CBP-006 (scroll spy) or CBP-009 (`sectionToPageMap`).

## Open Questions

- Keep the existing keyboard shortcut (`/` or `Cmd+K`) as "focus sidebar input", or drop entirely? **Suggested: keep it, re-bind to focus the new input.**
- On selection, clear the input or keep the query visible? **Suggested: clear.**
- Mobile / narrow-width behavior — is it in scope? (Current app may not support mobile; will confirm during research.)
