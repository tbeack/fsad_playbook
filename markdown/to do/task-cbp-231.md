# CBP-231 — Add `claude plugin list [--enabled | --disabled]` to Plugins section

## Summary
Claude Code v2.1.163 added a `/plugin list` command (via the CLI as `claude plugin list`) with `--enabled` and `--disabled` filter flags to show only enabled or disabled plugins. This is a new capability not yet documented.

## Assessment
- **`/plugin` Cheat Sheet row** (line 9713): Currently describes the interactive `/plugin` browser with marketplace preview. Does not mention `claude plugin list` or the `--enabled`/`--disabled` filters.
- **Plugins collapsible** (around line 10340): Has `claude plugin init` bullet but no bullet for `claude plugin list`.
- **Action needed:** Update Cheat Sheet row to mention `claude plugin list [--enabled | --disabled]` and add a bullet to the Plugins collapsible CLI commands list.

## Plan

### Step 1 — Update `/plugin` Cheat Sheet row
Append to end of description: `. Use <code>claude plugin list</code> (with optional <code>--enabled</code> or <code>--disabled</code> filter) to list installed plugins from the CLI.`

### Step 2 — Add bullet to Plugins collapsible
After the `claude plugin init` bullet, add:
`<li><strong><code>claude plugin list [--enabled | --disabled]</code></strong> — list all installed plugins from the CLI. Pass <code>--enabled</code> to show only active plugins, or <code>--disabled</code> to show only inactive ones (v2.1.163).</li>`

## Acceptance Criteria
- `/plugin` Cheat Sheet row mentions `claude plugin list --enabled`/`--disabled`
- Plugins collapsible has a CLI command bullet for `claude plugin list`
- No HTML broken
