# CBP-685: Update `/usage` row — add v2.1.299 warnings clause (v2.1.299)

## Summary
Claude Code v2.1.299 added new warnings to `/usage`: it now shows warnings when you reach or approach limits for max effort, workflows, always-on context, and large tool results.

## Assessment
The `/usage` row in `src/pages/practices.html` at line 1799 has several "As of v2.1.xxx" clauses. The most recent is v2.1.260. Adding a v2.1.299 clause for the new warnings is an update to this existing entry.

**Placement:** Append an "As of v2.1.299" clause to the end of the `/usage` `<td>` cell at line 1799, before `</td></tr>`.

## Plan

### Step 1: Update /usage row
In `src/pages/practices.html` at line 1799, find the `/usage` row. It currently ends with:

```
...e.g. tool definitions or system prompt changed, or the session idled past the cache TTL.</td></tr>
```

Append before `</td></tr>`:

` As of v2.1.299, <code>/usage</code> also shows inline warnings when you approach or reach limits for max effort, workflows, always-on context, and large tool results.`

## Acceptance Criteria
- The `/usage` row mentions the new v2.1.299 warnings.
- The version tag is present.
- The surrounding row structure is intact.
