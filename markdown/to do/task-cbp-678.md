# CBP-678 — Fix dead sidebar anchors on the Harness Engineering page

## Source
Found while planning CBP-677.

## Summary
Four sidebar links for the Harness page point to section ids that do not exist in `src/pages/harness.html`. The links do nothing. Six real sections have no link.

## Assessment
`src/playbook.tmpl.html` lines 102-110 link to `seven-jobs`, `bounded-loop`, `failure-upgrades`, and `brain-hands-history`. None of these ids exist in `src/pages/harness.html`. The page has these ids: `harness-hero`, `model-vs-harness`, `instructions-infrastructure`, `task-contract`, `context-state`, `capability-plane`, `control-trust`, `graph-loop-engineering`, `observe-improve`, `durable-runtime-substrate`, `maturity-ladder`, `checklist`.

**Location:** `src/playbook.tmpl.html` — sidebar group `data-group="harness"`

## Plan

1. Replace the four dead links with links to the real section ids.
2. Add links for the sections that have none.
3. Run `python3 scripts/build-source.py`.
4. Serve the build and click each link.

Do this after CBP-677, because CBP-677 may add or rename sections.

## Acceptance Criteria
- [ ] Every `scrollToSection('X')` in the harness sidebar group has a matching `id="X"` in `src/pages/harness.html`.
- [ ] Every `<section id>` in `src/pages/harness.html` has a sidebar link.
- [ ] The build passes.
