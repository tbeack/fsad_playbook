# CBP-298 — Add `/output-style [name]` to Cheat Sheet (v2.1.269)

## Summary

Claude Code v2.1.269 added `/output-style [name]` as a terminal slash command to list and switch output styles, including over Remote Control and in cloud and headless sessions. Output styles (built-in: "Concise"; custom via JSON files) have been available for several versions but no slash command existed for them until now. The playbook does not mention output styles anywhere.

## Assessment

Output styles are absent from the playbook. The `/output-style` slash command is a new user-facing CLI surface that fits the "Configuration & setup" table in the Cheat Sheet.

Insertion point: after the `/theme` row (line 9931), before `/color`.

## Plan

1. Read the Configuration & setup table in `fsad-playbook.html` around line 9931.
2. Insert a new `<tr>` row for `/output-style [name]` after the `/theme` row.

## New row content

```html
<tr><td><code>/output-style</code> <code>[name]</code></td><td>List available output styles or switch to a named one (e.g. <code>Concise</code>). Works in interactive, Remote Control, cloud, and headless sessions. Create custom styles as JSON files in <code>~/.claude/output-styles/</code> (v2.1.269).</td></tr>
```

## Acceptance Criteria

- A `/output-style [name]` row appears in the Configuration & setup table.
- The row describes listing, switching, and custom style creation.
- No other rows are changed.
