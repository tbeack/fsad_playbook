# CBP-074 — sec-review-team: prune specialist overlaps

## Source
"Overlaps worth pruning" subsection of the specialist roster audit in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Observed in the CBP-060 validation run: four of six specialists flagged `csp: null` in different prose; silent-failure-hunter's capability-boundary note overlapped with auth-authz-auditor's Tauri IPC review. Overlap burns tokens producing the same finding from multiple specialists and complicates consolidation.

## Summary
Sharpen the scope boundaries in each specialist brief so every attack class has a single primary owner, with other specialists explicitly deferring. Two known overlaps to resolve (more may surface once the full 13-specialist roster is in place):

1. **CSP belongs to `frontend-security-auditor`** (post-CBP-072), not `data-exposure-auditor`. When frontend-security is in the roster, data-exposure drops its CSP bullet.
2. **Tauri IPC / capability grants belong to `auth-authz-auditor`**. `silent-failure-hunter` currently notes capability-boundary issues "architecturally unrecoverable" — good observation but duplicates scope. Silent-failure-hunter defers architectural IPC findings and focuses only on error-path silences.

## Assessment
- **Current state (post-CBP-064 library refactor):** each specialist brief lives in its own file in `specialists/`. Adjusting scope is now a scoped edit rather than a monolithic file rewrite.
- **Current state (pre-refactor, if this lands first):** same edits against the inlined briefs in `SKILL.md`.
- **Recommended ordering:** land CBP-064 (library) and CBP-072 (frontend-security added) first, then this task. Otherwise the CSP overlap fix is moot because there's nowhere else to put it.

**Location:** `.claude/skills/sec-review-team/specialists/data-exposure-auditor.md` (updated); `silent-failure-hunter.md` (updated). Depends on CBP-064 + CBP-072.

## Plan

### Pruning pass 1: CSP handoff

1. In `specialists/data-exposure-auditor.md`, remove the CSP bullet from the scope list. Add a line: "CSP / CORS / SRI / cookie flags: out of scope for this specialist. Flagged to `frontend-security-auditor` when present."
2. In `specialists/frontend-security-auditor.md`, confirm CSP is the first-class bullet (CBP-072 already includes it).
3. In `stack-signals.md`, ensure default rosters always include frontend-security when `data-exposure-auditor` is active for webapp / desktop-with-webview stacks. If the user explicitly excludes frontend-security, data-exposure should temporarily reclaim CSP as a fallback.

### Pruning pass 2: IPC / capability boundary handoff

1. In `specialists/silent-failure-hunter.md`, add explicit deferral: "Architectural IPC / capability-boundary findings (e.g., over-broad Tauri capability grants, unrestricted IPC commands) are out of scope for this specialist — they belong to `auth-authz-auditor`. Mention them only if they compound a specific error-path silence you've already identified."
2. In `specialists/auth-authz-auditor.md`, confirm IPC/capability is a first-class bullet (it already is for Tauri contexts; generalize to any "privilege boundary between frontend/webview/untrusted side and backend/trusted side").

### Pruning pass 3: Dedupe-at-brief-level pattern

1. Add a standard "Overlap with other specialists" section to each specialist brief template. Fields:
   - **Primary owner of** — list attack classes this specialist uniquely covers.
   - **Cross-cuts with** — list related specialists and who owns the shared ground.
2. In the consolidation template (CBP-061), include a "Cross-references" section in `REPORT.md` where findings from one specialist that touch another's scope are linked via `related` field in `findings.jsonl`.

### Validation

1. Re-run against `recall`. Expect CSP findings to come only from frontend-security (if included in the desktop roster) or data-exposure (fallback). IPC capability findings should come only from auth-authz.
2. Dedupe count in `REPORT.md` should decrease — the 4× CSP overlap becomes 1× detection.

## Acceptance Criteria
- [x] `data-exposure-auditor.md` drops CSP from scope with explicit handoff note.
- [x] `frontend-security-auditor.md` owns CSP as first-class scope (consistent with CBP-072).
- [x] `silent-failure-hunter.md` defers architectural IPC findings to `auth-authz-auditor`.
- [x] Every specialist brief has an "Overlap with other specialists" section listing primary-owner attack classes + cross-cuts.
- [x] `REPORT.md` template includes a "Cross-references" section showing related findings across specialists.
- [ ] Re-run against `recall`: CSP flagged once (not four times); IPC capability flagged once (not twice).
- [ ] Total deduped severity count on `recall` matches or improves vs. CBP-060 baseline.
