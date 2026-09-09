# CBP-531 — Plan a refactor of the Harness Engineering page: new structure, organization, flow, markdown snippets, and a mermaid-diagram mockup

## Source
Follow-on from `CBP-530` (research: build fact base for "how to build your own harness" guide). Theo's own idea (2026-09-04), requested directly via `/tb:at`.

## Summary
Produce a *plan* — not the implementation — for restructuring the existing Harness Engineering page (`src/pages/harness.html`) into a clearer, better-organized guide. The plan must define the new page structure, the section-by-section flow, and include practical markdown snippets as concrete examples of the content it proposes to add. It must also include a mockup of the page combining Mermaid diagrams (including at least one DAG showing the harness workflow/data flow) with the text content planned for each section. This task does not edit `src/pages/harness.html` or any other `src/` file — it produces a plan artifact only.

## Assessment
`src/pages/harness.html` (320 lines) currently ships as the "Harness Engineering" nav page (added in `CBP-500`, diagrams reworked in `CBP-505`). It is organized as a flat sequence of ~10 `<h2>` sections with no sub-navigation or logical grouping:

1. "The Model Proposes. The Harness Decides." (intro/framing)
2. "What a Production Harness Actually Does" — 7 subsections (a)–(g): contract, map-not-manual, tools-in-environment, externalized memory, sensors-before-autonomy, permissions-outside-model, traces+recovery
3. "Say It Once as Guidance. Say It Again as a Check."
4. "Retry Belongs to the Harness, Not the Model"
5. "Fix the Class of Failure, Not Just the Run" — 7 failure-mode cards
6. "Keep the Three Components Separate" — Brain/Hands/History + "The Change Receipt"
7. "Start With the Smallest Harness That Closes the Loop"
8. "The Harness Engineering Checklist"
9. "The Real Shift" — PROMPT/CONTEXT/HARNESS/LOOP/GRAPH cards

It is conceptual and opinionated but has no citations, no Claude Code vs. Codex comparison, and no worked reference setups (confirmed in `CBP-530`'s assessment). `CBP-530` is producing a separate, source-backed research dossier at `markdown/research/harness_research.md` covering official docs, team practice, failure modes, glossary, reference architectures, and a guide outline for both Claude Code and Codex — this plan should treat that dossier as its primary evidence input once available, while independently retaining/reorganizing whatever is already accurate on the live page.

Theo also supplied a design reference (2026-09-08, same image used to update `CBP-530`): a diagram titled "Agent Architecture & Operations", saved at `markdown/research/assets/harness-architecture-framework.jpg`. It lays out a 7-component mental model (Task Contract, Context + State, Capability Plane, Graph Engineering with nested Loop Engineering, Control + Trust, Observe + Improve, Durable Runtime Substrate) and a "Three Engineering Layers" framing (Harness / Graph / Loop Engineering), with a node/edge/branch/join/cycle/interrupt/subgraph vocabulary for the DAG box. This plan should use it two ways: (a) as a candidate scaffold for the refactored page's section structure — evaluated against, not automatically substituted for, what `CBP-530`'s research actually supports for Claude Code/Codex — and (b) as the visual vocabulary for the Mermaid mockup's DAG, so the workflow diagram reads as an explicit node/edge state machine rather than a generic flowchart.

**Location:** `src/pages/harness.html` (current page, read-only reference) · `markdown/research/harness_research.md` (CBP-530 output, primary input once written) · design reference `markdown/research/assets/harness-architecture-framework.jpg` · plan output path: `markdown/plans/harness-page-refactor-plan.md` (new).

## Plan

1. Read `src/pages/harness.html` in full and catalog every existing concept, framing line, and example worth keeping (e.g. Brain/Hands/History, the Change Receipt, the 7 failure-mode fixes, the PROMPT→GRAPH shift) versus what's thin or unsupported and should be cut or rewritten.
2. Read `markdown/research/harness_research.md` (CBP-530 output) if it exists by the time this task runs; fold its Claude-Code-vs-Codex comparisons, glossary, and reference architectures into the proposed structure. If CBP-530 hasn't landed yet, note the dependency explicitly in the plan's Gaps/Open Questions and proceed with what's verifiable from the live page and public docs.
3. Draft the new page structure: propose section order, heading hierarchy, and an explicit flow rationale (why each section follows the last — e.g. concept → contract → tooling → failure handling → checklist). Explicitly evaluate `markdown/research/assets/harness-architecture-framework.jpg`'s 7-component model (Task Contract, Context + State, Capability Plane, Graph + Loop Engineering, Control + Trust, Observe + Improve, Durable Runtime Substrate) as a candidate scaffold: adopt the parts CBP-530's research and the current page support, adapt or drop the parts that don't fit Claude Code/Codex reality, and state the reasoning either way in the plan rather than silently picking one.
4. For each proposed section, write a short prose description of its content plus at least one practical markdown snippet as a concrete example (e.g. a sample contract block, a sample retry-policy config, a sample change-receipt entry) — not filler, but content close to what would actually ship.
5. Build a page mockup combining Mermaid diagrams and text: include at least one Mermaid DAG (`graph TD` or `flowchart`) modeling the harness request/response flow connecting the proposed sections, plus supporting diagrams (sequence or state) where they clarify a subsection (e.g. permission-check flow, retry/escalation flow). Model the DAG using the reference diagram's vocabulary (intake/router/specialist/human-gate/tool-action/join-merge/verify/done nodes, branches, cycles, interrupts) rather than a generic box-and-arrow flow, and include a nested state diagram for the nested Loop Engineering cycle (load state → plan/select → act/call → observe → evaluate → replan) if the page adopts that framing.
6. Cross-check the plan against the existing page one more time to confirm no genuinely accurate, still-relevant content was dropped without a stated reason.
7. Write the plan to `markdown/plans/harness-page-refactor-plan.md` (create the `markdown/plans/` directory if it doesn't exist).
8. Do not edit `src/pages/harness.html`, `src/pages/practices.html`, `src/pages/codex.html`, or run either build script in this task — planning only. Open a follow-up CBP task to implement the refactor once this plan is reviewed.

## Acceptance Criteria
- [ ] Output file exists at `markdown/plans/harness-page-refactor-plan.md` with mtime after this task started.
- [ ] Plan explicitly enumerates the proposed new page structure (ordered section list with headings), states the flow rationale for the ordering, and states explicitly whether/how it adopts, adapts, or rejects `markdown/research/assets/harness-architecture-framework.jpg`'s 7-component framework as the scaffold, with reasoning.
- [ ] Plan includes, for every proposed section, at least one practical markdown snippet illustrating example content for that section.
- [ ] Plan includes a page mockup section combining text and Mermaid diagram code blocks.
- [ ] Mockup includes at least one Mermaid DAG (`graph`/`flowchart` direction) connecting the proposed sections/flow, using the reference diagram's node/edge/branch/join/cycle/interrupt vocabulary rather than a generic flowchart.
- [ ] Plan states which currently-accurate content from `src/pages/harness.html` is retained, and which is cut or rewritten, with a one-line reason for each cut.
- [ ] Plan references or incorporates findings from `markdown/research/harness_research.md` if that file exists at task run time; otherwise the plan states this as an open dependency on `CBP-530`.
- [ ] `src/pages/harness.html` is unchanged by this task (`git diff --quiet src/pages/harness.html`).
- [ ] Neither `scripts/build-source.py` nor `scripts/build-dist.py` was run as part of this task (no generated `fsad-playbook.html`/`dist/fsad-playbook.html` diff attributable to this task).
