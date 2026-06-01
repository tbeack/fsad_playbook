# CBP-211 — Add plugins auto-load from `.claude/skills/` (no marketplace) bullet to Plugins collapsible (v2.1.157)

## Summary

Claude Code v2.1.157 changed how plugins are loaded: plugins placed in `.claude/skills/` directories are now automatically loaded without needing to install them through the marketplace or `claude plugin install`. This is a meaningful workflow change — teams can now share local plugins simply by committing them to `.claude/skills/`.

## Assessment

The playbook currently documents `.claude/skills/` as the location for skills (SKILL.md files), but does not mention that plugin directories placed there are auto-loaded. The Plugins collapsible (around lines 9993–10041) documents marketplace installs, `--plugin-dir`, and `--plugin-url`, but not the auto-load behavior from `.claude/skills/`. The Skills section mentions `.claude/skills/` as the standard skill directory.

**Action needed:**
Add a bullet to the Plugins collapsible `<ul>` describing the auto-load behavior.

## Plan

### Step 1 — Add bullet to the Plugins collapsible `<ul>`

Insert a bullet about the auto-load behavior near the top of the `<ul>` list, before "Root-level skill shortcut".

**Old text:**
```html
<li>Plugins add skills invokable via <code>/skill-name</code></li>
```

**New text (insert before this line, as a new first bullet):**
```html
<li><strong>Auto-load from <code>.claude/skills/</code>:</strong> plugin directories placed in <code>.claude/skills/</code> are automatically loaded without marketplace registration or <code>claude plugin install</code>. Commit them to the repo so every teammate gets them automatically (v2.1.157).</li>
```

## Acceptance Criteria

- [ ] A bullet about auto-loading plugins from `.claude/skills/` is present in the Plugins collapsible
- [ ] The bullet mentions no marketplace is required and cites v2.1.157
- [ ] No existing content is removed or broken
- [ ] HTML is valid
