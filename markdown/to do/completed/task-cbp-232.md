# CBP-232 — Update /plugin Cheat Sheet row: plugin list --enabled/--disabled filters (v2.1.163)

## Summary

Claude Code v2.1.163 added a `/plugin list` command (CLI: `claude plugin list`) that lists all installed plugins with optional `--enabled` or `--disabled` filters so you can quickly audit which plugins are active or inactive.

## Assessment

**Does this content exist in the playbook?**

- Line 9713: `/plugin` cheat sheet row currently reads: "Manage Claude Code plugins — the marketplace browse and discover panes show a full component preview (commands, agents, skills, hooks, MCP/LSP servers), projected per-turn and per-invocation token cost estimates, and when each plugin was last updated — all before you install. Use `claude plugin details <name>` for the same inventory from the CLI."

There is no mention of `claude plugin list` or the `--enabled`/`--disabled` filters. The CLI equivalent mentioned is only `claude plugin details`.

**What needs to change:** Append a mention of `claude plugin list [--enabled|--disabled]` to the existing `/plugin` row.

## Plan

### Step 1: Update `/plugin` row (line 9713)

Current:
```html
<tr><td><code>/plugin</code></td><td>Manage Claude Code plugins — the marketplace browse and discover panes show a full component preview (commands, agents, skills, hooks, MCP/LSP servers), projected per-turn and per-invocation token cost estimates, and when each plugin was last updated — all before you install. Use <code>claude plugin details &lt;name&gt;</code> for the same inventory from the CLI.</td></tr>
```

New — append `claude plugin list` after the existing CLI note:
```html
<tr><td><code>/plugin</code></td><td>Manage Claude Code plugins — the marketplace browse and discover panes show a full component preview (commands, agents, skills, hooks, MCP/LSP servers), projected per-turn and per-invocation token cost estimates, and when each plugin was last updated — all before you install. Use <code>claude plugin details &lt;name&gt;</code> for the same inventory from the CLI. Use <code>claude plugin list</code> (with optional <code>--enabled</code> or <code>--disabled</code> filter) to list installed plugins from the CLI.</td></tr>
```

## Acceptance Criteria

- The `/plugin` cheat sheet row mentions `claude plugin list` with `--enabled`/`--disabled` filters
- The existing marketplace and `claude plugin details` references are preserved
- No other rows are affected
