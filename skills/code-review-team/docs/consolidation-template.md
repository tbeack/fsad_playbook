# REVIEW-REPORT.md Consolidation Template

This template defines how the orchestrator synthesizes `<agent>.findings.jsonl` and `<agent>.coverage.jsonl` from all specialists into a single deduped `REVIEW-REPORT.md`.

## Pipeline (pseudocode)

```
# 1. Read all findings
findings = []
for f in <RUN_DIR>/*.findings.jsonl:
    for line in f:
        finding = parse(line)
        findings.append(finding)

# 2. Read coverage
coverage = []
for f in <RUN_DIR>/*.coverage.jsonl:
    for line in f:
        coverage.append(parse(line))

# 2a. Compute the expected dimension set — independent of what was actually written.
# Each specialist brief declares a static "Coverage dimensions owned" list; the union of those
# lists, across every specialist in the CONFIRMED ROSTER (not just the ones that returned
# successfully), is the denominator's source of truth for completeness (8).
expected_dimensions = union(
    owned_dimensions(specialist) for specialist in confirmed_roster
)

# 3. Dedupe by root_issue
groups = group_by(findings, key=root_issue)
for group in groups:
    merged = {
        root_issue:          group[0].root_issue,
        severity:            max_severity(group),     # critical > major > minor > nit
        confidence:          max_confidence(group),   # certain > likely > possible > unverified
        title:               group[0].title,
        raised_by:           distinct([f.specialist for f in group]),
        confirmed_by:        distinct([f.specialist for f in group]),  # for agreement scoring (cross-specialist)
        confirmed_by_count:  len(distinct([f.specialist for f in group])),
        hit_count:           max([f.hit_count for f in group if f.hit_count is not None], default=None),  # consensus-pass agreement (Step 3a); correctness/performance only
        files:               distinct([f.file for f in group]),
        evidence:            [f.evidence for f in group],
        fix:                 group[0].fix,   # or synthesize from group
    }

# 4. Verify (Step 4.5) — spawn one validator agent per group, before any confidence-based filtering.
# Specialists are instructed to flag everything, even low-confidence hunches (no more "no speculation"
# rule) — the validator is what decides keep/drop, not raw confidence.
for group in merged_groups:
    verdict = spawn_validator(group)   # refutation prompt: must cite file:line + a concrete failing input
    group.validator_confirmed = verdict.confirmed
    group.failing_case = verdict.failing_case if verdict.confirmed else None
    if not verdict.confirmed:
        append_to(rejected-by-validator.jsonl, group | {rejection_reason: verdict.reason})

# 5. Rank actionable findings — validator-confirmed only. This replaces the old confidence-based
# certain|likely filter entirely; there is no "worth investigating" tier anymore.
actionable = [g for g in merged_groups if g.validator_confirmed]
actionable.sort(key=lambda g: (-g.confirmed_by_count, -(g.hit_count or 0), -severity_rank(g.severity), -confidence_rank(g.confidence)))

# 6. Derive merge recommendation from the validator-confirmed set only
if any(g.severity == "critical" for g in actionable):
    merge_rec = "Request Changes — Critical issues present"
elif count(g for g in actionable if g.severity == "major") > 0:
    merge_rec = "Request Changes — Major issues found"
elif len(actionable) > 0:
    merge_rec = "Approved with suggestions"
else:
    merge_rec = "Approved"

# 7. Coverage matrix
matrix = pivot(coverage, rows=category, cols=specialist, values=status)

# 8. Completeness score — denominator is expected_dimensions (2a), NOT count(coverage).
# A specialist that errors before writing any coverage.jsonl entries must NOT shrink the
# denominator by having its owned dimensions silently vanish from the count — that would let
# a less-complete run (one with an errored specialist) score higher than a more-complete run.
# Dimensions in expected_dimensions with no matching coverage record are treated as
# status=not-checked for scoring purposes (shown as ✗ in the Coverage Matrix).
checked = count(c for c in coverage if c.status in (checked-clean, checked-issues-found))
score = checked / len(expected_dimensions) * 100

# 9. Re-review filter — only when a prior known-findings.jsonl exists for this target (Step 0.1a).
# Skips issues already reported in an earlier run and suppresses nits outright, so a re-review
# surfaces only new, non-nit, validator-confirmed findings.
if re_review_mode:
    known = load(known-findings.jsonl)
    actionable = [g for g in actionable if g.root_issue not in known.root_issues]
    actionable = [g for g in actionable if g.severity != "nit"]
```

## Severity and confidence precedence

```
SEVERITY:   critical > major > minor > nit
CONFIDENCE: certain > likely > possible > unverified
```

When merging a group, take `max(severity)` and `max(confidence)`. Rationale: if one specialist says `major/certain` and another says `minor/possible`, the issue is major severity with certainty.

## Merge recommendation mapping

| Severity of worst actionable finding | Merge recommendation |
|---|---|
| `critical` | `block` — Request Changes (critical) |
| `major` | `recommend-fix` — Request Changes (major) |
| `minor` only | `defer` — Approved with suggestions |
| `nit` only or no findings | `optional` — Approved |

## Dedupe rules

1. Findings share `root_issue` → merge into one entry.
2. Findings share `file:line_range` but different `root_issue` → keep separate.
3. Findings with identical `title` or `fix` but different `root_issue` → flag as "possibly related" but don't auto-merge.

## Output structure

```markdown
# <Target> — Code Review Report

**Target:** <absolute path>
**Model:** <current model name>
**Date:** <YYYY-MM-DD>
**Team:** code-review-team (<N> specialists, general-purpose subagents)
**Runtime:** <total wall time>
**Coverage completeness:** <score>% (<checked>/<total> dimensions reviewed)

---

## Merge Recommendation

> <merge_recommendation>

**Critical: N | Major: N | Minor: N | Nit: N** (after dedupe, validator-confirmed only)

**Validator: N confirmed, M rejected** (rejected findings are not shown — see `rejected-by-validator.jsonl`)

---

## Top Issues

| # | Severity | Title | Raised by | Confirmed by | Consensus |
|---|---|---|---|---|---|
| 1 | 🔴 Critical | <title> | correctness-reviewer | 2 specialists | 4/6 passes |
| 2 | 🟠 Major | <title> | design-reviewer | — | — |
| … | … | … | … | … | … |

`Consensus` is only populated for `correctness-reviewer`/`performance-reviewer` findings (`hit_count`/`N`, where `N` is however many passes that specialist's loop-until-dry fan-out actually ran, `MIN_PASSES=2`..`MAX_PASSES=8` — see Step 3a); `—` for single-pass specialists.

---

## Critical Findings

### 🔴 <title>

**Root issue:** `<root_issue>`
**Raised by:** <specialist>, <specialist>
**Confirmed by N specialists** (inter-agent agreement)<br>
**Consensus:** <hit_count>/<N> passes (correctness-reviewer/performance-reviewer findings only, omit line otherwise — `N` is the total passes that specialist's loop-until-dry fan-out ran)
**Confidence:** <max confidence>
**Validator:** confirmed — failing case: <failing_case>
**Files:** `<file>`, `<file>`

**Evidence:**
```<lang>
<evidence snippet>
```

**Recommended fix:** <fix>

---

## Major Findings

### 🟠 <title>

<same structure as Critical>

---

## Minor Findings

<collapsed by default — list format>

| Severity | Title | File | Specialist |
|---|---|---|---|
| minor | … | … | … |

---

## Nits

<collapsed — list format>

| Title | File | Specialist |
|---|---|---|
| … | … | … |

---

## Coverage Matrix

| Dimension | correctness | design | performance | maintainability | testing | api-contract | security |
|---|---|---|---|---|---|---|---|
| logic-errors | ✓ clean | — | — | — | — | — | — |
| edge-cases | ⚠ issues | — | — | — | — | — | — |
| error-handling | ✓ clean | — | — | — | — | — | — |
| injection | — | — | — | — | — | — | ✓ clean |
| authz-authn | — | — | — | — | — | — | ⚠ issues |
| secrets-exposure | — | — | — | — | — | — | ✓ clean |
| … | … | … | … | … | … | … | … |

Legend: ✓ clean = checked, no issues; ⚠ issues = issues found; — = deferred to other specialist; ✗ = not checked

---

## Per-Specialist Reports

- [correctness-reviewer.md](<path>/correctness-reviewer.md) — (1C / 2M / 0m / 1N) — [findings.jsonl](<path>/correctness-reviewer.findings.jsonl) — [coverage.jsonl](<path>/correctness-reviewer.coverage.jsonl) — loop-until-dry consensus (N passes), see `.pass1-N.findings.jsonl`
- [design-reviewer.md](<path>/design-reviewer.md) — (0C / 1M / 2m / 3N) — …
- [performance-reviewer.md](<path>/performance-reviewer.md) — … — loop-until-dry consensus (N passes), see `.pass1-N.findings.jsonl`
- [security-reviewer.md](<path>/security-reviewer.md) — …
- [maintainability-reviewer.md](<path>/maintainability-reviewer.md) — …
- [testing-reviewer.md](<path>/testing-reviewer.md) — …
- [api-contract-reviewer.md](<path>/api-contract-reviewer.md) — …

---

## Tooling Caveats

<linters unavailable; specialists that errored; fallbacks taken; count of findings rejected by the
validator (see `rejected-by-validator.jsonl`); if re-review mode: count of previously-reported
root_issues and nits suppressed from this run's report (see `known-findings.jsonl`)>
```

## Severity symbols

| Severity | Symbol |
|---|---|
| Critical | 🔴 |
| Major | 🟠 |
| Minor | 🟡 |
| Nit | 🔵 |
