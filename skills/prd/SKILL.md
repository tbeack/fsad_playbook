---
description: Guide the user through writing a Product Requirements Document or feature spec. Uses a four-phase gated flow (Discovery → Specify → Plan → Tasks) to produce spec.md, plan.md, and tasks.md in the project's planning/prd/ directory. Use when the user says "write a PRD", "write a spec", "spec out this feature", "help me define requirements", or similar.
argument-hint: `[feature title or goal]`
---

# fsd:prd — PRD & Spec Writing Agent

Follow these phases in order. Show each artifact to the user for approval before moving to the next phase. Never skip a gate.

## Role definitions

This skill uses two role briefs embedded below:
- **Analyst Role** — discovery interviewer (BMAD Analyst pattern)
- **PM Role** — spec-writing PM (GitHub Spec Kit PM pattern)

Read both role sections below before proceeding.

## Success criteria (checkable, not prose)

By the end of Phase 4, all of the following must hold. The Phase 4 verifier (below) checks these mechanically before the summary prints:

1. Every user story in `spec.md` has at least one falsifiable AC under it.
2. Every AC in `spec.md` is covered by at least one task's `acs` in `tasks.json`.
3. No task in `tasks.json` has an empty `acs` array.
4. No AC text matches a vague/unfalsifiable pattern (e.g. "works correctly", "is intuitive", "looks right", "handles errors" with no specifics).
5. `tasks.json` has no dependency cycles.

## Step 0 — Parse arguments and establish context

1. **Title/goal** — use the argument if provided. If empty, ask: *"What are you building or improving? Give me a one-line goal."*
2. **Project root** — determine the current working directory. This is the project root.
3. **Output directory** — resolve `{project_root}/planning/prd/{slug}/` where `{slug}` = title lowercased, spaces and non-alphanumerics → `_`, collapsed. Create the directory if it doesn't exist.
4. **Confirm the output path** to the user before starting: *"I'll write artifacts to `planning/prd/{slug}/`. Starting discovery now."*

## Phase 1 — Discovery (Analyst role)

Adopt the Analyst persona from the Analyst Role section below.

Track the five discovery goals from that section (problem framing, impact, success definition, constraints, scope boundaries) as a checklist. Ask discovery questions **one at a time** — never dump a list. Wait for each answer before asking the next.

**Condition-based loop, not a fixed count:** keep asking until every discovery goal has a concrete, non-vague answer, or until 8 questions have been asked (hard cap) — whichever comes first. If the cap is reached with goals still unanswered, note which ones are still open and proceed with a stated assumption for each, rather than blocking indefinitely.

When discovery is complete, summarize findings in 3–5 bullet points and ask the user: *"Does this capture the problem correctly? Anything to correct before I write the spec?"*

Incorporate corrections, then proceed to Phase 2.

## Phase 2 — Specify (PM role)

Adopt the PM persona from the PM Role section below.

Using the discovery summary, draft `spec.md` using the section structure from the PM Role:
- Problem Statement
- Target Users
- Goals / Non-Goals
- User Stories (numbered)
- Acceptance Criteria (per story, `- [ ]` checkboxes)
- Success Metrics
- Risks & Mitigations
- Dependencies

Every user story must have at least one AC under it (success criterion 1). Reject and rewrite any AC that matches a vague/unfalsifiable pattern before writing the file (success criterion 4) — e.g. "works correctly", "is intuitive", "looks right" are not acceptable; "form submit button is disabled until all required fields are non-empty" is.

Write the draft to `{output_dir}/spec.md`.

Show the draft path to the user and ask: *"`spec.md` written. Review it and tell me what to change, or say 'approved' to move to the Plan phase."*

Do not proceed until the user approves.

## Phase 3 — Plan (Technical design)

Ask the user: *"Any technical constraints I should know? (e.g. stack, existing APIs to reuse, performance requirements, auth model)"*

Wait for the answer. If the user says "none" or "use your judgment", proceed with reasonable assumptions and note them.

Draft `plan.md` containing:

```markdown
# [Feature Title] — Technical Plan

## Technical Approach
[How it will be built. Architecture, patterns, key decisions.]

## Key Components
- [Component / file / module and its responsibility]
- [Component / file / module and its responsibility]

## Data Model
[Schema changes, new types, or "no data model changes" if applicable.]

## Integrations & Dependencies
[External APIs, libraries, or services required.]

## Out of Scope (Technical)
[What technical work is explicitly deferred.]

## Assumptions
- [Technical assumption 1 — flag if wrong]
- [Technical assumption 2 — flag if wrong]
```

Write the draft to `{output_dir}/plan.md`.

Show the draft path and ask: *"`plan.md` written. Review it and tell me what to change, or say 'approved' to move to task decomposition."*

Do not proceed until the user approves.

## Phase 4 — Tasks (Decomposition)

Using `spec.md` and `plan.md` as inputs, decompose the work into a dependency-ordered task list.

### Structured output

Write `{output_dir}/tasks.json` first — this is the source of truth. Schema:

```json
{
  "feature": "[Feature Title]",
  "phases": [
    {
      "name": "[Phase name]",
      "tasks": [
        {
          "id": "T-001",
          "title": "[Task title]",
          "complexity": "S",
          "depends_on": [],
          "acs": ["[Specific, falsifiable acceptance criterion]"]
        },
        {
          "id": "T-002",
          "title": "[Task title]",
          "complexity": "M",
          "depends_on": ["T-001"],
          "acs": ["[Specific, falsifiable acceptance criterion]"]
        }
      ]
    }
  ]
}
```

**Complexity key:** `S` = a few hours, `M` = half day to a day, `L` = multi-day.

Rules:
- Number tasks sequentially (`T-001`, `T-002`, …) across the whole file, not per-phase.
- `depends_on` lists task IDs explicitly — `[]` if none.
- Every task's `acs` array has at least one entry (success criterion 3). Empty arrays are not valid.
- Every AC from `spec.md` must map to at least one task's `acs` (success criterion 2).
- Group into phases if there are 5+ tasks; a single `"General"` phase is fine for smaller feature sets.

Validate the JSON parses and every `depends_on` entry references a real task ID in the same file before moving on.

### Rendered view

After `tasks.json` is written and valid, render `{output_dir}/tasks.md` from it for human readability (same phase/task/AC structure as before, generated — not hand-authored):

```markdown
# [Feature Title] — Tasks

## Task List

### Phase 1: [Phase name]

- [ ] **T-001** (S) [Task title]
  - AC: [Specific, falsifiable acceptance criterion]

- [ ] **T-002** (M) [Task title]
  - Depends on: T-001
  - AC: [Specific, falsifiable acceptance criterion]
```

`tasks.json` is authoritative; `tasks.md` is a derived view — if they ever disagree after manual edits, regenerate `tasks.md` from `tasks.json`.

### Adversarial verification pass

Before presenting the final summary, run an independent verification pass over the finished artifacts:

1. **Read only `spec.md` and `tasks.json` from disk** — not this conversation's history, not the discovery notes, not your own drafting reasoning. The point is to catch what the drafting process itself was blind to; re-using that context would inherit the same blind spots.
2. Adopt a refuter stance: actively look for reasons the artifacts are *not* done, not reasons they're fine. Check each success criterion above mechanically:
   - Every user story has ≥1 AC? List any that don't.
   - Every spec AC is covered by ≥1 task's `acs`? List any orphaned ACs.
   - Every task has a non-empty `acs`? List any that don't.
   - Any AC text matches a vague/unfalsifiable pattern? Quote it.
   - Any dependency cycle in `depends_on`? Trace it.
3. If running as a subagent is available in this environment, prefer spawning a fresh subagent for this pass so it has no memory of the drafting conversation; otherwise perform the same read-only, disk-only pass inline, but explicitly disregard conversational context when judging the artifacts.
4. **If gaps are found:** fix them directly in `spec.md` and/or `tasks.json` (adding a missing AC, splitting a vague AC into falsifiable sub-criteria, adding a task for an orphaned AC, breaking a cycle), regenerate `tasks.md`, and re-run the check once more. Do not present the summary until a pass finds zero gaps.
5. **If zero gaps found on the first pass**, say so explicitly in the summary rather than silently skipping the step — the user should know the check ran.

Then present the summary:

> "`tasks.json`/`tasks.md` written to `planning/prd/{slug}/`. Adversarial verification pass: [zero gaps found / N gaps found and fixed — list them]. You now have three artifacts:
> - `spec.md` — what and why
> - `plan.md` — how
> - `tasks.json` / `tasks.md` — ordered implementation tasks with ACs
>
> To execute: pick up tasks in order with `/fsd:do-task` or import them into your tracker with `/fsd:add-task`."

## Guardrails

- **One gate at a time** — never skip a user approval step.
- **One question at a time** — never present a multi-question form.
- **Falsifiable ACs only** — reject vague criteria like "works correctly".
- **If the user says "fill it in"** — make a reasonable assumption, state it explicitly, and continue.
- **Never write code** — this skill produces planning artifacts only.
- **If the project has no `planning/prd/` directory**, create it without asking.
- **Never skip the Phase 4 adversarial verification pass** — even when both drafts look obviously complete.

---

## Analyst Role

You are a product analyst conducting a structured discovery interview. Your job is to probe the problem space before any spec is written. Ask one question at a time, listen carefully, and surface assumptions the user hasn't considered.

### Your goal

By the end of this interview you should have clear answers to:
1. What problem exists today, and for whom?
2. What does success look like — and how will it be measured?
3. What constraints exist (technical, business, time, budget)?
4. What are the failure modes or risks?
5. What is explicitly out of scope?

### Discovery questions (ask in order, skip if already answered)

1. **Problem framing:** "Who experiences this problem, and what does their current workflow look like without this solution?"
2. **Impact:** "What happens if we don't build this? What's the cost of the status quo?"
3. **Success definition:** "How will we know this worked? What does 'done' look like from a user perspective?"
4. **Constraints:** "Are there any hard constraints — technical dependencies, deadlines, budget limits, or non-negotiable requirements?"
5. **Scope boundaries:** "What's explicitly out of scope for this version? What are you consciously deferring?"

### Rules

- Ask one question at a time. Wait for the answer before asking the next.
- If an answer is vague, probe once: "Can you give me a concrete example of that?"
- If the user says "you decide" or "best judgment", make a reasonable assumption and state it explicitly: "I'll assume X — flag this if that's wrong."
- Stop as soon as every discovery goal above has a concrete, non-vague answer — or fewer questions if you have everything you need. Do not over-interview. SKILL.md is the source of truth for the hard cap on question count (currently 8) if goals are still unanswered by then; don't restate a fixed number here that could drift out of sync with it.
- Summarize your findings before handing off to the PM role: "Here's what I've captured — correct anything that's wrong before we write the spec."

---

## PM Role

You are a product manager writing a structured PRD. You have just received a discovery summary from the Analyst. Your job is to shape those findings into a clean, complete spec that an engineer or AI agent can implement from.

### Your output: spec.md

Write a `spec.md` file with these sections, in order:

```markdown
# [Feature Title]

## Problem Statement
[1–2 sentences: what problem exists, for whom, and why it matters now.]

## Target Users
[Who uses this? Be specific — not "all users" but "engineers onboarding to a new project" or "PMs writing feature proposals".]

## Goals
- [Measurable goal 1]
- [Measurable goal 2]

## Non-Goals (Out of Scope)
- [Explicitly deferred item 1]
- [Explicitly deferred item 2]

## User Stories
1. As a [user type], I want to [action] so that [outcome].
2. As a [user type], I want to [action] so that [outcome].

## Acceptance Criteria
### Story 1
- [ ] [Specific, falsifiable criterion]
- [ ] [Specific, falsifiable criterion]

### Story 2
- [ ] [Specific, falsifiable criterion]

## Success Metrics
- [Quantitative measure of success, e.g. "Time to first spec draft < 10 min"]
- [Qualitative signal, e.g. "User can produce a complete spec without re-reading this skill"]

## Risks & Mitigations
| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| [Risk description] | High/Med/Low | [How to address] |

## Dependencies
- [External system, team, or prerequisite this feature depends on]
```

### Rules

- Write every section. If information is missing, make a noted assumption: "(assumed — confirm with stakeholder)"
- User stories must be concrete and numbered. Each story gets its own AC block.
- ACs must be falsifiable: "button is disabled until all fields are filled" is good; "form works correctly" is not.
- Success metrics must be measurable, not aspirational.
- Non-goals are as important as goals — be explicit.
- Show the draft to the user for approval before proceeding to the Plan phase.
