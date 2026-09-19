# CBP-582 — Update `/status` Cheat Sheet Row: Add "Auto mode server" indicator

## Summary

Claude Code v2.1.278 added an "Auto mode server" row to the `/status` output. This row shows whether the current session's auto mode classifier runs on the server or locally. This is directly relevant to the auto mode classifier default change in the same release.

## Assessment

The `/status` cheat sheet row is in `src/pages/practices.html` at approximately line 1981. The current description ends with: "...and a line showing whether GitHub is connected for Claude Code on the web (Pro/Max) — pointing to `/web-setup` when it isn't."

This is a simple append to the existing row description.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `/status` row (around line 1981).
3. Append to the existing `<td>` description: "As of v2.1.278, also shows an `Auto mode server` row indicating whether the current session's auto mode classifier runs on the server or locally."

## Acceptance Criteria

- The `/status` cheat sheet row mentions the new "Auto mode server" indicator.
- Version tag `v2.1.278` is present.
- No other content is changed.
