# CBP-524 — Add `/skill-doctor` slash command to Cheat Sheet

## Summary
Claude Code v2.1.261 added `/skill-doctor`, a new slash command that shows which loaded skills go unused and what they cost in context, so you can prune them. This is a useful diagnostic tool for managing skill overhead.

## Assessment
Not mentioned anywhere in the playbook. The Cheat Sheet slash commands table includes `/doctor` (line 1934 of `src/pages/practices.html`) and `/skills` (line 1939). `/skill-doctor` belongs in the same diagnostic area, right after `/doctor`.

## Plan
1. Edit `src/pages/practices.html`
2. After the `/doctor` row (line 1934), insert a new `<tr>` for `/skill-doctor`
3. Run build scripts

## Insertion point (after line 1934)
```html
<tr><td><code>/skill-doctor</code></td><td>Show which loaded skills go unused and what they cost in context, so you can prune them (v2.1.261).</td></tr>
```

## Acceptance Criteria
- `/skill-doctor` appears in the Cheat Sheet slash commands table, after `/doctor`
- Description mentions context cost and pruning
- Version tag v2.1.261 present
