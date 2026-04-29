# CBP-070 — sec-review-fixes: companion skill that takes REPORT.md and opens fix PRs per High finding (P2.4)

## Source
Recommendation P2.4 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Closes the review → remediate → verify loop. The `sec-review-team` skill is intentionally review-only; the fix workflow belongs in a separate skill with its own approval flow.

## Summary
Build a companion skill `/sec-review-fixes` that takes the structured findings from a `sec-review-team` run and produces fix PRs (or fix plans). Each High finding becomes a candidate fix PR with the recommended change from the finding, a regression test that would have caught the issue, and a citation back to the finding ID. Pairs with CBP-061 (structured JSONL) and CBP-068 (test harness) to support `re-verify` mode that confirms a fix actually resolved the finding.

## Assessment
- **Current state:** `sec-review-team` produces `REPORT.md` and the user is left to manually read, prioritize, open tickets, assign, and apply fixes. No automation from findings to fix.
- **Prerequisites:** CBP-061 (structured JSONL — so fixes can be generated programmatically) and CBP-063 (confidence scoring — so only `certain`/`likely` findings become automated fix candidates, `possible`/`unverified` require manual review first).
- **Related separation of concerns:** "Review-only" is a guarantee of `sec-review-team`; fix-application risk is very different (touches code, generates diffs, potentially breaks things). Separate skill = separate sandbox = separate approval.

**Location:** `.claude/skills/sec-review-fixes/SKILL.md` (new directory).

## Plan

1. Create `.claude/skills/sec-review-fixes/SKILL.md` with:
   - Frontmatter: `name: sec-review-fixes`, trigger phrases (e.g., "fix the security findings", "apply sec-review fixes", "open PRs for security report"), `argument-hint` accepting a path to `REPORT.md` / `findings.jsonl`.
   - Orchestration that:
     1. Reads `findings.jsonl` (or parses `REPORT.md` as fallback).
     2. Filters to `severity IN (critical, high) AND confidence IN (certain, likely)`.
     3. For each candidate finding, spawns a `fix-author` agent (`general-purpose` or a typed `code-writer`) with the finding body + the current code + the recommended fix. Agent produces a diff + a regression test.
     4. Presents the proposed diff to the user for approval (one PR per finding or one batch PR, user's choice).
     5. On approval, applies the diff on a branch named `sec-review/fix-<finding-id>`, commits with message citing the finding, pushes, opens a PR with the finding body in the description.
2. Add an `interactive-review` step before each fix-apply: the user sees the finding, the proposed diff, the proposed test, and approves or requests changes before any code is written.
3. Add a `--dry-run` mode that produces a fix-plan markdown document without applying changes. Useful for handing off to a team for manual implementation.
4. Add a `--re-verify` mode that runs `sec-review-team` against a specific set of finding IDs and reports each as `fixed` / `still-present` / `inconclusive`. Lets a user confirm that their commits actually resolved the findings they think they did.
5. Safeguards:
   - Never operate on `main` / `master` — always create a branch.
   - Never force-push.
   - Block fix application if target repo has uncommitted changes (avoid mixing unrelated edits with auto-fix).
   - Generate and run the regression test before committing; if the test fails, the fix is rejected.
6. Update the playbook Security Review section (CBP-071) to mention the companion skill.

## Acceptance Criteria
- [x] `.claude/skills/sec-review-fixes/SKILL.md` exists with full orchestration.
- [x] Skill filters to `high`/`critical` + `certain`/`likely` findings by default.
- [x] Interactive approval step blocks code changes until user confirms.
- [x] `--dry-run` mode produces a fix-plan without applying changes.
- [x] `--re-verify` mode re-runs `sec-review-team` on specific finding IDs and reports fix status.
- [x] Safeguards in place: branch-only commits, no force-push, clean-working-tree check, regression-test-gates-fix.
- [ ] Tested against the `recall` reference target: at least one high finding produces an approved fix PR with a passing regression test.
- [x] Skill registered and distinct from `sec-review-team` (no name collision).
