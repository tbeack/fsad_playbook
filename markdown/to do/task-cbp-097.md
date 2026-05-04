# CBP-097 — Update `/model` Cheat Sheet row for gateway `/v1/models` endpoint (v2.1.126)

## Summary
Claude Code v2.1.126 updated the `/model` picker to list models from the gateway's `/v1/models` endpoint when `ANTHROPIC_BASE_URL` points at an Anthropic-compatible gateway. This is useful for teams using custom API gateways (LiteLLM, Portkey, etc.) as the model picker now shows the actual models available via their gateway rather than a hardcoded list.

## Assessment
Line 6187 currently reads:
```html
<tr><td><code>/model</code></td><td>Select or change AI model. Selection persists across restarts, overriding project-pinned models. Startup header shows when the active model comes from a project or managed-settings pin.</td></tr>
```

This description should also note that when `ANTHROPIC_BASE_URL` is set to a compatible gateway, the picker lists models from that gateway's `/v1/models` endpoint.

## Plan
1. Read line 6187 to confirm exact current text.
2. Append the gateway model discovery note.

### Updated row
```html
<tr><td><code>/model</code></td><td>Select or change AI model. Selection persists across restarts, overriding project-pinned models. Startup header shows when the active model comes from a project or managed-settings pin. When <code>ANTHROPIC_BASE_URL</code> points at a compatible gateway, the picker lists models from that gateway's <code>/v1/models</code> endpoint.</td></tr>
```

## Acceptance Criteria
- `/model` Cheat Sheet row mentions gateway `/v1/models` discovery when `ANTHROPIC_BASE_URL` is set
- Existing description content remains intact
- No other rows are changed
