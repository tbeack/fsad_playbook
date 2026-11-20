# CBP-792: Update Auto Mode callout — `git status` runs less often, blocked until checked (v2.1.329)

## Summary
Claude Code v2.1.329 changed auto mode to run `git status` less often so most requests wait less in large repositories; a git command that discards changes may still be blocked until the working tree is checked.

## Assessment
`src/pages/practices.html`'s "Auto Mode Is Now the Default Starting Mode" callout (~line 2057) tracks auto-mode-availability changes by version but not this performance/safety-ordering change, which is worth a short note since it touches both the speed and the safety guarantees users rely on from auto mode.

## Plan
1. Open `src/pages/practices.html`.
2. In the auto-mode callout paragraph, append after the existing v2.1.328 sentence:
   ```
    As of v2.1.329, auto mode runs <code>git status</code> less often so most requests wait less in large repositories; a git command that would discard changes may still be blocked until the working tree is checked.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The auto-mode callout documents the v2.1.329 `git status` frequency change and the safety-check ordering.
- HTML is valid (no unclosed tags).

## Status
Implemented.
