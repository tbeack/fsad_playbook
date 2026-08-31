---
description: Run a detailed, adversarial multi-agent review of a written proposal or specification (spec.md, PRD, RFC, design doc, architecture proposal, business case) — reviews the document, not code. Runs a steelman/inventory pass, then up to 10 specialist lenses (logic, assumptions, evidence, completeness, feasibility, alternatives, consistency, stakeholders, testability, risk), then adversarial validation that defaults to refuting each finding unless it survives, then a loop-until-dry completeness pass. Writes a single severity-ranked SPEC-REVIEW.md next to the document. Use when the user says "review this spec", "adversarial review", "poke holes in this proposal", "red team this PRD", "critique this design doc", "what's wrong with this RFC", "stress test this plan", or similar. Review-only — never edits the document.
argument-hint: `[path] [--depth quick|standard|deep] [--lens <names>] [--stance <n>]`
---

# fsd:spec-review — Adversarial Document Review

**What this optimizes for:** a report the author trusts, not one that merely looks thorough. A finding only earns a place in the report if it survives independent adversarial validation (Phase 3) against the actual document text; anything that can't be confirmed that way goes to "Considered and dropped," visible but not counted. A short report on a genuinely solid document is success, not under-delivery — a padded report is the failure mode this skill exists to avoid.

Follow these phases in order. Review-only. Never edit the document under review — the skill writes exactly one file, the report.

## Step 0 — Resolve arguments

### 0.1 Resolve the target path

Resolution order, first match wins:
1. The `path` argument, if given.
2. `spec.md` in the current directory.
3. `planning/prd/spec.md`.
4. The most recently modified `*.md` file in the repo whose name matches `spec|prd|proposal|rfc|design` (case-insensitive).

If step 4 finds more than one file with the same (or near-same) modification time, or if `path` was omitted and no single candidate is clearly most recent, **ask which one** — list the candidates with their paths and last-modified dates. Do not guess.

Confirm the resolved path exists and is readable before continuing.

### 0.2 Parse flags

- `--depth quick|standard|deep` — default `standard`.
  - `quick` — 3 lenses (`logic-auditor`, `completeness-auditor`, `testability-auditor`), 1 validation pass, no completeness-critic loop.
  - `standard` — 6 lenses (quick's 3 plus `assumption-hunter`, `feasibility-critic`, `consistency-checker`), 2 validation passes, completeness-critic loop capped at 2 extra rounds.
  - `deep` — all 10 lenses, adversarial validation with a 3-validator majority per finding, full completeness-critic loop-until-dry (cap 6 rounds total).
- `--lens <names>` — comma-separated lens names, overrides the `--depth` roster entirely (validation depth still follows `--depth`).
- `--stance <n>` — 1–5, default 3. Passed into every lens's Brief as an aggressiveness instruction (see 0.3). Does **not** change Phase 3's validation rule — validators always default to refuting an uncertain finding, regardless of stance; stance only affects how eagerly lenses raise something in the first place.

### 0.3 Stance guidance (included verbatim in every lens Brief)

- `1` — collegial peer review. Only raise something you're confident is a real defect; give the author the benefit of the doubt on ambiguous phrasing.
- `3` (default) — standard adversarial review. Raise real defects and load-bearing ambiguities; don't manufacture disagreement over stylistic choices.
- `5` — "this proposal is wrong, prove it isn't." Treat every unstated assumption, every ambiguous requirement, and every unexamined alternative as something the author must actively defend — but every finding you raise still needs a concrete `consequence`; stance changes what you look for, not the anchor/consequence bar.

### 0.4 Set up the run directory

```
RUN_DIR = <dir containing the resolved spec>/.planning/spec-review/runs/<run_id>/
```
`run_id` = an ISO-timestamp-derived slug. Create the directory before Phase 1.

## Phase 1 — Comprehension pass (single agent, before any critique)

Spawn one agent with this brief:

> Read `<SPEC_PATH>` in full. Produce a **steelman**: restate the proposal's core claim, the problem it solves, the mechanism by which it solves it, and the strongest case for it, in the author's own best terms — the author should recognize this as fair before anything critical follows.
>
> Then extract a structured inventory, assigning every item a stable ID:
> - **Claims** (`C-01`, `C-02`, …) — every assertion presented as true (factual, technical, market, financial).
> - **Assumptions** (`A-01`, …) — stated *and* unstated preconditions the proposal depends on (unstated ones you notice now; `assumption-hunter` will go deeper in Phase 2).
> - **Decisions** (`D-01`, …) — choices made, with or without stated rationale.
> - **Requirements** (`R-01`, …) — functional, non-functional, explicit and implied.
> - **Success criteria** (`SC-01`, …) — how anyone would know this worked.
> - **Scope boundaries** (`SB-01`, …) — what is in, out, and conspicuously unmentioned.
> - **Dependencies** (`DEP-01`, …) — people, teams, systems, vendors, approvals, budget, sequencing.
>
> Write the result to `<RUN_DIR>/inventory.json`: `{steelman: {claim, problem, mechanism, strongest_case}, claims: [{id, text, anchor}], assumptions: [...], decisions: [...], requirements: [...], success_criteria: [...], scope_boundaries: [...], dependencies: [...]}` — every inventory item carries an `anchor: {heading, quote}` exactly like a finding's anchor (see `schema/finding.schema.json`). An inventory item with no anchor is not real — every one must quote the document.
>
> Report back: the path written, and a one-line count per category.

This must complete and be read before any Phase 2 lens starts — a lens without the inventory has nothing to cite in `refs`.

## Phase 2 — Specialist lenses (parallel subagents)

Select the roster per Step 0.2 (`--lens` overrides `--depth`'s default roster). Skip any lens that genuinely doesn't apply to this document's type (e.g. `alternatives-analyst` on a document that is itself "the alternatives analysis" for a decision already made elsewhere) — **record the skip and reason**, since it goes in the report's Coverage section verbatim. Silent skipping is forbidden.

For each selected lens, spawn one `Agent` using that lens's brief from `specialists/<lens-name>.md`, substituting `<SPEC_PATH>` and `<INVENTORY_PATH>` (`<RUN_DIR>/inventory.json`), and appending the Step 0.3 stance guidance for the resolved `--stance` value. Send **all Agent calls for this round in a single message** so they run concurrently and stay blind to each other's findings.

Each lens writes `<RUN_DIR>/<lens-name>.findings.jsonl` per `docs/output-contract.md`.

## Phase 3 — Adversarial validation

**3.1 — Validate every candidate finding.** For each finding across all lens output files, spawn one independent validator `Agent` (batch all validator calls for a round into a single message) that receives the finding **and the document, but not the finder's reasoning**, instructed to try to refute it:

- Is the quoted text in `anchor.quote` actually present in the document, and does it actually say what the finding claims?
- Does another section of the document already address this? (The most common false positive — check before concluding it's a real gap.)
- Is this a real defect, or reviewer preference dressed as a defect? (If preference, the validator should say so explicitly — that's grounds to downgrade to `nit`/dropped, not silently ignore.)
- Would a competent author consider this out of scope for this document's stage (e.g. an early proposal doesn't need implementation-level detail)?

**Default to `refuted` when uncertain.** At `--depth quick`/`standard`, one validator per finding decides. At `--depth deep`, run 3 validators per finding and require a majority (`≥2`) voting "survives" for it to survive; record `votes`/`votes_total` in `validator_verdict`.

Write each finding's `validator_verdict` back into its record (orchestrator does this write — not the validator or the original lens agent).

**3.2 — Considered and dropped.** Every `refuted` finding is kept, not deleted — it goes into the report's "Considered and dropped" appendix with the validator's reasoning attached, verbatim.

**3.3 — Completeness critic (skipped at `--depth quick`).** Spawn one agent with the full set of surviving findings, the full set of refuted findings, and the document. Ask it two questions:
- Which lens returned suspiciously little relative to its scope and the document's length/complexity?
- Which document sections/headings have zero findings (survived or refuted) anchored to them at all — i.e., nobody quoted them?

If it identifies underexplored lenses or unquoted sections, spawn one more **targeted** pass: re-run the relevant lens(es) with an explicit instruction to focus on the named sections, then validate any new findings per 3.1. Repeat until **two consecutive rounds surface zero new findings**, capped at **6 rounds total** (`standard` additionally caps at 2 extra rounds beyond the initial Phase 2 pass, per Step 0.2). Log the round count and what each round surfaced — this feeds the report's Coverage section.

## Phase 4 — Report

Read `docs/report-template.md` and assemble `<dir of spec>/SPEC-REVIEW.md` from it, populated with:

- **Verdict** — `Ready` / `Ready with changes` / `Needs rework` / `Reject premise`, a two-sentence justification, and the single most load-bearing surviving weakness. This is a judgment call weighing blocking-issue count and the shape of the major findings — not a mechanical threshold.
- **Steelman** — verbatim from Phase 1.
- **Blocking / Major / Minor / Nit** — every surviving (`validator_verdict.status: "survived"`) finding, grouped by `severity`, each with anchor, refs, problem, consequence, confidence, suggested fix.
- **Unanswered questions** — synthesize from findings whose `suggested_fix` is itself a question rather than a fix; rank by how much of the proposal collapses if the answer is unfavourable.
- **Assumption register** — from the Phase 1 inventory's Assumptions plus any `assumption-hunter` findings, as a table: ID, assumption, what breaks if false, cheapest test.
- **Alternatives not considered** — from `alternatives-analyst` findings (if that lens ran).
- **Considered and dropped** — every refuted finding, with its validator's reasoning.
- **Coverage** — lenses run vs. skipped (with reasons), sections with no findings anchored to them, completeness-critic round count and what each round found.

**Never overwrite an existing report.** If `SPEC-REVIEW.md` already exists next to the document, write `SPEC-REVIEW-2.md`, or the next unused suffix.

Report back to the user: the path written, the verdict, and the blocking/major/minor/nit counts.

## Rules this skill enforces on itself

- **Anchor or it didn't happen.** Every finding quotes the document exactly. No paraphrase-only criticism, no invented content, no critiquing a section the lens didn't actually read.
- **Consequence, not vibe.** "This is vague" is not a finding; a stated concrete downstream failure is. Enforced in `docs/output-contract.md` and checked again by Phase 3 validators.
- **Attack the proposal, not the author.** Adversarial toward ideas, neutral in tone — this applies to every lens Brief and every validator instruction.
- **Separate defect from preference.** A `nit`-severity finding is explicitly labeled as reviewer taste; it never inflates to `major`/`blocking` to seem more important.
- **Report honestly.** If the document is genuinely solid, the report is short and says so — a padded report to look thorough is a failure of this skill.
- **No fixes.** This skill produces `SPEC-REVIEW.md` only. It never edits the document under review, and it writes no other file outside `<RUN_DIR>` and the report itself.

## Guardrails

- **Ask, don't guess, on ambiguous path resolution** (Step 0.1) — a wrong target reviewed thoroughly is still a wasted run.
- **Phase 1 must complete before Phase 2 starts** — lenses cite inventory IDs; there's nothing to cite from an inventory that doesn't exist yet.
- **Silent lens-skipping is forbidden** — every lens not run must be recorded with a reason in Coverage.
- **Validators default to refuting** — an uncertain finding does not survive by default; it survives only when the validator(s) actively fail to refute it.
- **Never delete a refuted finding** — it goes to "Considered and dropped," not the void; that appendix is what proves the review actually checked things.
- **The completeness-critic loop is bounded** — stop at two consecutive empty rounds or 6 total rounds, whichever comes first. Don't loop indefinitely chasing marginal findings.
- **Never write to the document under review.** The only files this skill writes are under `<RUN_DIR>` and the final `SPEC-REVIEW.md` (or its numbered suffix).
