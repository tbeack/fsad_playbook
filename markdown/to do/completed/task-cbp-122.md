# CBP-122 — [Codex] Update Session Management collapsible: redesigned resume/fork picker + raw scrollback mode + `/ide` context injection (v0.129.0)

## Summary
Codex v0.129.0 redesigned the session resume/fork picker, added raw scrollback mode (scroll through session output without affecting the composer), `/ide` context injection (inject IDE file context into the session), and workspace-aware `/diff` (diff output is aware of your workspace root).

## Assessment
- The Codex Power Usage "Session Management" collapsible (line ~9061) covers `codex resume`, `codex resume --last`, and `codex exec --ephemeral`. It needs updates to mention the new resume/fork picker UI and raw scrollback mode.
- The Codex Cheat Sheet `/diff` row (line ~8924) says "Show current changes (staged and unstaged)" — should note workspace-aware behavior.
- `/ide` is listed in the Cheat Sheet cross-device & integrations table on the Claude side but may need a note on the Codex side. Let me check: in the Codex cheat sheet, there is no `/ide` row. It should be added.

## Plan

### Step 1 — Update Codex Session Management collapsible
Find the existing content in the Session Management collapsible (line ~9067):
```
<p>Codex saves sessions automatically. Resume previous work without re-explaining context.</p>
```
Replace with expanded content that mentions the new picker and raw scrollback:
```html
<p>Codex saves sessions automatically. Resume previous work without re-explaining context. The redesigned resume/fork picker lets you select, resume, or fork any saved session in a single UI — no need to know the session ID upfront.</p>
```
Also add to the code block a comment about scrollback:
```
# Raw scrollback mode — scroll through session output freely
# Press the scrollback keybind (configured via /keymap) without
# affecting the composer input
```

### Step 2 — Add `/ide` to Codex Cheat Sheet slash commands table
In the Codex slash commands table tbody (line ~8916), add after `/apps`:
```html
<tr><td><code>/ide</code></td><td>Inject IDE file/editor context into the current session (workspace-aware)</td></tr>
```

### Step 3 — Update `/diff` description in Codex Cheat Sheet
Find the `/diff` row:
```html
<tr><td><code>/diff</code></td><td>Show current changes (staged and unstaged)</td></tr>
```
Replace with:
```html
<tr><td><code>/diff</code></td><td>Show current changes (staged and unstaged); workspace-aware — diff is scoped to your project root</td></tr>
```

## Acceptance Criteria
- Session Management collapsible mentions the redesigned resume/fork picker.
- `/ide` appears in the Codex Cheat Sheet slash commands table.
- `/diff` description notes workspace-aware behavior.
- No HTML broken.
