# CBP-094 — Update `/terminal-setup` Cheat Sheet row for iTerm2 clipboard (v2.1.121)

## Summary
Claude Code v2.1.121 updated `/terminal-setup` to also enable iTerm2's "Applications in terminal may access clipboard" setting, so `/copy` works including from tmux. The current Cheat Sheet row only mentions Shift+Enter multi-line input and scroll sensitivity for VS Code/Cursor/Windsurf.

## Assessment
Line 6224 currently reads:
```html
<tr><td><code>/terminal-setup</code></td><td>Setup Shift+Enter for multi-line input; also configures scroll sensitivity in VS Code, Cursor, and Windsurf terminals</td></tr>
```

This description is incomplete — it should also mention the iTerm2 clipboard permission that was added in v2.1.121.

## Plan
1. Read line 6224 to confirm exact current text.
2. Append the iTerm2 clipboard note to the existing description.

### Updated row
```html
<tr><td><code>/terminal-setup</code></td><td>Setup Shift+Enter for multi-line input; also configures scroll sensitivity in VS Code, Cursor, and Windsurf terminals; enables iTerm2 clipboard access for <code>/copy</code> (including from tmux)</td></tr>
```

## Acceptance Criteria
- `/terminal-setup` Cheat Sheet row mentions iTerm2 clipboard access
- Shift+Enter and scroll sensitivity notes remain intact
- No other rows are changed
