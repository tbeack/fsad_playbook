# CBP-455 — Add Token Optimization Strategies section

## Source
Stakeholder request, referencing `research/CTO_Agentic_Token_Optimization_Strategies.pdf` — a "CTO Conversation Guide" on making Full-Stack Agentic Development more economically efficient (token/harness economics for organizations that have already achieved AI adoption, not individual session habits).

## Summary
Add a new **Token Optimization Strategies** section to the KPIs to Measure Impact page, distilling the PDF's three-lens framework (use less unnecessary intelligence, don't use intelligence where software will do, buy the right intelligence) for engineering leaders. This is deliberately separate from the existing "Token Management" section on the Practical Best Practices page (`#tips/token-limits`), which covers individual session habits (compact at 50%, name exact files, etc.) — a different altitude of content from this portfolio/harness-economics topic.

## Assessment
- Existing "Token Management" section: `fsad-playbook.html:3527-3575` (`id="token-limits"`, Practical Best Practices page) — 5 personal session-hygiene habits. **Left unchanged** per user decision.
- Target page: `page-kpis` (`fsad-playbook.html:14554-14672`), "KPIs to Measure Impact" — already covers ROI/cost metrics (Token Consumption by User, Total $ Spend by AI Tool at lines 14573-14595), so a leadership-economics section fits its existing theme.
- Page currently has two sections: `01 — FSAD Metrics` (`fsad-metrics`) and `02 — Process Health` (`process-health`, ends at line 14666), then a `<footer>` (14668-14671) and `</div><!-- end page-kpis -->` (14672).
- Nav sidebar entry for this page: `fsad-playbook.html:2429-2441` (`data-group="kpis"`), currently linking Overview / Metrics / Process Health.
- Reusable component classes confirmed in the file: `card-grid-3` + `card`/`h4`/`p` (used throughout `page-kpis`), `callout callout-best-practice` / `callout callout-tip` / `callout callout-warning` (used at `14615-14618` and `14662-14665`), and `table-wrap` + `table class="styled-table"` with `thead`/`tbody` (used repeatedly from line 10795 onward).
- Current version: `v3.2.45` (title tag line 6, sidebar-brand line 2184, README.md:52). No CHANGELOG.md entry needed yet for v3.2.46 — will be added per Step 5g of execute mode.

## Plan

1. **Insert new section** in `fsad-playbook.html`, immediately after the `process-health` section closes (after line 14666's `</section>`, before the `<hr class="divider">`/`<footer>` that closes `page-kpis`), following the existing section markup pattern (`<hr class="divider">` → `<section id="token-optimization">`):
   - `<span class="section-label">03 — Token Optimization Strategies</span>`
   - `<h2 class="section-title">Engineer the Economics, Not Just the Adoption</h2>`
   - `<p class="section-subtitle">` — framing sentence adapted from the PDF: adoption is solved; the next problem is system economics — redesigning the harness to produce more engineering output from the same or less machine intelligence.

2. **Three-lever card grid** (`<div class="card-grid-3">`, 3 `<div class="card">` blocks, matching the existing card pattern at lines 14571-14596):
   - **Use Less Unnecessary Intelligence** — condense sections A–D from the PDF (simplify agent topology/over-agenting, progressive-disclosure context engineering, faster loop convergence, right-sized work packets). Close with the PDF's lead conversation question in italics.
   - **Don't Use Intelligence Where Software Will Do** — condense section E (push deterministic work — build/lint/test/schema/security scanning — into tooling; "tools perform computation and filtering, agents perform judgment"). Close with its lead conversation question.
   - **Buy the Right Intelligence** — condense section F (frontier-supervisor + open-weight-worker architecture, escalate-on-difficulty, specialize open-weight models for repetitive work). Close with its lead conversation question.

3. **Frontier vs. open-weight division-of-labor table** — `<div class="table-wrap"><table class="styled-table">` with columns `Frontier Model` / `Open-Weight Model(s)` / `Frontier Re-engagement`, transcribing the 5-row table from PDF page 5 (Understand the problem / Determine architecture / Decompose complex work / Identify risks and constraints / Define acceptance criteria, mapped to their open-weight and re-engagement counterparts).

4. **Economic caveat callout** — `<div class="callout callout-warning">` titled "Open-Weight Isn't Automatically Cheaper", stating the PDF's point: the relevant comparison is cost per successfully completed engineering task (inference, infra, retries, latency, engineer intervention, quality failures), not cost per million tokens.

5. **Experiments table** — `<div class="table-wrap"><table class="styled-table">` with columns `Experiment` / `Comparison`, using a curated subset (5–6 rows) of the PDF's benchmark table (Agent topology, Context architecture, Deterministic preprocessing, Convergence, Task sizing, Intelligence architecture) — condense the "Comparison" cell text to fit the table width used elsewhere in the file.

6. **Portfolio-metric callout** — `<div class="callout callout-best-practice">` titled "Portfolio Metric to Track", stating: **Cost per accepted autonomous engineering change** — pairs with the existing "Total $ Spend by AI Tool" metric in the `01 — FSAD Metrics` section above.

7. **Update nav sidebar** at `fsad-playbook.html:2436-2440` (`data-group="kpis"` sub-items) — add a new `<a class="nav-sub-item" href="#kpis/token-optimization" onclick="scrollToSection('token-optimization')">Token Optimization</a>` after the "Process Health" link.

8. **Version bump** — bump `v3.2.45` → `v3.2.46` in all three required locations (title tag, sidebar-brand, README.md version table), add a CHANGELOG.md entry, and add a new changelog-modal `<section>` (single-task style, intro `<p>` only, no `<ul>` since this is one task) above the current latest version block, per the project's version-bump checklist in `CLAUDE.md`.

9. **Build** — run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html` once all edits land.

## Acceptance Criteria

All criteria verified 2026-08-25 before commit.

- [x] `fsad-playbook.html` contains a `<section id="token-optimization">` on `page-kpis`, positioned after `process-health` and before the page's closing `<footer>`.
- [x] The section includes a 3-card grid covering all three PDF lenses (use less unnecessary intelligence / don't use intelligence where software will do / buy the right intelligence), each with a closing conversation question.
- [x] The section includes a frontier-vs-open-weight `styled-table` with at least the 5 rows from the PDF's division-of-labor table.
- [x] The section includes an economic-caveat callout stating cost-per-completed-task (not cost-per-token) as the correct comparison.
- [x] The section includes an experiments `styled-table` with at least 5 rows drawn from the PDF's benchmark table.
- [x] The section includes a callout naming "Cost per accepted autonomous engineering change" as the portfolio metric to track.
- [x] The existing "Token Management" section (`#tips/token-limits`) on the Practical Best Practices page is unchanged.
- [x] Nav sidebar under "KPIs to Measure Impact" includes a working "Token Optimization" link that scrolls to the new section.
- [x] `<title>` tag, `sidebar-brand`, and `README.md` version table all read `v3.2.46`.
- [x] `CHANGELOG.md` has a new entry for v3.2.46 describing the addition, and the in-app changelog modal has a matching `<section>`.
- [x] `dist/fsad-playbook.html` is regenerated via `python3 scripts/build-dist.py` and staged alongside the source in the eventual commit.
