# CBP-772: Scheduled tasks and `/loop` now ask before running a skill with `allowed-tools` or hooks (v2.1.325)

## Summary
Claude Code v2.1.325 changed scheduled tasks and `/loop` to ask before running a skill that declares `allowed-tools` or hooks. Add `Skill(name)` to `permissions.allow` to let that skill run unattended.

## Assessment
`src/pages/practices.html` has a `/loop — Built-in Scheduler` collapsible (~line 2367-2405, last touched by CBP-756) and a `/schedule` row in the slash-commands table (~line 1844, already carrying a v2.1.317 note in the same style). Both are direct fits: the `/loop` collapsible for a new callout, and the `/schedule` row for an appended sentence.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/loop` collapsible, after the "Self-Paced Loops End When Idle" callout (~line 2400-2403, currently the last child with `style="margin-bottom:0;"`), insert a new callout:
   ```html
   <div class="callout callout-tip" style="margin-bottom:0;">
     <div class="callout-title">Unattended Skills Need Explicit Permission</div>
     <p>As of v2.1.325, scheduled tasks and <code>/loop</code> ask before running a skill that declares <code>allowed-tools</code> or hooks. Add <code>Skill(name)</code> to <code>permissions.allow</code> to let that skill run unattended.</p>
   </div>
   ```
   Remove `style="margin-bottom:0;"` from the "Self-Paced Loops End When Idle" callout above (since it's no longer the last child) and add it to this new final callout instead.
3. In the slash-commands table, append a sentence to the `/schedule` row (~line 1844):
   ```
    As of v2.1.325, it also asks before running a skill that declares <code>allowed-tools</code> or hooks; add <code>Skill(name)</code> to <code>permissions.allow</code> to run that skill unattended.
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- A new callout in the `/loop` collapsible documents the v2.1.325 unattended-skill-permission change.
- The `/schedule` row documents the same change.
- `margin-bottom:0` styling is on the last callout in the `/loop` collapsible, not a mid-list one.
- HTML is valid (no unclosed tags).
