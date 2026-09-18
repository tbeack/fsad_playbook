# CBP-572 — Add terminal sync from claude.ai to Skills page and Plugins collapsible (v2.1.275)

**Source:** Claude Code v2.1.275
**Tag:** [Claude]

## Summary
v2.1.275 adds syncing of the skills and plugins enabled on a claude.ai account to terminal sessions signed in with it — previously this sync only reached cloud sessions. Opt out with `syncClaudeAiSkills: false` or `syncClaudeAiPlugins: false` in `settings.json`.

## Assessment
`src/pages/practices.html` already documents claude.ai skill sync (the "Hardened skills synced from claude.ai (v2.1.228)" paragraph in the Skills page) and cloud-synced plugins (the "Cloud-synced plugins (v2.1.239)" bullet in the Plugins collapsible). The v2.1.275 change extends both to terminal sessions, so it's documented as a new paragraph/bullet next to each existing entry rather than a new section.

## Plan
1. Open `src/pages/practices.html`
2. In the Skills page, add a new paragraph after the "Hardened skills synced from claude.ai" paragraph noting the terminal-sync extension and the `syncClaudeAiSkills`/`syncClaudeAiPlugins` settings
3. In the Plugins collapsible, extend the "Cloud-synced plugins" bullet with a sentence noting the same sync now reaches terminal sessions, with the opt-out settings
4. Mark CBP-572 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- Skills page and Plugins collapsible both note the v2.1.275 terminal-sync extension and opt-out settings
- Build passes without errors
