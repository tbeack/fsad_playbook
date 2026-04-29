# CBP-030 — Add `monitors` manifest key to Skills frontmatter reference

## Source
Claude Code v2.1.105: "Added background monitor support for plugins via a top-level `monitors` manifest key that auto-arms at session start or on skill invoke"

## Summary
The Building Skills frontmatter reference table (line 3256–3271) does not include the `monitors` key. This is a new plugin/skill manifest field that enables background monitors to auto-arm when a skill is invoked.

## Assessment
New content, not yet in table. One row addition to the frontmatter table.

**Location:** `fsad-playbook.html` — Frontmatter Reference collapsible, tbody (after `hooks` row at line 3268)

## Plan

Add a new row after the `hooks` row (line 3268):

```html
<tr><td><code>monitors</code></td><td>array</td><td>Background monitor definitions that auto-arm at session start or when the skill is invoked. Enables plugins to stream events without blocking the conversation.</td></tr>
```

Insert after:
```html
<tr><td><code>hooks</code></td><td>object</td><td>Hooks scoped to this skill's lifecycle (PreToolUse, PostToolUse, etc.).</td></tr>
```

## Acceptance Criteria
- [x] Frontmatter reference table includes `monitors` field
- [x] Description accurately reflects auto-arm behavior
