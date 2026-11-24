# CBP-813: [Codex] `codex exec resume` restores sandbox + workspace (rust-v0.172.0)

## Summary
Codex rust-v0.172.0 fixed `codex exec resume` to restore saved sandbox permissions, working directory, and workspace roots from the original session, unless explicitly overridden.

## Assessment
`src/pages/codex.html`'s CI/CD Integration section (~line 1330) documents `codex exec`/`codex review` behavior in untrusted directories (rust-v0.169.0) and is the natural home for this `codex exec resume` fix, which the section's code block already demonstrates (line ~1342).

## Plan
1. Open `src/pages/codex.html`.
2. Add a new paragraph to the CI/CD Integration section, after the "Untrusted directories (rust-v0.169.0)" paragraph:
   ```html
   <p ...><strong>Resume restores sandbox + workspace (rust-v0.172.0):</strong> codex exec resume now restores the saved sandbox permissions, working directory, and workspace roots from the original session, unless you explicitly override them.</p>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The CI/CD Integration section documents the rust-v0.172.0 `codex exec resume` fix.
- HTML is valid (no unclosed tags).

## Status
Implemented.
