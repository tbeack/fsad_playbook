# CBP-119 — Add `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1` to Subprocess Sandboxing env vars table

## Summary
Claude Code v2.1.132 added `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1` — an env var that opts out of the fullscreen alternate-screen renderer, keeping the conversation in the terminal's native scrollback buffer instead. This is useful for users who prefer the classic inline rendering (e.g. in tmux, screen, or CI pipelines where the alternate screen doesn't play well with log capture).

## Assessment
The playbook's Subprocess Sandboxing collapsible (around line 6950–6963) contains a "Hardening env vars" table with vars like `CLAUDE_CODE_HIDE_CWD`, `CLAUDE_CODE_FORCE_SYNC_OUTPUT`, `DISABLE_UPDATES`, etc. `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` is not listed. It fits naturally into this table alongside other terminal/renderer env vars.

The `/tui fullscreen` Cheat Sheet row (line 6263) describes the fullscreen TUI mode. The new var can also be cross-referenced there so readers know they can opt out.

## Plan
1. Read lines 6950–6965 of `fsad-playbook.html` to confirm the exact hardening env vars table rows.
2. Insert a new `<tr>` row after the `CLAUDE_CODE_FORCE_SYNC_OUTPUT` row:
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1</code></td><td>Opts out of the fullscreen alternate-screen renderer — keeps the conversation in the terminal's native scrollback buffer. Useful in tmux, screen, or CI environments where alternate-screen mode interferes with log capture.</td></tr>
   ```
3. No Cheat Sheet change needed — the `/tui fullscreen` row already describes the feature and readers who want to disable it will find it in the sandboxing env vars.

## Acceptance Criteria
- `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1` appears in the hardening env vars table in Subprocess Sandboxing
- The description explains the alternate-screen opt-out and provides a practical use case
- No surrounding HTML is broken
