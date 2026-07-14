# CBP-304: Add `CLAUDE_CODE_PROCESS_WRAPPER` to hardening env vars table (v2.1.208)

## Summary

Claude Code v2.1.208 added `CLAUDE_CODE_PROCESS_WRAPPER`. When set to an executable path, the agent view and background service run every Claude Code self-spawn through that wrapper. This enables corporate launchers (e.g. security wrappers, audit proxies, environment injectors) to intercept and control spawned subprocesses.

## Assessment

Not documented in the playbook. Should be added to the "Hardening env vars (shared environments & CI/CD)" table in the Subprocess Sandboxing collapsible.

The last row in that table is currently `CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1` (around line 10733). The new row goes after it, before the closing `</tbody>`.

## Plan

### Step 1: Add row to hardening env vars table

After `CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1` row, add:

```html
<tr><td><code>CLAUDE_CODE_PROCESS_WRAPPER</code></td><td>Path to an executable that wraps every Claude Code self-spawn — agent view workers and background-service sessions run through this wrapper instead of invoking the binary directly. Use for corporate launchers, security wrappers, audit proxies, or environment injectors that must intercept all spawned subprocesses (v2.1.208).</td></tr>
```

## Acceptance Criteria

- [ ] `CLAUDE_CODE_PROCESS_WRAPPER` row appears in the hardening env vars table in the Subprocess Sandboxing collapsible
- [ ] Row is placed after `CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1`
- [ ] HTML renders correctly (no broken table structure)
