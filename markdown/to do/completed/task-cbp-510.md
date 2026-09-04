# CBP-510 — Add `--permission-prompts none` to Cheat Sheet CLI Flags

## Source
Claude Code v2.1.259

## Summary
Claude Code v2.1.259 adds `--permission-prompts none`: when passed, any action that would normally display a permission prompt is automatically denied. Designed for unattended headless hosts where the active permission mode still decides approvals, but interactive prompts are never displayed. Complements `--dangerously-skip-permissions` (which auto-approves) by being the safe opposite (auto-denies).

## Assessment
The cheat sheet CLI flags table in `src/pages/practices.html` (~line 2028) has `--permission-mode`, `--allowedTools`, `--disallowedTools`, and `--dangerously-skip-permissions` but does NOT include `--permission-prompts none`. This is a new flag.

## Plan
1. Read `src/pages/practices.html` around line 2028–2031
2. Add a new row after `--permission-mode`:
   ```html
   <tr><td><code>--permission-prompts none</code></td><td>Headless/unattended mode: auto-deny any action that would show a permission prompt (never displays interactive prompts). The active permission mode still governs approvals — <code>none</code> only suppresses the prompt UI (v2.1.259).</td></tr>
   ```

## Acceptance Criteria
- New row appears in the CLI flags table between `--permission-mode` and `--allowedTools`
- HTML is valid, no broken tags
- Text accurately describes the flag behavior
