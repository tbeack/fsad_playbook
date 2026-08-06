# REPORT.md Consolidation Template

This template defines how the orchestrator synthesizes `<agent>.findings.jsonl` and `<agent>.coverage.jsonl` from all specialists into a single deduped `REPORT.md`, per `SKILL.md` Steps 4 and 4.5.

## Pipeline (pseudocode)

```
# 1. Read all findings
findings = []
for f in <RUN_DIR>/*.findings.jsonl:
    for line in f:
        finding = validate_against(finding.schema.json, parse(line))
        findings.append(finding)

# 2. Read coverage
coverage = []
for f in <RUN_DIR>/*.coverage.jsonl:
    for line in f:
        coverage.append(parse(line))

# 2a. Compute the expected category set — independent of what was actually written.
# Each specialist brief declares a static "Coverage categories this specialist owns" list;
# the union of those lists, across every specialist in the CONFIRMED ROSTER (not just the
# ones that returned successfully), is the denominator's source of truth for completeness (6).
expected_categories = union(
    owned_categories(specialist) for specialist in confirmed_roster
)

# 3. Dedupe by root_issue
groups = group_by(findings, key=root_issue)
for group in groups:
    merged = {
        root_issue:  group[0].root_issue,
        severity:    max_severity(group),    # critical > high > medium > low > info
        confidence:  max_confidence(group),  # certain > likely > possible > unverified
        title:       group[0].title,
        raised_by:   distinct([f.specialist for f in group]),
        hit_count:   max([f.hit_count for f in group if f.hit_count is not None], default=None),
                     # consensus-pass agreement (Step 3a); input-validation-auditor/auth-authz-auditor only
        files:       distinct([f.file for f in group]),
        exploits:    [f.exploit for f in group],
        fixes:       [f.fix for f in group],
        evidence:    [f.evidence for f in group],
        count:       len(group)
    }

# 4. Verify (Step 4.5) — spawn one validator agent per group, before any confidence-based filtering.
# Specialists are instructed to flag everything, even low-confidence hunches (no more "no speculation"
# rule for auth-authz-auditor/input-validation-auditor) — the validator is what decides keep/drop.
for group in merged_groups:
    verdict = spawn_validator(group)  # refutation prompt: must cite file:line + a working exploit PATH
    group.validator_confirmed = verdict.confirmed
    group.exploit_path = verdict.exploit_path if verdict.confirmed else None
    if not verdict.confirmed:
        append_to(<RUN_DIR>/rejected-by-validator.jsonl, group | {rejection_reason: verdict.reason})

# 5. Rank actionable findings — validator-confirmed only. This replaces the old confidence-based
# certain|likely filter entirely; there is no separate "worth investigating" tier anymore.
actionable = [g for g in merged_groups if g.validator_confirmed]
actionable.sort(key=lambda g: (-(g.hit_count or 0), -severity_rank(g.severity), -confidence_rank(g.confidence)))

# 5a. Re-review filter — only when a prior known-findings.jsonl exists for this target (Step 0.1a).
# Skips issues already reported in an earlier run and suppresses low/info severity outright, so a
# re-review surfaces only new, non-trivial, validator-confirmed findings.
if re_review_mode:
    known = load(<TARGET>/.planning/security-review/known-findings.jsonl)
    actionable = [g for g in actionable if g.root_issue not in known.root_issues]
    actionable = [g for g in actionable if g.severity not in (low, info)]

# 6. Coverage matrix + completeness score — denominator is expected_categories (2a), NOT count(coverage).
# A specialist that errors before writing any coverage.jsonl entries must NOT shrink the denominator by
# having its owned categories silently vanish from the count — that would let a less-complete run (one
# with an errored specialist) score higher than a more-complete run. Categories in expected_categories
# with no matching coverage record are treated as status=not-checked for scoring (shown as ✗ in the matrix).
matrix = pivot(coverage, rows=category, cols=specialist, values=status+confidence)
checked = count(c for c in coverage if c.status in (checked-clean, checked-issues-found))
score = checked / len(expected_categories) * 100

# 7. Update the ledger — append every validator-confirmed root_issue from THIS run that isn't already
# in known-findings.jsonl (including ones suppressed by the re-review filter — the ledger tracks
# everything ever confirmed, not just what's newly shown this run).
update_ledger(<TARGET>/.planning/security-review/known-findings.jsonl, actionable)
```

## Severity / confidence precedence

```
SEVERITY: critical > high > medium > low > info
CONFIDENCE: certain > likely > possible > unverified
```

When merging a group, `severity` takes the max (most severe wins), `confidence` takes the max (most certain wins). Rationale: if one specialist says `high/certain` and another says `medium/possible`, the issue is high severity with certainty — don't down-rank for disagreement.

## Dedupe rules

1. Findings share a `root_issue` → merge into one entry.
2. Findings share `file:line_range` but different `root_issue` → keep separate (they're different issues at the same location).
3. Findings with different `root_issue` but identical `title` or `fix` → orchestrator flags as "possibly related" but does not auto-merge (avoid collapsing distinct issues).

## Output structure

```markdown
# <Target> — Consolidated Security Review

**Target:** <absolute path>
**Model:** <current model name>
**Date:** <ISO date>
**Team:** sec-review-team (<N> specialists, <typed|general-purpose> subagent types)
**Mode:** <full | lite>
**Run mode:** <baseline | re-review (vs run <prior_run_id>)>
**Runtime:** <total wall time>
**Coverage completeness:** <score>% (<checked>/<total> categories checked)

---

**Critical: N | High: N | Medium: N | Low: N** (after dedupe, validator-confirmed only)

**Validator: N confirmed, M rejected** (rejected findings are not shown — see `rejected-by-validator.jsonl`)

If re-review mode: **P previously-reported issues still open (not repeated below — see `known-findings.jsonl`), Q low/info findings suppressed**

---

## Unified threat model
<3–5 sentences from orchestrator, based on stack signals>

## Action items (validator-confirmed)

### <severity> — <title>
**Root issue:** <root_issue>
**Raised by:** <list of specialists>
**Consensus:** <hit_count>/<N> passes (auth-authz-auditor/input-validation-auditor findings only, omit line otherwise — `N` is the total passes that specialist's loop-until-dry fan-out ran)
**Confidence:** <max confidence across group>
**Validator:** confirmed — exploit path: <exploit_path>
**Files:** <list>

**Exploit scenario:** <synthesized from exploits[]>

**Recommended fix:** <synthesized from fixes[]>

**Evidence:**
```<lang>
<first evidence snippet>
```
<additional evidence snippets if different files>

## Coverage matrix
<category × specialist table with status+confidence cells; categories with no coverage record show ✗ not-checked>

## Verified clean / N/A
<categories with status=checked-clean, grouped by specialist, with search summary>

## Scanner-sourced findings (if any)
<findings where source=scanner-*; separate section so provenance is visible>

## Recommended fix order
<grouped by effort, ordered by impact, with engineer-day estimates>

## Tooling caveats
<which scanners couldn't run, which specialists had to fall back to general-purpose, specialists that
errored, count of findings rejected by the validator (see `rejected-by-validator.jsonl`); if re-review
mode: count of previously-reported root_issues and low/info findings suppressed (see `known-findings.jsonl`)>

## Per-specialist report links
- [auth-authz-auditor.md](auth-authz-auditor.md) — <severity counts> — [findings.jsonl](auth-authz-auditor.findings.jsonl) — [coverage.jsonl](auth-authz-auditor.coverage.jsonl) — loop-until-dry consensus (N passes), see `.pass1-N.findings.jsonl`
- [input-validation-auditor.md](input-validation-auditor.md) — … — loop-until-dry consensus (N passes), see `.pass1-N.findings.jsonl`
<etc, one line per specialist in roster>
```

## Cross-references

Use each finding's `related` field (IDs from other specialists) to build a cross-reference section at the end of REPORT.md showing which findings touch each other's scope.
