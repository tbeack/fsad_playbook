# CBP-453 — Add a "Process Health" subsection to the KPIs page

## Source

Follow-on from CBP-451 (diff of the "AI-Native SDLC Playbook" blog post against the FSAD Playbook) — see `markdown/research/ai-native-sdlc-blog-diff.md`, diff item #17 and incorporation-list item #2.

## Summary

The blog post pairs every SDLC stage with leading (process-speed) and lagging (quality/outcome) metrics — e.g. time from spec to committed plan, first-pass CI success rate, PR review time, defect-escape rate, repeat-incident rate. The playbook's KPIs page is entirely volume/adoption-oriented today (token consumption, story points, PR/commit counts, WAU, spend, AI acceptance rate) with no cycle-time or escape-rate framing. Add a "Process Health" subsection covering this gap, reusing the playbook's existing spec.md/plan.md artifact vocabulary from the `workflow` section.

## Assessment

`page-kpis` (fsad-playbook.html, ~line 14445, "Measuring FSAD Success") currently covers only volume/adoption metrics. It does not track cycle time between workflow phases, first-pass CI success, review latency, or defect-escape/repeat-incident rates — despite the `workflow` section (~2510) already naming the phases (Intent & Discovery → Live Spec Session → Implementation Planning → Parallel Agent Execution → Human Review & Ship) these metrics would measure between.

**Location:** `fsad-playbook.html` — `<div class="page" id="page-kpis">`, `<section id="...">` for "Measuring FSAD Success" (~line 14445)

## Plan

1. Add a new "Process Health" subsection to `page-kpis`, following the page's existing metric-card/table pattern.
2. Cover leading indicators: cycle time from spec commit to plan commit, cycle time from plan approval to merged PR, first-pass CI success rate for agent-written changes.
3. Cover lagging indicators: PR review time, defect/vulnerability escape rate (pre- vs. post-merge), repeat-incident rate for the same class of issue.
4. Explicitly tie each metric to the artifact/phase names already used in `workflow` (Intent & Discovery, Live Spec Session, Implementation Planning, Parallel Agent Execution, Human Review & Ship) so the KPIs page and workflow page stay consistent.
5. No version bump — content addition only.

## Acceptance Criteria

- [x] New "Process Health" subsection exists on `page-kpis` in `fsad-playbook.html`
- [x] Subsection lists at least 3 leading (process-speed) metrics, including spec→plan and plan→merged-PR cycle times and first-pass CI success rate
- [x] Subsection lists at least 3 lagging (quality/outcome) metrics, including PR review time, defect-escape rate, and repeat-incident rate
- [x] Metric definitions reference the existing `workflow` phase names for consistency
- [x] No existing KPI content (volume/adoption metrics) is removed or broken
- [x] Renders cleanly in both dark and light themes

All criteria verified 2026-08-25
