# CBP-275 — Add `sandbox.credentials` to the sandbox settings table

## Summary
Claude Code v2.1.187 added a new `sandbox.credentials` setting that blocks sandboxed commands from reading credential files and secret environment variables. This is a security-hardening setting for teams running Claude Code in unattended or shared environments.

## Assessment
The sandbox settings table lives in the Subprocess Sandboxing section of the Claude Best Practices page (`page-practices`), around line 10686–10696 of `fsad-playbook.html`. The table already contains entries for `sandbox.enabled`, `sandbox.filesystem.*`, `sandbox.network.*`, `sandbox.failIfUnavailable`, `sandbox.bwrapPath`, `sandbox.socatPath`, `sandbox.allowUnsandboxedCommands`, and `sandbox.allowAppleEvents`.

`sandbox.credentials` is not present. A new `<tr>` row must be added to this table.

## Plan
1. Read `fsad-playbook.html` around line 10693–10696 to see the exact surrounding table rows and confirm insertion point.
2. Add a new row after `sandbox.allowAppleEvents` (last row in the table, ~line 10696):
   ```html
   <tr><td><code>sandbox.credentials</code></td><td>Set to <code>false</code> to block sandboxed commands from reading credential files (e.g. <code>~/.aws/credentials</code>, <code>~/.ssh/id_rsa</code>) and secret environment variables. Use in high-security or shared CI environments where subprocess access to credentials must be prevented (v2.1.187).</td></tr>
   ```
3. Mark this task complete in `todo.md`.

## Acceptance Criteria
- The sandbox settings table contains a `sandbox.credentials` row with an accurate description.
- The row is inserted in the correct table (Subprocess Sandboxing section).
- No surrounding HTML is broken.
- A search for "sandbox.credentials" in the playbook returns the new row.
