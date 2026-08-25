# CBP-452 — Add a "Continuous Evals in CI" subsection

## Source

Follow-on from CBP-451 (diff of the "AI-Native SDLC Playbook" blog post against the FSAD Playbook) — see `markdown/research/ai-native-sdlc-blog-diff.md`, diff item #11 and incorporation-list item #1.

## Summary

The blog post describes a live regression suite — 20–50 real recent tasks written as prompt + acceptance checks — that runs non-interactively on a schedule and gates changes to CLAUDE.md, skills, and hooks before they merge. Every production incident becomes a permanent eval case, so the suite grows over time. This concept doesn't exist anywhere in the playbook (0 hits for continuous-eval patterns). Add a subsection covering it.

## Assessment

The Claude Best Practices page has `#code-review` (fsad-playbook.html, ~line 10047, PR review with REVIEW.md) and `#hooks-deep-dive` (~line 11987, build-time guardrails and approval gates), but neither covers regression-testing the *configuration itself* (CLAUDE.md/skills/hooks) — both are about reviewing code changes, not validating agent-steering config changes before they ship. `#hooks-deep-dive` is the better home since continuous evals are a config-change gate, conceptually adjacent to hooks-as-approval-gates already covered there.

**Location:** `fsad-playbook.html` — `<section id="hooks-deep-dive">` (~line 11987)

## Plan

1. Add a new H3 "Continuous Evals in CI" subsection inside `#hooks-deep-dive`, after the existing approval-gates content, following the section's existing heading/prose/code-block/collapsible patterns.
2. Explain the core mechanic: 20–50 real recent tasks captured as prompt + acceptance checks (tests pass, lint clean, unchanged behavior, policy compliance), run non-interactively on a schedule and on CLAUDE.md/skill/hook changes.
3. Explain the growth loop: each production incident becomes a permanent eval case, so the suite compounds over time and regressions get caught before they repeat.
4. Include one illustrative example (a short eval spec: prompt + 2–3 acceptance checks) as a code block, matching the existing code-block styling in the section.
5. No version bump — content addition only.

## Acceptance Criteria

- [x] New "Continuous Evals in CI" H3 heading exists inside `<section id="hooks-deep-dive">` in `fsad-playbook.html`
- [x] Subsection explains the 20–50 task regression-suite concept with a prompt + acceptance-check structure
- [x] Subsection explains that the suite gates CLAUDE.md, skill, and hook changes and also runs on a schedule
- [x] Subsection explains that production incidents become permanent eval cases
- [x] At least one example eval spec is shown as a code block
- [x] No existing content in `#hooks-deep-dive` is removed or broken
- [x] Renders cleanly in both dark and light themes

All criteria verified 2026-08-25
