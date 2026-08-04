# CBP-338 — [Codex] Update `/fork` row + Session Management: temporary forks + paginated history; update `web_search` config for custom providers

## Source
Codex rust-v0.146.0

## Summary
Codex rust-v0.146.0 adds:
- **Fork threads with paginated history** — forked threads now show paginated history of the parent
- **Temporary forks** — forks that do not appear in thread listings (ephemeral exploration)
- **Standalone web search for custom model providers** — `web_search` config now works with compatible custom model providers, not just native OpenAI models

## Assessment
In `fsad-playbook.html`:
- **Cheat Sheet** `/fork` row (line 12902): reads `Clone conversation to a new thread` — needs to mention paginated history and temporary forks
- **Session Management** collapsible (line 13097): mentions fork picker but not paginated history or temp forks
- **Config table** `web_search` row (line 12972): reads `Web search mode: disabled / cached / live` — needs custom provider mention

## Plan

### Step 1 — Update `/fork` row in Codex Cheat Sheet (line 12902)
Old:
```html
<tr><td><code>/fork</code></td><td>Clone conversation to a new thread</td></tr>
```
New (mention paginated history and temporary forks):
```html
<tr><td><code>/fork</code></td><td>Clone conversation to a new thread, including paginated history from the parent. Add <code>--temp</code> / choose "temporary" in the picker for forks that don't appear in thread listings (rust-v0.146.0).</td></tr>
```

### Step 2 — Update Session Management collapsible opening paragraph (line 13097)
Append to the Session Management paragraph (after the existing content about archive/delete) a note about paginated history and temporary forks.

### Step 3 — Update `web_search` config row (line 12972)
Old:
```html
<tr><td><code>web_search</code></td><td>Web search mode: <code>disabled</code> / <code>cached</code> / <code>live</code></td><td><code>cached</code></td></tr>
```
New (mention custom providers):
```html
<tr><td><code>web_search</code></td><td>Web search mode: <code>disabled</code> / <code>cached</code> / <code>live</code>. Now supported for compatible custom model providers, not just native OpenAI models (rust-v0.146.0).</td><td><code>cached</code></td></tr>
```

## Acceptance Criteria
- `/fork` row mentions paginated history and temporary forks
- Session Management collapsible mentions temporary forks
- `web_search` config row mentions custom model provider support
