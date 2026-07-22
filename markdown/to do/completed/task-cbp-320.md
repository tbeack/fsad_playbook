# CBP-320 — Add `sandbox.filesystem.disabled` to sandbox settings table

## Summary
Claude Code v2.1.216 added a new `sandbox.filesystem.disabled` setting that lets users skip filesystem isolation while keeping network egress control. This is useful when you want to restrict what domains Bash subprocesses can reach (via `sandbox.network.allowedDomains`) without the overhead or restrictions of filesystem sandboxing.

## Assessment
The playbook has a comprehensive sandbox settings table in the Subprocess Sandboxing collapsible section (around line 10700). The table lists all `sandbox.*` keys. The new `sandbox.filesystem.disabled` key is missing from this table.

Current table entries (lines 10703–10714):
- `sandbox.enabled`
- `sandbox.filesystem.allowWrite`
- `sandbox.filesystem.denyRead`
- `sandbox.filesystem.allowRead`
- `sandbox.network.allowedDomains`
- `sandbox.network.deniedDomains`
- `sandbox.failIfUnavailable`
- `sandbox.bwrapPath`
- `sandbox.socatPath`
- `sandbox.allowUnsandboxedCommands`
- `sandbox.allowAppleEvents`
- `sandbox.credentials`

The new `sandbox.filesystem.disabled` row should be inserted after `sandbox.filesystem.allowRead` (line 10706) since it logically belongs with the other `sandbox.filesystem.*` settings.

## Plan
1. Read lines 10703–10716 to confirm the exact HTML context
2. Insert a new `<tr>` row after the `sandbox.filesystem.allowRead` row:
   ```html
   <tr><td><code>sandbox.filesystem.disabled</code></td><td>Set to <code>true</code> to skip filesystem isolation entirely while keeping network egress control active — useful when <code>allowedDomains</code> is your primary security boundary but filesystem sandboxing causes compatibility issues (v2.1.216).</td></tr>
   ```
3. Verify the table still closes correctly

## Acceptance Criteria
- `sandbox.filesystem.disabled` appears in the sandbox settings table after the other `sandbox.filesystem.*` rows
- The row includes the `(v2.1.216)` version tag
- No HTML structure is broken
