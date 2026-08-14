# CBP-375 — [Claude] Extend Cross-session SendMessage bullet for @-mention any session, bare-name delivery, and unique session naming

## Source
Claude Code v2.1.232

## Summary
v2.1.232 lets you type `@` in the prompt to mention any live Claude session by name (not just teammates), which Claude resolves via `SendMessage`. `SendMessage` now delivers immediately to a bare name that matches exactly one live session, instead of asking to confirm with a ref first. Sessions also now keep unique names on one machine: starting or renaming a session to a name another live session already uses gives it an auto-generated `name-word-word` variant.

## Assessment
`fsad-playbook.html`, `#power-usage` → Agent Teams collapsible, "Cross-session SendMessage" bullet (line 11362). This bullet already tracks this feature's evolution with version-tagged sentences (v2.1.224, v2.1.225, v2.1.228) in a running list — the established pattern (confirmed by CBP-368, which added the v2.1.225/v2.1.228 sentences) is to append a new sentence for each release's behavior change rather than create a new bullet. The v2.1.232 behavior (any-session `@`-mention, bare-name delivery without confirmation, and auto-unique session naming) is not yet mentioned. Genuine gap — extend the existing bullet.

## Plan

### Step 1 — Append a new sentence to the existing bullet at line 11362

Current:
```html
          <li><strong>Cross-session <code>SendMessage</code>:</strong> as of v2.1.224, Claude Code sessions can message each other across any of your machines — not just teammates in the same tmux/worktree setup. Use <code>ListAgents</code> to discover reachable sessions. As of v2.1.225, you can start a conversation with a Remote Control session on another machine by name, instead of only replying after it messages you first — <code>ListAgents</code> shows Remote Control sessions as <code>name [ref]</code>. As of v2.1.228, cross-session messages display the sender and body inline, and messages to Remote Control sessions show your Remote Control session name as the sender. Available on macOS and Linux.</li>
```

Replace with:
```html
          <li><strong>Cross-session <code>SendMessage</code>:</strong> as of v2.1.224, Claude Code sessions can message each other across any of your machines — not just teammates in the same tmux/worktree setup. Use <code>ListAgents</code> to discover reachable sessions. As of v2.1.225, you can start a conversation with a Remote Control session on another machine by name, instead of only replying after it messages you first — <code>ListAgents</code> shows Remote Control sessions as <code>name [ref]</code>. As of v2.1.228, cross-session messages display the sender and body inline, and messages to Remote Control sessions show your Remote Control session name as the sender. As of v2.1.232, typing <code>@</code> in the prompt to mention any live session by name (not just teammates) resolves through <code>SendMessage</code> automatically, delivery to a bare name matching exactly one live session no longer waits for ref confirmation, and a session started or renamed to a name already in use on that machine gets a unique <code>name-word-word</code> variant automatically. Available on macOS and Linux.</li>
```

## Acceptance Criteria
- The existing "Cross-session SendMessage" bullet gains a new v2.1.232 sentence before the trailing "Available on macOS and Linux." sentence
- Describes: any-session `@`-mention resolving via `SendMessage`, bare-name delivery without ref confirmation, and auto-unique `name-word-word` session naming
- Version tag (v2.1.232) included
- No changes to surrounding markup structure or the other version-tagged sentences
