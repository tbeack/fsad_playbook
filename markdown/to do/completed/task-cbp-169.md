# CBP-169: Update `/doctor` Cheat Sheet row — exec-form hook example (v2.1.144)

## Summary
Claude Code v2.1.144 improved `/doctor`: it now shows an exec-form example when a command hook is missing the `command` field.

## Assessment
The `/doctor` row at line 6286 currently reads: "Environment diagnostics & health check" — very brief. Update it to mention the hook configuration hint.

## Plan
1. Read line 6286 context in `fsad-playbook.html`.
2. Extend the description to mention that `/doctor` shows an exec-form example when a command hook is missing the `command` field.

**Current text (line 6286):**
`Environment diagnostics & health check`

**New text:**
`Environment diagnostics &amp; health check. Shows an exec-form example hint when a command hook is missing the <code>command</code> field. Run for the full skill-listing breakdown (truncation no longer shown as a startup notification).`

## Acceptance Criteria
- `/doctor` row mentions the command-hook hint for missing `command` field
