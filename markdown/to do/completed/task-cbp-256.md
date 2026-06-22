# CBP-256 — Add nested `.claude/skills` loading note to Building Skills section

## Summary

Claude Code v2.1.178 added support for loading skills from nested `.claude/skills` directories when working on files in that directory. On a name clash, the nested skill appears as `<dir>:<name>` so both the top-level and nested skills remain available. This is a meaningful change to how skills are discovered and namespaced.

## Assessment

The playbook's Building Skills section (around line 9076) documents that skills live in `.claude/skills/` (project) or `~/.claude/skills/` (user/global), and uses the namespace format `/plugin:skill-name` for plugin skills. However, it doesn't mention:
- That skills in nested `.claude/skills` directories are loaded when working in those directories
- The `<dir>:<name>` namespacing for clash resolution

The most appropriate place to add this is in the Frontmatter Reference table or in the introductory paragraph of the Building Skills section where the directory locations are explained.

## Plan

1. Read lines 9076–9160 of `fsad-playbook.html` to find the skills directory location description
2. Find the paragraph describing `.claude/skills/` and `~/.claude/skills/` locations
3. Add a new sentence or note after the existing directory descriptions explaining nested loading and `<dir>:<name>` naming

## Acceptance Criteria

- The Building Skills section mentions that nested `.claude/skills/` directories load skills when working on files in that directory
- The `<dir>:<name>` namespace format for name clashes is documented
- Follows the existing prose style of the section
