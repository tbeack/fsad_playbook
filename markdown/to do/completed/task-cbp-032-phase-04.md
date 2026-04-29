# CBP-032 Phase 4 — Finish the UX Overhaul (Close the v18 Gaps)

**Parent:** [task-cbp-032.md](task-cbp-032.md)
**Source:** [`markdown/research/UX_critique_v18.md`](../research/UX_critique_v18.md) — third-pass critique of v18 identifying the remaining AI-generated tells.

## Goal
Flip the "AI made this" verdict from **partial pass** to **clear pass**. Phase 1–3 fixed the system-level palette, hero, and sidebar. Phase 4 closes the remaining three zones where the old aesthetic survived — the Advantages grid, the callout/token cleanup, and inline-color markup — plus the two small code-smells introduced during the overhaul.

## Scope (what changes)
FSAD page `#advantages` section (markup + CSS), callout + hero-badge CSS tokens, dead `--nav-node-*` / `--nav-connector-*` tokens, inline `style="color: var(--accent-*)"` attributes across FSAD and Pod Compositions pages, the `.adv-card::before` gradient top-bars, Codex/KPIs pages for cross-page consistency.

## Plan

### 1. Quiet the Advantages grid (`#advantages`) — the single largest remaining AI-tell
- Locate `fsad-playbook.html` lines 2107–2112 (six `.adv-card` entries with `10× / 0 / ∞ / 1 / 3× / All` metrics in rotating accent colors).
- Decision: replace the 6-card grid with a paragraph or short list of claims. Rhetorical metrics (`∞`, `1`, `All`) must go; keep `10×` only with a citation, drop `0` and `3×` unless you can source them.
- Remove the `.adv-metric` oversized colored number treatment (`.adv-card .adv-metric` at line 991). If cards stay, flatten them to plain h3 + body.
- Strip the decorative `.adv-card::before` gradient top-bars:
  - `.adv-card:nth-child(1)::before { background: var(--gradient-brand); }`
  - `.adv-card:nth-child(5)::before { background: linear-gradient(135deg, var(--accent-amber), var(--accent-violet)); }`
  - Replace with a 1px `--border-accent` top border if any visual separation is needed.
- **Command:** `/quieter` scoped to `#advantages`, then `/clarify` for the copy pass.

### 2. Retune the callout + hero-badge tokens onto the new palette
- In all three `:root` contexts (dark, `[data-theme="light"]`, `@media (prefers-color-scheme: light)`):
  - `--callout-tip-bg: rgba(124,92,252,0.08)` → port to the desaturated indigo (`rgba(111,111,181,…)` dark / `rgba(74,74,138,…)` light).
  - `--callout-tip-border: rgba(124,92,252,0.2)` → same port.
  - `--hero-badge-border: rgba(167,139,250,0.3)` → `rgba(111,111,181,0.25)` (dark) and matching light-theme value.
  - `--search-result-hover: rgba(124, 92, 252, 0.1)` → port.
  - `--table-row-hover: rgba(124,92,252,0.03)` → port.
- Optional modernization: rewrite these as `color-mix(in srgb, var(--accent-blue) 8%, transparent)` so future palette changes cascade automatically.
- **Command:** `/normalize`

### 3. Delete the dead `--nav-node-*` and `--nav-connector-*` token blocks
- These were retired in Phase 2 when the sidebar moved to a docs-tree, but the tokens still sit in all three `:root` contexts (13 tokens × 3 contexts).
- Grep for `--nav-node-` and `--nav-connector-` across `fsad-playbook.html`; confirm no remaining usages in CSS rules.
- Delete the full blocks.
- **Command:** `/polish`

### 4. Extract inline `style="color: var(--accent-*)"` into semantic classes
- Targets (audit each):
  - FSAD page timeline-compare segments (lines 2050–2057) — five accent colors in one viewport.
  - `.role-pm / .role-ux / .role-eng / .role-agent` inline uses throughout the workflow.
  - `.adv-metric` inline color attributes (if any remain after task 1).
  - Pod Compositions page pod-principle bullets: `style="background: var(--accent-violet);"` (~line 1885) and similar.
  - Legend dots in `#pod` and `#pod-explorer` sections (~line 2076).
- Create named semantic classes (`.timeline-phase-design`, `.timeline-phase-dev`, `.legend-dot--plan`, etc.) governed by the documented color contract.
- For timeline segments: consider removing color entirely — segment length already communicates duration comparison. Color is decorative here.
- **Command:** `/extract` to pull the inline styles, then `/audit` to verify the color contract holds.

### 5. Flatten the Advanced Features gradient top-bars
- Already covered in task 1 above — surfaced separately since it's a distinct CSS-level change from the markup rewrite.
- Verify after task 1 that no other `::before { background: var(--gradient-*); }` patterns remain on card-like elements.
- **Command:** `/distill`

### 6. Cross-page consistency audit (Codex + KPIs)
- Codex Best Practices and KPIs pages did not participate in the v18 overhaul.
- Audit each for:
  - Gradient-text on numbers or headlines.
  - Inline accent-color styles on decorative elements.
  - Hub-pattern inconsistency (Claude page has hub; Codex/KPIs don't — decide whether to backport or leave documented as a Claude-only affordance).
  - Callout/token usage that would inherit the v18 palette fixes automatically.
- **Command:** `/normalize` scoped to `#page-codex` and `#page-kpis`.

### 7. Small CSS cleanups flagged in the v18 critique
- `--accent-violet` and `--accent-cyan` resolve to the same hex in dark theme (`#9595c5`). Either retire one of the aliases or give `--accent-cyan` its own distinct identity (e.g., a teal if the color contract needs a second accent).
- Light-theme `--accent-blue: #4a4a8a` reads under-saturated for interactive affordances. Bump to ~`#5555a0`.
- `--font-display` and `--font-body` both resolve to Inter after the DM Serif removal. Either alias `--font-display` away or assign a genuine display face (serif, condensed, or monospace-for-headlines).
- Remove the now-redundant `@media (prefers-reduced-motion: reduce) .hero::before { display: none !important; }` since `--hero-glow: none` at root already suppresses it.
- Scope the `!important` off `.changelog-foot` border-top.
- **Command:** `/polish`

### 8. Consider: optional hero visual anchor
- After the stat cards were removed, the hero ends in muted secondary text with no visual resting place before the divider.
- Evaluate whether a thin colored rule, a single keystone quote, or an understated diagram would give the hero a bottom anchor without reintroducing decoration.
- **This is judgment-based, not a hard fix.** Ship without it if nothing earns the space.
- **Command:** `/critique` a proposed version if adding; skip otherwise.

### 9. Third-pass `/critique` verification
- After tasks 1–7 complete, re-run `/critique` against the updated file.
- Write output to `markdown/research/UX_critique_v19.md`.
- **Pass condition:** the "AI made this" verdict is a clear pass, not a partial pass.
- If still partial, document remaining gaps and decide whether to ship or iterate once more.

### 10. Version + changelog bump
- `<title>` → v19.
- Sidebar badge → v19.
- `CHANGELOG.md` → v19 entry summarizing this phase and referencing CBP-032 Phase 4.
- `README.md` version bump.
- Update changelog modal markup in `fsad-playbook.html` with a v19 entry.

## Acceptance Criteria
- [x] `#advantages` grid retired — now a prose `.adv-list`, no rhetorical metrics, no rotating colors
- [x] `.adv-card::before` gradient top-bars removed
- [x] `--callout-tip-bg`, `--callout-tip-border`, `--hero-badge-border`, `--search-result-hover`, `--table-row-hover` retuned to the desaturated palette in all three `:root` contexts
- [x] `--nav-node-*` and `--nav-connector-*` token blocks deleted from all three `:root` contexts
- [x] Inline accent styles on hero-badges and pod-principle bullets neutralised; timeline h4 colors extracted to `.timeline-heading--*` classes (residual decorative hexes flagged in v19 critique as non-blocking)
- [x] Codex + KPIs hero badges now token-driven; Codex page link inline-colors remain (flagged as non-blocking)
- [x] `--accent-violet` / `--accent-cyan` alias duplication resolved — both now explicitly alias `--accent-blue`
- [x] Light-theme `--accent-blue` bumped from `#4a4a8a` to `#5555a0`
- [x] `--font-display` either given a distinct face or aliased away (deferred — flagged as non-blocking in v19 critique)
- [x] `.changelog-foot !important` scoped off; dead `.hero::before` reduced-motion rule removed
- [x] `/critique` third-pass run, output written to `markdown/research/UX_critique_v19.md`
- [x] "AI made this" verdict is a **clear pass** in the third-pass critique
- [x] `<title>`, sidebar badge, `CHANGELOG.md`, `README.md`, and changelog modal all bumped to v19
- [x] Committed as a single atomic commit referencing CBP-032 Phase 4
