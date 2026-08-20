# CBP-396 — [Codex] `codex exec fork` session forking from the CLI

## Source
Codex CLI rust-v0.148.0

## Summary
Sessions can now be forked non-interactively with `codex exec fork`.

## Assessment
Update-existing. `/fork` is documented as TUI-only in the Conversation Forking collapsible (lines 14005-14022) and in the cheat-sheet `/fork` row (13855). The `codex exec` examples at 14090-14109 cover `exec`, `exec resume`, `exec --json`, `exec --ephemeral` but not `exec fork`. Grep for `exec fork` returns nothing.

## Plan
1. Extend the Conversation Forking collapsible: add one prose sentence near line 14012 noting forking is no longer TUI-only, and add a `codex exec fork` line to the code block at 14013-14020, matching its `<span class="cm"># comment</span>` style.
2. Optionally add a `codex exec fork` row to the CLI Flags table after line 13907.

## Acceptance Criteria
- [ ] Conversation Forking collapsible documents `codex exec fork`
- [ ] Code block includes a runnable `codex exec fork` example matching the existing highlight-span style
- [ ] Version tagged as rust-v0.148.0
