# CBP-153 — Add `worktree.bgIsolation` setting to Work Trees collapsible (v2.1.143)

## Summary
Claude Code v2.1.143 added a new `worktree.bgIsolation` setting. Setting it to `"none"` lets background sessions edit the working copy directly without requiring `EnterWorktree` — intended for repos where creating real git worktrees is impractical (monorepos, repos with heavy git hooks, etc.).

## Assessment
The Work Trees collapsible (line 6631, id `power-usage--work-trees`) already documents the `worktree.baseRef` setting in a two-row table. The new `worktree.bgIsolation` setting is not present anywhere in the playbook. It should be added as a new row in the existing `worktree.baseRef` table.

## Plan
1. Locate the `worktree.baseRef` table tbody at approximately line 6653–6656.
2. Add a new row after the `head` row for `worktree.bgIsolation`.

**Current table structure (lines 6650–6657):**
```html
<div class="table-wrap" style="margin-top:0.5rem;">
  <table class="styled-table">
    <thead><tr><th>Value</th><th>Branches from</th><th>When to use</th></tr></thead>
    <tbody>
      <tr><td><code>fresh</code> (default)</td><td><code>origin/&lt;default-branch&gt;</code></td><td>Clean base — agents always start from the canonical remote state, no local noise</td></tr>
      <tr><td><code>head</code></td><td>Local <code>HEAD</code></td><td>Share unpushed scaffolding — spawned agents inherit commits you haven't pushed yet</td></tr>
    </tbody>
  </table>
</div>
```

**After the closing `</div>` of that table, add a new paragraph + table for `worktree.bgIsolation`:**

```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem; margin-bottom:0.5rem;"><strong><code>worktree.bgIsolation</code> setting</strong> — controls how background sessions isolate file edits. Set in <code>.claude/settings.json</code>:</p>
<div class="table-wrap" style="margin-top:0.5rem;">
  <table class="styled-table">
    <thead><tr><th>Value</th><th>Behavior</th></tr></thead>
    <tbody>
      <tr><td><code>worktree</code> (default)</td><td>Background sessions get a dedicated git worktree — full isolation, no risk of clobbering the working copy</td></tr>
      <tr><td><code>none</code></td><td>Background sessions edit the working copy directly — no worktree created. Use for repos where worktrees are impractical (heavy git hooks, monorepos with worktree restrictions).</td></tr>
    </tbody>
  </table>
</div>
```

Insert this block between the closing `</div>` of the `worktree.baseRef` table wrap and the existing `callout-tip` div.

## Acceptance Criteria
- The Work Trees collapsible shows a `worktree.bgIsolation` table below the `worktree.baseRef` table.
- Two rows: `worktree` (default) and `none`.
- No existing content is removed or reordered.
