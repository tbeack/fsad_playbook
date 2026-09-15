# CBP-559: [Claude] Add `omitClaudeMd` agent frontmatter note — Frontmatter Reference collapsible (v2.1.271)

## Summary
Claude Code v2.1.271 added `omitClaudeMd` to agent frontmatter and `--agents` JSON, letting custom and plugin subagents run without loading user, project, and local CLAUDE.md files. Managed policy files still load regardless.

## Assessment
`src/pages/practices.html`'s "Frontmatter Reference (All Fields)" collapsible (`building-skills--frontmatter-reference`) already carries a footer note specifically about `.claude/agents/*.md` frontmatter — the "Agent name constraint (v2.1.218)" paragraph. `omitClaudeMd` is a new agent-frontmatter field in the same family, so a sibling footer note is the natural fit rather than inventing a new table.

**Action:** Add a new footer paragraph after the "Agent name constraint" note.

## Plan
1. Locate the "Agent name constraint (v2.1.218)" paragraph in the Frontmatter Reference collapsible in `src/pages/practices.html`.
2. Add a new paragraph immediately after it: "**Excluding CLAUDE.md (v2.1.271):** Set `omitClaudeMd: true` in agent frontmatter (or the `--agents` JSON definition) to run a custom or plugin subagent without loading user, project, and local CLAUDE.md files. Managed policy files still load."

## Acceptance Criteria
- The Frontmatter Reference collapsible documents `omitClaudeMd`
- Version attribution (v2.1.271) included
- No existing content removed
