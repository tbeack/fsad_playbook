# CBP-296 — Permission Mode: Rename "Default" to "Manual" (v2.1.200)

## Summary

Claude Code v2.1.200 officially renamed the "default" permission mode to "Manual" across all surfaces — the CLI, `--help`, VS Code, and JetBrains. The old `default` value is still accepted alongside `manual` (both `--permission-mode manual` and `--permission-mode default` work; `"defaultMode": "manual"` and `"defaultMode": "default"` are equivalent). The mode label in the UI and docs now reads "Manual".

## Assessment

Four locations in `fsad-playbook.html` reference this mode by the old "default" name:

1. **Line 9838** — Keyboard Shortcuts table: `Cycle permission mode: default → acceptEdits → plan → auto`
2. **Line 10024** — CLI Flags table: `--permission-mode` description lists `(plan, auto, acceptEdits)` — "manual/default" is missing from the accepted values list
3. **Line 10074–10075** — Permission Modes card grid: card titled "Default" with description "Claude asks permission for every tool use. Safest mode. Good for unfamiliar codebases."
4. **Line 10094** — Caption below the permission mode cards: `Cycle with Shift+Tab: default → acceptEdits → plan → auto → (bypassPermissions if enabled)`

## Plan

### Edit 1 — Keyboard Shortcuts table (line 9838)
Change the Shift+Tab row description from:
```
Cycle permission mode: default &#8594; acceptEdits &#8594; plan &#8594; auto
```
To:
```
Cycle permission mode: manual &#8594; acceptEdits &#8594; plan &#8594; auto
```

### Edit 2 — CLI Flags table (line 10024)
Change `--permission-mode` description from:
```
Start in specific mode (<code>plan</code>, <code>auto</code>, <code>acceptEdits</code>)
```
To:
```
Start in specific mode (<code>manual</code>, <code>plan</code>, <code>auto</code>, <code>acceptEdits</code>). The legacy value <code>default</code> is still accepted as a synonym for <code>manual</code>.
```

### Edit 3 — Permission Modes card (line 10073–10075)
Change card h3 from "Default" to "Manual" and update description to note the legacy alias:
```html
<h3>Manual</h3>
<p>Claude asks permission for every tool use. Safest mode. Good for unfamiliar codebases. (Formerly called <code>default</code> — both <code>--permission-mode manual</code> and <code>--permission-mode default</code> are accepted.)</p>
```

### Edit 4 — Cycle caption (line 10094)
Change from:
```
Cycle with <kbd>Shift+Tab</kbd>: default &#8594; acceptEdits &#8594; plan &#8594; auto &#8594; (bypassPermissions if enabled)
```
To:
```
Cycle with <kbd>Shift+Tab</kbd>: manual &#8594; acceptEdits &#8594; plan &#8594; auto &#8594; (bypassPermissions if enabled)
```

## Acceptance Criteria
- [ ] Permission Modes card is titled "Manual" (not "Default")
- [ ] Card description mentions the legacy `default` alias
- [ ] Shift+Tab keyboard shortcut row shows "manual" in the cycle
- [ ] `--permission-mode` flag description includes `manual` and notes the legacy `default` synonym
- [ ] Cycle caption under the cards shows "manual" in the cycle
- [ ] No Codex section content is modified (Codex has its own separate permission/approval model)
- [ ] In-app changelog `<li>` entry added for CBP-296
