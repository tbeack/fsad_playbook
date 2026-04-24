# CBP-063 — sec-review-team: checked-clean vs didn't-check contract + confidence field on findings (P0.3)

## Source
Recommendation P0.3 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Observed in the CBP-060 validation run: one specialist wrote "Prompt injection — Confirmed N/A. No LLM SDK in package.json or Cargo.toml." That's a *search result*, not a *verification*. A codebase that constructs LLM calls via raw HTTP or shell-exec would evade that search and the N/A would be confidently wrong.

## Summary
Security reviews live and die on false negatives. Change the specialist briefs so (a) every "N/A" or "clean" finding must include the searches and reads that proved it plus known search limits, and (b) every finding (positive or negative) carries a `confidence` field (`certain | likely | possible | unverified`). Low-confidence findings group separately in `REPORT.md` under "Worth checking" instead of polluting the actionable list.

## Assessment
- **Current state:** Briefs say "if a category is N/A say so explicitly" (line ~50 of `SKILL.md`). Good but insufficient — agents can still produce unverified negatives that read as verified.
- **Gap:** No distinction between *"I searched for X, Y, Z and found nothing"* and *"I didn't investigate this category at all."* Both currently land as "N/A."
- **Schema overlap:** depends on CBP-061 (structured JSONL) — the `confidence` field lives in the finding schema; the `coverage.jsonl` records what was actually checked.

**Location:** `.claude/skills/sec-review-team/SKILL.md` — specialist briefs (lines 46–108); consolidation step (lines 110–123). Depends on CBP-061 schema.

## Plan

1. Define `confidence` enum in `finding.schema.json` (part of CBP-061): `certain`, `likely`, `possible`, `unverified`.
2. Update every specialist brief in `SKILL.md` with a new paragraph:
   > "A negative finding (clean / N/A) must include the searches and reads that proved it, plus the known limits of that proof. Do not claim cleanliness based on unsearched surfaces. Emit a `<agent>.coverage.jsonl` entry per category with: `category`, `status` (`checked-clean` / `checked-issues-found` / `not-checked`), `confidence`, `searches` (list of grep/rg/command invocations run), `files_read`, `search_limits` (one sentence on what the searches would miss)."
3. Update every specialist brief to set `confidence` on every positive finding based on:
   - `certain` — directly observed in code, fix is mechanical
   - `likely` — observed pattern + reasonable inference; fix path clear
   - `possible` — inferred from indirect evidence or architectural smell
   - `unverified` — cannot be confirmed without running the code or an external scanner
4. Update Step 4 (consolidation) to group findings by severity × confidence. `REPORT.md` sections:
   - "Action items" — confidence `certain` OR `likely`, any severity
   - "Worth investigating" — confidence `possible` OR `unverified`
   - "Coverage matrix" — `category × specialist × checked-clean/issues-found/not-checked × confidence`
5. In consolidation, compute and report a coverage completeness score: `checked-clean + checked-issues-found` over total categories. A run with low coverage should not be reported as a "clean review."

## Acceptance Criteria
- [x] `confidence` field present on every finding in every specialist's JSONL output.
- [x] Per-category `coverage.jsonl` emitted by every specialist with searches, files read, and search limits.
- [x] `REPORT.md` groups actionable findings separately from "worth investigating" findings.
- [x] Coverage matrix in `REPORT.md` shows each category's check status per specialist.
- [x] Coverage completeness score reported; runs with <80% coverage carry a "partial review" banner.
- [ ] Re-run against `recall` shows the prompt-injection category's "checked-clean" entry with explicit search limits (the failure mode this task targets).
