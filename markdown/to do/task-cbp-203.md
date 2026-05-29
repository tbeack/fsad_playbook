# CBP-203 — Add `/workflows` command to Cheat Sheet automation table (v2.1.154)

## Summary

v2.1.154 introduced dynamic workflows with a new `/workflows` slash command to view your dynamic workflow runs. The Dynamic Workflows Power Usage collapsible was added in CBP-199, but `/workflows` is not yet in the Cheat Sheet.

## Assessment

**File:** `fsad-playbook.html`  
**Section:** Cheat Sheet — Automation & agents table (lines ~9088–9102)  
**Current state:** No `/workflows` row exists in the automation table.

**Action:** Add a new row for `/workflows` to the automation table, after `/goal`.

## Plan

1. Read lines 9088–9102 of `fsad-playbook.html`.
2. After the `<tr>` for `/goal`, add a new `<tr>` for `/workflows`:
   ```html
   <tr><td><code>/workflows</code></td><td>View and manage dynamic workflow runs — Claude orchestrates tens to hundreds of parallel agents to tackle large-scale tasks. Available on Max, Team, and Enterprise plans.</td></tr>
   ```
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The Cheat Sheet automation table includes a `/workflows` row.
- The description accurately explains dynamic workflow management.
