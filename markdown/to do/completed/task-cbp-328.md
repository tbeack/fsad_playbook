# CBP-328: Add agent name constraint — `:` rejected, reserved for plugin namespacing (v2.1.218)

## Summary
Claude Code v2.1.218 changed agent markdown files to reject agent names containing `:`. The colon character is reserved for plugin namespacing (e.g. `plugin:agent-name`), so user-defined agent names must not include it.

## Assessment
The playbook shows a code example of an agent definition at ~line 9297 (`.claude/agents/code-reviewer.md`). The `name` frontmatter field description at ~line 9395 says "Display name and `/slash-command`. Defaults to directory name." — it has no constraint about `:` in names.

The best place to add this note is at the end of the Building Skills section paragraph about nested skills and plugin namespacing (~line 9433), or as an additional note after the frontmatter table. Since the note at line 9433 already mentions plugin namespacing (`<dir>:<name>` for nested skills), adding a clear constraint there (or as a new `<p>` after the frontmatter key casing note at ~line 9414) is most logical.

## Plan
1. Open `fsad-playbook.html`.
2. Locate the paragraph about frontmatter key casing at ~line 9414.
3. Add a new paragraph after it documenting the agent name `:` constraint.

## Exact change

After line ~9414 (the frontmatter key casing `<p>` tag), insert:

```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.75rem;"><strong>Agent name constraint (v2.1.218):</strong> Agent <code>name</code> values in <code>.claude/agents/*.md</code> must not contain <code>:</code> — the colon is reserved for plugin namespacing (e.g., <code>plugin:agent-name</code>). Files with a colon in the agent <code>name</code> field will be rejected at load time.</p>
```

## Acceptance Criteria
- A note about the `:` constraint on agent names appears near the frontmatter reference table.
- The note explains why (plugin namespacing reservation).
- No HTML formatting is broken.
