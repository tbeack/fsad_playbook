# CBP-113 — Update `/model` Cheat Sheet row: gateway discovery now opt-in (v2.1.129)

## Summary
In v2.1.129, gateway `/v1/models` discovery for the `/model` picker was changed from automatic (as it was in v2.1.126–2.1.128) to opt-in via `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`. The current playbook `/model` row (line 6193) documents the feature as if it is always active when `ANTHROPIC_BASE_URL` is set — it needs to be updated to reflect the opt-in requirement.

## Assessment
- **File:** `fsad-playbook.html`
- **Current content (line 6193):**
  ```
  When `ANTHROPIC_BASE_URL` points at a compatible gateway, the picker lists models from that gateway's `/v1/models` endpoint.
  ```
- This is now incorrect — the feature requires the env var to be set explicitly.

## Plan
Update the `/model` Cheat Sheet row at line 6193 to note the opt-in requirement.

### Before:
```html
          <tr><td><code>/model</code></td><td>Select or change AI model. Selection persists across restarts, overriding project-pinned models. Startup header shows when the active model comes from a project or managed-settings pin. When <code>ANTHROPIC_BASE_URL</code> points at a compatible gateway, the picker lists models from that gateway's <code>/v1/models</code> endpoint.</td></tr>
```

### After:
```html
          <tr><td><code>/model</code></td><td>Select or change AI model. Selection persists across restarts, overriding project-pinned models. Startup header shows when the active model comes from a project or managed-settings pin. When <code>ANTHROPIC_BASE_URL</code> points at a compatible gateway, set <code>CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1</code> to list gateway models in the picker (opt-in as of v2.1.129).</td></tr>
```

## Acceptance Criteria
- The `/model` Cheat Sheet row accurately describes gateway model discovery as opt-in.
- `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` is mentioned with explanation.
- No other content changes.
