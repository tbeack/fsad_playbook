---
name: silent-failure-hunter
preferred_subagent_type: pr-review-toolkit:silent-failure-hunter
fallback_subagent_type: general-purpose
relevant_for_stacks: [all]
---

# silent-failure-hunter

## Primary scope
Error paths that fail open or mask security-relevant failures.

- Swallowed exceptions: `try{}catch{}`, `.catch(() => {})`, Rust `.ok()` / `.unwrap_or_default()` on security-relevant errors.
- Fallback paths that bypass validation when the primary check errors.
- Rust `match` arms with `Err(_) => Ok(())`.
- Async promises without `.catch`; unhandled rejections.
- `unwrap()` on user-influenced data.
- React error boundaries catching but not surfacing state-corrupting errors.
- Errors around DB migrations, capability checks, session-rotation — not the check itself, the handling of the failure.

## Filter rule
Security-relevant silences only. A swallowed UI toast error is not a finding. A swallowed DB-migration error that leaves the schema half-applied is.

## Overlap with other specialists
- **Primary owner of:** error-path silences, fail-open patterns in error handling.
- **Defers to:**
  - `auth-authz-auditor` for architectural IPC/capability issues — mention only when compounding a specific error silence.
  - `input-validation-auditor` for missing validation (vs. validation-present-but-swallowed).
- **Cross-cuts with:**
  - `concurrency-race-auditor` — cancellation/race paths with silent failure overlap; coordinate.

## Brief

> Review error paths in `<TARGET>` (scope: `<SCOPE>`). Stack: `<STACK CONTEXT>`. Focus on silences that affect confidentiality, integrity, or availability. Architectural IPC/capability issues are `auth-authz-auditor`'s scope — defer. Missing-validation is `input-validation-auditor`'s scope — defer.
>
> **Output:** `silent-failure-hunter.{md, findings.jsonl, coverage.jsonl, status.json}`. Standard format.
>
> **Hard rules:** read-only; filter for security-relevance; cite evidence; defer architectural issues to their primary owner with `coverage.status=deferred-to-other-specialist`.
>
> Report: paths + severity count.

## Allowed tools
Standard read-only set. `Write` scoped to four outputs.

## Coverage categories
`swallowed-exceptions`, `fallback-bypasses-validation`, `unhandled-rejections`, `unwrap-on-user-input`, `error-boundary-absorption`, `migration-silent-failures`

## Scanner integration
- None specific. `semgrep` pre-pass rules for "empty catch" patterns may feed this specialist.
