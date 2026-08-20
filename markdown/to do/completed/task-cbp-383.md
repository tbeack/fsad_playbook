# CBP-383 — Document the "Continue automatically at usage limit" `/config` toggle in the Cheat Sheet

## Source
Claude Code v2.1.234 — "Claude Code now continues your session automatically when a claude.ai usage limit resets; turn it off in `/config` ('Continue automatically at usage limit')."

## Summary
Add the new default-on auto-continue behavior and its opt-out to the `/config` Cheat Sheet row.

## Assessment
- `fsad-playbook.html` line ~11021, in the `#cheat-sheet` "Configuration & setup" slash-command
  table (table starts ~11017):
  `<tr><td><code>/config</code> <code>[key=value]</code></td><td>Open settings interface — or set any setting inline … (v2.1.183)</td></tr>`
- The `/usage` row (~10990) covers viewing token activity, not limit-reset resumption.
- Phase 3 confirmed no usage-limit content exists in `#power-usage`, `#monitoring`,
  `#cloud-integrations`, or `#hooks-deep-dive`. Content does not exist.
- The `/config` row is the right home because the feature ships as a named `/config` toggle.

## Plan
1. Read lines 11017-11024 to confirm the table structure and the `/config` row's exact text.
2. Append to the end of the `/config` row's description cell (before `</td>`), keeping the
   existing `(v2.1.183)` clause intact and placing the new sentence after it.
3. New copy should state: as of v2.1.234 Claude Code continues an interrupted session
   automatically when a claude.ai usage limit resets — useful for long unattended runs —
   and the toggle is "Continue automatically at usage limit" in `/config`, which can be
   turned off. Tag `(v2.1.234)`.
4. Quote the toggle label exactly as the changelog gives it.

## Acceptance Criteria
- [ ] The `/config` row remains a single `<tr>` with its two original `<td>` cells and its `<code>/config</code> <code>[key=value]</code>` command cell unchanged.
- [ ] The existing description (settings interface, inline `key=value`, `--help`, persistence to `~/.claude/settings.json`, config cascade, `-p`/Remote Control, `/settings` alias, `(v2.1.183)`) is fully preserved.
- [ ] The new text names the toggle exactly: "Continue automatically at usage limit".
- [ ] The behavior is described as **on by default** with the toggle being the opt-out — matching the changelog, not inverted.
- [ ] The addition carries a `(v2.1.234)` tag.
- [ ] No new row or table is created.
