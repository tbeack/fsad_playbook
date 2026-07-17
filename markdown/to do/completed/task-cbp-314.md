# CBP-314 — Add `claude auto-mode reset` CLI subcommand to Info & account cheat sheet table (v2.1.212)

## Summary
Claude Code v2.1.212 added `claude auto-mode reset`, a CLI subcommand that restores the default auto-mode configuration. It prompts for confirmation by default; pass `--yes` to skip. This is not currently in the cheat sheet.

## Source
Claude Code v2.1.212 changelog entry:
> Added `claude auto-mode reset` to restore the default auto-mode configuration, with a confirmation prompt (pass `--yes` to skip)

## Assessment
- The Info & account table (lines 9979–9991 of fsad-playbook.html) contains other `claude <subcommand>` entries (`claude agents`, `claude project purge`).
- `claude auto-mode reset` is a CLI subcommand, not a slash command, so the Info & account table is the correct location.
- New addition.

## Plan
1. Read fsad-playbook.html around lines 9986–9991 (Info & account table).
2. Insert a new row after `claude project purge` (line 9987), before `/insights`:

```html
<tr><td><code>claude auto-mode reset</code></td><td>Restore the default auto-mode configuration. Prompts for confirmation; pass <code>--yes</code> to skip (v2.1.212).</td></tr>
```

## Acceptance Criteria
- `claude auto-mode reset` row appears in the Info & account table
- Description mentions confirmation prompt and `--yes` flag
- HTML renders correctly in browser
