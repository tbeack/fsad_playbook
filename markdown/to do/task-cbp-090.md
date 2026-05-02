# CBP-090 — Add `claude project purge` to Cheat Sheet CLI subcommands

## Summary
Claude Code v2.1.126 added `claude project purge [path]` to delete all Claude Code state for a project — transcripts, tasks, file history, and config entry. Supports `--dry-run`, `-y/--yes`, `-i/--interactive`, and `--all`.

## Assessment
The playbook has a Cheat Sheet section with CLI flags (line ~6290) but no dedicated CLI subcommands table. The existing subcommands visible in the Cheat Sheet appear inline in the session/navigation commands table. Looking at the Cheat Sheet structure, the closest existing row is `/usage` (session commands) and `claude plugin prune` (referenced in the plugin row). `claude project purge` is a top-level CLI subcommand like `claude ultrareview` which is documented in the slash commands table.

The `claude ultrareview` row exists at line 6263 in the slash commands table (under Configuration). The project purge command should go in the "Utilities" or session-level part of the Cheat Sheet.

Checking the Cheat Sheet: the slash commands table has a section for "Automation" and "Session, context, history". `claude project purge` is a CLI command (not a slash command), so it belongs in the CLI Flags area or a dedicated subcommands note. Best placement: add a small note to the existing `--dangerously-skip-permissions` / permissions area, or better — add it to the "Session, context, history" slash commands table as a separate CLI note row, similar to how `claude ultrareview` is listed in the slash commands table as a CLI equivalent.

Actually, the correct pattern is: add a `claude project purge` row to the slash commands table, in a new group or appended to the existing utility group, noting it is a CLI subcommand.

## Plan
1. Find the slash commands table section for "Session, context, history" — it currently ends around line 6280 or so.
2. Add a new row for `claude project purge [path]` after the session commands, in the same table structure.
3. Place it alongside other CLI subcommands (near the `claude ultrareview` row if there is one, otherwise near end of the commands table under a "CLI subcommands" label).

### HTML pattern to follow
```html
<tr><td><code>claude project purge [path]</code></td><td>Delete all Claude Code state for a project (transcripts, tasks, file history, config entry). Flags: <code>--dry-run</code>, <code>-y</code>, <code>-i/--interactive</code>, <code>--all</code>.</td></tr>
```

Find the `claude ultrareview` row at line 6263 and add the new row nearby — either right after it or in the same group.

## Acceptance Criteria
- `claude project purge` appears in the Cheat Sheet slash/subcommands table
- Flags (`--dry-run`, `-y`, `-i/--interactive`, `--all`) are mentioned in the description
- No existing rows are broken or duplicated
