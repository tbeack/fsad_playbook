# CBP-684: Update `claude agents` row — `/effort` and `/fast` in agent view (v2.1.299)

## Summary
Claude Code v2.1.299 added `/effort` and `/fast` commands directly inside the agent view, so you can set the effort level or fast mode for new sessions you dispatch from there. A bare `/model`, `/effort`, or `/fast` (with no argument) now opens a picker.

## Assessment
The `claude agents` row at line 1886 in `src/pages/practices.html` ends at v2.1.288. It does not mention `/effort` and `/fast` being usable in the agent view. This is an update to an existing entry.

**Placement:** Append an "As of v2.1.299" clause to the end of the `claude agents` `<td>` cell at line 1886, before the closing `</td></tr>`.

## Plan

### Step 1: Update claude agents row
In `src/pages/practices.html` at line 1886, find the `claude agents` row. It currently ends with:

```
...and <kbd>Alt+↑</kbd>/<kbd>Alt+↓</kbd> to jump between groups; both shortcuts and the rename action can be rebound in <code>keybindings.json</code>.</td></tr>
```

Append before `</td></tr>`:

` As of v2.1.299, type <code>/effort</code> or <code>/fast</code> inside the agent view to set the effort level or fast mode for new sessions you start from there. A bare <code>/model</code>, <code>/effort</code>, or <code>/fast</code> with no argument opens a picker.`

## Acceptance Criteria
- The `claude agents` row mentions `/effort` and `/fast` in the agent view.
- The version tag `v2.1.299` is present.
- The surrounding row structure is intact.
