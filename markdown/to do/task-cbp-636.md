# CBP-636: Document Guardian review capabilities in Codex Multi-Agent Workflows (rust-v0.160.0)

## Summary

Codex rust-v0.160.0 added opt-in Guardian review capabilities. When enabled, Guardian retrieves earlier user instructions and includes context from agent handoffs. This helps multi-agent runs stay aligned with the original intent across long sessions or handoffs.

## Assessment

The Multi-Agent Workflows collapsible in `src/pages/codex.html` (around line 1115–1165) covers V2 multi-agent config, per-agent models, rollout budgets, and the interactive dashboard. It does not mention Guardian. This is new content that fits naturally at the end of this collapsible.

## Plan

1. Open `src/pages/codex.html`.
2. Find the end of the Multi-Agent Workflows collapsible body — the closing `</div></div>` that comes after the interactive dashboard paragraph (containing "task management rather than").
3. Insert a new paragraph block **before** the final `</div></div>` of that collapsible, describing Guardian.

### New paragraph to insert:

```html
        <p style="margin-top:1rem;"><strong>Guardian review (opt-in, rust-v0.160.0):</strong> Enable Guardian to give Codex persistent review context across multi-agent sessions. When active, Codex retrieves your earlier instructions and includes context from agent handoffs, so sub-agents stay aligned with the original intent even after the conversation spans many turns or role transitions. Guardian is opt-in — enable it from session settings or via the config.</p>
```

## Acceptance Criteria

- The Multi-Agent Workflows collapsible mentions Guardian review.
- The text notes that Guardian is opt-in and references rust-v0.160.0.
- The text explains what Guardian does (retrieves earlier instructions, includes agent handoff context).
- No existing paragraphs are altered.
