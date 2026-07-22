# CBP-317 — Add `dir/**` hook `if:` path-scoping note

## Summary

Claude Code v2.1.214 changed how single-segment glob patterns in hook `if:` conditions are interpreted. Previously, a pattern like `"Edit(src/**)"` would match any `src/` directory anywhere in the file tree. Now it only matches `<cwd>/src/` — the top-level `src/` directory relative to the project root. To match `src/` at any depth, hook authors must write `"Edit(**/src/**)"`.

Importantly, `deny`/`ask` permission rules keep their previous any-depth match behavior — only hook `if:` conditions are affected by this scoping change.

## Assessment

The playbook's Hooks collapsible documents the conditional `if` field at lines 11004–11010 in fsad-playbook.html:

```
<p style="..."><strong>Conditional <code>if</code> field</strong> — narrows which tool calls trigger a hook:</p>
<ul ...>
  <li><code>"Bash(git *)"</code> — only git commands</li>
  <li><code>"Bash(rm *)"</code> — only rm commands</li>
  <li><code>"Edit(*.ts)"</code> — only TypeScript edits</li>
  <li><code>"Write(*.md)"</code> — only Markdown writes</li>
</ul>
```

After this list (after the closing `</ul>` at ~line 11010) there is no note about path-scoping behavior. A breaking-change note is needed here.

**Action: Add a path-scoping note paragraph after the bullet list — "Update existing" (additive note).**

## Plan

1. Read fsad-playbook.html lines ~11004–11014 to confirm exact context
2. After the closing `</ul>` of the `if` field bullets (line 11010), insert a new `<p>` note:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;"><strong>Path-scoping (v2.1.214):</strong> A single-segment pattern like <code>"Edit(src/**)"</code> in an <code>if:</code> condition matches only <code>&lt;cwd&gt;/src/</code> — not a <code>src/</code> directory nested deeper in the tree. Write <code>"Edit(**/src/**)"</code> to match at any depth. Note: <code>deny</code>/<code>ask</code> permission rules keep their any-depth behavior — this scoping applies only to hook <code>if:</code> conditions.</p>
   ```
3. Mark task complete in todo.md

## Acceptance Criteria

- A path-scoping note appears after the `if:` field bullet list
- The note mentions `<cwd>/src/` scoping for single-segment patterns
- The note correctly states that permission rules keep any-depth behavior
- The version annotation v2.1.214 is included
- Surrounding content is undisturbed
