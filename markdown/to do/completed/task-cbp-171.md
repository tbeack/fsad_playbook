# CBP-171: [Codex] Update Codex `@mention` row — unified picker (v0.131.0)

## Source
Codex CLI v0.131.0

## Summary
Codex v0.131.0 unified `@` mentions into a single picker that searches files, directories, plugins, and skills — backed by app-server plugin metadata.

## Assessment
The Codex Cheat Sheet has an `@mention` row or section around line 6510 (Claude section). Need to find the equivalent Codex Cheat Sheet slash-command table for @mention and update it, or add a note to the Codex Getting Started section.

Let me check where @mention appears in the Codex section of the playbook.

## Plan
1. Find the Codex section's @mention reference (grep for `@mention` near `codex-cheat-sheet`).
2. If a row exists, update it. If not, add it to the Codex slash commands table.

The Codex Cheat Sheet slash commands table appears around line 9080–9100. Add or update the `@` mention row:

```html
<tr><td><code>@</code> mention</td><td>Unified context picker for files, directories, plugins, and skills in one search — backed by app-server plugin metadata. Added in v0.131.0.</td></tr>
```

## Acceptance Criteria
- Codex Cheat Sheet documents the unified `@` mention picker for files, dirs, plugins, and skills
