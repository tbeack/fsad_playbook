# CBP-095 — Update `/skills` Cheat Sheet row for type-to-filter search (v2.1.121)

## Summary
Claude Code v2.1.121 added a type-to-filter search box to `/skills` so you can find a skill in long lists without scrolling. The current Cheat Sheet row only says "List available skills."

## Assessment
Line 6230 currently reads:
```html
<tr><td><code>/skills</code></td><td>List available skills</td></tr>
```

This is correct but incomplete — it should mention the search/filter capability added in v2.1.121.

## Plan
1. Read line 6230 to confirm exact current text.
2. Update the description to mention the type-to-filter search.

### Updated row
```html
<tr><td><code>/skills</code></td><td>List available skills; type to filter by name in long lists</td></tr>
```

## Acceptance Criteria
- `/skills` Cheat Sheet row mentions the type-to-filter capability
- No other rows are changed
