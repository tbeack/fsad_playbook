# CBP-782: Update worktree paragraph — `ExitWorktree` confirms before removal (v2.1.327)

## Summary
Claude Code v2.1.327 changed `ExitWorktree` to ask before removing a worktree that may hold unsaved work; refused in don't-ask mode or with nobody to answer, unless an allow rule, auto, or bypass permissions mode allows it.

## Assessment
`src/pages/practices.html`'s worktree paragraph (~line 2302) already documents `EnterWorktree`, `WorktreeCreate`, and `WorktreeRemove` lifecycle behavior, chaining "As of vX.X.X" sentences. This is a direct continuation covering the companion `ExitWorktree` tool's new confirmation step.

## Plan
1. Open `src/pages/practices.html`.
2. In the worktree paragraph (~line 2302), append a new sentence after the v2.1.238 note and before the closing `</p>`:
   ```
    As of v2.1.327, <code>ExitWorktree</code> asks for confirmation before removing a worktree that may hold unsaved work; it's refused outright in don't-ask mode or when nobody can answer, unless an allow rule or auto/bypass permissions mode allows it.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The worktree paragraph documents the v2.1.327 `ExitWorktree` confirmation behavior.
- HTML is valid (no unclosed tags).
