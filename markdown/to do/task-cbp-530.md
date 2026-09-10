# CBP-530: Update `--plugin-dir` to document folder-of-plugins with hot-reload (v2.1.265)

## Summary
Claude Code v2.1.265 extended `--plugin-dir` so that when pointed at a **folder of plugins** (rather than a single plugin directory or .zip), each child subfolder with a valid `plugin.json` manifest is loaded automatically. Children added or removed while the session is running are picked up without a restart (hot-reload). Previously `--plugin-dir` loaded a single plugin directory or .zip archive; this new mode treats the top-level path as a container.

## Assessment
The current Plugins collapsible (`#power-usage--plugins`) in `src/pages/practices.html` around lines 2615–2617 has:
```
# Load plugins from a directory or .zip archive
claude --plugin-dir ./my-plugins
claude --plugin-dir ./my-plugin.zip  # .zip archives also accepted
```
The comment "Load plugins from a directory or .zip archive" is ambiguous — it doesn't distinguish between a single plugin directory and a folder-of-plugins container. The bullet list below that code block has no item explaining this multi-plugin folder mode or the hot-reload behavior.

**Action:** Update the code block comment and add a bullet list item explaining the folder-of-plugins mode.

## Plan
1. Read `src/pages/practices.html` (already done in research phase)
2. In the code block around line 2616, update the comment from:
   `# Load plugins from a directory or .zip archive`
   to:
   `# Load a single plugin directory, a folder of plugins, or a .zip archive`
3. Add a line after the .zip comment:
   `claude --plugin-dir ./plugins-folder  # each child dir with plugin.json loads; hot-reloads on changes`
4. Add a new bullet to the `<ul>` list in the Plugins collapsible (after the existing "Dependency enforcement" bullet, which is the last one before scaffold) explaining the folder-of-plugins behavior.

## Acceptance Criteria
- Code block comment accurately describes all three `--plugin-dir` input types
- Example shows folder-of-plugins usage with comment noting hot-reload
- Bullet list item explains that each child folder with a manifest is loaded independently and picks up changes while running
- No existing content is removed or broken
