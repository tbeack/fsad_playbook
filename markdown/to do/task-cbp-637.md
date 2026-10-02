# CBP-637: Document workspace-defaults sessions outside a project (rust-v0.160.0)

## Summary

Codex rust-v0.160.0 lets users start sessions outside any project when policy permits, and the session applies workspace defaults. When you resume such a session, saved permissions are also restored.

## Assessment

The Codex page (`src/pages/codex.html`) covers session management, the config.toml reference, and the worktree/fork session types. There is no mention of workspace-defaults sessions or starting Codex outside a project directory. This is new content that fits as a bullet in the Notable config.toml Keys table or as a standalone paragraph in the sessions/config section.

The best place is a short paragraph in the Configuration Reference section, after the Notable config.toml Keys table (around line 1088 — after `instant_interrupt` and before the Environment Variables header). However, since this is more of a usage note than a config key, I will add it as a `<p>` callout-style paragraph after the config table's closing `</div>` and before the Environment Variables header.

## Plan

1. Open `src/pages/codex.html`.
2. Find the Configuration Reference section — specifically the closing `</div>` of the `table-wrap` div that contains the config table (after the `instant_interrupt` row and `[otel]` row), before the `<h3>` for Environment Variables.
3. Insert a new paragraph **after** the closing `</div>` of the config table wrap and **before** the `<h3>Environment Variables</h3>` heading.

### New paragraph to insert:

```html
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem; margin-bottom:0.5rem;"><strong>Workspace-defaults sessions (rust-v0.160.0):</strong> When policy permits, you can start a Codex session from any directory — even outside a named project. Codex applies your workspace defaults for that session. When you resume the session later, your saved permissions are restored automatically.</p>
```

## Acceptance Criteria

- A paragraph about workspace-defaults sessions appears in the Configuration Reference area.
- The text notes the rust-v0.160.0 version and the permission-restore behavior on resume.
- No existing rows or headings are altered.
