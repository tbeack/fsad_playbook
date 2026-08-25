# CBP-454 — Add a "Production Monitoring & Control Bands" section

## Source

Follow-on from CBP-451 (diff of the "AI-Native SDLC Playbook" blog post against the FSAD Playbook) — see `markdown/research/ai-native-sdlc-blog-diff.md`, diff item #15 and incorporation-list item #3.

## Summary

The blog post's "Maintain" stage closes its SDLC loop: a monitoring agent watches a rolling-baseline production metric (CI failure rate, post-deploy 5xx rate, PR cycle time) with statistical breach tiers — 1σ logs only, 2σ triggers a read-only Claude diagnosis, 3σ triggers Claude proposing a fix (PR or pre-approved runbook) — and writes its diagnosis back as a new `intent.md`-style artifact for human triage. The playbook's `workflow` section models the forward half of this loop (intent → spec → plan → execution → review) but has no stage that closes it — a production breach never automatically re-enters the pipeline. The existing `monitoring` section is unrelated (it covers Claude Code's own OTel usage/cost telemetry, not production application monitoring). This is the clearest structural gap identified in CBP-451.

## Assessment

`workflow` (fsad-playbook.html, ~line 2510) has 5 phases ending at "Human Review & Ship" — no phase represents ongoing production monitoring or incident-to-intent feedback. `monitoring` (~line 12729) is scoped entirely to Claude Code's own usage/cost telemetry (OTel metrics, distributed traces, Prometheus/Grafana), a different kind of "monitoring" than production anomaly detection. No section anywhere covers statistical breach detection, control bands, or an incident auto-generating a new planning artifact.

**Location:** new section, either a sibling to `<section id="monitoring">` (~line 12729) on the Claude Best Practices page, or a new closing phase/section on the FSAD page's `workflow` section (~line 2510) — pick whichever fits the page's existing content flow better once in execute mode.

## Plan

1. Decide placement: new section sibling to `#monitoring` (Claude Best Practices page) vs. an addition to `#workflow` (FSAD page) — inspect both sections' surrounding content first to choose the better fit, since this task's Assessment identifies two plausible homes.
2. Add a new section explaining the control-band model: a rolling-baseline metric (e.g. CI test failure rate, post-deploy error rate, PR cycle time) with three response tiers — 1σ (log only), 2σ (Claude diagnoses read-only), 3σ (Claude proposes a fix via PR or pre-approved runbook).
3. Explain that a breach diagnosis gets written as a new intent-style markdown artifact, closing the loop back into the existing spec/plan pipeline described in `workflow`.
4. Include an illustrative example (a short config snippet showing the tiered response, e.g. a `bands.yaml`-style structure) as a code block, matching the section's surrounding code-block conventions.
5. Explicitly connect this new section back to `workflow`'s existing phases so the FSAD methodology reads as a closed loop rather than a one-way pipeline.
6. No version bump — content addition only.

## Acceptance Criteria

- [x] New "Production Monitoring & Control Bands" section (or equivalently-named heading) exists in `fsad-playbook.html`, placed either alongside `#monitoring` or within `#workflow`
- [x] Section explains the 3-tier breach model (1σ log / 2σ read-only diagnose / 3σ propose-fix) on a rolling-baseline metric
- [x] Section explains that a breach diagnosis is written back as a new intent-style artifact
- [x] Section explicitly ties the loop-closing back to the existing `workflow` phases, so the methodology reads as closed-loop rather than linear
- [x] At least one example config/structure is shown as a code block
- [x] No existing content in `#monitoring` or `#workflow` is removed or broken
- [x] Renders cleanly in both dark and light themes

All criteria verified 2026-08-25

## Implementation Notes

**Placement decision:** New section placed as a sibling to `#monitoring` (Claude Best Practices page, "operations" topic-view), not as an addition to `#workflow` (FSAD page). Rationale: `#workflow` is a rigid interactive 5-phase widget (fixed `data-phase="0..4"` indices, dedicated `showPhase()` JS, matched `workflow-detail` divs) — inserting a 6th "phase" would require restructuring that widget's JS and phase-click logic. `#monitoring`'s section uses the simpler, more extensible collapsible/table/code-block/callout pattern already used throughout the Claude Best Practices page, so a new sibling section fits the existing content flow with no JS restructuring. The new section links back to `#fsad/workflow` via a genuine `<a href="#fsad/workflow">` anchor inside a callout, satisfying the "tie back to workflow phases" requirement without touching the phase widget.

New section: `<section id="production-monitoring">` (fsad-playbook.html, section-label "17 — Production Monitoring & Control Bands"), with two collapsibles (`production-monitoring--control-bands`, `production-monitoring--closing-loop`), a `bands.yaml` code-block example, and a callout linking to `#fsad/workflow`. Sidebar nav entry and `sectionToPageMap` JS registration added to match. No version bump (content addition only, per plan).
