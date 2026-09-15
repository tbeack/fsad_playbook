# CBP-299 — Add `/skill-doctor` to Cheat Sheet (v2.1.261)

## Summary

Claude Code v2.1.261 added `/skill-doctor`, a new slash command that shows which loaded skills go unused in the current session and what they cost in context tokens — letting practitioners prune expensive skills.

## Assessment

`/skill-doctor` is absent from the playbook. It fits the "Configuration & setup" table in the Cheat Sheet, near `/skills` (line 9941) and `/doctor` (line 9936).

Insertion point: after the `/skills` row (line 9941), before `/plugin`.

## Plan

1. Read the Configuration & setup table in `fsad-playbook.html` around line 9941.
2. Insert a new `<tr>` row for `/skill-doctor` after the `/skills` row.

## New row content

```html
<tr><td><code>/skill-doctor</code></td><td>Show which loaded skills go unused and what they cost in context tokens — use to identify and prune expensive skills from the context window (v2.1.261).</td></tr>
```

## Acceptance Criteria

- A `/skill-doctor` row appears in the Configuration & setup table, after `/skills`.
- No other rows are changed.
