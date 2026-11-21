# CBP-799: Update `/schedule` row + add Loop callout — scheduled tasks/`/loop` now run up to 30 days (v2.1.330)

## Summary
Claude Code v2.1.330 changed recurring scheduled tasks and `/loop` to run up to 30 days instead of 7 while their session keeps running, and to say when they end; tasks made before this release still end at 7 days.

## Assessment
`src/pages/practices.html`'s `/schedule` cheat-sheet row (~line 1844) and the Loop collapsible's callout stack (~line 2384 onward, ending with "Unattended Skills Need Explicit Permission") didn't reflect the new 30-day lifetime.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the `/schedule` row's existing v2.1.329 sentence:
   ```
    As of v2.1.330, recurring scheduled tasks (and /loop) run for up to 30 days while their session keeps running instead of 7, and say when they end; tasks made before this release still end at 7 days.
   ```
3. In the Loop collapsible, add a new callout after "Unattended Skills Need Explicit Permission" (moving the `margin-bottom:0` styling to the new last callout):
   ```html
   <div class="callout callout-tip" style="margin-bottom:0;">
     <div class="callout-title">Runs Longer While the Session Stays Up</div>
     <p>As of v2.1.330, recurring scheduled tasks and /loop run for up to 30 days while their session keeps running, instead of 7, and say when they end. Tasks made before this release still end at 7 days.</p>
   </div>
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- The `/schedule` row and the Loop collapsible both document the 30-day lifetime change.
- HTML is valid (no unclosed tags).

## Status
Implemented.
