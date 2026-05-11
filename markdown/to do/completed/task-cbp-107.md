# CBP-107 — Add `--channels` CLI flag to Cheat Sheet (v2.1.128)

## Summary

Claude Code v2.1.128 added support for the `--channels` flag when using console (API key) authentication. Previously, channels only worked with OAuth login. Console orgs with managed settings must also set `channelsEnabled: true` in their org settings to allow it. This enables teams using the API key auth path to use the claude.ai/channels product.

## Assessment

The playbook's Cheat Sheet has a "Cross-device & integrations" CLI flags sub-table and a "Cross-device & integrations" slash commands table. Neither mentions `--channels`. The Remote Control & Cross-Device collapsible (line 6681) also doesn't reference it.

The `--channels` flag belongs in the CLI flags table under "Cross-device & integrations" (near `--remote`). A short note about `channelsEnabled: true` for managed-settings orgs should accompany it.

**Target location:** CLI flags table "Cross-device & integrations" — currently empty in the Cheat Sheet. The closest related flags are `--remote` (under "System prompt & config" at line 6346). `--channels` should be added to the "Cross-device & integrations" section of the CLI flags — or appended to the "System prompt & config" table alongside `--remote` if a separate cross-device flags table doesn't exist.

Looking at the HTML: The slash commands have a "Cross-device & integrations" sub-section (line 6239) but the CLI flags tables don't have one. `--channels` fits best in the "System prompt & config" flags table alongside `--remote` (line 6346).

## Plan

1. Read the CLI flags "System prompt & config" table area (lines 6336–6352)
2. Add `--channels` row after `--remote` row:
   ```html
   <tr><td><code>--channels</code></td><td>Enable channels with console (API key) authentication. Console orgs with managed settings must set <code>channelsEnabled: true</code> in org settings.</td></tr>
   ```
3. Mark task complete in todo.md

## Acceptance Criteria

- `--channels` appears in the CLI flags table, near `--remote`
- The description mentions console (API key) auth and `channelsEnabled: true` for managed-settings orgs
- No existing rows are broken
