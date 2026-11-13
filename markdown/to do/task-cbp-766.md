# CBP-766 — Add terminal workspace section (Codex rust-v0.168.0 + rust-v0.169.0)

## Summary

Codex rust-v0.168.0 adds an opt-in terminal workspace feature (`features.tui_workspace = true`). It places a persistent side pane beside the main chat. Use `leader z` to zoom the focused pane, and drag the divider to resize. Rust-v0.169.0 extends this: the side pane supports multiple tabs, keyboard/mouse navigation, and local side chats that persist across restarts.

## Assessment

The playbook covers `/side` as a command for ephemeral side conversations (line 993 in `src/pages/codex.html`). The `features.tui_workspace` feature is different — it is a persistent split-pane workspace mode, not an ephemeral side conversation. It is not covered anywhere in the playbook.

## Plan

1. Read `src/pages/codex.html` around line 1206 (Voice Conversations section).
2. Add a new collapsible section "Terminal Workspace" between the Voice Conversations block (ends near line 1225) and the Inline Async Questions block (starts near line 1226). Follow the existing collapsible pattern.
3. The section content:
   - Explain `features.tui_workspace = true` opt-in in `config.toml`
   - Mention `leader z` to zoom the focused pane, drag divider to resize
   - Mention multiple side-chat tabs (rust-v0.169.0), keyboard/mouse tab navigation, persistent local side chats
   - Code block showing the config.toml setting

## Acceptance Criteria

- A new "Terminal Workspace" collapsible appears in the Power Usage section.
- The section references both rust-v0.168.0 (opt-in feature) and rust-v0.169.0 (multiple tabs, persistence).
- No existing content is changed.
