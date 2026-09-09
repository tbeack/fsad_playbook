# CBP-532: Document `--plugin-dir` folder-of-plugins support

## Source
Claude Code CHANGELOG.md v2.1.265: "Added support pointing `--plugin-dir` folder plugins: child folder manifest loads, children added or removed while running picked up"

## Summary
`--plugin-dir` previously pointed at a single plugin's directory (or a `.zip` archive of one plugin). As of v2.1.265, it can also point at a folder that contains multiple plugin subfolders — each child folder with its own manifest is loaded as a separate plugin, and children added or removed while Claude Code is running are picked up live (no restart needed).

## Assessment
`src/pages/practices.html` already documents `--plugin-dir` extensively in the Power Usage → Plugins collapsible (around line 2615-2617: `claude --plugin-dir ./my-plugins` and `claude --plugin-dir ./my-plugin.zip`), plus a reference in the Cheat Sheet's `claude agents` row (~line 1981) listing `--plugin-dir` as a background-session config flag. None of the existing text distinguishes "single plugin directory" from "directory containing multiple plugin subfolders," and none mentions live add/remove pickup. This is new capability, not currently covered — **update existing**.

## Plan
1. Open `src/pages/practices.html`, locate the Power Usage → Plugins collapsible code block (~line 2603-2629), specifically the `# Load plugins from a directory or .zip archive` comment and the two `claude --plugin-dir` example lines (~2615-2617).
2. Add a third example line demonstrating pointing `--plugin-dir` at a folder containing multiple plugin subfolders, e.g.:
   ```
   claude --plugin-dir ./my-plugins-folder  # folder of multiple plugins: each child folder w/ manifest loads; add/remove children while running, picked up live (v2.1.265)
   ```
3. In the bullet list immediately below the code block (~line 2637-2646), add a bullet clarifying the distinction, e.g.: `<li><strong>Folder of plugins:</strong> point <code>--plugin-dir</code> at a folder containing multiple plugin subfolders (each with its own manifest) to load them all at once; folders added or removed while Claude Code is running are picked up live, no restart needed (v2.1.265)</li>`
4. Keep existing single-plugin-directory and `.zip` examples unchanged — this is additive.

## Acceptance Criteria
- [ ] `src/pages/practices.html` Plugins collapsible shows an example of `--plugin-dir` pointed at a folder containing multiple plugin subfolders
- [ ] A bullet explains live add/remove pickup, version-tagged `(v2.1.265)`
- [ ] Existing single-plugin and `.zip` examples remain intact
- [ ] `python3 scripts/build-source.py` runs clean after the edit
