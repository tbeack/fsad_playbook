# CBP-032 Phase 1 — Quiet the Surface + Replace Empty Hero

**Parent:** [task-cbp-032.md](task-cbp-032.md)

## Goal
Strip decorative noise from the visual surface and replace the fake hero metrics with credible content. After this phase, the playbook should feel quieter, less neon, and more trustworthy on first scroll — without touching hierarchy, sidebar, or typography.

## Scope (what changes)
Isolated to CSS `:root` variables, hero markup, and the media-query block for `prefers-reduced-motion`. No structural or copy changes outside the hero.

## Plan

### 1. Desaturate the primary accent
- Open `fsad-playbook.html` and locate the `:root` block (top of `<style>`).
- Find `--accent-blue: #7c5cfc` and `--accent-violet: #a78bfa`.
- Replace with muted indigo/blue-slate values (~40% less saturation). Suggested: `--accent-blue: #6b6fae` (or a similar desaturated indigo — pick the exact hex by eye in browser); `--accent-violet: #9a9abf`.
- Update the light-theme override (`@media (prefers-color-scheme: light)` or `[data-theme="light"]`) with matching desaturated values.

### 2. Halve glow opacities and reduce variant count
- Find `--glow-purple` and the `--accent-glow-*` cascade (6 variants).
- Halve every alpha value (e.g., `rgba(124,92,252,0.24)` → `rgba(124,92,252,0.12)`).
- Collapse the 6 opacity variants down to 2–3 by consolidating near-duplicates. Update every `var(--accent-glow-*)` reference to point at the surviving tokens.

### 3. Remove the hero radial glow
- Find `--hero-glow: radial-gradient(...)`.
- Set it to `none` (or delete the token entirely and remove its usage on the hero background).
- Verify the hero `<h1>` area no longer has the purple halo.

### 4. Honor `prefers-reduced-motion` for ambient effects
- Find the existing `@media (prefers-reduced-motion: reduce)` block.
- Extend it to also zero out any remaining ambient gradient backgrounds, box-shadows on hero elements, and blur backdrops.

### 5. Kill gradient-text on stat numbers
- Grep for `background: var(--gradient-brand)` paired with `-webkit-background-clip: text`.
- Remove from hero stat cards and any other metric displays. Replace with solid `color: var(--fg)` or the new desaturated accent.
- Leave `--gradient-brand` defined if still used elsewhere (e.g., buttons); only remove the text-clip application.

### 6. Reduce glassmorphism
- Grep for `backdrop-filter: blur(`.
- Remove from overlays that don't need depth (hub cards, callouts). Keep only on genuine modal/search overlays where depth is load-bearing.

### 7. Replace fake hero metrics
- Locate the hero stat card grid (`2–4 People per Pod / 10× Cycle Time Reduction / .md Common Language / ∞ Agent Parallelism`).
- Replace with **three short sentences** compressing the playbook thesis. Suggested copy (user can edit):
  1. "Humans write markdown specs. Agents write the code."
  2. "Structure is permanent; prompting is temporary."
  3. "Models forget. Hooks don't."
- Restyle the container as a plain prose block (no card chrome, no gradient numbers). Use quiet foreground color with left-aligned text.

### 8. Verify in browser
- Open `fsad-playbook.html` in a browser.
- Toggle dark/light. Toggle `prefers-reduced-motion` (DevTools → Rendering).
- Confirm: no purple halo behind h1, no gradient text on numbers, no decorative blur on hub cards, accents read as muted indigo rather than neon violet.

## Acceptance Criteria
- [x] `--accent-blue` and `--accent-violet` desaturated by ~40% (both dark and light themes)
- [x] Glow opacities halved; `--accent-glow-*` collapsed to 2–3 variants
- [x] Hero radial glow removed (`--hero-glow: none` or deleted)
- [x] `prefers-reduced-motion` block zeroes ambient gradients/shadows/blur beyond just transitions
- [x] Gradient-text removed from all stat/metric numbers
- [x] `backdrop-filter: blur(...)` removed from non-modal overlays (kept only on sidebar backdrop modal)
- [x] Hero fake-metric cards replaced with 3 thesis sentences; card chrome removed
- [x] Browser-verified in dark and light themes
- [x] Committed as a single atomic commit referencing CBP-032 Phase 1
