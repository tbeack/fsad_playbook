# CBP-271 — [Codex] Add /archive, /delete, /import, /usage to Codex cheat sheet

**Todoist ID:** 6gwXM63Mm6pgg5gp

## Source

Codex CLI releases v0.136.0–v0.140.0 (May 28 – June 15, 2026). Four new user-facing slash commands were shipped that are not yet documented in the playbook cheat sheet.

## Summary

Four new Codex slash commands were released across v0.133–v0.140 but are absent from the Codex Cheat Sheet. Add one `<tr>` row per command in the appropriate position within the slash commands table, matching the existing row format.

## Assessment

The Codex cheat sheet slash command table runs from line 12593 to 12618 in `fsad-playbook.html`. The four missing commands and their release versions:

- **`/usage`** (v0.140.0) — daily, weekly, and cumulative account token activity views; v0.142.0 added rate-limit reset credit redemption directly from this command
- **`/archive`** (v0.136.0) — archives the current session from TUI; `codex archive` / `codex unarchive` available from CLI; archived sessions are protected from resume/fork until restored
- **`/delete`** (v0.140.0) — permanently deletes the current session; also available as `codex delete`; includes confirmation safeguard and subagent cleanup
- **`/import`** (v0.140.0) — selectively imports setup, project configuration, and recent chats from Claude Code

None of these appear anywhere in `page-codex`.

**Location:** `fsad-playbook.html`
- Slash command table: lines 12593–12618
- `/new` row (session start, natural neighbor for `/archive`/`/delete`): line 12598
- `/init` row (setup/scaffolding, natural neighbor for `/import`): line 12609
- `/status` row (informational, natural neighbor for `/usage`): line 12616

## Plan

1. Read lines 12593–12620 of `fsad-playbook.html` to confirm current content and exact surrounding context.
2. Insert `/archive` and `/delete` after the `/new` row (line 12598) — both are session lifecycle commands:
   ```html
   <tr><td><code>/archive</code></td><td>Archive the current session — protected from resume or fork until restored. CLI: <code>codex archive</code> / <code>codex unarchive</code>. (v0.136.0)</td></tr>
   <tr><td><code>/delete</code></td><td>Permanently delete the current session with confirmation. Cleans up subagent threads. Also available as <code>codex delete</code>. (v0.140.0)</td></tr>
   ```
3. Insert `/import` after the `/init` row (line 12609) — both are setup/onboarding commands:
   ```html
   <tr><td><code>/import</code></td><td>Selectively import setup, project configuration, and recent chats from Claude Code. (v0.140.0)</td></tr>
   ```
4. Insert `/usage` after the `/status` row (line 12616) — both are informational/monitoring commands:
   ```html
   <tr><td><code>/usage</code></td><td>View daily, weekly, and cumulative account token activity. Redeem earned usage-limit reset credits directly from this view. (v0.140.0)</td></tr>
   ```
5. Verify no duplicate entries exist for any of these commands.

## Acceptance Criteria

All criteria verified 2026-06-22 before commit.

- [x] `/archive` row present in Codex cheat sheet slash commands table, positioned after `/new`
- [x] `/delete` row present immediately after `/archive`
- [x] `/import` row present after `/init`
- [x] `/usage` row present after `/status`
- [x] All four rows follow the existing `<tr><td><code>/command</code></td><td>Description</td></tr>` format
- [x] No existing rows were removed or reordered
- [x] HTML is valid (no unclosed tags)
