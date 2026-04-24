# CBP-053 — Update `/resume` Cheat Sheet row: stale session summarization (v2.1.117)

## Summary
Claude Code v2.1.117: `/resume` now offers to summarize stale, large sessions before re-reading them — matching the existing `--resume` behavior. This is a UX improvement that users will notice; the Cheat Sheet row should mention it.

## Assessment
One location:
- **Line ~4987** — Cheat Sheet "Session, context & history" table, `/resume` row.

Current description: "Resume conversation by ID or name (alias: `/continue`)"

## Plan

### Step 1 — Update the `/resume` Cheat Sheet row
Expand the description to note the automatic summarization offer:

New description: "Resume conversation by ID or name (alias: `/continue`). Offers to summarize stale large sessions before re-reading — matching `--resume` behavior."

## Acceptance Criteria
- `/resume` row notes that stale large sessions are offered a summary before re-reading
- Alias `/continue` still mentioned
- Row fits cleanly in the table
