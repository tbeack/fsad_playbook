# CBP-490 — Add `PreModelSwitch`/`PostModelSwitch` hook events; fix hook-event counts

## Summary
Claude Code v2.1.251 added `PreModelSwitch` and `PostModelSwitch` hook events (block, confirm, or annotate a model switch). Separately, `SessionStart` resume hooks now also receive session staleness and the estimated re-cache cost as hook input.

## Assessment
`src/pages/practices.html` documents hook events in two places that must stay in sync:
1. The Cheat Sheet's "Hooks — Event Automation (28 Events)" reference (`#cheat-sheet`, ~line 2096), split into four category tables: Core hooks (~2098-2111), Tool & permission hooks (~2113-2125), Agent & task hooks (~2127-2139), Environment & context hooks (~2141-2159).
2. The Hooks Deep-Dive page's lifecycle diagram and callout (`#hooks-deep-dive--lifecycle`, ~line 2888-2924), which already states a stale count of "26 Hook Events" (~line 2920-2921) — inconsistent with the Cheat Sheet's 28, predating this task. Since this task touches both counts anyway, correct both to the same accurate number in the same edit.

Neither location currently mentions `PreModelSwitch`/`PostModelSwitch`, and the `SessionStart` row (Core hooks table, ~line 2102) does not mention the new staleness/re-cache-cost fields.

## Plan
1. In `src/pages/practices.html`, Environment & context hooks table (~line 2141-2159), add two new rows for the model-switch events (fits alongside `ConfigChange`/`CwdChanged` as session-environment-affecting hooks):
   ```html
   <tr><td><code>PreModelSwitch</code></td><td>Before a model switch — block, confirm, or annotate the switch (v2.1.251)</td></tr>
   <tr><td><code>PostModelSwitch</code></td><td>After a model switch completes (v2.1.251)</td></tr>
   ```
2. Update the Cheat Sheet section heading (~line 2096) from `Hooks — Event Automation (28 Events)` to `Hooks — Event Automation (30 Events)`.
3. Update the `SessionStart` row in the Core hooks table (~line 2102) to append: `As of v2.1.251, resume hooks also receive the session's staleness and the estimated re-cache cost.`
4. In the Hooks Deep-Dive lifecycle collapsible (~line 2911-2921):
   - Add `PreModelSwitch / PostModelSwitch` to the "Async events" block in the ASCII lifecycle diagram (~line 2911-2915), alongside `FileChanged, CwdChanged, ConfigChange`.
   - Update the callout title and body from "26 Hook Events" / "all 26 hook events" to "30 Hook Events" / "all 30 hook events" (~line 2920-2921) — this corrects the pre-existing stale count to match the Cheat Sheet.

## Acceptance Criteria
- [ ] `PreModelSwitch` and `PostModelSwitch` rows added to the Environment & context hooks table.
- [ ] Cheat Sheet heading reads "30 Events".
- [ ] `SessionStart` row mentions resume-hook staleness/re-cache-cost fields (v2.1.251).
- [ ] Hooks Deep-Dive lifecycle diagram lists the new events; callout reads "30 Hook Events" (fixing the prior 26/28 mismatch).
