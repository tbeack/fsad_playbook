# `fsd:plan-review` — lens catalogue

Seven lenses. Each runs as an independent subagent that cannot see any other lens's output. This file is the source of truth for what each one asks, what evidence it owes, and what a good finding from it looks like. `SKILL.md` selects the roster; it does not restate any of this.

## Shared contract (applies to every lens below)

Every lens writes one file, `<RUN_DIR>/<lens-name>.findings.jsonl` — one JSON object per line, conforming to `schema/finding.schema.json`. A lens that finds nothing writes a zero-line file; it never skips the write.

Three obligations bind all seven:

- **Anchor.** `anchor.quote` is an exact substring of the plan, its decisions sidecar, or its testing document. Never paraphrase the document into a quote.
- **Evidence.** `evidence.ref` is a repo-relative `path:line` that can be opened, or a command that can be run. `evidence.observed` says what it actually shows — not what the plan claims it shows. **A finding you cannot evidence this way is one you do not emit.** Phase 3 will drop it anyway; emitting it only wastes a verifier.
- **Scope every command.** An evidence command must still reproduce for someone who has run this review before. Name the directories under review — `grep -rn 'foo' proposals/ design/ src/` — and never leave a bare `.` or a bare repo root. A review writes a run directory into the tree, so the second run of any review is walking over the first one's output: an unscoped recursive search will match this skill's own artefacts, the previous pass's findings document, and every sibling run, and the count you record will not be the count the next reader gets. If you must search widely, exclude the review's own output explicitly (`--exclude-dir=.plan-review`, and the `target`'s directory). **A command whose result changes because a review has been run is not evidence about the plan.**
- **Consequence.** `consequence` names a concrete downstream failure — what breaks, for whom, when. "This is vague" is not a consequence. "Step 6 runs the backfill before Step 4 creates the index it scans, so the backfill table-scans 40M rows and exceeds the 30-minute migration window in `docs/runbook.md:88`" is.

Flag low-confidence hunches with `confidence: low` rather than dropping them — Phase 3 decides keep or drop, lenses do not self-filter. But `confidence: low` is not a licence to skip evidence; a hunch with no `path:line` and no command is still not a finding.

Do not poach another lens's primary scope. If you notice something squarely owned by a sibling, leave it — clustering in Phase 4 rewards independence and punishes seven copies of the same observation.

---

## 1. `completeness-auditor`

### Question

**Does every requirement stated anywhere in this plan have a numbered step that owns it, and does every step have acceptance criteria?** Requirements introduced in prose, in a preamble, or in the decisions sidecar count exactly as much as the ones in the numbered list — and they are where the gaps live, because nobody re-reads prose when writing steps.

### Evidence obligations

- Walk `R-*` from the inventory. For each, name the owning `S-*`, or emit a finding citing the requirement's anchor and the fact that no step's artefact list covers it.
- Walk `S-*`. A step with no `AC-*` is a finding; cite the step's `path:line`.
- Walk `AC-*` with `owner: null`. An acceptance criterion belonging to no step is a finding — someone will have to guess who satisfies it.
- Read the decisions sidecar and the testing document in full. A requirement that appears only there and in no step is this lens's highest-value output.
- Coverage arithmetic is evidence: "the plan's own Step 3 lists 4 entities; the schema in `db/schema.sql:12-96` defines 7" is a citable observation, not an opinion.

### Worked examples

**a. Sidecar requirement with no owning step.** The decisions sidecar records *"every write to the ledger must emit an audit row"*. The plan's eleven steps create the ledger table, the write path, and the read API — none mentions an audit table or an audit write.
`severity: contract-gap`, `anchor: {document: "proposals/ledger-plan-decisions.md", quote: "every write to the ledger must emit an audit row"}`, `evidence: {kind: "command", ref: "grep -rin 'audit' proposals/ledger-plan.md", observed: "no matches — no step creates an audit table or an audit write path"}`.

**b. Schema step that under-covers its own later steps.** Step 4 creates tables for 4 entities. Steps 7, 8, and 9 read from 7. The three extras are never created anywhere.
`severity: blocking`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:112-140", observed: "Step 4 CREATE TABLE list names account, entry, journal, period; Steps 7-9 query counterparty, fx_rate, reversal, which no step creates"}`.

**c. Step with no acceptance criteria at all.** Steps 1-9 each end with an "Acceptance" block; Step 10 ("Cut over reads to the new path") ends at its last bullet.
`severity: contract-gap`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:301-318", observed: "Step 10 body ends at line 318; the next line is the Step 11 heading — no Acceptance block"}`.

**d. Orphan acceptance criterion.** A criterion in the plan's closing checklist — *"p95 read latency unchanged"* — maps to no step, and no step mentions latency.
`severity: contract-gap`, `evidence: {kind: "command", ref: "grep -n 'latency' proposals/ledger-plan.md", observed: "single match at line 402, inside the closing checklist; no numbered step references latency"}`.

---

## 2. `consistency-checker`

### Question

**Does the plan contradict itself, its baseline, its ADRs, its testing document, or the current state of the default branch?** This lens owns collisions with reality: numbering that is already taken, cross-links that point nowhere, ADRs cited as settled that are still proposed, and base-branch drift.

### Evidence obligations

- For every artefact the plan intends to *create* with a number or version prefix, run `git ls-tree -r origin/<default-branch> -- <dir>` and check the name is free. A collision is `blocking` — two artefacts with one identity is not a merge conflict you can resolve later, it is an ambiguity in the plan itself.
- For every `X-*` cross-reference with `resolves: false`, cite the referencing line and the missing path.
- For every ADR the plan cites as decided, open it and read the status line. `proposed` cited as `accepted` is a finding.
- Compute base drift: `git rev-list --count <base>..origin/<default>`. Report the number. If any commit in that range touches a file the plan edits, that is not `minor` — name the file and the commit.
- Compare the plan against the testing document: a step the testing doc covers that the plan dropped, or a plan step the testing doc has no case for, is a contradiction between two documents that are supposed to agree.

### Worked examples

**a. Numbering collision with the default branch.** The plan says *"add `migrations/014_add_counterparty.sql`"*. That number is taken.
`severity: blocking`, `anchor: {quote: "add `migrations/014_add_counterparty.sql`"}`, `evidence: {kind: "command", ref: "git ls-tree -r origin/main -- migrations/", observed: "014_backfill_periods.sql already present on origin/main; 015 is the first free number"}`.

**b. Cross-link to a file that does not exist.** The plan links its testing strategy to a sibling document.
`severity: minor`, `evidence: {kind: "command", ref: "ls proposals/ledger-testing.md", observed: "No such file or directory; the link at proposals/ledger-plan.md:37 resolves nowhere"}`.

**c. ADR cited as accepted while still proposed.** Step 2 rests on a decision the ADR has not made.
`severity: contract-gap`, `evidence: {kind: "path-line", ref: "docs/adr/0009-event-ordering.md:6", observed: "Status: Proposed — the plan's Step 2 at line 88 says 'as accepted in ADR-0009'"}`.

**d. Base-branch drift that touches an edited file.** The PR's base is 23 commits behind and one of them rewrites a file the plan edits.
`severity: contract-gap`, `evidence: {kind: "command", ref: "git log --oneline <base>..origin/main -- src/ledger/writer.ts", observed: "2 commits; a1b3f9c 'rewrite writer batching' changes the function Step 6 says it will extend"}`.

---

## 3. `logic-auditor`

### Question

**Does the sequence work, and what happens to things that already exist when this lands?** Ordering, dependencies, state transitions, and — the omission this lens exists for — the entities, rows, files, or clients already in the world on the day the change ships.

### Evidence obligations

- Build the dependency graph from the inventory's `S-*` artefacts: which step produces what each later step consumes. Cite both `path:line`s for any inversion.
- For every step that changes a data shape, ask what happens to existing data. If the plan has no backfill, no default, and no migration for pre-existing rows, cite the step and the evidence that pre-existing rows exist (a table, a fixture, a production count the plan itself quotes).
- For every step that changes an interface, ask what happens to existing callers. `grep` for them and cite the count and one call site.
- Check state transitions for the unhandled path: what happens on partial failure, on retry, on a second run. Cite the step that assumes single execution.

### Worked examples

**a. Consumer before producer.** Step 6 backfills using an index Step 9 creates.
`severity: blocking`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:198,264", observed: "Step 6 (line 198) 'backfill scanning entry.counterparty_id'; the index on that column is created in Step 9 (line 264)"}`.

**b. New non-null column with no backfill for existing rows.** Step 3 adds `NOT NULL` with no default and no backfill step.
`severity: blocking`, `evidence: {kind: "path-line", ref: "db/schema.sql:41", observed: "entry table exists with 11 columns; the plan's Step 3 at line 120 adds a NOT NULL column with no DEFAULT and no backfill step anywhere in the plan"}`.

**c. Interface change with unenumerated existing callers.** Step 8 changes a function's return type; the plan says *"update callers"* without naming them.
`severity: contract-gap`, `evidence: {kind: "command", ref: "grep -rn 'postEntry(' src/ | wc -l", observed: "17 call sites across 9 files; the plan names 2"}`.

**d. Step that is not safe to re-run.** The cutover step assumes it runs exactly once; the runbook says failed steps are retried.
`severity: contract-gap`, `evidence: {kind: "path-line", ref: "docs/runbook.md:64", observed: "'any failed migration step is retried from the top'; the plan's Step 10 at line 305 performs an unguarded INSERT with no idempotency key"}`.

---

## 4. `feasibility-critic`

### Question

**Can this be built in the order it is written, by the people it assumes, in the time it implies — and is there a first-release slice?** The signature failure this lens catches: open questions parked in the decisions sidecar that are load-bearing for steps the plan presents as ready to implement.

### Evidence obligations

- Cross-reference every unresolved question in the decisions sidecar against the steps that depend on its answer. Cite both. An "open" question under a "ready" step is a finding regardless of how small the question looks.
- Check whether the plan defines a slice that can ship on its own. If every step must land together, say so and cite the coupling.
- Check external dependencies the plan asserts without evidence: a vendor, an API, a team, an approval, a limit. Cite the assertion and the absence of anything backing it.
- Check implied effort against stated capacity where the plan states either. Do not invent estimates the plan does not make.

### Worked examples

**a. Load-bearing open question under a ready step.** The sidecar lists *"Open: do we key by tenant or by account?"*; Step 4 creates the table whose primary key that decides.
`severity: blocking`, `anchor: {document: "proposals/ledger-plan-decisions.md", quote: "Open: do we key by tenant or by account?"}`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:140", observed: "Step 4 marked 'ready to implement' and defines PRIMARY KEY (tenant_id, entry_id) — the choice the sidecar records as unresolved"}`.

**b. No shippable first slice.** All eleven steps are mutually required; nothing can land alone.
`severity: contract-gap`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:60-330", observed: "each of Steps 2-11 names a prior step as a prerequisite and Step 11 is the only one that ends in a user-visible change; no step or group is marked independently shippable"}`.

**c. Unbacked external dependency.** The plan assumes a rate limit the vendor does not document.
`severity: contract-gap`, `evidence: {kind: "command", ref: "grep -rin 'rate limit' docs/ vendor/", observed: "no documented limit anywhere in the repo; the plan's Step 7 at line 232 assumes '500 req/s sustained'"}`.

**d. Sequencing that a single reviewer cannot land.** Three steps must ship in one deploy across two services with no coordination mechanism described.
`severity: contract-gap`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:276", observed: "Step 9 requires the API and worker deploys to be simultaneous; docs/deploy.md:22 documents them as independent pipelines with no gate"}`.

---

## 5. `assumption-hunter`

### Question

**What does this plan take as given without deriving it, and which of those would sink it if false?** Unstated preconditions, rules asserted but never shown, and criteria that are circular or unfalsifiable as written.

### Evidence obligations

- For every asserted rule the plan relies on — *"keys are stable"*, *"the queue preserves order"*, *"IDs are monotonic"* — look for the derivation. If none exists in the plan, the sidecar, the baseline, or the source, that is the finding, and the evidence is the absence: cite the grep that came back empty, plus the `path:line` of the code that would have to guarantee it.
- Name what breaks if the assumption is false, in one concrete sentence. An assumption with no stated failure mode is not worth reporting.
- Prefer assumptions that are *load-bearing*: if the plan survives the assumption being false, it is `minor` at most.
- Distinguish an unstated assumption from an explicitly accepted risk. The second is a decision, not a gap — see rule 3 in `SKILL.md`.

### Worked examples

**a. Stability asserted, never derived.** The plan says *"external IDs are stable, so we can key on them"*, and nothing anywhere establishes that.
`severity: blocking`, `anchor: {quote: "external IDs are stable, so we can key on them"}`, `evidence: {kind: "command", ref: "grep -rn 'external_id' src/ db/ docs/", observed: "6 matches; none constrains mutability, and src/sync/import.ts:88 reassigns external_id on re-import"}`.

**b. Ordering assumed from an unordered transport.** Step 5 depends on message order the transport does not guarantee.
`severity: blocking`, `evidence: {kind: "path-line", ref: "src/queue/config.ts:14", observed: "queue configured with 4 partitions and no ordering key; the plan's Step 5 at line 176 states 'events arrive in commit order'"}`.

**c. Circular acceptance criterion.** The criterion is satisfied by definition.
`severity: contract-gap`, `anchor: {quote: "the migration is complete when all rows are migrated"}`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:210", observed: "no row count, no source-of-truth query, and no reconciliation step anywhere in the plan defines 'all'"}`.

**d. Capacity assumed from a single observation.** The plan generalises one measurement into a steady-state guarantee.
`severity: minor`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:244", observed: "'the nightly job takes 6 minutes' cites one run in docs/perf-notes.md:11, which records a single execution against a 3-month dataset; the plan applies it to a 3-year backfill"}`.

---

## 6. `testability-auditor`

### Question

**Can each acceptance criterion be failed?** Every one needs a pass/fail test with a number, a command, or an observable artifact. *"Completes reliably"* — no N, no threshold, no command — is a finding, not a criterion.

### Evidence obligations

- Walk every `AC-*`. For each, name the number, the command, or the artifact that would decide it. Where none exists, cite the criterion's `path:line` and say precisely what is missing: the threshold, the sample size, the measurement point, or the tool.
- Distinguish *unmeasurable* from *unmeasured*. "p95 under 200ms" is measurable but has no named measurement point — that is a smaller finding than "feels fast".
- Check the testing document for a case per criterion. A criterion with no case is a gap; a case for a criterion the plan dropped is a contradiction (hand the latter to `consistency-checker`).
- Check that the criterion tests the requirement rather than the implementation. "The function returns true" is not a test of "duplicate submissions are rejected".

### Worked examples

**a. Unfalsifiable criterion.** *"The migration completes reliably."*
`severity: contract-gap`, `anchor: {quote: "The migration completes reliably"}`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:216", observed: "no run count, no success threshold, no timeout, and no command; nothing here can return a failing result"}`.

**b. Threshold with no measurement point.** *"p95 read latency stays under 200ms."*
`severity: minor`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:402", observed: "threshold given; no environment, no load profile, no measurement point — docs/perf-notes.md:4 records p95 at three different layers with a 90ms spread between them"}`.

**c. Criterion with no case in the testing document.** The plan promises idempotency; the testing doc never exercises a second run.
`severity: contract-gap`, `evidence: {kind: "command", ref: "grep -in 'idempot\\|re-run\\|rerun' docs/ledger-test-plan.md", observed: "no matches across 14 documented cases"}`.

**d. Criterion that tests the implementation, not the requirement.** The requirement is "duplicate submissions are rejected"; the criterion is "`insertEntry` returns `false` on conflict".
`severity: minor`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:228", observed: "criterion asserts a return value of one internal function; the requirement at line 44 is about end-to-end submission, which enters through src/api/entries.ts:31 and never inspects that return value"}`.

---

## 7. `baseline-diff-auditor`

### Question

**Item by item, what did this plan do with the baseline it is meant to honour — adopt it, rewrite it, drop it, or reverse it?** This lens is **required whenever a baseline resolves**, at every depth. It is usually the highest-value lens in the run, because a silent drop is invisible to every other one.

Produce an explicit ledger over every `B-*` inventory item. Every baseline item gets exactly one disposition:

| `disposition` | Meaning | Finding? |
|---|---|---|
| `adopted` | The plan implements it, in substance. | No — record it, and say where it is *stronger* than the baseline if it is. |
| `rewritten` | The plan implements a changed version. | Only if the change is unacknowledged. An acknowledged change is a decision. |
| `dropped` | The baseline required it; the plan neither implements it nor lists it as a non-goal with a reason. | **Always.** `contract-gap` at minimum. |
| `reversed` | The plan does the opposite of what the baseline requires. | **Always**, and usually `blocking`. |

The ledger goes in the run directory alongside the findings and is rendered in the report's section (b). Ledger completeness is not optional: **every** `B-*` gets a row, including the adopted ones. A ledger that lists only the problems cannot be checked for omissions.

### Evidence obligations

- Every ledger row cites the baseline `path:line` **and** either the plan `path:line` that implements it or the command showing it is absent.
- For `dropped`, the absence must be demonstrated, not asserted: a grep over the plan *and* the sidecar *and* the testing document that returns nothing.
- For `reversed`, quote both sides verbatim — the baseline's requirement and the plan's contradicting text.
- Do not conflate "dropped" with "listed as a non-goal with a reason". Check the plan's non-goals section before calling anything dropped. If it is listed there with a reason, the disposition is `rewritten` and there is no finding.
- Say where the plan is **stronger** than its baseline. A ledger that only records losses misrepresents the plan and the report's Verdict depends on both directions.

### Worked examples

**a. Silent drop.** The baseline requires an audit trail; the plan never mentions one and does not list it as a non-goal.
`disposition: dropped`, `severity: contract-gap`, `baseline_ref: "B-07 (baseline §4.2)"`, `anchor: {document: "design/ledger-spec.md", quote: "every mutation is recorded in an append-only audit trail"}`, `evidence: {kind: "command", ref: "grep -rin 'audit' proposals/ledger-plan.md proposals/ledger-plan-decisions.md docs/ledger-test-plan.md", observed: "zero matches across all three; the plan's Non-goals section at proposals/ledger-plan.md:52-58 does not mention it either"}`.

**b. Reversal.** The baseline mandates soft deletes; the plan hard-deletes.
`disposition: reversed`, `severity: blocking`, `baseline_ref: "B-11 (baseline §5.1)"`, `anchor: {quote: "rows are never removed; deletion sets deleted_at"}`, `evidence: {kind: "path-line", ref: "proposals/ledger-plan.md:288", observed: "Step 9 states 'DELETE FROM entry WHERE period_id = $1' — the baseline at design/ledger-spec.md:141 forbids row removal"}`.

**c. Acknowledged rewrite — not a finding.** The baseline specifies hourly reconciliation; the plan does it nightly and says why.
`disposition: rewritten`, no finding emitted. Ledger row records: baseline `design/ledger-spec.md:98`, plan `proposals/ledger-plan.md:250`, reason quoted from the plan's own decisions sidecar.

**d. Adopted and stronger.** The baseline asks for a reconciliation report; the plan adds an automated alert on discrepancy.
`disposition: adopted`, no finding emitted. Ledger row notes the plan exceeds the baseline here — this is what the Verdict draws on when it says the plan is stronger than its baseline in places.

**e. Not dropped — correctly out of scope.** The baseline requires an export API; the plan lists it under Non-goals with *"deferred to the follow-up plan; no consumer before Q3"*.
`disposition: rewritten`, no finding emitted. Cite the non-goals `path:line`. Calling this a drop is the error rule 3 in `SKILL.md` exists to prevent.
