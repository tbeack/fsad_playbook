# CBP-093 — Correct `Ctrl+L` keyboard shortcut description (v2.1.126)

## Summary
Claude Code v2.1.126 fixed `Ctrl+L` behavior: it no longer clears the prompt input. It now only forces a screen redraw, matching standard readline behavior. The fix note in the release: "Fixed `Ctrl+L` clearing the prompt input — it now only forces a screen redraw, matching readline behavior."

## Assessment
The playbook Cheat Sheet keyboard shortcuts table (Claude Best Practices page) contains this row at line 6136:

```html
<tr><td><kbd>Ctrl+L</kbd></td><td>Clear prompt input</td></tr>
```

This description is now incorrect. The behavior is "Force screen redraw" (does NOT clear the input).

The Codex page at line 8377 has:
```html
<tr><td><kbd>Ctrl+L</kbd></td><td>Clear screen</td></tr>
```

This is Codex-specific behavior (different terminal context) — leave it as-is since it describes Codex CLI, not Claude Code.

## Plan
1. Find the `Ctrl+L` row in the Claude Best Practices Cheat Sheet (line ~6136)
2. Update the description from "Clear prompt input" to "Force screen redraw (does not clear input)"
3. Leave the Codex page `Ctrl+L` row untouched

## Acceptance Criteria
- Cheat Sheet `Ctrl+L` row description updated to reflect v2.1.126 behavior
- Codex page `Ctrl+L` row unchanged
- No other rows affected
