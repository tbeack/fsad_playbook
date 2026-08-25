# CBP-441 — `/usage` Loops breakdown + `/loop` cross-reference

## Summary
Claude Code v2.1.243 added a Loops breakdown to `/usage`: per-loop run count, total tokens, tokens per run, and last run — making it easy to spot runaway or chatty `/loop` tasks.

## Assessment
The Cheat Sheet `/usage` row (line 11003) already has a versioned-note pattern (v2.1.149, v2.1.236, v2.1.239 additions chained in the same cell) — this is a direct continuation of that pattern. The Power Usage → `/loop` collapsible (`#power-usage--loop`, lines 11513–11539) documents `/loop` usage and has a "For Persistence" tip callout but no mention of monitoring loop cost via `/usage` — a natural cross-reference.

## Plan
1. In `fsad-playbook.html`, locate the `/usage` Cheat Sheet row (line 11003) and append to the end of its `<td>` (after the v2.1.239 sentence, before `</td></tr>`):
   ```html
    As of v2.1.243, <code>/usage</code> also includes a Loops breakdown — per-loop run count, total tokens, tokens per run, and last run — to spot runaway or chatty <code>/loop</code> tasks.
   ```
2. In the `#power-usage--loop` collapsible (lines 11513–1539), add a new callout after the existing "For Persistence" tip (before the closing `</div></div>` of the collapsible body, around line 11537):
   ```html
   <div class="callout callout-tip" style="margin-bottom:0;">
     <div class="callout-title">Monitor Loop Cost</div>
     <p><code>/usage</code> has a dedicated Loops breakdown (per-loop run count, total tokens, tokens per run, last run) as of v2.1.243 — check it if a <code>/loop</code> task seems to be running more often or costing more than expected.</p>
   </div>
   ```
   Adjust the preceding "For Persistence" callout's `style` to drop `margin-bottom:0` if it currently has it, so only the new final callout keeps `margin-bottom:0`.

## Acceptance Criteria
- [ ] `/usage` Cheat Sheet row updated with v2.1.243 Loops breakdown note.
- [ ] `/loop` Power Usage subsection cross-references the new `/usage` Loops tab.
- [ ] Collapsible callout structure/nesting matches existing patterns (`callout callout-tip` with `callout-title` + `<p>`).
