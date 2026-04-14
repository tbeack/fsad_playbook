# CBP-032 Phase 6 — Distinctive Voice (Pull-Quotes + KPI Charts + Italic Serif)

**Parent:** [task-cbp-032.md](task-cbp-032.md)
**Source:** [`markdown/research/UX_critique_v20.md`](../research/UX_critique_v20.md) — "Questions to Consider" section, resolved interactively.

## Goal
Move the playbook from *correct and quiet* (v20) to *correct and distinctive* (v21). This is the final critique-driven phase. Phase 6 closes the "voice" gap the v20 critique surfaced by committing to three small but compounding identity moves: a recurring pull-quote treatment, a real chart style for KPIs, and serif italics inside section subtitles. After v21 ships, the critique-pipeline is retired in favor of real-world feedback from external engineering directors.

## Decisions Locked In
- **Q1 (memorable moves):** (b) recurring pull-quote style + (c) KPI chart treatment. Defer (a) diagrammatic unification, (d) hero illustration, (e) decorative section rule.
- **Q2 (serif scope):** Source Serif 4 italic extended to `<em>` inside section subtitles only. No h2 or body change.
- **Q3 (IA re-order):** Defer. Voice-first work beats structural churn at this stage.
- **Q4 (critique pipeline):** Retire after Phase 6. Next feedback loop is 2–3 external engineering directors.

## Scope (what changes)
CSS: new `.pullquote` component, new `.kpi-chart` component family, italic font-family declaration on `.section-subtitle em`. Markup: 3–4 pull-quote insertions across high-traffic sections, KPI page chart rewrites. No IA changes. No page-order changes. No new topics.

## Plan

### 1. Pull-quote component (item b)

Design a single reusable treatment and deploy it 3–4 times across the doc.

**Visual spec:**
- Left-indented block with a thin vertical rule in `--accent-blue` on the left edge (2–3px wide).
- Text in Source Serif 4 italic, weight 400, size ~1.3–1.5rem, line-height ~1.35.
- Color: `--text-primary` (not secondary — pull-quotes should read as foreground).
- Max-width ~640px, centered or left-aligned depending on surrounding layout.
- `padding: 1rem 0 1rem 1.5rem`. No background fill, no border-box, no quote marks rendered in CSS.
- Optional: small `— attribution` below in `--text-muted`, mono-font, 0.75rem — used only when the quote has a source (e.g., Karpathy quote).

**CSS tokens to add near the hierarchy contract comment:**
```css
.pullquote {
  font-family: var(--font-hero);
  font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 1.45rem);
  line-height: 1.4;
  color: var(--text-primary);
  max-width: 640px;
  margin: 2.5rem 0;
  padding: 0.8rem 0 0.8rem 1.5rem;
  border-left: 2px solid var(--accent-blue);
  font-weight: 400;
}
.pullquote-attribution {
  display: block;
  margin-top: 0.75rem;
  font-family: var(--font-mono);
  font-style: normal;
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}
```

**Deployment — 3–4 placements:**
Source sentences from existing copy; do not invent new quotes.

1. **Near `#overview` (The Paradigm Shift)** — insert after the overview card grid:
   > *"Models forget. Hooks don't."*
   Rationale: this is the sentence that most compactly expresses the Hooks philosophy embedded in the Claude Best Practices section; surfacing it on the FSAD landing sets up the later chapter.
2. **Near `#workflow`** (between the workflow visualization and the workflow detail):
   > *"Spec-driven, not code-driven. Structure is permanent; prompting is temporary."*
   Rationale: this is the thesis of the entire methodology.
3. **Near `#practices/config-cascade`** (before the "Cascading rules & precedence" subsection):
   > *"Org and project `.claude/` live in git. Only `~/.claude/` stays local."*
   Rationale: the single sentence that clarifies the whole cascade mental model.
4. *(Optional)* **Near `#practices` hub** (below the hub card grid, as a closing breath before the topic views):
   > *"Pick a cluster, read it, return."*
   Rationale: sets expectations for how to use the Claude Best Practices section. Low-priority; ship only if the first three land well.

**Visual check:** the pull-quote should read as *intentional*, not decorative. If it feels like a marketing callout, tune the weight/size down until it sits quietly in the reading flow.

### 2. KPI chart style (item c)

Current state: `#page-kpis` uses large colored percentages (`84%` / `<1%`) in `.kpi-metric--positive` boxes. Adequate but unmemorable. Replace with a small-multiples chart rhythm.

**Visual spec:**
- `.kpi-card`: a 1-column flex unit that contains:
  - `.kpi-label` — small mono text above the number (what is being measured).
  - `.kpi-figure` — the number, Source Serif 4, 2.4–2.8rem, weight 400 (not 600 — serif numerals read heavier at weight).
  - `.kpi-trendline` — a simple inline SVG sparkline (2–8 data points, ~80px wide, stroke `currentColor`, matching the semantic color of the metric). For metrics with no time-series data, omit the sparkline rather than fake it.
  - `.kpi-context` — one short sentence in `--text-secondary`, explaining how to read the number.
  - `.kpi-source` — citation line in `--text-muted`, mono, 0.7rem.
- Layout: `.kpi-grid` as `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem 2.5rem;` — wider than the current Advantages grid because charts need breathing room.
- No background fills. No borders. Small multiples rely on *rhythm*, not card chrome.

**CSS skeleton:**
```css
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem 2.5rem;
  margin-top: 2rem;
}
.kpi-card { display: flex; flex-direction: column; gap: 0.5rem; }
.kpi-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.kpi-figure {
  font-family: var(--font-hero);
  font-size: clamp(2rem, 3.5vw, 2.6rem);
  font-weight: 400;
  line-height: 1;
  color: var(--text-primary);
}
.kpi-figure.kpi-figure--positive { color: var(--accent-emerald); }
.kpi-figure.kpi-figure--warning  { color: var(--accent-amber); }
.kpi-trendline { height: 24px; margin: 0.25rem 0; color: currentColor; }
.kpi-context { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; }
.kpi-source { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
```

**Migration steps:**
- Identify every `<h3 class="kpi-metric">` in `#page-kpis` and restructure the surrounding markup into `.kpi-card` blocks.
- For metrics where source data is known (Anthropic / Claude Code telemetry, public benchmarks), include a real sparkline as inline SVG. For metrics without time-series, omit the sparkline — do not fabricate data.
- Preserve the existing citation/copy; just move it into `.kpi-context` + `.kpi-source`.
- Delete the now-orphaned `.kpi-metric` + `.kpi-metric--positive` / `--warning` classes after all call sites migrate.

**Honesty check:** this section earns its reputation on credibility. Do not ship sparklines that represent invented data. If a metric doesn't have time-series, the card shows label + figure + context + source — that's enough. Charts are not decoration.

### 3. Italic serif in section subtitles (Q2)

Current state: `.section-subtitle em` renders as Inter italic (all section subtitles across FSAD, Pods, Practices, Codex, KPIs use this pattern — e.g., _"FSAD replaces the traditional handoff-heavy SDLC with a tight feedback loop where humans define <em>what</em> and <em>why</em> in markdown..."_).

**CSS change (add to the typography block):**
```css
.section-subtitle em,
.hero p em {
  font-family: var(--font-hero);
  font-style: italic;
  font-weight: 400;
}
```

**Verification:** spot-check 5 rendered subtitles. The serif italic should feel *personable*, not *inconsistent*. If it reads as a mistake (wrong weight, wrong size, wrong vertical alignment), revert and consolidate.

### 4. Final critique-driven verification

- Run `/critique` one last time on v21. Write to `markdown/research/UX_critique_v21.md`.
- Rubric: not "is this AI-generated" (passed three critiques ago) but "does this have a *point of view* the v20 critique said was still missing?"
- Expected outcome: the "correct and distinctive" verdict. If the critique still calls out voice weakness, document the gap and decide whether to extend Phase 6 or accept.

### 5. Retire the critique pipeline (Q4 decision)

After the v21 critique, the critique-driven UX cycle is closed. Future UX work originates from:
- **External feedback:** share v21 with 2–3 engineering directors (candidates: JZ who already gave feedback in CBP-005, one external to the current org, one in adjacent R&D). Capture verbatim reactions in `markdown/research/external_feedback_v21.md`.
- **Real-world usage telemetry:** if instrumentation is feasible, track which sections readers actually land on vs. scroll past. No UI needed; infer from anchor traffic.
- **Explicit milestone work:** not cosmetic polish — new content, new integrations, new Claude Code releases auto-updated via existing CBP process.

Document this retirement decision in `CHANGELOG.md` under v21.

### 6. Version + changelog bump

- `<title>` → v21.
- Sidebar badge → v21.
- Changelog modal markup → v21 entry summarizing this phase's identity moves.
- `CHANGELOG.md` → v21 entry referencing CBP-032 Phase 6 (including the critique-pipeline retirement note).
- `README.md` version bump to v21.

## Acceptance Criteria
- [x] `.pullquote` component CSS added, including `.pullquote-attribution`
- [x] Pull-quotes deployed at `#overview`, `#workflow`, and `#practices/config-cascade`
- [x] Each pull-quote sourced from existing copy — no invented quotes
- [x] `.kpi-card` / `.kpi-grid` / `.kpi-figure` / `.kpi-context` / `.kpi-source` CSS added
- [x] Code Review section's 2 cited metrics (`84%`, `<1%`) migrated to the `.kpi-card` structure (KPIs page left as suggestion-based — would require fabricated sparklines)
- [x] Sparklines omitted — real time-series data not available; no fabrication per plan
- [x] Citations preserved; `.kpi-source` line applied to both Code Review metrics
- [x] `.section-subtitle em` and `.hero p em` use `var(--font-hero)` italic
- [x] Spot-check: italic serif reads as intentional across the 5 page heroes and section subtitles
- [x] `.kpi-metric` classes superseded by `.kpi-figure` variants (old classes retained harmlessly — no remaining markup uses them)
- [x] `/critique` fifth and final pass written to `markdown/research/UX_critique_v21.md`
- [x] v21 critique verdict: **correct and distinctive** — zero Priority Issues
- [x] Critique-pipeline retirement decision recorded in `CHANGELOG.md` v21 entry and in v21 critique itself
- [x] External-feedback artifact seeded at `markdown/research/external_feedback_v21.md` with structure, candidate reviewers, and reviewer-question bank
- [x] `<title>`, sidebar badge, changelog modal, `CHANGELOG.md`, `README.md` all bumped to v21
- [x] Committed as a single atomic commit referencing CBP-032 Phase 6
