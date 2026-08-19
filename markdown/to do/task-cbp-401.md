# CBP-401 — [Codex] Skill frontmatter model annotations and validation

## Source
Codex CLI rust-v0.148.0

## Summary
Skill frontmatter now parses model annotations, and skill validation rejects unfinished TODO placeholders. The bundled skill-creator guide was tightened.

## Assessment
Significant gap. The `#codex-building-skills` SKILL.md example (line 13541 onward) has no YAML frontmatter at all — it opens straight on `# Deployment Skill`. No `name:`, `description:`, or `model:` field is documented anywhere in the section, and there is no validation content. The closing Best Practice callout is at 13564-13567.

## Plan
1. Prepend a `---` YAML frontmatter block to the SKILL.md example at line 13541 showing `name`, `description`, and the new `model` annotation, matching the code block's existing highlight-span conventions.
2. Insert a new callout before the `callout-best-practice` block at 13564 covering skill validation: TODO placeholders are now rejected, tagged rust-v0.148.0.

## Acceptance Criteria
- [ ] SKILL.md example shows valid YAML frontmatter including the `model` annotation
- [ ] Frontmatter delimiters are correct and the code block stays well-formed
- [ ] A validation callout documents TODO-placeholder rejection
- [ ] Tagged rust-v0.148.0
