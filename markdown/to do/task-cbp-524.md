# CBP-524 — Research: build the fact base for a "how to build your own harness" guide (Claude Code + Codex)

## Source

Theo's own idea (2026-09-04). Prompt drafted in session and rewritten with `/prompt-improver`; the improved brief is embedded verbatim below.

## Summary

Produce a source-backed research dossier on current harness-engineering practice for Claude Code and OpenAI Codex, structured so a later task can turn it into a practical "how to build your own harness" guide for the playbook. This task delivers the fact base only, not the guide.

## Assessment

The playbook already ships a Harness Engineering page at `src/pages/harness.html` (320 lines). It is opinionated and conceptual: "What a Production Harness Actually Does" (contract, map-not-manual, tools-in-environment, externalized memory, sensors before autonomy, permissions outside the model, traces and recovery), "Retry Belongs to the Harness", "The Change Receipt", "Start With the Smallest Harness That Closes the Loop", and a checklist. It does not cite sources, does not compare Claude Code and Codex mechanics side by side, and has no worked reference setups. This research is the evidence layer that page currently lacks, and the eventual guide will either extend that page or sit beside it.

Prior research artefacts live in `markdown/research/` (`ai-native-sdlc-blog-diff.md`, `v3_UI_research.md`). The improved prompt names `~/markdown/research/harness_research.md` as the output path; that directory does not exist on this machine, and the repo's `markdown/research/` is almost certainly the intended home. Plan step 1 resolves this.

**Location:** `markdown/research/harness_research.md` (new, proposed) — related page `src/pages/harness.html`.

## Plan

1. Confirm output path with Theo: default to `markdown/research/harness_research.md` inside this repo unless told otherwise, and update the path in the brief before running it.
2. Read `src/pages/harness.html` end to end and list its claims, so the research can confirm, refute, or cite each one and the eventual guide stays consistent with the page.
3. Execute the brief below. Fan the ten scope areas out to unnamed research subagents (one area each, or paired where they overlap such as 2+10 and 8+9), each returning cited findings with an evidence-strength label per claim.
4. Consolidate into the mandated seven-section structure; write the summary last so it reflects the gathered evidence.
5. Verify against the acceptance criteria below (word count, section order, per-claim labels, URL cross-check), then report path, line count, and a five-line summary of the strongest findings.
6. Do not edit `src/pages/harness.html` in this task. Open a follow-up CBP task for the guide once the fact base is reviewed.

## Acceptance Criteria

- [ ] The output file exists at the agreed path (default `markdown/research/harness_research.md`) and its mtime is after this task started.
- [ ] Word count is between 5,000 and 8,000 (`wc -w`), or the file states in its Gaps section why it runs longer and the excess is cited fact rather than commentary.
- [ ] The file contains exactly the seven top-level sections in the mandated order: Summary; Glossary; Fact base; Reference architectures; Guide outline; Gaps; Sources.
- [ ] The Fact base has one subsection for each of the ten scope areas, and every subsection contains all four required parts: official docs, what teams do, failure modes, open questions.
- [ ] Every scope-area subsection addresses both Claude Code and Codex, and states explicitly where the two differ or where the practice transfers unchanged.
- [ ] The Glossary presents Claude Code and Codex terms side by side for every entry.
- [ ] Between three and four reference architectures are given, each with a concrete file and tool inventory and at least one source citation per major choice.
- [ ] Every cited claim carries a URL and one of the four evidence-strength labels (official docs, independent report, vendor marketing, practitioner opinion).
- [ ] Every URL in the body appears in the numbered Sources list, and every Sources entry is referenced in the body.
- [ ] At least half of the cited sources are dated within 18 months of 2026-09-04, or the Gaps section names the areas where older sources were unavoidable.
- [ ] The Guide outline maps every proposed guide section to at least one fact-base entry.
- [ ] `src/pages/harness.html` is unchanged by this task (`git diff --quiet -- src/pages/harness.html`).
- [ ] The final reply includes the file path, `wc -l` line count, and a five-line summary of the strongest findings.

## Brief (verbatim, as improved by /prompt-improver)

You are a senior engineering researcher building the evidence base for a practical "how to build your own agent harness" guide. The guide itself will be written later; your deliverable now is the research dossier it will draw on. Write it as a single markdown file at `~/markdown/research/harness_research.md` (create the directory if it doesn't exist; overwrite any existing file).

<scope>
"Harness" means the engineered layer a team wraps around a coding agent so that it behaves reliably in their codebase and workflow. For this research it covers, for both Claude Code and OpenAI Codex (CLI and cloud):

1. Instruction files and project context: CLAUDE.md / AGENTS.md conventions, layering (global, project, directory), what belongs in them, size and drift management.
2. Permissions and sandboxing: allow/deny rules, permission modes, OS or container sandboxes, secrets handling, guardrails against destructive actions.
3. Hooks and lifecycle automation: pre/post tool-use hooks, stop hooks, formatters, linters, gates, logging and audit trails.
4. Tool surface: MCP servers, custom tools, which tools to expose and which to withhold, tool-description quality.
5. Skills, slash commands and reusable workflows: how teams package repeatable procedures, plan/execute splits, task-tracking conventions.
6. Subagents and multi-agent orchestration: when to fan out, context isolation, handoff formats, cost and failure modes.
7. Context and memory management: context-window budgeting, compaction, session memory, persistent memory across sessions.
8. SDLC integration: git and PR workflows, CI/CD, issue trackers, headless or non-interactive runs, running agents in pipelines.
9. Evaluation and observability: how teams measure harness quality (evals, regression suites, traces, cost and token telemetry) and iterate on it.
10. Security and governance: prompt-injection defenses, supply-chain risk from third-party MCP servers and skills, review policies for agent-written code.

Cover Claude Code and Codex in parallel. Where they differ in concept, terminology, or capability, say so explicitly; where a practice transfers unchanged, say that too.
</scope>

<sources>
Prioritize material from the last 12–18 months. Draw on, in rough order of weight:
- Official documentation and engineering blogs from Anthropic and OpenAI (including changelogs and best-practice posts).
- First-hand write-ups from teams describing harnesses they run in production: what they built, what broke, what they changed.
- Widely used open-source harness components, plugin collections, and reference setups (cite the repository and note stars/activity as a rough adoption signal).
- Independent benchmarks, evals, or measurements of harness techniques.
- Opinion pieces and talks from practitioners, clearly labelled as perspective rather than evidence.

Cite every non-obvious claim with a URL. Label each claim's evidence strength: official docs, independent report, vendor marketing, or single practitioner opinion. Where sources disagree, record the disagreement rather than picking a side silently. Where the evidence is thin, say so. Do not pad the fact base with generic advice that would apply to any software project.
</sources>

<output_structure>
Use this structure:

1. Summary of the current state of harness engineering: the five to eight ideas practitioners most agree on, and the two or three areas still contested. One page at most.
2. Glossary: the terms a guide reader must know, with the Claude Code and Codex equivalents side by side.
3. Fact base, one section per scope area (1–10 above). For each area include:
   - What the official docs currently say and support.
   - What experienced teams actually do, with concrete examples (real config snippets, hook scripts, file layouts, or command lines where the source provides them).
   - Known failure modes and anti-patterns, with the evidence behind each.
   - Open questions or areas where practice is still moving.
4. Reference architectures: three or four worked harness setups at different maturity levels (for example: solo developer, small team with CI, platform team serving many repos), each described as a concrete file and tool inventory and traced back to the sources that justify its choices.
5. Guide outline: a proposed table of contents for the eventual "how to" guide, with each section pointing at the fact-base entries it will rely on.
6. Gaps: what this research could not establish and what a team would need to test for itself.
7. Sources: a numbered list of every URL cited, each with a one-line note on what it contributed and its evidence-strength label.
</output_structure>

Work through the source gathering before writing the summary, so that the summary reflects what the evidence says rather than prior assumptions. Keep the writing dense and concrete. Target roughly 5,000–8,000 words; go longer only if the extra material is fact rather than commentary.

When done, confirm the file path and line count, and give a five-line summary of the strongest findings in your reply.
