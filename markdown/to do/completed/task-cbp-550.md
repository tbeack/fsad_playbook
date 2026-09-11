# CBP-550: Add `/output-style` row to Claude Cheat Sheet — Configuration & setup table

## Source
Claude Code v2.1.269 changelog: "Added `/output-style [name]` — list and switch output styles, including over Remote Control and in cloud/other headless sessions."

## Summary
Claude Code v2.1.269 adds a dedicated `/output-style` slash command that lists and switches output styles. Today the playbook only documents output-style selection as a side effect of the `/config` row (the "Concise" style note, v2.1.237) — there is no direct command reference.

## Assessment
Content does not exist yet as a standalone row. `src/pages/practices.html`'s Cheat Sheet → Slash Commands → "Configuration & setup" table (around line 1928, the `/config` row) is the closest existing coverage, but it documents style selection through `/config`, not the new dedicated command.

## Plan
1. Open `src/pages/practices.html`, locate the "Configuration & setup" slash-command table (the `<tbody>` containing the `/config` row, immediately followed by `/init`).
2. Insert a new row directly after the `/config` row:
   ```html
   <tr><td><code>/output-style</code> <code>[name]</code></td><td>List and switch output styles directly (no args opens the picker). Works over Remote Control and in cloud/other headless sessions (v2.1.269).</td></tr>
   ```
3. Leave the existing `/config` row's "Concise" output-style mention as-is (it documents the setting, not the command).

## Acceptance Criteria
- [ ] A new `/output-style` row exists in the Configuration & setup Cheat Sheet table.
- [ ] The row cites v2.1.269.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
