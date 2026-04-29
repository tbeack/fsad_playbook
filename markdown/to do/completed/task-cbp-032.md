# CBP-032 — Major UX Overhaul: Reclaim the Playbook as a Senior Methodology Document

## Source
`markdown/research/UX_critique.md` (2026-04-14, v17 review). The critique's core verdict: content is strong, visual envelope looks like generic "AI-SaaS-dark-mode-with-purple-glow." The playbook reads like product marketing for a SaaS that doesn't exist. Target audience (R&D directors, staff engineers, skeptical VPs) needs it to look like an internal standard, not a hackathon artifact.

## Summary
Execute a comprehensive UX pass on `fsad-playbook.html` to quiet the interface, establish clear visual hierarchy, fix the sidebar inconsistency, and replace decorative-but-empty hero content with credible substance. Goal: flip the "AI made this" verdict by making the visual design as distinctive and confident as the writing.

## Assessment

**Location:** `fsad-playbook.html` — end-to-end (CSS `:root` variables, sidebar markup, hero section, hub grid, callouts, accent usage across all 5 pages).

Current state (v17):
- **Palette** — Near-black `#08080c` canvas, violet-500 (`#7c5cfc`) + violet-400 (`#a78bfa`) gradient brand, 6 opacity variants of the same purple for glows, plus emerald/amber/rose/pink decoratively. No semantic color contract.
- **Hero** — Radial purple glow behind `<h1>`, gradient-text stat cards with fake metrics (`2–4`, `10×`, `.md`, `∞`). Reads as decoration, not information.
- **Hierarchy** — Hero badge, h1, h2 section-label, h2 section-title, subtitle, callouts (tip/best-practice), step cards, overview cards, code blocks, tables, collapsibles, chips, pill lists — all visually loud. Nothing recedes.
- **Sidebar** — Node-graph pills with blue glow and connector lines at topic level; after v17 Option A fix, nested items flattened to plain text. Now half node-graph, half docs-tree — inconsistent.
- **Hub pattern** — Only exists on Claude Best Practices page. Codex, Pod Compositions, KPIs, FSAD don't follow. Feels like a prototype bolted on.
- **Dead code** — DM Serif Display is imported from Google Fonts but never applied in CSS.
- **Depth dots** (`●●○`) on hub cards are unexplained.
- **Theme toggle** — 3-state cycle (auto/light/dark); one state too many.
- **Version badge** (`· v17`) — decorative, should be clickable to changelog.
- **`prefers-reduced-motion`** — honored for transitions but not for the hero radial glow.

## 3-Phase Implementation Plan

This overhaul is split across three phases. Each phase is committed separately and verified in the browser before moving on. Detailed scope lives in the linked task files.

### Phase 1 — Quiet the Surface + Replace Empty Hero → [task-cbp-032-phase-01.md](task-cbp-032-phase-01.md)
**Status:** [ ] Not started
- Desaturate accent palette (~40%), halve glow opacities, remove hero radial glow
- Kill gradient-text on stat numbers; reduce glassmorphism
- Replace fake hero metrics (`2–4 / 10× / .md / ∞`) with credible content
- Honor `prefers-reduced-motion` for ambient effects

### Phase 2 — Hierarchy, Semantic Colors, Sidebar → [task-cbp-032-phase-02.md](task-cbp-032-phase-02.md)
**Status:** [ ] Not started
- Establish 3-tier visual hierarchy (prose quiet / structured / rare punctuation)
- Demote ~70% of decorative borders, backgrounds, and accent usage
- Enforce semantic color contract; retire amber/rose/pink decorative uses
- Convert sidebar to docs-tree everywhere; reconcile page-indicator row

### Phase 3 — Typography, Consistency, Polish → [task-cbp-032-phase-03.md](task-cbp-032-phase-03.md)
**Status:** [x] Shipped as v18
- Apply DM Serif Display to headlines (or remove import — no dead code)
- Establish 4-size type scale max
- Resolve Hub pattern one-off (backport everywhere or remove)
- Label or remove depth dots
- Theme toggle → 2 states; clickable version badge; mobile audit; prev/next visual differentiation
- Final `/critique` re-run; `CHANGELOG.md` + `README.md` version bump to v18

### Phase 4 — Close the v18 Gaps → [task-cbp-032-phase-04.md](task-cbp-032-phase-04.md)
**Status:** [x] Shipped as v19 — third-pass critique returned a **clear pass**.
**Source:** [`markdown/research/UX_critique_v18.md`](../research/UX_critique_v18.md) — "Recommended Sequence for v19" section.
- Retired the Advantages grid fake metrics and rotating-color treatment
- Ported the callout, hero-badge, search-hover, and table-hover tokens onto the desaturated palette
- Deleted dead `--nav-node-*` and `--nav-connector-*` token blocks
- Extracted inline accent styles on hero badges, pod bullets, and timeline headings
- Removed `.adv-card::before` gradient top-bars
- Resolved `--accent-violet`/`--accent-cyan` alias collision; bumped light-theme accent
- Third-pass `/critique` → `UX_critique_v19.md`; shipped as v19

### Phase 5 — Close the v19 Residuals → [task-cbp-032-phase-05.md](task-cbp-032-phase-05.md)
**Status:** [x] Shipped as v20 — fourth-pass critique returned a **clear pass with zero Priority Issues**.
**Source:** [`markdown/research/UX_critique_v19.md`](../research/UX_critique_v19.md) — Priority Issues + Recommended Next Steps.
- Ported the final ~12 decorative `rgba(139,92,246,...)` hexes to the desaturated indigo
- Resolved typography via new `--font-hero` (Source Serif 4) on hero h1; `--font-display` retained for h3s
- Rebalanced Advantages prose rhythm to single-column, 680px, 1.7 line-height
- Extracted KPI metric inline styles to `.kpi-metric--positive`/`--warning` classes
- Swept `var(--accent-cyan)` link references to `var(--accent-blue)`
- Deleted orphaned `.adv-metric`, `.hero-stat*`, and `.adv-card` JS selector refs
- Fourth-pass `/critique` → `UX_critique_v20.md`; shipped as v20

### Phase 6 — Distinctive Voice (Final Critique-Driven Phase) → [task-cbp-032-phase-06.md](task-cbp-032-phase-06.md)
**Status:** [ ] Not started — added after v20's critique closed the "correct and quiet" phase and opened the "correct and distinctive" question.
**Source:** [`markdown/research/UX_critique_v20.md`](../research/UX_critique_v20.md) — "Questions to Consider", resolved interactively.
**Decisions:** pull-quote component + KPI chart rhythm + italic serif in `.section-subtitle em`. Defer IA re-order. Retire the critique pipeline after v21 ships.
- Design and deploy a `.pullquote` component; 3–4 placements across FSAD + Claude Best Practices
- Rewrite `#page-kpis` metrics into a real small-multiples `.kpi-card` rhythm (sparklines only where real data exists)
- Extend Source Serif 4 italic to `.section-subtitle em` and `.hero p em` only
- Fifth and final `/critique` → `UX_critique_v21.md`
- Retire the critique pipeline; create `external_feedback_v21.md` placeholder for the next feedback loop
- Ship as v21

## Overall Acceptance Criteria
Aggregated across all phases. Each phase file owns the line-item checklist for its scope.

- [x] Phase 1 committed and verified in browser
- [x] Phase 2 committed and verified in browser
- [x] Phase 3 committed and verified in browser
- [x] `/critique` re-run on v18 (`UX_critique_v18.md`) — verdict **partial pass**, remaining gaps scoped into Phase 4
- [x] Phase 4 shipped as v19; third-pass `/critique` (`UX_critique_v19.md`) returned a **clear pass**
- [x] `CHANGELOG.md` updated with v18 + v19 entries
- [x] `README.md` version bumped to v19
- [x] Phase 5 shipped as v20; fourth-pass `/critique` (`UX_critique_v20.md`) returned a clear pass with zero Priority Issues
- [x] `CHANGELOG.md` + `README.md` bumped to v20 after Phase 5
- [ ] Phase 6 shipped; fifth and final `/critique` (`UX_critique_v21.md`) reflects "distinctive voice"
- [ ] `CHANGELOG.md` + `README.md` bumped to v21 after Phase 6
- [ ] Critique pipeline retired; external-feedback artifact seeded
