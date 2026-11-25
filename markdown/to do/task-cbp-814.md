# CBP-814: Add `PreSkillShellCommand` hook event (v2.1.332)

## Summary
Claude Code v2.1.332 added a `PreSkillShellCommand` hook event that can refuse a skill or command's inline shell commands as it loads. On v2.1.331 and older, a settings file naming this hook opens a compatibility dialog at start.

## Assessment
`src/pages/practices.html`'s Hooks reference (~line 2061) has a "Tool & permission hooks" table (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`) and the section header states "(30 Events)". This is the natural home for a hook that fires on skill load, alongside the permission-style hooks.

## Plan
1. Open `src/pages/practices.html`.
2. Add a new row to the "Tool & permission hooks" table, after `PermissionDenied`:
   ```
   <tr><td><code>PreSkillShellCommand</code></td><td>Before a skill or command's inline shell commands run as it loads — can refuse them. A settings file naming this hook on v2.1.331 and older opens a compatibility dialog at start (v2.1.332).</td></tr>
   ```
3. Update the section header from "Hooks — Event Automation (30 Events)" to "Hooks — Event Automation (31 Events)".

## Acceptance Criteria
- The Tool & permission hooks table documents `PreSkillShellCommand`.
- The event count in the header reads 31.
- HTML is valid (no unclosed tags).

## Status
Implemented.
