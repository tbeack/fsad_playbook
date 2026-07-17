# CBP-290 — [Claude] Update permission mode keyboard shortcut: "default" → "manual" (v2.1.200)

## Summary
Claude Code v2.1.200 renamed the "default" permission mode to "manual/Manual" across the CLI, `--help`, VS Code, and JetBrains. Both `--permission-mode manual` and `"defaultMode": "manual"` are now accepted alongside the old "default" spelling.

## Assessment
The Cheat Sheet keyboard shortcuts table at line ~9838 currently says:
```
Shift+Tab — Cycle permission mode: default → acceptEdits → plan → auto
```

This needs to change "default" to "manual". The `--permission-mode` CLI flag description at line ~10023 says:
```
--permission-mode — Start in specific mode (plan, auto, acceptEdits)
```
This doesn't list "default" or "manual" explicitly, so it doesn't need changing.

## Plan
Update line ~9838 — change:
```
Cycle permission mode: default &#8594; acceptEdits &#8594; plan &#8594; auto
```
to:
```
Cycle permission mode: manual &#8594; acceptEdits &#8594; plan &#8594; auto
```

## Acceptance Criteria
- Shift+Tab description shows "manual" not "default" as the first permission mode in the cycle
- The change matches the v2.1.200 renaming
