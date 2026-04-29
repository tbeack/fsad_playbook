# CBP-043 — Detect missing playground files and hide playground artifacts from UI when absent

## Source
Own idea — defensive UX for the playbook's companion file pattern.

## Summary
The Workflows page embeds two playground HTML files (`add-task-playground.html`, `commit-changes-playground.html`) via `<iframe>`. If those files are missing (e.g., someone clones the repo without them, or they get deleted), the iframes render as blank boxes or 404 errors. The UI should detect whether the files are present and gracefully hide the entire playground embed block when they're not.

## Assessment
Currently, the two playground embeds are wrapped in clearly marked comment blocks:

- **add-task playground:** `fsad-playbook.html` lines ~2864–2882, `<div id="add-task-playground-embed">`
- **commit-changes playground:** `fsad-playbook.html` lines ~3004–3022, `<div id="commit-changes-playground-embed">`

Each block includes an iframe with `src="<name>-playground.html"`, a heading, description text, and a "open standalone" link. There is no existing detection logic — the embeds are always visible.

**Location:** `fsad-playbook.html` — Workflows page, playground embed sections + JS initialization

## Plan

1. **Hide by default with CSS** — Add `display: none` to both `#add-task-playground-embed` and `#commit-changes-playground-embed` so they start hidden.

2. **Add a detection function in JS** — On `DOMContentLoaded`, use `fetch()` with `method: 'HEAD'` against each playground file URL to check if the file exists (checking for a 200 response). Alternatively, create the iframes dynamically only when the file is confirmed present.

3. **Show on success** — If the fetch succeeds (status 200 or `ok`), set `display: block` on the corresponding embed container. If it fails (404, network error), leave it hidden.

4. **Handle both embeds independently** — Each playground file should be checked separately so one can show while the other is hidden.

5. **Fallback consideration** — Since this is a local file opened via `file://` protocol, `fetch()` may not work. Consider using an `<iframe>` `onload`/`onerror` approach instead: create a temporary hidden iframe, listen for load/error, and show/hide the embed div accordingly. Or set the iframe `src` dynamically and listen for the `load` event with a timeout fallback.

## Acceptance Criteria
- [x] Both playground embed divs are hidden by default (not visible on initial render)
- [x] When playground HTML files are present, their embed sections become visible after detection
- [x] When a playground HTML file is missing, its embed section stays hidden with no visible error or blank iframe
- [x] Each playground is detected independently (one missing doesn't affect the other)
- [x] Works correctly when opened via `file://` protocol (local file) as well as `http://`
- [x] No console errors when playground files are absent
- [x] Existing "open standalone" links are also hidden when the playground is absent
