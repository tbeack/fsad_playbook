# CBP-032 Phase 5 — Close the v19 Residuals (Final Polish Pass)

**Parent:** [task-cbp-032.md](task-cbp-032.md)
**Source:** [`markdown/research/UX_critique_v19.md`](../research/UX_critique_v19.md) — Priority Issues + Minor Observations + Recommended Next Steps sections.

## Goal
Close the non-blocking residuals identified in the v19 third-pass critique. v19 earned a **clear pass** on the "AI made this" verdict; Phase 5 closes the remaining ~12 decorative purple hexes, deletes orphaned code, resolves the typography identity decision, and rebalances the Advantages prose. After Phase 5 the playbook is not just "correct and quiet" but fully consistent — no leftover hexes, no orphaned CSS/JS, no alias tokens pointing at nothing.

## Scope (what changes)
Residual `rgba(139,92,246,...)` inline-style hexes across overview cards, timeline, config-tags, power-usage badges, and sidebar hover tints. The `.adv-metric` orphaned CSS class. The `.adv-card` references in JS animation observers. Codex-page `var(--accent-cyan)` link consolidation. Typography identity decision for `--font-display`. Advantages prose rhythm. Optional "Last updated" hero line.

## Plan

### 1. Port residual decorative violet hexes onto the desaturated palette (Priority Issue #1)
v19 ships with ~12 remaining `rgba(139,92,246,…)` uses. Grep and port each.

Audit list:
- **Overview card icon backgrounds** (line ~1887 and siblings) — `rgba(139,92,246,0.12)` and three sibling tints (amber/blue/emerald at 0.12). These communicate category semantically (team/comms/agent/strategy), so do not collapse to a single accent. Instead, **promote to semantic tokens**: `--overview-tint-strategy`, `--overview-tint-team`, `--overview-tint-comms`, `--overview-tint-agent` in all three `:root` blocks, bound to the desaturated palette or their intentional semantic color.
- **Timeline segments** (lines ~1999–2017): `rgba(139,92,246,0.25)` and `rgba(139,92,246,0.15)` on the "Design" and "Handoff" phases. Decorative. Port to `rgba(111,111,181,…)` dark + `rgba(85,85,160,…)` light — or, per the v17 critique, consider removing color from timeline segments entirely (segment *length* already communicates duration).
- **Timeline legend dot** (line ~2007): `rgba(139,92,246,0.4)` — port.
- **Timeline center gradient segment** (line ~2017): `linear-gradient(90deg, rgba(245,158,11,0.25), rgba(139,92,246,0.25), rgba(16,185,129,0.25))`. Port the violet stop to the desaturated indigo.
- **Config-tags in Pod Sizing Matrix** (lines 2310, 2315): `rgba(139,92,246,0.15); color: var(--accent-violet)`. Since `--accent-violet` now aliases `--accent-blue`, the foreground is correct — port the background hex to `rgba(111,111,181,0.15)` dark / `rgba(85,85,160,0.15)` light.
- **Sidebar-nav hover tints** (lines 1552, 1562, 1564): `rgba(139,92,246,0.04)`, `rgba(139,92,246,0.1)`, `rgba(139,92,246,0.25)`. Port to `rgba(111,111,181,…)`. Or better, replace with `var(--bg-elevated)` for consistency with the rest of the docs-tree hover state.
- **Power-usage plugin badges** (lines 5397, 5407, 5427, 5449, etc.): 5 repetitions of `background:rgba(139,92,246,0.15); color:var(--accent-violet)`. Port the background, or promote to a `.badge--indigo` semantic class bound to a token.

**Command:** `/normalize` scoped to the grep set.

### 2. Typography identity decision — resolve `--font-display`
v19 ships with `--font-display` and `--font-body` both aliased to Inter. The token name lies. Decision required:

**Option A — Assign a distinct display face.** Import one additional family via Google Fonts (candidate shortlist: *Source Serif 4* for classical methodology-doc feel, *IBM Plex Serif* to pair with the existing Plex Mono, *DM Sans* for a condensed geometric contrast, or *Inter Tight* as a compressed Inter variant). Apply only to `.hero h1` and top-level section h2 — nothing else.

**Option B — Consolidate.** Delete the `--font-display` token and rewrite every `font-family: var(--font-display)` usage to `var(--font-body)`. Accept that Inter does all the work.

**Recommendation:** Option A with *Source Serif 4* on hero h1 only. The playbook's voice is authoritative and the hero thesis sentences would pair well with a serif headline. Ship the contrast if it feels right; fall back to Option B if nothing earns the space after experimentation.

**Command:** `/typeset` — prototype both options, pick one.

### 3. Rebalance the Advantages prose (Priority Issue #2)
v19 renders 6 claims in a dense 2-column grid. Correct treatment, wrong rhythm — eye scans past. Options:

**Option A — Group into themes.** Cluster the six items under 2 or 3 subheads (e.g., *Speed* → Cycle Time Compression + No Handoff Latency; *Credibility* → Single Source of Truth + Knowledge Compound; *Scale* → Parallel Execution + Democratized Contribution). Requires a `.adv-group` class and light structural markup.

**Option B — Single column, paragraph-style.** Drop the grid entirely. Each claim becomes its own paragraph with generous line-height and max-width. Treats the six items as prose punctuation rather than a feature matrix.

**Recommendation:** Option B. Signals *this is prose worth reading* rather than *this is a comparison feature grid*. Single-column, max-width ~640px, `.adv-item` becomes a block with a clear h3 + p rhythm.

**Command:** `/arrange` (or manual markup tweak).

### 4. Extract KPI metric inline styles to semantic class (Priority Issue #4)
KPIs page (`#page-kpis`), lines 3253 and 3257 — `<h3 style="color:var(--accent-emerald);">84%</h3>` and similar. These are real measured numbers with citations, so the accent is defensible — but the inline `style` is inconsistent with the rest of the file's token-driven approach.

- Create `.kpi-metric--positive` bound to `--accent-emerald`.
- Sweep any sibling KPI metric inline styles (warning percentages, negative deltas, etc.) to matching semantic classes.

**Command:** `/extract`

### 5. Consolidate Codex page `var(--accent-cyan)` link references (Priority Issue #5)
Codex page links at lines 5501, 5973, 5996, 6003 (and others) use inline `style="color:var(--accent-cyan)"`. Since `--accent-cyan` now aliases `--accent-blue`, rendering is correct — but the code still encodes a distinction that no longer exists.

- Sweep-replace `var(--accent-cyan)` with `var(--accent-blue)` on Codex-page inline link styles.
- While there, sweep any other `--accent-cyan` references in the doc body (not the `:root` alias itself) to use `--accent-blue` directly. Leave the `:root` alias token in place for any third-party code that might reference it.

**Command:** `/normalize`

### 6. Delete orphaned CSS and JS references
- **`.adv-metric` CSS class** (line ~991 in pre-v19 numbering): no longer used after the Advantages rewrite. Delete.
- **`.adv-card` in animation observer selectors** (JS ~line 7130 and 7193): `.adv-card` no longer appears in markup. Remove from the selector list.
- Also audit for any other now-orphaned rules: `.hero-stat`, `.hero-stats`, `.hero-stat .number`, `.hero-stat .label` — they were retired when the hero-thesis list replaced them in Phase 1. Delete if no remaining references.

**Command:** `/polish`

### 7. Optional — Hero "Last updated" line
v19 critique asks: would a reader know this is v19? The changelog modal makes it clear, but the landing page doesn't signal iteration date.

- Consider adding a small secondary line after the hero thesis: `<span class="hero-updated">Last updated 2026-04-14 · v19</span>`.
- Or bind it to the same `openChangelog()` click as the version badge.
- **This is judgment-based.** Ship without if it feels like noise.

**Command:** `/critique` a mockup if adding; skip if not earned.

### 8. Fourth-pass `/critique` verification
- After tasks 1–6 complete, run `/critique` again. Write to `markdown/research/UX_critique_v20.md`.
- **Target:** a clear pass *with* "no minor observations worth fixing." If the critique still generates a Priority Issues list, decide whether to fold into a hypothetical Phase 6 or ship with documented exceptions.
- **Stretch goal:** the critique could also be asked what a *distinctive* v20 would look like — the v19 critique's closing question asks this directly. If you want to evolve past "correct and quiet" into "correct and distinctive," this is where that conversation starts.

### 9. Version + changelog bump
- `<title>` → v20.
- Sidebar badge → v20.
- Changelog modal markup → add v20 entry summarizing Phase 5 changes.
- `CHANGELOG.md` → v20 entry referencing CBP-032 Phase 5.
- `README.md` version bump.

## Acceptance Criteria
- [x] All `rgba(139,92,246,...)` decorative hexes in the document body ported onto the desaturated palette (global sweep to `rgba(111,111,181,…)`)
- [x] Timeline-segment violet hexes ported
- [x] Sidebar-nav hover tints ported (raw hex replaced)
- [x] Power-usage plugin badge backgrounds ported
- [x] Config-tag backgrounds in Pod Sizing Matrix ported
- [x] `--font-display` decision made and implemented — introduced `--font-hero` (Source Serif 4) for hero h1; `--font-display` retained as Inter for h3 usages
- [x] Advantages prose rebalanced into single-column paragraph rhythm (680px max-width, 1.7 line-height)
- [x] KPI metric inline `style="color:var(--accent-emerald)"` extracted to `.kpi-metric--positive` class (with `--warning` variant added)
- [x] Codex-page `var(--accent-cyan)` link inline styles swept to `var(--accent-blue)`
- [x] `.adv-metric` CSS class deleted (via `.adv-card` block removal in Phase 4)
- [x] `.adv-card` removed from JS animation observer selector lists
- [x] `.hero-stat` / `.hero-stats` orphan CSS + mobile media-query entries deleted
- [ ] Optional hero "Last updated" line — skipped (not earned; changelog modal suffices)
- [x] `/critique` fourth-pass run, output written to `markdown/research/UX_critique_v20.md`
- [x] Fourth-pass verdict: **clear pass with zero Priority Issues** (Minor Observations only)
- [x] `<title>`, sidebar badge, changelog modal, `CHANGELOG.md`, `README.md` all bumped to v20
- [x] Committed as a single atomic commit referencing CBP-032 Phase 5
