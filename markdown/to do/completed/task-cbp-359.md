# CBP-359 — [Codex] Update `/import` row: Cursor-managed skills + sync without duplicates

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Import Cursor-managed skills and synchronize changes to imported Claude and Cursor conversations without creating duplicates."

## Assessment
`fsad-playbook.html` line 13815, Codex Cheat Sheet, `/import` row:
```html
<tr><td><code>/import</code></td><td>Migrate settings, MCP servers, plugins, sessions, commands, and project-scoped memories from <strong>Cursor</strong> or <strong>Claude Code</strong>. Selectively import any combination for full cross-tool migration. (v0.140.0, expanded v0.145.0)</td></tr>
```
Doesn't mention skills specifically or the new duplicate-avoiding sync behavior.

## Plan

### Step 1 — Update the row at line 13815
```html
<tr><td><code>/import</code></td><td>Migrate settings, MCP servers, plugins, sessions, commands, and project-scoped memories from <strong>Cursor</strong> or <strong>Claude Code</strong>. Selectively import any combination for full cross-tool migration. (v0.140.0, expanded v0.145.0) As of rust-v0.147.0, also imports Cursor-managed skills, and re-running the import synchronizes changes to previously-imported Claude/Cursor conversations without creating duplicates.</td></tr>
```

## Acceptance Criteria
- `/import` row documents Cursor-managed skills import
- Row documents duplicate-free re-sync of imported conversations (rust-v0.147.0)
- HTML is valid
