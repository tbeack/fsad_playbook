---
name: set-context
description: Gather codebase and initiative context before planning starts — runs a graphify build or query when graphify is available locally, falls back to a manual repo sweep otherwise, then asks targeted questions and writes a single context.md. Invocable standalone or as fsd:plan's mandatory Phase 0. Use when the user says "set context", "gather context", or as the first step of fsd:plan.
argument-hint: `[target repo path]`
---

# fsd:set-context — Context-Gathering Subskill

Gather everything a downstream planning pass needs — codebase shape plus the initiative's own
boundaries — and emit it as a single `context.md` file. Nothing else reads or writes to disk in
this skill besides that one file (and, when graphify runs, whatever `graphify-out/` it produces).

## Invocation model — read this first

**This skill runs inline**, in the same conversational turn as the interactive user, for every
piece of user-facing interaction below: every targeted question in Step 3, and any question
graphify itself needs answered (its corpus-size subfolder prompt, its package-install notice).

Invoking graphify's build **may** be dispatched via the `Agent` tool as a subagent when that's
useful — e.g. to isolate a long-running corpus scan while you keep the turn free. But if that
subagent hits graphify's own interactive pause (its >2,000,000-word / >500-file subfolder
question) or its package-install step, **it must stop and report back to this inline turn rather
than resolve the question itself** — you relay it to the user, get the answer, and resume the
subagent with it. A subagent that cannot relay is not a valid way to invoke graphify from this
skill; if you can't guarantee that relay (e.g. no way to resume the dispatched agent with an
answer), run graphify inline instead.

## Step 1 — Resolve the target

Determine the target repo/scope:
- If an explicit path argument was given, use it.
- Otherwise use the current working directory.

Confirm the resolved path to the user in one line before continuing: *"Gathering context for
`{target}`."*

## Step 2 — Codebase context: graphify or manual sweep

1. Check whether `{target}/graphify-out/graph.json` already exists.
   - **Exists** — this is a **query**, not a build. Run `graphify query "What is this codebase's
     overall architecture and module structure?"` against it. Record the answer's key points in
     `context.md` under Codebase Context, and note explicitly that this came from an existing
     graph (`graphify-out/` was already present — no build was run).
   - **Does not exist** — check whether the `graphify` skill is installed locally
     (`~/.claude/skills/graphify/SKILL.md`).
     - **Installed** — offer to run a graphify build against `{target}` (or dispatch it via
       `Agent` per the invocation model above). **Tell the user before graphify installs
       anything or before its corpus-size question could fire** — don't let either happen
       silently:
       - Graphify's own Step 1 checks whether its `graphifyy` package is installed and installs it
         via `uv tool install` / `pip install` if missing. Say so before triggering that step:
         *"graphify needs its package installed first if this is the first time it's run on this
         machine — that'll happen automatically."*
       - If graphify's corpus-size check trips (>2,000,000 words or >500 files), it will ask which
         subfolder to scope to. Surface that question to the user directly the moment it fires —
         do not let it silently stall this "mandatory, non-skippable" step.
       - Once the build finishes, record a summary of what it found in `context.md` under Codebase
         Context, and note that this came from a fresh build.
     - **Not installed, or the user declines the offered build** — fall back to a manual context
       sweep: repo structure (top-level layout), existing docs (README, CLAUDE.md, ADRs), package
       manifests (package.json / pyproject.toml / etc.), recent git history (`git log
       --oneline -20`), and any existing `planning/` artifacts. Record findings under Codebase
       Context and note explicitly that no graphify graph was used.

## Step 3 — Targeted questions

Ask the user each of the following that graphify or the manual sweep couldn't already answer.
Ask **one at a time**, not as a form. Record every answer in `context.md` — a question asked but
never carried into the file is not actually gathered.

1. **Initiative slug/name** — the name used to derive the output directory (see `fsd:plan`'s Step
   4 slug-transform algorithm: lowercase, non-alphanumeric runs collapsed to a single hyphen,
   leading/trailing hyphens trimmed — e.g. "Auth Service Refactor!" → `auth-service-refactor`).
2. **Scope boundaries** — what's in scope for this initiative, and what's explicitly out.
3. **Non-negotiable constraints** — technical, business, timeline, or behavior-preservation
   constraints that must hold no matter what the plan proposes.
4. **Stakeholders** — who cares about this initiative's outcome, and who needs to sign off.
5. **Target repo** — confirm whether the plan ships to this same repo or a different one (this
   matters when the plan is authored in one repo but targets another — don't assume they're the
   same without asking).
6. **Versioning/release conventions** — the target repo's versioning scheme and release process,
   if not already discoverable from the codebase sweep above.

If the user says "use your best judgment" for any of these, record a stated assumption in
`context.md` rather than blocking — but always record something; never leave a question answered
only in the conversation and not in the file.

## Step 4 — Emit context.md

Write a single structured `context.md` to `planning/plan/<slug>/` (using the slug from Step 3.1
and the transform above), or to a scratch location — e.g. the repo root — if that directory
doesn't exist yet (it's created once the initiative is confirmed, in `fsd:plan`'s Phase 0).

**Why a file, not an in-memory handoff:** every downstream drafting agent (`fsd:plan`'s Phase
1-4.5) is a separately-dispatched `Agent`-tool subagent with no memory of this skill's own turn —
only a file survives across that boundary. Every downstream drafting agent's dispatch prompt must
reference this file's path rather than re-deriving context independently; that's on `fsd:plan`,
not this skill, but it's why this file's shape has to be complete on its own.

Template:

```markdown
# Context — {initiative name}

## Codebase Context
[Summary from graphify query, graphify build, or manual sweep — and which of the three produced
it]

## Initiative
- **Slug:** {slug}
- **Scope boundaries:** {answer}
- **Non-negotiable constraints:** {answer}
- **Stakeholders:** {answer}
- **Target repo:** {answer}
- **Versioning/release conventions:** {answer}
```

Confirm the written path to the user: *"Context gathered and written to `{path}`."*

## Guardrails

- **Never run interactively-blocking work as a fire-and-forget subagent.** If graphify's build is
  dispatched via `Agent`, it must be able to relay a pause back to this turn — otherwise run it
  inline.
- **Never let graphify install a package or ask its subfolder question without telling the user
  first.** Both are disclosed pre-emptively in Step 2, not discovered after the fact.
- **One question at a time** in Step 3 — never dump the six questions as a form.
- **Always write `context.md`**, even when falling back to a stated assumption — a question with
  no corresponding line in the file did not happen as far as any downstream agent is concerned.
- **Never invent a graph.** If `graphify-out/graph.json` doesn't exist and graphify isn't
  installed (or the user declines), go straight to the manual sweep — don't guess at codebase
  structure.
