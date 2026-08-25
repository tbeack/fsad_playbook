# CBP-443 — `/model`, `/effort`, `/fast`: immediate execution + Ultracode picker fix

## Summary
Claude Code v2.1.243 made two related changes to model/effort switching: (1) `/model`, `/fast`, and `/effort` now run immediately instead of queueing until the turn ends on Bedrock, Vertex, Foundry, and when telemetry is disabled; and (2) fixed the `/model` picker silently ignoring an Ultracode selection — picking Ultracode now applies it to the current session.

## Assessment
The Cheat Sheet rows for `/model` (line 10997), `/effort` (line 10998), and `/fast` (line 10999) exist today; `/model` and `/effort` already carry versioned notes, `/fast` is currently a bare stub (`Toggle fast mode (same model, faster output)`) with no notes at all.

## Plan
1. In `fsad-playbook.html`, update the `/model` row (line 10997) — append to the end of its `<td>` (before `</td></tr>`):
   ```html
    As of v2.1.243, the picker no longer silently ignores an Ultracode selection — picking it now applies to the current session. On Bedrock, Vertex, Foundry, or with telemetry disabled, <code>/model</code> also now applies immediately instead of queueing until the turn ends.
   ```
2. Update the `/effort` row (line 10998) — append before `</td></tr>`:
   ```html
    On Bedrock, Vertex, Foundry, or with telemetry disabled, <code>/effort</code> now applies immediately instead of queueing until the turn ends (v2.1.243).
   ```
3. Update the `/fast` row (line 10999), replacing the bare description:
   ```html
   <tr><td><code>/fast</code> <code>[on|off]</code></td><td>Toggle fast mode (same model, faster output). On Bedrock, Vertex, Foundry, or with telemetry disabled, <code>/fast</code> now applies immediately instead of queueing until the turn ends (v2.1.243).</td></tr>
   ```

## Acceptance Criteria
- [ ] `/model`, `/effort`, `/fast` rows all updated with the v2.1.243 immediate-execution note.
- [ ] `/model` row additionally documents the Ultracode picker fix.
- [ ] All three rows remain well-formed single `<tr>` elements.
