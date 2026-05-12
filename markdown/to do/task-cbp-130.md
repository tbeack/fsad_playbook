# CBP-130 — Add `claude agents` CLI subcommand to Cheat Sheet

## Summary
Claude Code v2.1.139 added an "Agent View" (Research Preview): `claude agents` is a new top-level CLI subcommand that shows a single unified list of every Claude Code session — running, blocked on you, or done. Previously, `/agents` existed as a slash command for browsing the agent library and managing live subagents, but `claude agents` as a standalone CLI entry point is new.

## Assessment
**Does this content exist in the playbook?**

- `/agents` slash command row exists at line 6250 in the Automation & agents table: "Browse agent library and manage live subagents (Running + Library tabs)"
- `claude agents` as a CLI subcommand does NOT appear anywhere in the CLI subcommands section or CLI Launch Flags section
- The "Info & account" CLI table starting around line 6308 contains `claude project purge` and `claude ultrareview` as CLI subcommands — this is where `claude agents` belongs

**What needs to change:**
Add `claude agents` as a new row in the "Info & account" CLI table in the Cheat Sheet.

## Plan
1. Read `fsad-playbook.html` lines 6300–6340 to confirm the table and find the exact insertion point
2. Add a new `<tr>` row for `claude agents` in the "Info & account" table, after the existing `claude project purge` row (or as the first CLI subcommand row if clearer)
3. Description: "Agent View (Research Preview) — see all your Claude Code sessions in one list: running, blocked, or done. Run `claude agents` to get started."

## Acceptance Criteria
- `claude agents` appears as a row in the "Info & account" or CLI subcommands table
- Description matches the official release note language (Research Preview, unified session list)
- No duplicate or conflicting entries with the `/agents` slash command row
