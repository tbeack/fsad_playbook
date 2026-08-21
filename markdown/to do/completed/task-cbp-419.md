# CBP-419 — [Claude] Remote Control HTTP 403 resilience fix

## Source
Claude Code v2.1.238 release notes: "Improved Remote Control connection resilience: brief HTTP 403 refusals from a network edge, VPN, or proxy are now tolerated for up to 3 minutes, with the refusing party named when a block persists."

## Summary
Remote Control connections now tolerate brief HTTP 403 refusals (from a network edge, VPN, or proxy) for up to 3 minutes before surfacing an error, and name the refusing party if the block persists. The Remote Control & Cross-Device collapsible (`id="power-usage--remote-control"`, ~line 11580-11609) already tracks an analogous v2.1.234 fix about a misleading HTTP 404 being replaced with a fast, named failure — this is a direct sibling improvement.

## Assessment
Content partially exists (a related HTTP 404 fix at line 11605) but the new 403-tolerance behavior is not documented.

## Plan
1. In `fsad-playbook.html`, locate `id="power-usage--remote-control"` bullet list (lines 11598-11607).
2. Add a new `<li>` after the existing v2.1.234/v2.1.235 bullets (after line 11606, before `</ul>` at 11607) stating: brief HTTP 403 refusals (network edge, VPN, proxy) are now tolerated for up to 3 minutes before Remote Control surfaces an error; if the block persists, the refusing party is named `(v2.1.238)`.
3. Match existing bullet style/tone.

## Acceptance Criteria
- [ ] New bullet documents the 3-minute 403 tolerance and named-refusing-party behavior, tagged `(v2.1.238)`.
- [ ] Placed logically near the other connectivity-resilience bullets in the same collapsible.
- [ ] No existing bullets altered or removed.
