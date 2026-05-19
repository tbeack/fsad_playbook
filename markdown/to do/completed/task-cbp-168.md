# CBP-168: Add `/usage-credits` to Cheat Sheet (renamed from `/extra-usage`) (v2.1.144)

## Summary
Claude Code v2.1.144 renamed the "extra usage" concept to "usage credits" across CLI copy. `/extra-usage` is now `/usage-credits` (old name still works as an alias).

## Assessment
The Cheat Sheet does not currently have a row for `/extra-usage` or `/usage-credits`. This is a new visible command worth documenting. It should go in the Model/Mode/Usage table near the `/usage` row (line 6251).

## Plan
1. Read the Model/Mode/Usage table (lines 6240–6254) in `fsad-playbook.html`.
2. Add a new row for `/usage-credits` after the `/usage` row.

**Row to add:**
```html
<tr><td><code>/usage-credits</code></td><td>View usage credits balance (alias: <code>/extra-usage</code>)</td></tr>
```

## Acceptance Criteria
- `/usage-credits` row appears in the Model/Mode/Usage table of the Cheat Sheet
- Alias `/extra-usage` is noted
