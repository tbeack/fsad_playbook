# CBP-472 — `/feedback` command, `SendFeedback` tool, and `feedbackDrafts` setting

## Summary
Claude Code v2.1.247 added the `SendFeedback` tool: when something goes wrong in a session, Claude can draft a feedback report for the user to review and send from `/feedback`. The behavior can be turned off with the `feedbackDrafts` setting.

## Assessment
No existing coverage of `/feedback`, `SendFeedback`, or `feedbackDrafts` anywhere in `src/`. This is a new user-facing slash command plus a new settings.json key — fits the established Cheat Sheet + Notable settings.json Keys pattern used for every prior new command/setting.

## Plan
1. In `src/pages/practices.html`, add a new Cheat Sheet row to the Info & account table, immediately before the `/login` row (~line 1973-1978):
   ```html
   <tr><td><code>/feedback</code></td><td>Review and send a feedback report Claude drafted when something went wrong in the session, via the <code>SendFeedback</code> tool. Turn off with the <code>feedbackDrafts</code> setting (v2.1.247).</td></tr>
   ```
2. In the "Notable settings.json Keys" callout (~line 650), append a new bullet:
   ```html
   <li style="margin-bottom:0;"><code>feedbackDrafts</code> — Set <code>false</code> to stop Claude from drafting a feedback report when something goes wrong in a session. When enabled (default), review and send the draft from <code>/feedback</code> (v2.1.247).</li>
   ```
   (adjust the prior last bullet's `margin-bottom:0` back to `margin-bottom:0.4rem` since it's no longer last).

## Acceptance Criteria
- [x] `/feedback` row present in the Cheat Sheet Info & account table.
- [x] `feedbackDrafts` bullet present in Notable settings.json Keys.
