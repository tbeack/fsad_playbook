# CBP-049 — Cheat Sheet + Power Usage updates for v2.1.113 and v2.1.116

## Source
Claude Code v2.1.113 (2026-04-17) and v2.1.116 (2026-04-20) changelog.

## Summary
Four small playbook updates from the v2.1.113 and v2.1.116 releases:

1. **`Ctrl+U` behavior change** (v2.1.111, not yet reflected): `Ctrl+U` now clears the entire input buffer. Add `Ctrl+Y` to restore. The playbook still says "Delete from cursor to line start".
2. **`sandbox.network.deniedDomains` setting** (v2.1.113): New `settings.json` key that blocks specific domains even when an `allowedDomains` wildcard would otherwise permit them. Relevant to the Subprocess Sandboxing Power Usage collapsible.
3. **`/terminal-setup` description update** (v2.1.116): Now also configures editor scroll sensitivity in VS Code, Cursor, and Windsurf. Currently documented as "Setup Shift+Enter for multi-line input" only.
4. **Agent `hooks:` frontmatter fires via `--agent`** (v2.1.113 + v2.1.116): Skill/agent frontmatter `hooks:` keys now fire when running as a main-thread agent via `--agent`. Worth noting in the Skills frontmatter reference table.
5. **`/loop` Esc cancels wakeups** (v2.1.113): Pressing Esc now cancels pending wakeups. Add a tip to the `/loop` collapsible.

## Assessment

### Change 1 — `Ctrl+U` / `Ctrl+Y`
- **Location**: Keyboard shortcuts table, line 4729
- **Current**: `<tr><td><kbd>Ctrl+U</kbd></td><td>Delete from cursor to line start</td></tr>`
- **Action**: Update description to "Clear entire input buffer" and add `Ctrl+Y` row for restore

### Change 2 — `sandbox.network.deniedDomains`
- **Location**: Subprocess Sandboxing collapsible, line 5483–5490
- **Current**: Table with two env var rows only
- **Action**: Add a note (or new callout) about `sandbox.network.deniedDomains` as a `settings.json` key for domain blocklisting

### Change 3 — `/terminal-setup` description
- **Location**: Configuration slash commands table, line 4799
- **Current**: `<tr><td><code>/terminal-setup</code></td><td>Setup Shift+Enter for multi-line input</td></tr>`
- **Action**: Expand description to mention VS Code / Cursor / Windsurf scroll sensitivity

### Change 4 — Agent frontmatter `hooks:` fires via `--agent`
- **Location**: Skills frontmatter reference table — check the `hooks` row in the table around line 4240
- **Action**: Add a note or parenthetical that `hooks:` in agent frontmatter fires when running via `--agent`

### Change 5 — `/loop` Esc cancels wakeups
- **Location**: `/loop` collapsible, line 5287–5303
- **Action**: Add a tip note: "Press Esc to cancel pending wakeups mid-session."

## Plan

1. Update `Ctrl+U` description in keyboard shortcuts table and add `Ctrl+Y` row
2. Add `sandbox.network.deniedDomains` to Subprocess Sandboxing collapsible
3. Update `/terminal-setup` Cheat Sheet description
4. Add `--agent` note to agent frontmatter `hooks:` row
5. Add Esc tip to `/loop` collapsible
6. No new top-level sections — no `sectionToPageMap` or sidebar changes needed

## Acceptance Criteria
- [ ] `Ctrl+U` row says "Clear entire input buffer"
- [ ] `Ctrl+Y` row added for "Restore cleared input buffer"
- [ ] `sandbox.network.deniedDomains` documented in Subprocess Sandboxing
- [ ] `/terminal-setup` description mentions editor scroll sensitivity
- [ ] `/loop` collapsible mentions Esc cancels pending wakeups
- [ ] No regressions in table layout or styling
