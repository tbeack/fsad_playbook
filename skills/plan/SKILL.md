---
name: plan
description: Guide the user through planning a significant project, a large epic/initiative spanning multiple epics, or a codebase refactor. Produces five planning artifacts (project.md, architecture.md, roadmap.md, verification.md, instructions.md), gated phase by phase like fsd:prd. Use when the user says "plan this project", "plan this refactor", "help me plan this epic", or similar.
argument-hint: `[initiative name or goal] [target repo path]`
---

# fsd:plan — Large-Initiative Planning Agent

Follow these phases in order. Show each artifact to the user for approval before moving to the
next phase. Never generate all five documents unattended — each phase checkpoints.

## Role files

This skill uses five specialist role briefs loaded from `roles/` (relative to this skill's own
directory):
- `project.md` — drafts the initiative's Project Overview
- `architecture.md` — drafts the Architecture document
- `instructions.md` — drafts the Standing Instructions
- `roadmap.md` — drafts the Roadmap
- `verification.md` — drafts the Verification Plan

**If any role file is missing:** stop immediately and tell the user: *"`roles/{file}.md` is missing
from this skill's directory — this skill needs its role-brief files present to run. Restore them
from the skill's source, then re-run this command."* Do not improvise a persona for a missing role
file.

## Phase 0 — Context (mandatory, not skippable)

Invoke the `fsd:set-context` skill now (as a subskill — see its own SKILL.md for its invocation
model: it runs inline, not as a fire-and-forget subagent). **If a target repo path was supplied
as this skill's second argument, pass it through as `set-context`'s explicit path argument** so
it resolves the target from that path rather than the current working directory; otherwise
`set-context` defaults to the current working directory per its own Step 1. This produces
`context.md` and, as part of its Step 3, asks the user for the initiative's slug/name.

Once the slug is known, resolve the output directory: `planning/plan/<slug>/` in the target repo
(from `context.md`'s Target repo answer). The slug transform is deterministic and fixed:
lowercase the initiative name, replace every run of non-alphanumeric characters with a single
hyphen, then trim any leading or trailing hyphen (e.g. "Auth Service Refactor!" →
`auth-service-refactor`) — no hash suffix or other uniquifier is ever appended, so the same name
always resolves to the same directory.

**If `planning/plan/<slug>/` already exists**, ask the user how to proceed: overwrite, resume, or
choose a different slug. Never write over it silently.

**"Choose a different slug" is a narrow re-ask, not a full `set-context` re-invocation:** ask only
the slug question again and re-resolve the output path. Do not re-run `set-context`'s graphify
build, manual sweep, or its other targeted questions (scope/constraints/stakeholders/versioning)
— the user already answered those.

If the directory doesn't exist yet, create it and move `context.md` into it if `set-context` wrote
it to a scratch location.

## Phase 1 — `project.md`

Read `roles/project.md` for the full brief. Dispatch one `Agent` **with
`name: "plan-project-<slug>"`** (so it stays addressable via `SendMessage` for Phase 4.5), giving
it the role brief and the path to `context.md`. Wait for it to finish before showing the draft.

Show the draft path to the user: *"`project.md` written. Review it and tell me what to change, or
say 'approved' to move to the Architecture and Instructions phase."*

Do not proceed until the user approves.

## Phase 2 — `architecture.md` and `instructions.md` (parallel)

Read both `roles/architecture.md` and `roles/instructions.md`. Dispatch **two `Agent` calls in a
single message** — both depend only on `project.md` and `context.md`, not on each other, so they
run concurrently:
- `name: "plan-architecture-<slug>"`, given the architecture role brief, `context.md`, and
  `project.md`.
- `name: "plan-instructions-<slug>"`, given the instructions role brief, `context.md`, and
  `project.md`.

Wait for both to finish before showing either draft.

Show both draft paths to the user: *"`architecture.md` and `instructions.md` written. Review them
and tell me what to change, or say 'approved' to move to the Roadmap phase."*

Do not proceed until the user approves.

## Phase 3 — `roadmap.md`

Read `roles/roadmap.md`. Dispatch one `Agent` (no `name:` needed — nothing resumes this one later)
with the role brief, `context.md`, `project.md`, and the finished `architecture.md`. This phase is
sequential — it depends on `architecture.md`'s target layout to define phases and a dependency
graph, so it does not start until Phase 2 is fully approved.

Show the draft path to the user: *"`roadmap.md` written. Review it and tell me what to change, or
say 'approved' to move to the Verification phase."*

Do not proceed until the user approves.

## Phase 4 — `verification.md`

Read `roles/verification.md`. Dispatch one `Agent` (no `name:` needed) with the role brief,
`context.md`, `project.md`, `architecture.md`, and the finished `roadmap.md`. This phase is
sequential — it depends on `roadmap.md`'s phase list to produce per-phase checklists, so it does
not start until Phase 3 is approved.

Show the draft path to the user: *"`verification.md` written. Review it and tell me what to
change, or say 'approved' to move to the reconciliation pass."*

Do not proceed until the user approves.

## Phase 4.5 — Reconciliation pass

Re-open `project.md`, `architecture.md`, and `instructions.md` and backfill cross-references to
`roadmap.md`/`verification.md` sections now that they exist — all three documents were drafted
before Phase 3/4 and have the same forward-reference gap (`project.md`'s own phase-reference
skeleton and done-when checklist, not just architecture/instructions).

**Resume the same named specialist agents that drafted each document** — not fresh agents, and not
this orchestrating thread — via `SendMessage`:

1. `SendMessage` to `plan-project-<slug>`, adding the finished `roadmap.md` and `verification.md`
   to its context, asking it to backfill its phase reference and done-when checklist.
2. `SendMessage` to `plan-architecture-<slug>`, same addition, asking it to backfill any forward
   references.
3. `SendMessage` to `plan-instructions-<slug>`, adding `roadmap.md`, `verification.md`, **and the
   finished `architecture.md`** (Phase 2's blind parallel drafting left it unable to cite
   `architecture.md`'s real section numbers — it drafted with `[TBD]` placeholders specifically for
   this), asking it to replace every placeholder with the real section number and add any other
   forward-reference citations.

Run these three `SendMessage` calls **sequentially** — each is a small, targeted edit, not worth
parallelizing, and running them one at a time avoids three agents editing related documents at
once.

Show the user a one-line summary of what was backfilled in each document before continuing.

## Phase 5 — Offer adversarial review

Offer to invoke `fsd:plan-review` against the five generated documents as a final adversarial pass,
writing `plan_review.md` alongside them: *"All five documents are drafted and reconciled. Want me
to run `fsd:plan-review` against them before you start implementing?"*

- **Yes** — invoke the `fsd:plan-review` skill (via the `Skill` tool), with `source` set to the
  `planning/plan/<slug>/` directory and `target` set to `planning/plan/<slug>/plan_review.md`.
- **No** — skip it. Do not run the review without explicit confirmation.

## Guardrails

- **One gate at a time** — never skip a user approval step between phases.
- **`set-context` is mandatory** — Phase 0 cannot be skipped, and it runs inline per its own
  invocation model, not as a fire-and-forget subagent.
- **Name every specialist agent in Phases 1-4** (`plan-<artifact>-<slug>`) — Phase 4.5 depends on
  being able to resume them by name via `SendMessage`.
- **Phase 2 is the only parallel dispatch** — Phases 1, 3, and 4 are sequential because each
  depends on the prior phase's finished output.
- **Never let a drafting agent re-derive context independently** — every dispatch prompt in
  Phases 1-4.5 must reference `context.md`'s path (and the other finished documents' paths), not
  ask the agent to re-gather context on its own.
- **Never overwrite an existing `planning/plan/<slug>/` directory silently** — Phase 0 always asks
  first.
- **Never skip the Phase 5 offer** — even when the documents look obviously complete, ask before
  running or skipping the review.
- **Never proceed with a missing role-brief file** — stop and ask the user to restore it (see Role
  files above) rather than improvising the persona.
