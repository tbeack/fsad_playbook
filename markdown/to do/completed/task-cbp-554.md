# CBP-554: Add `CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS` to the `/model` Cheat Sheet row

## Source
Claude Code v2.1.269 changelog: "Added `CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS` to extend the LLM gateway `/v1/models` discovery timeout (default 3s)."

## Summary
New env var that extends the timeout for LLM gateway model discovery. The `/model` Cheat Sheet row already documents the related opt-in `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` flag — this new timeout knob belongs right next to it.

## Assessment
Not documented. `src/pages/practices.html`'s Cheat Sheet "Model, mode & usage" table, `/model` row (~line 1890), which already reads: "...When `ANTHROPIC_BASE_URL` points at a compatible gateway, set `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` to list gateway models in the picker (opt-in as of v2.1.129)..."

## Plan
1. Open `src/pages/practices.html`, locate the `/model` row (~line 1890).
2. Immediately after the existing sentence about `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` (opt-in as of v2.1.129), insert:
   ```
   Set <code>CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS</code> to extend the gateway's <code>/v1/models</code> discovery timeout beyond the 3-second default, for slower gateways (v2.1.269).
   ```
   as an additional sentence within the same `<td>`, before the "As of v2.1.243..." sentence that follows.

## Acceptance Criteria
- [ ] `/model` row mentions `CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS`, its purpose, and the 3s default.
- [ ] Cites v2.1.269.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
