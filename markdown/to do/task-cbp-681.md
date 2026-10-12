# CBP-681 — Guard `localStorage` in theme-toggle.js

## Source
Found while verifying CBP-680 (blocked-storage test).

## Summary
`getEffectiveTheme()` calls `localStorage.getItem('theme')` with no `try/catch`. When storage is blocked, it throws `SecurityError` and aborts the shared inline script, so later features do not start.

## Assessment
`src/js/theme-toggle.js` lines 2-3 and the `setItem` call near line 20 are unguarded. `src/js/harness-blueprint.js` wraps the same calls in `try/catch`. The error appears at load in a page with `localStorage` blocked (for example Safari private mode with cookies blocked, or a sandboxed iframe).

**Location:** `src/js/theme-toggle.js` — `getEffectiveTheme()` and the toggle handler

## Plan

1. Wrap the `getItem` and `setItem` calls in `try/catch`. Fall back to the OS theme.
2. Run `python3 scripts/build-source.py`.
3. Load the page with `localStorage` blocked and read the console.

## Acceptance Criteria
- [ ] With `localStorage` getter throwing, the built page loads with no uncaught error and the theme follows `prefers-color-scheme`.
- [ ] Theme toggle still persists the choice when storage works.
- [ ] The build passes.
