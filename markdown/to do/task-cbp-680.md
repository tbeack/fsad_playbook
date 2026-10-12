# CBP-680 — Make the left nav collapsible and resizable

## Source
User request, 2026-10-11.

## Summary
The left sidebar has a fixed width of 290px. Readers cannot hide it or change its width. Add a collapse control and a drag handle. Save both choices between visits.

## Assessment
The sidebar width comes from one CSS variable, `--sidebar-w`. Four rules read it: the sidebar itself, `.main` margin, `.progress-container` and `.page-indicator`. Changing the variable at run time moves all four.

The sidebar has `overflow-y: auto`, so a handle inside it scrolls with the content. The handle must be a sibling element, not a child. Below 900px the sidebar is an off-canvas drawer opened by `toggleSidebar()`. That behavior must not change.

Theme state already uses `localStorage` (`src/js/theme-toggle.js`). `src/js/harness-blueprint.js` wraps storage calls in `try/catch`. Match that pattern.

**Location:** `src/styles.css` (lines 45, 137, 149, 351-361, 781, 1626); `src/playbook.tmpl.html` (lines 23-342, 453-469); new `src/js/sidebar-resize.js`

## Plan

1. **CSS** in `src/styles.css`:
   1. Add `.sidebar-resizer`: a 6px fixed strip at `left: calc(var(--sidebar-w) - 3px)`, full height, `cursor: col-resize`, `z-index: 201`, highlight on hover and drag.
   2. Add `body.sidebar-collapsed { --sidebar-w: 0px; }`. Hide the sidebar and the resizer in this state. Keep the 0.3s transition on the width and the margin.
   3. Add `.sidebar-collapse-btn` in `.sidebar-header` and `.sidebar-expand-btn`: a fixed button at the top left, visible only when collapsed.
   4. Add `body.sidebar-resizing { user-select: none; cursor: col-resize; }` and disable transitions while dragging.
   5. Put all new rules for desktop width inside `@media (min-width: 901px)`. Hide the resizer and both buttons at 900px and below.
2. **Markup** in `src/playbook.tmpl.html`: add the resizer `div` after `</aside>`, the collapse button in the sidebar header, and the expand button after the resizer. Give each an `aria-label`. Give the resizer `role="separator"` and `aria-orientation="vertical"`.
3. **JS**: create `src/js/sidebar-resize.js` and include it before `init.js`.
   1. Pointer events on the resizer: set `--sidebar-w` on `document.documentElement` during drag. Clamp the width between 220px and 520px.
   2. Double-click the resizer to reset to 290px.
   3. Keyboard: Left and Right arrows on the focused resizer change the width by 16px.
   4. Collapse and expand buttons toggle `body.sidebar-collapsed`.
   5. Save width (`fsad-sidebar-w`) and collapsed state (`fsad-sidebar-collapsed`) in `localStorage`. Wrap every call in `try/catch`. Restore both on load.
   6. Below 900px, ignore the saved values.
4. Run `python3 scripts/build-source.py`. Serve the build with `python3 -m http.server 8000`. Test in the browser.
5. Run `python3 scripts/build-dist.py`. Confirm the log shows `Injected PLAYBOOK_EMBEDDINGS`.
6. Add a CHANGELOG entry. Do not bump the version unless the user asks.

## Acceptance Criteria
- [x] A drag on the resizer at 1280px viewport width changes `--sidebar-w`, and the computed `margin-left` of `.main` equals the new sidebar width.
- [x] The width never goes below 220px or above 520px during a drag.
- [x] Double-click on the resizer sets the width back to 290px.
- [x] The collapse button sets `.sidebar` computed width to 0 and `.main` computed `margin-left` to 0. The expand button restores the saved width.
- [x] After a page reload, the saved width and the collapsed state apply.
- [x] With `localStorage` blocked, the page loads without a console error and the sidebar shows at 290px.
- [x] At 800px viewport width, the resizer and both buttons are hidden, and the hamburger drawer opens and closes as before.
- [x] The left edge of `.progress-container` and `.page-indicator` equals the sidebar width at every width and in the collapsed state.
- [x] The resizer has `role="separator"`, and Left and Right arrow keys change the width by 16px when it has focus.
- [x] `python3 scripts/build-source.py` and `python3 scripts/build-dist.py` pass, and the dist log shows `Injected PLAYBOOK_EMBEDDINGS`.
- [x] Visual check: the handle hover state and the collapse animation look right in dark and light theme. The user confirms this one.
