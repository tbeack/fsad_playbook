# CBP-502 — [Codex] Document rate-limit banner actions

## Source
Codex CLI rust-v0.152.0 release notes: "Rate-limit banners offer actions for checking usage, managing credits, resetting limits, and managing plans." (New Features, #41742)

## Summary
When Codex shows a rate-limit banner (hitting a usage or rate limit), it now offers direct actions to check usage, manage credits, reset limits, or manage the plan — rather than just a bare notice. This is closely related to the existing `/usage` slash command, which already documents redeeming usage-limit reset credits. Extend that row to mention the banner's action shortcuts so users know the same actions surface reactively, not just via `/usage`.

## Assessment
`src/pages/codex.html`, `#codex-cheat-sheet` → Slash Commands table, line ~1042:
```html
<tr><td><code>/usage</code></td><td>View daily, weekly, and cumulative account token activity. Redeem earned usage-limit reset credits directly from this view. (v0.140.0)</td></tr>
```
No mention of the rate-limit banner or its inline actions. Gap confirmed — `update-existing`.

## Plan
1. Open `src/pages/codex.html`.
2. Update the `/usage` row (line ~1042) to:
   ```html
   <tr><td><code>/usage</code></td><td>View daily, weekly, and cumulative account token activity. Redeem earned usage-limit reset credits directly from this view. (v0.140.0) As of rust-v0.152.0, rate-limit banners shown when you hit a limit also offer inline actions to check usage, manage credits, reset limits, or manage your plan.</td></tr>
   ```
3. Run `python3 scripts/build-source.py` after all this run's edits land.

## Acceptance Criteria
- [ ] `/usage` Cheat Sheet row documents the rate-limit banner's inline actions, tagged `rust-v0.152.0`.
- [ ] Existing `/usage` row content (v0.140.0 reset-credit redemption) preserved verbatim.
- [ ] `build-source.py` runs cleanly after all edits for this run land.
