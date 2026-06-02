# CBP-210 — Add `claude plugin init <name>` to Cheat Sheet and Plugins collapsible (v2.1.157)

## Summary

Claude Code v2.1.157 added `claude plugin init <name>` — a CLI subcommand that scaffolds a new plugin in `.claude/skills/<name>`. This gives developers a quick way to create a local plugin without manually building the directory structure.

## Assessment

The playbook's Plugins collapsible (around line 9993–10041) documents plugin CLI commands including `claude plugin prune`, `claude plugin disable`, `claude plugin enable`, and `claude plugin details`, but does not mention `claude plugin init`. The Cheat Sheet `/plugin` row (around line 9405) describes the TUI command but does not reference the `init` scaffold subcommand.

**Action needed:**
1. Add a `claude plugin init <name>` line to the code block in the Plugins collapsible — fits naturally after the existing plugin management commands.
2. Add a bullet to the `<ul>` in the Plugins collapsible describing what `init` does.

## Plan

### Step 1 — Update the Plugins collapsible code block

Find the code block in the Plugins collapsible that ends with the `claude plugin enable my-plugin` line. Add a new commented section for scaffolding a new plugin.

**Old text (end of code block):**
```
<span class="cm"># Enable a plugin (auto-enables all transitive dependencies)</span>
<span class="kw">claude</span> plugin enable my-plugin</code></pre>
```

**New text:**
```
<span class="cm"># Enable a plugin (auto-enables all transitive dependencies)</span>
<span class="kw">claude</span> plugin enable my-plugin

<span class="cm"># Scaffold a new plugin in .claude/skills/</span>
<span class="kw">claude</span> plugin init my-plugin</code></pre>
```

### Step 2 — Add a bullet to the Plugins collapsible `<ul>`

After the existing "Dependency enforcement" bullet, add a new bullet about `claude plugin init`.

**Insert after:**
```html
<li><strong>Dependency enforcement:</strong> <code>claude plugin disable</code> is blocked when another enabled plugin depends on the target — the error includes a copy-pasteable chain command showing what to disable first. <code>claude plugin enable</code> automatically force-enables all transitive dependencies.</li>
```

**Add:**
```html
<li><strong>Scaffold a plugin locally:</strong> <code>claude plugin init &lt;name&gt;</code> creates a new plugin skeleton in <code>.claude/skills/&lt;name&gt;/</code> — no marketplace required. Generates <code>plugin.json</code>, a starter <code>SKILL.md</code>, and the standard directory layout ready for customization (v2.1.157).</li>
```

## Acceptance Criteria

- [ ] The `claude plugin init my-plugin` command appears in the Plugins collapsible code block
- [ ] A bullet describing what `init` does and where it creates the plugin is present in the collapsible's `<ul>`
- [ ] No existing content is removed or broken
- [ ] HTML is valid (no unclosed tags)
