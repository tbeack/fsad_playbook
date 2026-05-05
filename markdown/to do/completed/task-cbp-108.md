# CBP-108 — Document "Always allow" writes to `.claude/settings.local.json` for Bash permissions (v2.1.128)

## Summary

Claude Code v2.1.128 changed how SDK hosts handle the "Always allow" response to Bash tool permission prompts. When a user selects "Always allow" for a Bash command, Claude Code now writes the allowlist entry to `.claude/settings.local.json` (project-local, gitignored) rather than a global or managed location. This makes it easier for teams to accumulate safe command allowlists per-project without polluting shared settings.

## Assessment

The playbook covers the Config Cascade section (#practices/configuration-cascade) at around line 7075, which documents the four settings layers including `.claude/settings.local.json`. However, no current content explains the "Always allow" UX flow and that it writes to `settings.local.json`.

The `/less-permission-prompts` Cheat Sheet row (line 6228) and the Subprocess Sandboxing collapsible (in Power Usage) are related but don't mention this behavior. The Config Cascade section is the most appropriate place to add a brief callout about this.

**Target location:** Config Cascade section — add a tip/callout note alongside the settings layers table explaining that "Always allow" at a Bash permission prompt writes to `.claude/settings.local.json`.

## Plan

1. Read the Config Cascade section around line 7075–7120
2. Locate the settings layers table (the one with `.claude/settings.local.json`)
3. After the table, add a `<p>` tip note explaining the "Always allow" behavior:
   - "Always allow" at a Bash permission prompt writes the entry to `.claude/settings.local.json` (gitignored, project-local)
   - Use `/less-permission-prompts` to bulk-migrate common read-only patterns into the allowlist
4. Mark task complete in todo.md

## Acceptance Criteria

- A note near the Config Cascade settings layers table explains that "Always allow" writes to `.claude/settings.local.json`
- The note mentions `/less-permission-prompts` as the bulk alternative
- HTML structure is preserved (no broken tags)
