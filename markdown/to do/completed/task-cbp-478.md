# CBP-478 (originally filed as CBP-472; renumbered — the auto-updater reused CBP-472 in PR #197) — Develop a high-level plan to refactor fsad-playbook.html into a modular architecture

## Source
User request via `/tb:at`, 2026-08-26. Follows CBP-471 (alignment fix) — this is a planning-only task, no implementation.

## Summary
`fsad-playbook.html` has grown to ~17,460 lines of inline HTML/CSS/JS in a single monolithic file. This task is to produce a phased, high-level refactor plan that decomposes the file into a modular architecture (separate CSS/JS source files assembled at build time, or another structure justified by graph analysis) — with **zero change to externally observable behavior**. This is planning only: no code changes. The plan must stop for user approval before any implementation begins.

## Assessment
- Current state: single file `fsad-playbook.html` at repo root, ~17,460 lines, inline `<style>` and `<script>` blocks with no build step for the source file itself.
- A `scripts/build-dist.py` script already exists and produces `dist/fsad-playbook.html` — a fully self-contained artifact with fonts and playgrounds inlined. Any refactor must preserve this dist-generation flow and the file's zero-dependency serve path (open directly in a browser, no server/build required for development).
- A Graphify code-graph mapping of the codebase already exists at `/Users/theobeack/Repo/fsad_playbook/graphify-out` (graph.json, GRAPH_REPORT.md, graph.html) — use this to identify module boundaries (communities, god nodes, edge clusters) rather than guessing structure by convention.
- Reference planning templates exist at `/Users/theobeack/Repo/p_mon/planning/plan/refactor/`: `project.md`, `roadmap.md`, `architecture.md`, `instructions.md`, `verification.md`, `plan_review.md`. These are to be used as structural templates for this task's deliverables, adapted to fsad_playbook's own scope and findings.
- App architecture context (from CLAUDE.md): 5 pages toggled via display:none/block, hash-based router, IntersectionObserver scroll spy, full-text search overlay, CSS-grid collapsibles, theme toggle with localStorage persistence. Version is tracked in 3 places (title tag, sidebar brand badge, changelog modal) that must stay in sync per the version-bump checklist.

**Location:** `fsad-playbook.html` (repo root) — full file. `scripts/build-dist.py` — dist build flow. `graphify-out/` — code graph for boundary analysis.

## Plan

1. Load and analyze the Graphify output (`graphify-out/graph.json`, `GRAPH_REPORT.md`) to identify communities, god nodes, and edge clusters within `fsad-playbook.html`'s HTML/CSS/JS.
2. Cross-reference graph findings against the app's known systems (router, scroll spy, search, collapsibles, theme toggle, Mermaid/highlight.js integration) to propose concrete module boundaries, each justified by a specific graph finding rather than convention alone.
3. Read the `p_mon` refactor planning templates (`project.md`, `roadmap.md`, `architecture.md`, `instructions.md`, `verification.md`) to understand their structure and adapt (not copy) them to this project.
4. Draft `markdown/refactor/project.md` — Project Overview: phases, scope, out-of-scope, success criteria, following the `p_mon` `project.md` template.
5. Draft `markdown/refactor/roadmap.md` — phased migration roadmap ordered so the app stays behaviorally identical and working after every phase (no big-bang rewrite), following the `p_mon` `roadmap.md` template.
6. Draft supporting planning docs (architecture.md, instructions.md, verification.md, or equivalents as warranted) covering:
   - How the zero-dependency serve path and `scripts/build-dist.py` output stay intact at each phase.
   - Risks and rollback plan per phase.
   - Explicit non-goals (no framework introduction, no visual/behavioral changes, no route/URL changes).
7. Flag in the plan whether other areas (Mermaid/highlight.js integration, the version-sync checklist across title tag / sidebar badge / changelog modal) need explicit coverage as their own scope items.
8. Present the completed plan set to the user and stop — do not begin implementation.

## Acceptance Criteria
- [ ] `markdown/refactor/project.md` exists and follows the `p_mon` `project.md` template structure (Project Overview, phases, scope, out-of-scope, success criteria).
- [ ] `markdown/refactor/roadmap.md` exists and follows the `p_mon` `roadmap.md` template structure, with migration phases ordered so the app remains behaviorally identical and working after each phase.
- [ ] At least one additional planning doc (architecture/instructions/verification) is produced, referencing the `p_mon` equivalents as templates.
- [ ] Every proposed module boundary in the plan cites a specific Graphify finding (community, god node, or edge cluster) — not just naming convention.
- [ ] The plan documents, per phase, how the zero-dependency serve path and `scripts/build-dist.py` output remain intact.
- [ ] The plan documents risks and a rollback approach for each phase.
- [ ] The plan states explicit non-goals (no framework introduction, no visual/behavioral changes, no route/URL changes).
- [ ] The plan flags whether Mermaid/highlight.js integration and the version-sync checklist need dedicated scope coverage.
- [ ] No implementation changes are made to `fsad-playbook.html`, `scripts/build-dist.py`, or `dist/` as part of this task — plan only.
- [ ] The plan is presented to the user and explicitly awaits approval before any follow-on implementation task is created.
