# CBP-115: Update frontmatter table — `monitors`/`themes` belong under `"experimental"` in plugin manifests

## Summary
Claude Code v2.1.129 changed plugin manifest validation: `themes` and `monitors` keys should now be declared under `"experimental": { ... }` in plugin manifests. Top-level declarations still work but `claude plugin validate` warns. This is plugin-manifest-specific (not skill frontmatter).

## Assessment
The frontmatter reference table at line 5539 documents `monitors` as a top-level key. The `themes` key is referenced elsewhere (line 6229) in the context of `/theme`. The `monitors` row needs a note that in **plugin manifests** (not skill frontmatter) these should be nested under `"experimental"`. The skill frontmatter `monitors` key is unaffected — only the plugin-level `manifest.json` changed.

## Plan
1. Read the `monitors` row at line 5539 of `fsad-playbook.html`
2. Update the `monitors` description to clarify that in plugin manifests (`manifest.json`), declare as `"experimental": { "monitors": [...] }` — top-level still works but triggers a validation warning
3. Similarly check the Plugins collapsible in Power Usage for plugin manifest documentation

## Acceptance Criteria
- The `monitors` frontmatter row notes the `experimental` nesting requirement for plugin manifests
- Existing skill frontmatter guidance is unchanged (skill SKILL.md `monitors:` key is unaffected)
- No surrounding HTML is broken
