# CBP-368 — [Claude] Update Agent Teams cross-session messaging

## Source
Claude Code v2.1.225, v2.1.228

## Summary
- v2.1.225: SendMessage can now start a conversation with Remote Control sessions on other machines by name (`ListAgents` shows them as `name [ref]`), instead of only replying after they message you first.
- v2.1.228: Cross-session messages now display the sender and body inline instead of a collapsed line; messages to Remote Control sessions on other machines show your Remote Control session name as the sender.

## Assessment
`fsad-playbook.html`, `#power-usage--agent-teams` collapsible (lines ~11347–11380). The "Cross-session SendMessage" bullet at line 11360 already documents the v2.1.224 baseline ("Claude Code sessions can message each other across any of your machines... Use `ListAgents` to discover reachable sessions"). It predates both of these refinements and needs updating, not a new section — content exists but is now incomplete/outdated on two points:
1. It implies you can only reach sessions that have already messaged you (not stated explicitly, but doesn't mention the new ability to *initiate* contact with Remote Control sessions by name).
2. It doesn't mention the `name [ref]` display format from `ListAgents`, or the v2.1.228 display improvements (inline sender/body, Remote Control session name shown as sender).

## Plan

### Step 1 — Update the Cross-session SendMessage bullet (line 11360)
Current:
```html
<li><strong>Cross-session <code>SendMessage</code>:</strong> as of v2.1.224, Claude Code sessions can message each other across any of your machines — not just teammates in the same tmux/worktree setup. Use <code>ListAgents</code> to discover reachable sessions. Available on macOS and Linux.</li>
```
Replace with (adds the v2.1.225 initiate-by-name capability, `name [ref]` format, and v2.1.228 display improvements):
```html
<li><strong>Cross-session <code>SendMessage</code>:</strong> as of v2.1.224, Claude Code sessions can message each other across any of your machines — not just teammates in the same tmux/worktree setup. Use <code>ListAgents</code> to discover reachable sessions (shown as <code>name [ref]</code>). As of v2.1.225, you can start a conversation with a Remote Control session on another machine by name, not just reply after it messages you first. As of v2.1.228, cross-session messages display the sender and body inline, and messages to Remote Control sessions show your Remote Control session name as the sender. Available on macOS and Linux.</li>
```

### Step 2 — No code-block changes needed
The existing `SendMessage(to: "<agent-name-or-id>", ...)` and `ListAgents()` example (lines ~11372–11376) remains accurate — no edit required there.

## Acceptance Criteria
- The Cross-session SendMessage bullet reflects the v2.1.225 initiate-by-name capability and the v2.1.228 display improvements
- Version tags (v2.1.224, v2.1.225, v2.1.228) are each attributed to the correct capability
- HTML structure unchanged apart from the bullet's text content — no new tags introduced
