# CBP-357 — [Codex] Add `--approve-for-me` CLI flag to Cheat Sheet

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0 added `--approve-for-me`, which enables automatically reviewed approvals.

## Assessment
`fsad-playbook.html`, Codex Cheat Sheet → CLI Flags table, lines 13833–13844. Currently documents `--approval-mode`/`-a` (rust-v0.144.0's `writes` mode) and `--sandbox`/`-s` as the approval/execution controls. No row for `--approve-for-me`.

## Plan

### Step 1 — Insert a new row after `--approval-mode` (line 13838)
```html
<tr><td><code>--approve-for-me</code></td><td>Enables automatically reviewed approvals — Codex reviews and approves its own actions against policy instead of prompting you for each one (rust-v0.147.0).</td></tr>
```

## Acceptance Criteria
- `--approve-for-me` row present in the CLI Flags table, next to `--approval-mode`
- HTML is valid
