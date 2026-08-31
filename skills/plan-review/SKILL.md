---
description: Run a detailed, adversarial multi-agent review of an implementation plan — a GitHub PR, a branch, or a planning document — against the baseline spec, ADR, or prior plan it is meant to honour. Reviews the plan, not the code. Builds a shared inventory, runs up to 7 independent lenses in parallel (completeness, consistency, logic, feasibility, assumptions, testability, baseline-diff), verifies every finding against the repository so that anything without a path:line or a runnable command is dropped, adjudicates by severity, then loops a completeness critic until dry. Writes a findings document to a caller-specified target. Use when the user says "review this plan", "review this PR's plan", "does this plan match the spec", "red team this implementation plan", "what's missing from this plan", "check this plan against the ADR", "plan review", or similar. Review-only — never edits the plan, the PR, or any source file.
argument-hint: `<source> <target> [--baseline <path>] [--depth quick|standard|deep] [--scope <text>] [--run-dir <path>]`
---

# fsd:plan-review — Adversarial Implementation-Plan Review

**What this optimizes for:** catching the thing that makes the plan unbuildable *before* anyone starts building it. A plan is cheap to change and expensive to have half-built, so the review is worth running exactly once — here — and its value comes from measuring the plan against two things it cannot check for itself: the baseline it promised to honour, and the repository it will actually land in. What that yields in practice is defined per lens in `lenses.md`, not here.

This is the **plan-stage gate**. It runs before the code-stage gates (`fsd:code-review-team`, `fsd:sec-review-team`) — there is no code yet.

Review-only. The skill writes exactly two things: the findings document at `target`, and the run directory (`run_dir`, defaulting beside `target` — see Parameters). Nothing else on disk is touched.

---

## Parameters

| Parameter | Required | Accepts | Notes |
|---|---|---|---|
| `source` | **yes** | A GitHub PR (`#439`, a full URL, or `owner/repo#N`), a branch name, a file path, or a glob | The plan under review. |
| `target` | **yes** | A file path | Where the findings document is written. Parent directories are created. |
| `baseline` | no | Path(s) to a spec, ADR, prior plan, or PR that `source` is meant to honour or supersede | When omitted, candidates are inferred (Step 0.3) and the chosen one is named in the report header. |
| `depth` | no | `quick` \| `standard` (default) \| `deep` | Controls the lens roster, verifier count, and critic rounds (Step 0.4). |
| `scope` | no | Free text | Narrows the review, e.g. "schema and migration steps only". Recorded verbatim in the report header. |
| `run_dir` | no | A directory path | Where the run artefacts go. Defaults to `<directory containing target>/.plan-review/runs/<run_id>/`. Set it to keep artefacts out of the repository, or to place them somewhere the caller's tooling already collects. The internal layout (Step 0.6) is fixed wherever it points. |

**The skill prompts for any required parameter the invocation did not supply, and it never guesses a write path.** If `target` was not given, ask for it — do not infer one from the plan's location, do not default to a filename beside the plan, and do not proceed with a placeholder. If `source` was not given, ask for it — do not review "the most recent plan" or "the current branch" on your own initiative. A wrong target written confidently is worse than a question.

---

## When to skip

Say so and stop, rather than producing a report that pads a non-problem:

- **Single-step plans.** One step, one file, one acceptance criterion. There is no sequencing to audit, no cross-reference graph, and no baseline drift to measure. A normal read is cheaper and just as good.
- **Plans with no baseline and no cross-references.** If nothing resolves as `baseline` and the plan cites no ADRs, no sibling documents, no numbered artefacts, and no source files, then five of the seven lenses have nothing to check against — the review degenerates into proofreading. Offer `fsd:spec-review` instead, which judges a document on its own terms.
- **Pure-copy edits.** Wording, formatting, typo, or link-text changes to an existing plan. Diff the prose; do not convene a review team.

If the user asks anyway after being told, run it — say what the reduced roster will be first.

---

## Step 0 — Resolve parameters

### 0.1 Resolve `source`

| `source` looks like | Resolution |
|---|---|
| `#N`, `owner/repo#N`, or a PR URL | `gh pr view <N> --json number,title,headRefName,baseRefName,headRefOid,baseRefOid,body,files,url` then `gh pr diff <N>`. |
| A branch name | `git rev-parse <branch>` for the head SHA; merge-base against the default branch for the base SHA; `git diff <base>...<branch> --stat`. |
| A file path | The plan document itself. Head SHA = `git rev-parse HEAD`; no base SHA. |
| A glob | Expand it. If it matches more than one document, list the matches and **ask which is the plan** — the rest become supporting documents, not additional subjects. |

For every form, establish and record: the **head SHA**, the **base SHA** (where one exists), and **whether the base is behind the repository's default branch**. Pass all three to `consistency-checker`, which owns base drift — its brief in `lenses.md` says how to measure it and how to grade it.

Then collect the plan's supporting documents:

- The **decisions sidecar** — glob for `<plan-basename>-decisions.md` in the plan's own directory (see Path conventions). Requirements hide there.
- The **testing document** — any document the plan cross-references whose name matches `test|qa|verification`.
- For a PR, the **PR body** — it frequently names the baseline the description in the plan file omits.

Read all of them. A document not read cannot be cited, and the completeness critic will ask which ones you skipped.

### 0.2 Resolve `target` and detect a second pass

Create `target`'s parent directories. Then:

- **`target` does not exist** — first pass. Write a fresh document.
- **`target` exists** — **second pass.** Read it in full *before* Phase 1, and extract its previous findings into `<RUN_DIR>/previous-findings.json`. The new document must:
  - **Mark resolved** — a previous finding whose evidence no longer reproduces at the new head SHA. Say what changed and cite the new `path:line`.
  - **Carry forward still-open** — a previous finding that still reproduces, keeping its original identifier and noting how many passes it has survived.
  - **State what changed** — a "Since the previous pass" block naming the previous head SHA, the new head SHA, the counts resolved / still open / newly raised.

  Never silently overwrite a previous pass's findings. A finding that disappears without being marked resolved is a review failure, not a clean bill of health.

### 0.3 Resolve `baseline`

If `baseline` was supplied, use it. Otherwise infer candidates, in this order, and **state in the report header which was chosen and why**:

1. Any document the PR body or plan preamble names as the thing it implements, supersedes, or follows.
2. Documents matching `spec|prd|rfc|adr|proposal|design` under the configured spec/ADR directories (Path conventions below).
3. The immediately preceding numbered plan in the same directory, if the plan's own numbering pattern implies one.

If more than one candidate survives and no signal separates them, **ask**. If none resolves, record `baseline: none` in the header, skip `baseline-diff-auditor`, and say so in Coverage — a silent skip reads as "nothing was dropped", which is exactly the false negative this skill exists to prevent.

### 0.4 Resolve `depth` and select the roster

| Lens | `quick` | `standard` | `deep` |
|---|:---:|:---:|:---:|
| `completeness-auditor` | ● | ● | ● |
| `consistency-checker` | ● | ● | ● |
| `testability-auditor` | ○ | ● | ● |
| `logic-auditor` | | ● | ● |
| `assumption-hunter` | | ● | ● |
| `feasibility-critic` | | ○ | ● |
| `baseline-diff-auditor` | ○ | ○ | ● |

● = always runs. ○ = conditional, resolved as follows so the counts stay fixed:

- **`quick` runs exactly 3 lenses.** The third slot is `baseline-diff-auditor` when a baseline resolved, `testability-auditor` when none did.
- **`standard` runs exactly 6 lenses.** The sixth slot is `baseline-diff-auditor` when a baseline resolved, `feasibility-critic` when none did.
- **`deep` runs all 7, then a duplicate pass of all 7** with different seeds — different reading order, and an instruction to start from the sections the first pass is least likely to have reached. Duplicate-pass output goes to `<lens>-b.findings.jsonl`. 14 lens files.

`baseline-diff-auditor` is **required whenever a baseline resolves**, at every depth. It is skipped only when no baseline resolves. Every lens not run is recorded in Coverage with its reason — silent skipping is forbidden.

Verifier count and critic rounds follow depth: see Phase 3 and Phase 5.

### 0.5 Apply `scope`

If `scope` is set, pass it verbatim into every lens brief as a narrowing instruction, and record it in the report header. Findings outside scope are not raised. **Log what scope excluded** in Coverage — a narrowed review that reads as a full one is a silent cap.

### 0.6 Set up the run directory

```
RUN_DIR = <the `run_dir` parameter, if given>
       or <directory containing target>/.plan-review/runs/<run_id>/   ← default
```

`run_id` is an ISO-timestamp-derived slug. Create it before Phase 1. Layout:

```
<RUN_DIR>/
├── inventory.json                      # Phase 1 — written before any lens starts
├── <lens>.findings.jsonl               # Phase 2 — one per lens (deep adds <lens>-b)
├── verdicts/<finding-id>.json          # Phase 3 — one per finding
├── clusters/<cluster-id>.json          # Phase 4 — near-duplicates merged across lenses
├── adjudicated.json                    # Phase 4 — final severity-ranked set
├── critic/completeness-critic-r<N>.findings.jsonl   # Phase 5 — one per round
├── coverage.json                       # lenses run/skipped, rounds, what scope excluded
└── previous-findings.json              # second pass only
```

Critic rounds live under `critic/` rather than at the run-dir root deliberately: it keeps `ls <RUN_DIR>/*.findings.jsonl` an exact count of the lenses that ran, which is how the depth roster is audited.

---

## Path conventions — discovered or configured, never assumed

This skill is repo-agnostic: it hardcodes no project's layout. Every path it reads from and every path it writes to is either **discovered from the repository** or **supplied by the caller**, and every default below is documented. Nothing here is a fixed requirement a project must reorganise itself to satisfy.

### Read paths — discovered or configured

| Concept | How it is resolved | Default used as a search hint | If it can't be resolved |
|---|---|---|---|
| Plan location | The `source` parameter. Required; never inferred. | — | **Ask.** Never guess the subject. |
| Baseline candidates | Step 0.3 — the PR body and plan preamble first, then a glob over conventional spec/ADR directories. | `planning/spec/`, `planning/prd/`, `docs/adr/`, `docs/rfc/` | **Ask** only when *several* candidates survive and no signal separates them. When *none* resolves, record `baseline: none`, skip `baseline-diff-auditor`, and say so in Coverage — do not ask, and do not stop. |
| Decisions sidecar | Glob for `<plan-basename>-decisions.md` in **the plan's own directory**, whatever that directory is. | same directory as the plan | Absent is normal. Record it and continue. |
| Testing document | A cross-reference from the plan whose target name matches `test\|qa\|verification`. | — no directory assumed | Absent is normal. Record it and continue. |
| Numbering pattern | Inferred from the plan's own artefact names (e.g. `NNN-slug.md`, `VNNN__slug.sql`). What is done with it is `consistency-checker`'s business. | pattern inferred, never assumed | No inferable pattern means that lens has no collision check to run. Record it in Coverage. |

**A missing read path is a fact about the repository, not an error.** A repo with no `planning/`, no `docs/adr/`, and no sidecar is a normal input: the probes miss, the affected lenses narrow, Coverage records what was unavailable, and the run completes. The one case that stops and asks is an *ambiguous* input — a glob matching several documents (Step 0.1), or several baseline candidates with nothing to separate them (Step 0.3).

### Write paths — configured, with a derived default

The skill writes to exactly two places, and neither is guessed:

| Path | How it is set | Default |
|---|---|---|
| `target` | **Caller-supplied, always.** Required, never inferred. If it was not given, **ask** — this is the one path the skill will never default. | — |
| `<RUN_DIR>` | The `run_dir` parameter when given; otherwise derived from `target`. | `<directory containing target>/.plan-review/runs/<run_id>/` |

What is *not* configurable is the run directory's **internal** layout (Step 0.6) — the filenames and subdirectories are this skill's own convention, because the depth audit and the second-pass logic both read them by name. Callers choose where the run directory lives; they do not rearrange what is inside it.

---

## Phase 1 — Inventory (single agent, before any lens)

Build `<RUN_DIR>/inventory.json` first. **No lens may start until it exists** — lenses cite inventory IDs, and a lens that re-derives its own inventory produces findings nobody else can cluster against.

Spawn one agent to extract, assigning every item a stable ID:

- **Steps** (`S-01`, …) — every numbered implementation step, with the artefacts it creates or edits.
- **Requirements** (`R-01`, …) — everything the plan or its sidecar states must be true, including requirements stated only in prose.
- **Acceptance criteria** (`AC-01`, …) — each with the step that owns it, or `owner: null` if none does.
- **Cross-references** (`X-01`, …) — file links, ADR numbers, step numbers, sibling documents, testing docs. Each carries `resolves: true|false` against the working tree.
- **Baseline items** (`B-01`, …) — every requirement, decision, and non-goal in the resolved baseline, by section number. Empty when no baseline resolved.
- **Ground-truth facts** (`E-01`, …) — for every claim the plan makes *about the repository*, the corresponding repository observation, each carrying the command that produced it and that command's actual output. Walk the `S-`, `R-` and `X-` items and ask of each: what would have to be true on disk or on the default branch for this to hold, and is it? Record the answer either way — a fact that confirms the plan is as useful to a lens as one that contradicts it. Individual lenses state which of these facts they depend on; the inventory's job is to produce them once so no lens has to re-derive them.

Every inventory item carries an `anchor: {document, heading, quote}`. An item with no anchor is not real.

Report back: the path written and a one-line count per category.

---

## Phase 2 — Adversarial lenses (parallel subagents)

**Read `lenses.md` before spawning.** It holds each lens's question, its evidence obligations, and its worked examples. Spawn one `Agent` per lens from the Step 0.4 roster, passing that lens's brief plus the plan path, the sidecar and testing-doc paths, the baseline path, `<RUN_DIR>/inventory.json`, the head/base SHAs, and `scope` if set. Send **all Agent calls for a round in a single message** — lenses must stay blind to each other's findings.

Each lens writes `<RUN_DIR>/<lens>.findings.jsonl`, one JSON object per line, conforming to `schema/finding.schema.json`. Omit `verdict`, `cluster_id`, and `canonical` — the orchestrator populates those. A lens that finds nothing writes an **empty file**: zero lines is a checkable clean signal, a missing file is indistinguishable from a crashed agent.

Lens tools are read-only apart from one scoped write: `Read`, `Grep`, `Glob`, `Bash` limited to read-only inspection (`ls`, `cat`, `head`, `tail`, `wc`, `find`, `grep`, `git ls-tree`, `git log`, `git diff`, `git show`, `gh pr view`, `gh pr diff`), and `Write` scoped to that lens's own findings file. `Edit` is denied outright.

Report back per lens: the findings-file path and a one-line count by severity.

---

## Phase 3 — Ground-truth verification

Every finding is a claim until the repository confirms it. Spawn one independent verifier `Agent` per finding — batch all verifier calls for a round into a single message — giving it the finding and the repository, **but not the lens's reasoning**.

The verifier's job is to **refute**. It must open the cited `path:line` itself, or run the cited command itself, and judge from what it actually sees.

- **Default to `refuted` when uncertain.** A finding survives only when the verifier actively fails to refute it.
- **A finding whose evidence cannot be produced as a `path:line` or a runnable command is dropped, not softened.** Not downgraded to `minor`, not rephrased as a question — dropped to the "Considered and dropped" appendix.
- **Re-run the command as written and compare counts.** If the finding says "two matches" and you get two hundred, the finding is refuted even when its underlying point is sound — the author will run it too and stop trusting the report. The usual cause is an unscoped recursive search picking up this run's directory, the previous pass's document, or a sibling run (see the scope rule in `lenses.md`). Refute it; a lens may re-emit it scoped.
- Check the three standing false positives: is the quoted plan text actually present and does it say what the finding claims; does another step, the sidecar, or the testing doc already handle this; is this a defect or reviewer preference.

At `quick` and `standard`, one verifier per finding decides. At `deep`, run **three verifiers per finding with distinct lenses** — *does it reproduce*, *is it actually a defect*, *is it already handled elsewhere* — and require a majority (≥2) to survive; record `votes` and `votes_total`.

The orchestrator writes each verdict to `<RUN_DIR>/verdicts/<finding-id>.json` and back into the finding record. Neither the verifier nor the original lens performs that write. **Refuted findings are kept, never deleted** — the appendix is what proves the review checked things rather than merely asserted them.

---

## Phase 4 — Adjudication

Cluster near-duplicate survivors across lenses into `<RUN_DIR>/clusters/<cluster-id>.json`, keep the best-evidenced statement of each as `canonical: true`, and assign severity. Write the ranked result to `<RUN_DIR>/adjudicated.json`.

| Severity | Meaning |
|---|---|
| 🔴 **Merge-blocking** | The plan cannot be implemented as written, or shipping it breaks something live. |
| 🟠 **Contract gap** | Something the plan is answerable for has no owning mechanism, and no recorded decision explains why. |
| 🟡 **Minor / mechanical** | Real, evidenced, and narrow — it costs a reader accuracy but does not change what gets built. |
| ⚖️ **Judgment call for the owner** | An intentional-looking omission the review cannot adjudicate. Frame it as a question, name the two defensible answers, and say what each costs. Never resolve it on the owner's behalf. |

Severity is assigned from consequence, not from how many lenses raised it. Two lenses agreeing on a stale link is still 🟡.

---

## Phase 5 — Completeness-critic loop

Spawn one agent with the surviving findings, the refuted findings, the inventory, and the plan. Ask it what **the review** missed:

- Which document in scope was never opened?
- Which lens was not run, and does its absence leave a real gap?
- Which claim was accepted on the plan's own authority instead of verified against the repository?
- Which entity or file the plan touches had its current shape never read?
- Which inventory item has zero findings anchored to it — nobody quoted it at all?

Whatever it names becomes the next round: re-run the relevant lens(es) with an explicit instruction to focus there, then verify any new findings per Phase 3. Round output goes to `<RUN_DIR>/critic/completeness-critic-r<N>.findings.jsonl`.

Loop until a round returns nothing new. **`quick`: no critic loop. `standard`: at most 2 rounds. `deep`: until dry, capped at 6 rounds.**

**Log dropped coverage explicitly** in `coverage.json` and in the report: rounds run, what each surfaced, lenses skipped and why, what `scope` excluded, and any cap that stopped the loop early. A silent cap reads as full coverage — that is the failure mode this phase exists to prevent.

---

## Phase 6 — Findings document

Read `report-template.md` and assemble `target` from it. The template is the contract; populate every section it defines, including Coverage and "Considered and dropped".

Quote the plan **verbatim in italics** when the wording is the problem. Cite counts and diff stats. Every claim carries its `path:line` or its runnable command — no hedging adjectives, and no finding reaches the document without one.

Report back to the user: the path written, the verdict line, the count at each severity, and the `RUN_DIR` path.

---

## Rules of engagement

1. **The plan's own claims are evidence of intent, never evidence of fact.** Verify against the repository — open the file, run the command, read the status line.
2. **Read the decisions sidecar and the testing document, not just the plan.** Requirements hide there, and every lens is expected to have opened them.
3. **"Not mentioned" and "explicitly out of scope with a reason" are different findings.** Never conflate them. The first is a gap; the second is a decision, and reporting it as a gap costs the review its credibility.
4. **Do not propose fixes unless asked.** This is a gate, not implementation. Offer at the end of the run and wait.
5. **Do not modify the plan, the PR, or any file other than `target` and the run directory.** After a run, `git status --porcelain` must show changes confined to those two.

---

## Non-goals

- **Not a code review.** There is no implementation yet. Use `fsd:code-review-team` once there is.
- **Not a security review.** Threat modelling of the built system is `fsd:sec-review-team`'s job.
- **Not an approval.** The document is input to the plan owner's decision, not a merge verdict rendered on their behalf.
- **Not a rewrite service.** It never edits the plan and never opens a PR.
- **Not a proposal critique.** Judging a document on its own merits, with no baseline to honour, is `fsd:spec-review`.
- **Not exhaustive by default.** `quick` and `standard` are bounded on purpose; every bound is logged in Coverage.

---

## Relationship to other skills

| Skill | Stage | Subject | Judged against | Output |
|---|---|---|---|---|
| `fsd:spec-review` | Proposal | A spec, PRD, RFC, or design doc | Its own internal consistency | `SPEC-REVIEW.md` beside the document |
| **`fsd:plan-review`** | **Plan** | **An implementation plan — PR, branch, or planning doc** | **The baseline spec/ADR it must honour, and the repository** | **A caller-specified `target`** |
| `fsd:code-review-team` | Code | A diff or path | Correctness, design, performance, maintainability, testing, API contract | `REVIEW-REPORT.md` |
| `fsd:sec-review-team` | Code | A codebase or diff | A stack-selected security specialist roster | `REPORT.md` + `known-findings.jsonl` |

Run them in that order. `fsd:plan-review` catches what would otherwise be found in code review at ten times the cost.

---

## Guardrails

- **Never guess a write path.** A missing `target` is a question, not an inference (Parameters).
- **Never guess the subject.** A glob matching several documents is a question, not a merge (Step 0.1).
- **Phase 1 completes before Phase 2 starts.** `inventory.json` must exist on disk before the first lens spawns.
- **`baseline-diff-auditor` runs whenever a baseline resolves** — at every depth. Skipping it is only legal when nothing resolved, and the skip is recorded.
- **Verifiers default to refuting.** Uncertainty does not survive.
- **No evidence, no finding.** No `path:line` and no runnable command means dropped to the appendix, not softened into a weaker claim.
- **Never delete a refuted finding.** It goes to "Considered and dropped" with the verifier's reasoning verbatim.
- **Never silently overwrite a previous pass.** An existing `target` is a second pass with resolved/carried-forward/new accounting (Step 0.2).
- **Silent lens-skipping is forbidden**, and so is a silent cap on the critic loop. Both go in Coverage.
- **The critic loop is bounded** — `standard` at 2 rounds, `deep` at 6. Do not chase marginal findings indefinitely.
- **Review-only.** The only writable paths for the entire run are `target` and `<RUN_DIR>`.
