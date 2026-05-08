# CBP-099 — Add the `vuln_hunter` example to the security section

## Summary

Add a new collapsible block inside `#security-review` that introduces `vuln_hunter.py` as a complementary bulk vulnerability scanning tool. Where `/sec-review-team` is an interactive specialist skill that orchestrates a focused pre-merge review, `vuln_hunter` is a batch-mode Python CLI that sweeps every source file in a repo using Claude Code in headless mode — useful for auditing unfamiliar or legacy codebases.

## Assessment

The security review section (`<section id="security-review">`, `fsad-playbook.html` line 4251–5552) currently covers:
- Flow diagram (SVG, dark + light)
- Invocation callout and specialist table
- Specialist definition collapsibles (13 agents)
- Example invocation code blocks and legacy monolithic prompt collapsible
- "How to Adapt" callout
- **New (this task):** "Complementary: Bulk Vulnerability Hunting" H3 + collapsible
- "Install the Skill" heading + git sparse-checkout instructions

The `vuln_hunter` project lives at `/Users/theobeack/Desktop/AI/vuln_hunter/src/vuln_hunter.py`. It implements Nicholas Carlini's two-stage pipeline:
- **Stage 1 (find):** For every source file, invokes `claude -p "<prompt>"` asking Claude to find an exploitable vulnerability starting from that file; writes a `vuln_reports/<path>.vuln.md`.
- **Stage 2 (verify):** For each report, invokes Claude again to confirm or reject — appending `## Verification: CONFIRMED` or `## Verification: REJECTED`.
- **Summarize:** Tallies CONFIRMED / REJECTED / unverified counts.

## Plan

1. Insert new "Complementary: Bulk Vulnerability Hunting" H3 + collapsible block between the "How to Adapt" callout and the `<h3>Install the Skill</h3>` heading in `fsad-playbook.html`.
2. Use existing `<div class="collapsible">` pattern (not `<details>`).
3. No version bump — content addition only.

All criteria verified 2026-05-06 before commit.

## Acceptance Criteria

- [x] New "Complementary: Bulk Vulnerability Hunting" H3 heading appears in the `#security-review` section, between the "How to Adapt" callout and "Install the Skill"
- [x] Collapsible block opens/closes correctly using the existing JS collapsible pattern
- [x] Two-stage pipeline is explained clearly: stage 1 (find), stage 2 (verify), summarize
- [x] Both stage prompts are shown as code blocks
- [x] Usage example shows `all`, `stage1`, `stage2`, and `summarize` subcommands
- [x] "When to use each tool" callout distinguishes `/sec-review-team` from `vuln_hunter.py`
- [x] No existing section content is removed or broken (flow diagram, specialist table, specialist collapsibles, legacy prompt, "How to Adapt", "Install the Skill" all still present)
- [x] Renders cleanly in both dark and light themes
- [x] `todo.md` entry updated with link to this task file
