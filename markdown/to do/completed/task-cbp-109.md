# CBP-109 — Update Ctrl+R keyboard shortcut description (v2.1.129)

## Summary
In v2.1.129, the `Ctrl+R` history picker behavior changed back to searching all prompts across **all projects** by default (restoring pre-2.1.124 behavior). A new `Ctrl+S` binding was added to narrow the search to the current project or session. The playbook currently describes `Ctrl+R` only as "Search command history" with no context about scope or the Ctrl+S narrowing option.

## Assessment
- **File:** `fsad-playbook.html`
- **Current content (line 6144):**
  ```html
  <tr><td><kbd>Ctrl+R</kbd></td><td>Search command history</td></tr>
  ```
- The description is outdated — it doesn't reflect the cross-project default scope, nor the Ctrl+S option.
- No `Ctrl+S` shortcut currently exists in the keyboard shortcuts table.

## Plan
1. Update line 6144: change the `Ctrl+R` description to explain it searches all prompts across all projects by default.
2. Add a new `<tr>` for `Ctrl+S` immediately after line 6144 with the description that it narrows to the current project or session.

### Before (line 6144):
```html
          <tr><td><kbd>Ctrl+R</kbd></td><td>Search command history</td></tr>
```

### After:
```html
          <tr><td><kbd>Ctrl+R</kbd></td><td>Search prompt history across all projects (default). Press <kbd>Ctrl+S</kbd> to narrow to the current project or session.</td></tr>
          <tr><td><kbd>Ctrl+S</kbd></td><td>Narrow <kbd>Ctrl+R</kbd> history picker to the current project or session only</td></tr>
```

## Acceptance Criteria
- `Ctrl+R` row describes cross-project search as the default.
- New `Ctrl+S` row appears immediately after `Ctrl+R` in the keyboard shortcuts table.
- No other content changes.
