# CBP-816: Update Code Mode collapsible — worktree/artifact safety in Code Mode (v2.1.332)

## Summary
Claude Code v2.1.332 improved Claude in Code Mode to confirm before discarding worktree changes, to read artifact files before publishing them, and to update an existing artifact instead of creating a second one.

## Assessment
`src/pages/practices.html`'s Code Mode paragraph (`power-usage--code-mode`, ~line 2465) is a running, version-dated account of Code Mode's rollout (v2.1.323 base, v2.1.326 agent teams, v2.1.329 OpenTelemetry, v2.1.331 platform support). This is the established pattern for Code Mode behavior changes.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the Code Mode paragraph, after the v2.1.331 sentence:
   ```
   As of v2.1.332, Code Mode also confirms before discarding worktree changes, reads an artifact's file before publishing it, and updates an existing artifact instead of creating a second one.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Code Mode collapsible documents the v2.1.332 worktree-confirmation and artifact-handling improvements.
- HTML is valid (no unclosed tags).

## Status
Implemented.
