# CBP-725: [Codex] Add `/presets` to Cheat Sheet slash commands table (rust-v0.164.0)

## Summary

Codex rust-v0.164.0 added a `/presets` command for saving reusable prompts and slash commands in ten numbered slots, with a keyboard shortcut menu for quick access. This was not documented in the playbook.

## Assessment

The Codex Cheat Sheet slash commands table at `src/pages/codex.html` line 1015 has a `/config` row added for rust-v0.163.0. The new `/presets` row belongs after `/config` (before `/keymap`) to group recent TUI configuration commands together. No existing row covers this feature.

## Plan

1. Read `src/pages/codex.html` around line 1015.
2. Insert a new `<tr>` row after the `/config` row and before the `/keymap` row.

**Insert after line 1015** (the `/config` row):

```html
<tr><td><code>/presets</code></td><td>Save reusable prompts and slash commands in ten numbered slots, with a keyboard shortcut menu for quick access. (rust-v0.164.0)</td></tr>
```

## Acceptance Criteria

- `/presets` row appears in the slash commands table in the Codex Cheat Sheet section.
- Row appears between `/config` and `/keymap`.
- Text matches the GitHub release note wording.
