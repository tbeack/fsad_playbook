# CBP-525 — Add `bashOutputMaxChars` / `taskOutputMaxChars` to Notable settings.json Keys

## Summary
Claude Code v2.1.261 added two new settings: `bashOutputMaxChars` and `taskOutputMaxChars`, which allow raising how much command and background-task output Claude receives inline (before it is saved to a file), up to 128K characters.

## Assessment
Not present in the playbook. The Notable settings.json Keys list in `src/pages/practices.html` is the correct location. The last item in the list is `managedMcpServers` at line 655. These two new settings should be appended after it.

## Plan
1. Edit `src/pages/practices.html`
2. After the `managedMcpServers` `<li>` (line 655), add a new `<li>` for both settings

## Insertion point (after line 655, before line 656 `</ul>`)
```html
        <li style="margin-bottom:0;"><code>bashOutputMaxChars</code> / <code>taskOutputMaxChars</code> — Raise how much Bash command output (<code>bashOutputMaxChars</code>) and background-task output (<code>taskOutputMaxChars</code>) Claude receives inline before the rest is saved to a file; maximum is 128 000 characters each. Useful when large build logs or test output would otherwise be truncated (v2.1.261).</li>
```

## Acceptance Criteria
- Both settings listed in the Notable settings.json Keys section
- Describes the purpose: inline output limit, max 128K
- Version tag v2.1.261 present
