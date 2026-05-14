# CBP-145 — Update `claude agents` Cheat Sheet row to mention `--cwd <path>`

## Summary
Claude Code v2.1.141 added `claude agents --cwd <path>` to scope the agent session list to a specific directory. When working in a monorepo or multi-project setup, this lets you filter the agents view to only sessions rooted at a given path.

## Assessment
The playbook's Cheat Sheet has a `claude agents` row at approximately line 6311:
```
<tr><td><code>claude agents</code></td><td>Agent View (Research Preview) — a single unified list of every Claude Code session: running, blocked on you, or done. Run <code>claude agents</code> to get started.</td></tr>
```
This row needs the `--cwd` flag added to the command cell and description.

## Plan
1. Read line 6311 to confirm exact text
2. Update the row's `<td>` for the command to `<code>claude agents</code> <code>[--cwd &lt;path&gt;]</code>`
3. Update the description to mention `--cwd <path>` scopes the list to a directory

## Acceptance Criteria
- The `claude agents` Cheat Sheet row shows `--cwd <path>` as an optional flag
- The description briefly explains that `--cwd` filters the session list by directory
