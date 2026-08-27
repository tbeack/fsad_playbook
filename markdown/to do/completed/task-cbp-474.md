# CBP-474 — `/claude-api cost-optimize` + Admin API coverage

## Summary
Claude Code v2.1.247 added `/claude-api cost-optimize` to profile a project's Claude API spend and work through cost levers (caching, token hygiene, batch, effort, model choice) one measured change at a time. The same release also updated the `/claude-api` skill with Admin API coverage (organization members, invites, workspaces, API keys, rate limit reports, workload identity federation, CMEK).

## Assessment
The Cheat Sheet already has a `/claude-api upgrade` row (~line 1973) from CBP-430. This is a direct extension of the same skill's coverage — add a sibling row for `cost-optimize` rather than overloading the existing `upgrade` row, and note the Admin API coverage as a bullet in the same row.

## Plan
1. In `src/pages/practices.html`, add a new Cheat Sheet row immediately after the existing `/claude-api upgrade` row (~line 1973):
   ```html
   <tr><td><code>/claude-api cost-optimize</code></td><td>Profile a project's existing Claude API spend and work through cost levers — caching, token hygiene, batch, effort, model choice — one measured change at a time (v2.1.247). The <code>/claude-api</code> skill also gained Admin API coverage in v2.1.247 (organization members, invites, workspaces, API keys, rate limit reports, workload identity federation, CMEK).</td></tr>
   ```

## Acceptance Criteria
- [x] `/claude-api cost-optimize` row present, adjacent to the existing `/claude-api upgrade` row.
- [x] Admin API coverage addition mentioned in the same row (no separate row needed).
