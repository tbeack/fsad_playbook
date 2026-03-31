# CBP-007: Light Mode + Auto Detection

**Date:** 2026-03-31
**File:** `fsad-playbook.html`
**Status:** In Progress

## Design Decisions

- **Approach:** CSS variables + `prefers-color-scheme` media query + `data-theme` attribute
- **Toggle location:** Top-right in page indicator bar
- **Default:** Auto-detect OS preference, user can override
- **Light accent palette:** Darker/more saturated purple variants for contrast on white

## Tasks

### Task 1: Convert hardcoded colors to CSS variables
- Add new variables to `:root` for all ~70 hardcoded rgba/hex values
- Groups:
  - `--sidebar-bg`, `--sidebar-node-bg` (sidebar backgrounds)
  - `--overlay-bg` (search overlay, backdrop)
  - `--card-border`, `--card-border-hover`, `--card-glow`, `--card-glow-hover` (pink accent borders)
  - `--nav-node-border`, `--nav-node-border-hover`, `--nav-node-border-active`, `--nav-connector` (sidebar flow nodes)
  - `--accent-glow`, `--accent-glow-soft` (purple glows)
  - Role badge and callout backgrounds
- Replace all hardcoded values with var() references
- **Verify:** App looks identical after swap

### Task 2: Define light mode color values
- Add `[data-theme="light"]` block with full variable overrides:
  - Backgrounds: white/light gray (#ffffff, #f8f8fc, #f0f0f5, #f4f4f8)
  - Text: dark grays (#1a1a2e, #4a4a5e, #7a7a8e)
  - Borders: dark rgba instead of light rgba
  - Accents: deeper purple (#5b3fd4, #7c5cfc) for contrast
  - Card borders: muted purple instead of pink
  - Glows: reduced or removed (not needed on light backgrounds)
- **Verify:** Set `data-theme="light"` on `<html>`, app renders correctly

### Task 3: Add auto-detection CSS
- Add `@media (prefers-color-scheme: light)` that applies light values when `<html>` has no `data-theme` attribute (i.e., auto mode)
- Use `:root:not([data-theme])` selector scoped inside the media query
- **Verify:** OS appearance change toggles theme

### Task 4: Add theme toggle button (HTML + CSS)
- Add sun/moon/auto icon button in page indicator bar, far right
- Three states: auto (system icon), light (sun), dark (moon)
- Style to match both themes
- **Verify:** Button visible and styled in both modes

### Task 5: Add theme toggle JS
- On load: read `localStorage.getItem('theme')` — values: `null` (auto), `"light"`, `"dark"`
- Apply `data-theme` attribute or remove it for auto
- On click: cycle auto → light → dark → auto
- Save preference to `localStorage`
- Update toggle icon to reflect current state
- **Verify:** Toggle works, persists across reload, auto follows OS

### Task 6: Verify and polish
- Test all 5 pages in both themes
- Check: search overlay, collapsibles, code blocks, tables, pod explorer, hero sections
- Fix any contrast or readability issues
