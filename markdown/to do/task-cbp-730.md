# CBP-730: Add `permissions.blockWritesOutsideWorkingDirectories` to settings reference (v2.1.314)

## Summary
Claude Code v2.1.314 added a new permission setting: `permissions.blockWritesOutsideWorkingDirectories`. When set to `true`, the Write, Edit, and NotebookEdit tools refuse paths outside the working directories in every permission mode.

## Assessment
The playbook already documents the companion setting `permissions.blockReadsOutsideWorkingDirectories` at line 627 of `src/pages/practices.html`. The Writes setting is not present anywhere in the playbook. It needs a new bullet point inserted immediately after the Reads bullet.

## Plan
1. Open `src/pages/practices.html`.
2. Find the `blockReadsOutsideWorkingDirectories` bullet at line 627.
3. Insert a new `<li>` immediately after it (before line 628) with this content:
   ```html
   <li style="margin-bottom:0.4rem;"><code>permissions.blockWritesOutsideWorkingDirectories</code> — Set to <code>true</code> to make Write, Edit, and NotebookEdit refuse paths outside the working directories in every permission mode (v2.1.314).</li>
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- Searching `blockWritesOutsideWorkingDirectories` in the built playbook returns the new bullet.
- The new bullet appears directly below the `blockReadsOutsideWorkingDirectories` bullet.
- HTML is valid (no unclosed tags).
