# CBP-405 — [Codex] Sandbox restrictions fail closed for denied and unreadable paths

## Source
Codex CLI rust-v0.148.0

## Summary
Sandbox restrictions now fail closed for denied or unreadable paths across Linux and Windows, and managed deny-read rules are enforced in the Windows sandbox.

## Assessment
Update-existing. The Permission Profiles collapsible (14171-14209) is the precise home: it already shows filesystem deny policy including `"**/*.env" = "none"` and the `requirements.toml` admin callout, but says nothing about failure semantics when a path is denied or unreadable. The `#codex-guidelines` Over-Permissive Sandbox anti-pattern card (13623-13626) is a weaker fit and should NOT also be edited — keep this documented in one place to avoid duplicate coverage.

## Plan
1. Append a sentence to the intro `<p>` at line 14178, or add a callout after the code block at 14203 (before the existing tip at 14204), stating that denied or unreadable paths now fail closed on Linux and Windows and that managed deny-read rules are enforced in the Windows sandbox.
2. Tag rust-v0.148.0.

## Acceptance Criteria
- [ ] Fail-closed semantics documented once, in the Permission Profiles collapsible
- [ ] Both Linux and Windows named
- [ ] No duplicate coverage added to `#codex-guidelines`
- [ ] Tagged rust-v0.148.0
