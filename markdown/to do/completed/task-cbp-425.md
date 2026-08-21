# CBP-425 — [Claude] zsh conditional-syntax permission-check fix

## Source
Claude Code v2.1.238 release notes: "Improved Bash tool permission checking for zsh-specific syntax in shell conditionals."

## Summary
Bash tool permission checking was improved for zsh-specific syntax in shell conditionals (e.g. `[[ ... ]]` zsh idioms not shared with POSIX sh). The Subprocess Sandboxing collapsible (`id="power-usage--subprocess-sandboxing"`, ~line 11810-11899) documents permission/sandboxing behavior extensively with versioned bullets (e.g. the v2.1.236 `denyRead` wildcard-precedence fix) but has no zsh-specific content.

## Assessment
Content does not exist as a standalone note. This is a minor, low-priority correctness fix per Phase 3 assessment — include as a small addition rather than a new subsection.

## Plan
1. In `fsad-playbook.html`, locate `id="power-usage--subprocess-sandboxing"` (~line 11810-11899).
2. Add a brief note — either as a new short `<li>`-style addition near the "Sandbox modes" table (line 11818-11827) or as a trailing sentence in the intro paragraph (line 11816) — stating: Bash tool permission checking was improved for zsh-specific syntax in shell conditionals, reducing false permission prompts/refusals for zsh-style conditional commands. Tag `(v2.1.238)`.
3. Keep this addition minimal (one sentence) given its low practical impact.

## Acceptance Criteria
- [ ] A one-sentence note about the zsh-conditional-syntax permission-check improvement exists in the Subprocess Sandboxing collapsible, tagged `(v2.1.238)`.
- [ ] No existing content in this collapsible altered or removed.
