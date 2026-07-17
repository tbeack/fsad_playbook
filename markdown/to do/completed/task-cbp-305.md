# CBP-305 — Config: Permission rule startup warning for Write/NotebookEdit/Glob

**Source:** Claude Code v2.1.210  
**Type:** Update existing  
**Affects:** Claude Best Practices → Notable settings.json Keys callout

## Summary

Claude Code v2.1.210 added a startup warning when permission rules contain `Write(path)`, `NotebookEdit(path)`, or `Glob(path)` entries. The warning advises users to use `Edit(path)` or `Read(path)` instead. This is a best-practice guidance change — these tool names in the permission rule position are now flagged at startup to steer users toward the correct rule format.

## Assessment

The playbook's "Notable settings.json Keys callout" (around line 8678–8679) already documents permission rule syntax including `Tool(param:value)` and deny rule glob patterns. There is no existing bullet warning about `Write(path)`, `NotebookEdit(path)`, or `Glob(path)` being deprecated/warned in permission rules.

The current last bullet before the end of the `<ul>` is `vimInsertModeRemaps` at line 8690. The new bullet should be appended before that closing tag, after the existing permission-related bullets (Tool(param:value) at line 8679).

## Plan

1. Read `fsad-playbook.html` around lines 8679–8691 to confirm the exact insertion point.
2. Add a new `<li>` bullet after the `vimInsertModeRemaps` entry (changing its `margin-bottom:0` to `margin-bottom:0.4rem`) and adding the new entry as the final `<li style="margin-bottom:0">`.
3. The new bullet should say:
   - **Permission rule startup warnings for `Write`/`NotebookEdit`/`Glob`** — As of v2.1.210, Claude Code logs a startup warning if your permission rules contain `Write(path)`, `NotebookEdit(path)`, or `Glob(path)` entries. Use `Edit(path)` to match file-write operations and `Read(path)` to match file-read/glob operations instead. These more specific rule names target the right tools without matching unintended operations.

## Acceptance Criteria

- New `<li>` appears in the Notable settings.json Keys callout
- Content accurately describes the startup warning and the correct alternatives
- Existing bullets are not disrupted
- `vimInsertModeRemaps` has `margin-bottom:0.4rem` and the new entry has `margin-bottom:0`
