# CBP-334 — Add `workflowSizeGuideline` to Notable settings.json Keys callout

**Source:** Claude Code v2.1.219
**Date:** 2026-07-25

## Summary

Claude Code v2.1.219 added the `workflowSizeGuideline` settings key, which allows the advisory "Dynamic workflow size guideline" to be configured from any settings file. When set, the `/config` UI row for this setting is hidden.

## Assessment

**Does this content exist in the playbook? Where?**

The Notable settings.json Keys callout starts at line 8835 and extends to line 8867. `workflowSizeGuideline` does not appear anywhere in the playbook.

**What needs to change:**
Add a bullet for `workflowSizeGuideline` to the Notable settings.json Keys callout. The most logical place is near other workflow/execution settings. I'll append it before the closing `</ul>` (currently the last item is the permission rule startup warnings bullet at line 8865).

## Plan

### Step 1: Add bullet before closing `</ul>`
Change the last `margin-bottom:0;` bullet to `margin-bottom:0.4rem;` and add a new final bullet:
```html
<li style="margin-bottom:0;"><code>workflowSizeGuideline</code> — Set the advisory token-budget guideline for Dynamic workflow sessions (the "size guideline" shown to Claude when orchestrating large multi-agent runs). Configurable from any settings file (user, project, or managed). When set, the <code>/config</code> row for this setting is hidden from the config UI (v2.1.219).</li>
```

## Acceptance Criteria
- `workflowSizeGuideline` bullet appears in Notable settings.json Keys callout
- The previous last bullet has `margin-bottom:0.4rem;` so spacing is consistent
- New bullet uses `margin-bottom:0;` as it is now the last item
- HTML is valid
