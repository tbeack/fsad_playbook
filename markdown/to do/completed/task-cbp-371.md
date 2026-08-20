# CBP-371 — [Claude] Add `claude remote-control --continue` row to Cheat Sheet

## Source
Claude Code v2.1.229

## Summary
v2.1.229 documented `claude remote-control --continue` for resuming the most recent Remote Control session from the CLI.

## Assessment
`fsad-playbook.html`, `#cheat-sheet` section, "Cross-device & integrations" table (lines 11039–11054). The table already documents `/remote-control` (alias `/rc`) as the in-session slash command to enable remote control, but has no row for the bare `claude remote-control` CLI subcommand or its `--continue` flag. This is a genuine gap — the table's existing rows are all slash commands, so the new row should be added inline with a clear note that it's a CLI-level (not slash-command) entry, matching the style already used for bare `claude <subcommand>` entries elsewhere in the Info & Account table (e.g. `claude agents`, `claude project purge`).

## Plan

### Step 1 — Add a new row to the Cross-device & integrations table, immediately after the `/remote-control` row (line 11044)
Current:
```html
          <tr><td><code>/remote-control</code></td><td>Enable remote control from claude.ai (alias: <code>/rc</code>)</td></tr>
          <tr><td><code>/teleport</code></td><td>Pull web session into terminal (alias: <code>/tp</code>)</td></tr>
```
Replace with:
```html
          <tr><td><code>/remote-control</code></td><td>Enable remote control from claude.ai (alias: <code>/rc</code>)</td></tr>
          <tr><td><code>claude remote-control --continue</code></td><td>Resume the most recent Remote Control session from the CLI (v2.1.229)</td></tr>
          <tr><td><code>/teleport</code></td><td>Pull web session into terminal (alias: <code>/tp</code>)</td></tr>
```

## Acceptance Criteria
- New row present in the "Cross-device & integrations" table in `#cheat-sheet`, directly below `/remote-control`
- Row uses `<code>claude remote-control --continue</code>` (CLI form, not a slash command) to distinguish it from neighboring slash-command rows
- Version tag (v2.1.229) included in the description
- No changes to surrounding table structure
