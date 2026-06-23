# CBP-269 — Update skill frontmatter note: kebab-case/snake_case/camelCase accepted for `display-name`, `default-enabled`, `fallback`, `metadata.*`

## Summary

Claude Code v2.1.186 improved skill frontmatter parsing: `display-name`, `default-enabled`, `fallback`, and `metadata.*` keys now accept kebab-case, snake_case, AND camelCase spellings interchangeably. Additionally, malformed SKILL.md YAML frontmatter now loads the skill body with empty metadata instead of failing silently. These are quality-of-life improvements for skill authors who may not remember the exact casing convention.

## Assessment

The Frontmatter Reference table (collapsible at line 9115) lists frontmatter fields but does not include `display-name`, `default-enabled`, or `fallback` as named rows — these are internal fields not directly visible in the user-facing table. The relevant place to add this note is the paragraph below the table at line 9143, which already documents string substitutions and other author tips. The note should be appended as a new sentence to the existing tip paragraph (or added as a separate `<p>` below it).

Current tip paragraph ends at line 9143 (before `</div></div>` at 9144).

## Plan

1. Read `fsad-playbook.html` lines 9140–9147 to confirm the exact close of the frontmatter collapsible section.
2. After the existing string-substitutions `<p>` (line 9143), insert a new `<p>`:
   `<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.75rem;"><strong>Frontmatter key casing:</strong> <code>display-name</code>, <code>default-enabled</code>, <code>fallback</code>, and <code>metadata.*</code> keys accept kebab-case, snake_case, or camelCase spellings interchangeably (e.g. <code>display-name</code>, <code>display_name</code>, and <code>displayName</code> all work). Malformed YAML frontmatter now loads the skill body with empty metadata instead of silently failing (v2.1.186).</p>`
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The frontmatter reference section notes that `display-name`, `default-enabled`, `fallback`, and `metadata.*` accept multiple casing styles.
- Malformed YAML recovery behavior is mentioned.
- No other content changed.
