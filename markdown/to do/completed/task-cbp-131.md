# CBP-131 — Add `/goal` to Claude Cheat Sheet automation table

## Summary
Claude Code v2.1.139 added `/goal` as a native Claude Code command: set a completion condition and Claude keeps working across turns until it's met. Works in interactive, `-p`, and Remote Control modes. Shows live elapsed/turns/tokens as an overlay panel.

## Assessment
**Does this content exist in the playbook?**

- `/goal` exists in the Codex Best Practices page only (line 8964): "Create a persisted goal; browse discoverable goals in TUI. Goals pause across session resume by default — opt back in from the picker. Supports multi-day duration tracking."
- `/goal` does NOT appear in the Claude Best Practices Cheat Sheet or anywhere in the Claude (page-practices) section
- The Claude Cheat Sheet has an "Automation & agents" table (around line 6240) with `/loop`, `/schedule`, `/batch`, `/tasks`, `/agents`, `/security-review` — `/goal` belongs here

**What needs to change:**
Add `/goal` as a new row in the "Automation & agents" slash commands table in the Claude Cheat Sheet.

## Plan
1. Read lines 6240–6265 to confirm the automation table structure and find exact insertion point
2. Add `<tr><td><code>/goal</code></td><td>Set a completion condition and Claude works across turns until it's met. Shows live elapsed/turns/tokens overlay. Works in interactive, <code>-p</code>, and Remote Control.</td></tr>` after the `/agents` row
3. Keep concise and distinct from the Codex version (which is about persisted goals + picker)

## Acceptance Criteria
- `/goal` row appears in the "Automation & agents" table in the Claude Cheat Sheet
- Description focuses on the turn-until-complete behavior with the overlay panel
- Does not duplicate the Codex `/goal` row (different implementations)
