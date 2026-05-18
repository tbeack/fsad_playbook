# CBP-155 — worktree.bgIsolation: "none" Setting

## Summary
Claude Code v2.1.143 added `worktree.bgIsolation: "none"` setting. This allows background sessions to edit the working copy directly without requiring `EnterWorktree`, for repos where worktrees are impractical (e.g. monorepos with non-relocatable build artifacts).

## Assessment
The Work Trees collapsible (lines 6630–6664) already documents `worktree.baseRef` with a two-row table (lines 6650–6658). The `worktree.bgIsolation` setting is not mentioned anywhere in the playbook.

This is **new content** — need to add a row to the worktree settings table, or a note following it.

## Plan
1. Locate the `worktree.baseRef` table at lines 6650–6658 (thead + 2 tbody rows: `fresh` and `head`).
2. Add `worktree.bgIsolation` as a new section after the existing table. Add a new descriptive paragraph + small table showing the setting:

   After the closing `</div>` of the baseRef table (line 6658), add:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem;"><strong><code>worktree.bgIsolation</code> setting</strong> — controls whether background sessions run in an isolated worktree or edit the working copy directly.</p>
   <div class="table-wrap" style="margin-top:0.5rem;">
     <table class="styled-table">
       <thead><tr><th>Value</th><th>Behavior</th><th>When to use</th></tr></thead>
       <tbody>
         <tr><td><code>worktree</code> (default)</td><td>Background sessions run in an isolated git worktree via <code>EnterWorktree</code></td><td>Most repos — prevents conflicts with your working copy</td></tr>
         <tr><td><code>none</code></td><td>Background sessions edit the working copy directly, no worktree created</td><td>Monorepos with non-relocatable build artifacts or tools that can't run from a worktree path</td></tr>
       </tbody>
     </table>
   </div>
   ```

## Acceptance Criteria
- Work Trees collapsible has a `worktree.bgIsolation` note with a table showing `worktree` (default) and `none` values
- Existing `worktree.baseRef` table and tip callout are unchanged
- No broken HTML
