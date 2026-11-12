# CBP-714: Update dangerous-rm/rmdir behavior in bypass permissions mode (v2.1.309)

## Summary
Claude Code v2.1.309 changed the dangerous `rm`/`rmdir` prompt in bypass permissions mode in the Desktop app and VS Code: instead of showing a prompt (which previously waited up to 2 minutes before denying, per v2.1.281), it now denies the command at once with a rewrite hint, so unattended sessions keep going. The playbook's "Bypass Permissions" card says "Catastrophic removal commands still prompt," and the sandboxing paragraph documents the old 2-minute-wait-then-deny behavior — both need the v2.1.309 Desktop/VS Code correction.

## Assessment
- `src/pages/practices.html` line ~2036 (Bypass Permissions card): `Catastrophic removal commands still prompt.`
- `src/pages/practices.html` line ~2708 (sandboxing paragraph) already documents: "As of v2.1.281, the dangerous-`rm` prompt in `--dangerously-skip-permissions` and auto mode waits 2 minutes for an answer, then denies the command with a rewrite hint so unattended sessions keep going."
Neither reflects that Desktop app / VS Code now skip the prompt (and the wait) and deny immediately, and that `rmdir` is now covered alongside `rm`.

## Plan
1. In the Bypass Permissions card, soften "still prompt" to note the Desktop app/VS Code exception.
2. Append a sentence to the v2.1.281 sandboxing bullet noting the v2.1.309 change: in the Desktop app and VS Code, bypass-permissions mode now denies a dangerous `rm`/`rmdir` immediately (no 2-minute wait) with a rewrite hint.

## Acceptance Criteria
- Both locations mention the Desktop app/VS Code immediate-deny behavior and that `rmdir` is now covered.
- Version-tagged `(v2.1.309)`.
- Existing v2.1.261/v2.1.281 history is preserved, not replaced.
