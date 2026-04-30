---
name: sec-review-fixes
description: Companion to `sec-review-team`. Takes the `REPORT.md` or `findings.jsonl` from a security review run and produces fix PRs (one per finding or one consolidated) with interactive approval. Each candidate finding becomes a proposed diff + a regression test that would have caught it + a commit/PR citing the finding ID. Filters by default to `severity IN (critical, high) AND confidence IN (certain, likely)`. Modes: interactive (default), `--dry-run` (produces a fix-plan document with no code changes), `--re-verify` (re-runs sec-review-team against a specific set of finding IDs and reports fixed / still-present / inconclusive). Safeguards: branch-only commits (never main), no force-push, clean-working-tree required, regression-test must pass before commit lands. Use when the user says "fix the security findings", "apply sec-review fixes", "open PRs for the security report", "re-verify the security fixes", or similar.
argument-hint: `[path to REPORT.md or findings.jsonl] [--dry-run | --re-verify <id>...] [--one-pr | --pr-per-finding]`
---

# sec-review-fixes — Fix-Workflow Orchestration

Companion to `sec-review-team`. Never applies a code change without explicit user approval.

## Step 0: Locate findings source

Parse `$ARGUMENTS`:
- **Source path** — either a `REPORT.md` or a `<agent>.findings.jsonl` file (or a directory containing them, e.g. `<target>/.planning/security-review/`).
  - If source is a directory, aggregate every `*.findings.jsonl` in it.
  - If source is `REPORT.md`, prefer the sibling `*.findings.jsonl` files if they exist (structured parse). Fall back to parsing the markdown if only the prose report is available.
- **Mode:**
  - default = interactive
  - `--dry-run` = write a fix-plan markdown, no code changes
  - `--re-verify <id>...` = re-run sec-review-team on the specified finding IDs and report status (skip Steps 2–5)
- **PR granularity:** `--one-pr` (all fixes in one PR) or `--pr-per-finding` (default for ≤ 3 fixes; for ≥ 4, default switches to one-PR to avoid PR storm).

Do **not** operate on the source target repo yet. Just read metadata.

## Step 1: Filter candidate findings

Apply default filter:
- `severity IN (critical, high)` — medium/low need manual review first, they are not eligible for auto-fix.
- `confidence IN (certain, likely)` — `possible`/`unverified` require human triage first; they are not eligible for auto-fix.
- User may relax the filter explicitly (prompt: "N findings matched default filter. X additional findings available at lower severity/confidence — include them?").

For `--re-verify`, skip filtering; use the specified IDs literally.

## Step 2: Safety preflight

Before touching any file, verify:

1. **Target git state:** Working tree clean (`git status --porcelain` empty). If dirty, abort with explanation. The user must stash/commit first.
2. **Current branch is NOT `main` / `master` / `trunk` / default-branch.** If it is, offer to create `sec-review-fix/<timestamp>` and switch. Never operate directly on default.
3. **No in-progress rebase / merge / cherry-pick** (`git status` shows no in-progress operation).
4. **Remote reachable** (if PR mode, not dry-run): `git ls-remote --exit-code origin` succeeds.
5. **`gh` CLI available and authenticated** (if PR mode).

If any check fails, abort with a specific message. Never proceed past a failed safety check.

## Step 3: Per-finding fix authoring (spawn subagents in parallel)

For each candidate finding, spawn a `fix-author` `Agent` with:

- **Subagent type:** `general-purpose` (or a typed `code-writer` if available).
- **Brief:** "Here is one security finding from sec-review-team: `<finding>`. The current state of the code at `<file>:<line_range>` is `<snippet>`. Produce (1) a diff that implements the `fix` field, (2) a regression test that would fail before the fix and pass after. Write to `<TARGET>/.planning/sec-review-fixes/<id>.diff` and `<id>.test.<ext>` respectively. Also write a one-paragraph commit message at `<id>.commit-msg.txt`."
- **Allowed tools:** `Read`, `Grep`, `Glob`, read-only `Bash` allowlist. `Write` scoped to the three output paths only. **No `Edit` on target files** — the orchestrator applies diffs later, not the subagent.

Subagents don't mutate target code. They produce candidate artifacts.

## Step 4: Interactive approval (one finding at a time)

For each candidate:

```
━━ Finding <id>: <title> ━━
  Severity:    <sev>
  Confidence:  <conf>
  File:        <file>:<line_range>
  Root issue:  <root_issue>

Exploit:
  <exploit>

Proposed fix:
  <fix>

Proposed diff:
  <diff contents>

Proposed regression test:
  <test contents>

Approve / edit-fix / skip / abort? [a/e/s/x]
```

- **a** (approve) — move to Step 5 for this finding.
- **e** (edit-fix) — let the user type revised instructions; respawn the fix-author with the revised brief.
- **s** (skip) — finding stays un-fixed; continue to next.
- **x** (abort) — stop all further processing; do not apply any pending approved fixes that haven't been committed yet.

Default if no response: treat as skip (never auto-approve).

Exception: `--dry-run` skips this step entirely. The fix-plan is just the collected proposals.

## Step 5: Apply + test + commit + push + PR (per approved finding)

**Still safeguarded.** Even after approval:

1. **Create or checkout the fix branch:** `sec-review-fix/<finding-id>` (for per-PR mode) or `sec-review-fix/<timestamp>` (for one-PR mode). Never operate on main.
2. **Apply the diff** via `git apply <id>.diff`. On failure: mark finding as `apply-failed`, do not commit, continue to next.
3. **Run the regression test.** How: detect target's test runner (`package.json scripts.test`, `cargo test`, `pytest`, `go test`, etc.) and invoke. The test must pass before proceeding. If it fails, revert (`git checkout -- <affected>`), mark as `regression-test-failed`, continue to next.
4. **Commit with message:** the contents of `<id>.commit-msg.txt`, plus a trailer `Fixes-finding: <id>` + `Ref: <source path of findings>`. Default commit message ends with `Co-Authored-By: Claude (sec-review-fixes) <noreply@anthropic.com>`.
5. **Push to origin** (for PR mode only). `git push -u origin <branch>`.
6. **Open PR** via `gh pr create`:
   - Title: `fix(security): <finding title>`
   - Body: full finding (exploit + fix + evidence), the regression test description, a checklist for the reviewer (manual verification + security implications + adjacent review).
   - Label: `security`, `sec-review-team`.

Safeguards that stay on throughout:
- **Never force-push.**
- **Never push to main.**
- **Never amend an existing commit.**
- **Never modify `.git/` directly.**
- If any safeguard tripping is requested, abort and surface it to the user.

## Step 6: Report

Emit a summary table:

| Finding | Status | PR | Branch |
|---|---|---|---|
| auth-001 | fixed + PR opened | #1234 | sec-review-fix/auth-001 |
| iv-003 | skipped | — | — |
| sc-001 | regression-test-failed | — | — |
| de-002 | apply-failed | — | — |

Print absolute paths to `.planning/sec-review-fixes/` artifacts for every candidate (even skipped ones, so the user can come back later).

## `--re-verify` mode

Alternate flow triggered by `--re-verify <id>...`:

1. Parse the finding IDs from args.
2. For each ID, look up the original finding metadata (severity, file, root_issue, evidence) from the source `findings.jsonl`.
3. Invoke `sec-review-team` against the same target and same scope. Wait for new `findings.jsonl`.
4. For each requested ID:
   - If no finding with the same `root_issue` + `file` appears in the new run → **fixed**.
   - If a finding with the same `root_issue` appears → **still-present**. Show the diff between old and new evidence.
   - If the specialist that would cover this category is not in the new roster (stack changed), or the category was `not-checked` → **inconclusive** (explain why).
5. Emit a re-verify report at `.planning/sec-review-fixes/re-verify-<timestamp>.md`.

Never apply fixes in re-verify mode. Pure audit.

## `--dry-run` mode

Triggered by `--dry-run`. Steps 2, 4 (modified), 5 are skipped:

- Step 2 safety preflight still runs (we still inspect repo state) but doesn't require branch-switching.
- Step 3 still spawns fix-authors (artifact-only).
- Step 4 shows proposals but doesn't prompt for apply — just collects them.
- Step 5 is skipped entirely.
- Instead: write `.planning/sec-review-fixes/fix-plan.md` — a human-readable document with every proposed fix + test + commit message, organized by severity. User can hand off to a team for manual implementation.

## Related

- **Companion skill:** [`sec-review-team`](../sec-review-team/SKILL.md) produces the input to this skill.
- **Schema:** [`sec-review-team/schema/finding.schema.json`](../sec-review-team/schema/finding.schema.json) — what `findings.jsonl` lines conform to.
- **Safeguard details:** [`docs/safeguards.md`](docs/safeguards.md)
- **Design tradeoffs:** [`sec-review-team/docs/tradeoffs.md`](../sec-review-team/docs/tradeoffs.md) — item #5 (no-auto-fix) explains why this skill exists separately.
