# CBP-756: Update `/loop` — self-paced loop ends by default instead of rescheduling (v2.1.319)

## Summary
Claude Code v2.1.319 changed self-paced `/loop` (dynamic mode, no fixed interval) to end when a turn finishes without rescheduling, instead of always scheduling a fallback wakeup. Set `CLAUDE_CODE_LOOP_KEEPALIVE=1` to keep the old behavior (always reschedule).

## Assessment
`src/pages/practices.html` has a `/loop — Built-in Scheduler` collapsible (~line 2362-2397) with a callout-tip already describing self-paced dynamic mode's availability (`power-usage--loop`, "Available Everywhere" callout at ~line 2392-2395). A new callout documenting this behavior change fits alongside it.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/loop` collapsible, after the "Available Everywhere" callout-tip (~line 2395, closing `</div>` before the collapsible's closing tags), insert a new callout:
   ```html
   <div class="callout callout-tip" style="margin-bottom:0;">
     <div class="callout-title">Self-Paced Loops End When Idle</div>
     <p>As of v2.1.319, a self-paced (dynamic, no fixed interval) <code>/loop</code> ends when a turn finishes without rescheduling itself, instead of always scheduling a fallback wakeup. Set <code>CLAUDE_CODE_LOOP_KEEPALIVE=1</code> to keep the previous behavior of always rescheduling.</p>
   </div>
   ```
   Remove `style="margin-bottom:0;"` from the "Available Everywhere" callout above (since it's no longer the last child) and add it to this new final callout instead.
3. No other files require changes for this task.

## Acceptance Criteria
- A new callout in the `/loop` collapsible documents the v2.1.319 self-paced loop ending behavior and the `CLAUDE_CODE_LOOP_KEEPALIVE` opt-out.
- `margin-bottom:0` styling is on the last callout in the collapsible, not a mid-list one.
- HTML is valid (no unclosed tags).
