# CBP-238 — Add `fallbackModel` settings key + update `--fallback-model` description (v2.1.166)

## Summary

Claude Code v2.1.166 added a new `fallbackModel` settings key to `settings.json` that lets you configure **up to three fallback models tried in order** when the primary model is overloaded or unavailable. The `--fallback-model` CLI flag description in the playbook is also slightly out of date — it says "primary model is not found" but v2.1.166 expanded the trigger to include when the model is **overloaded or unavailable**, not just "not found".

## Assessment

**Notable settings.json Keys callout (line ~8573–8586):** The `fallbackModel` key is not currently listed. Need to add it as a new bullet. The last bullet is `settings.autoMode.hard_deny` at line 8584.

**CLI flags table — `--fallback-model` row (line 9904):** Currently reads:
> Switch to this model for the rest of the session when the primary model is not found (interactive and print mode)

Should be updated to reflect:
1. The trigger is "overloaded or unavailable" (not just "not found")
2. Up to three fallback models can be configured via the `fallbackModel` settings key

## Plan

1. **Edit Notable settings.json Keys callout** — add `fallbackModel` bullet before `settings.autoMode.hard_deny` (keep hard_deny last as it was already last):
   - Insert after the `skillOverrides` bullet (line 8583), before `settings.autoMode.hard_deny` (line 8584):
   ```html
   <li style="margin-bottom:0.4rem;"><code>fallbackModel</code> — Configure up to three fallback models tried in order when the primary model is overloaded or unavailable. Works in both interactive and print (<code>-p</code>) mode. Pairs with the <code>--fallback-model</code> CLI flag for session-level overrides.</li>
   ```

2. **Edit `--fallback-model` CLI flag row** (line 9904) — update description:
   - Old: `Switch to this model for the rest of the session when the primary model is not found (interactive and print mode)`
   - New: `Switch to this model for the rest of the session when the primary model is overloaded or unavailable (interactive and print mode); use the <code>fallbackModel</code> settings key to configure up to three fallbacks tried in order`

## Acceptance Criteria

- `fallbackModel` bullet appears in the Notable settings.json Keys callout
- `--fallback-model` row description mentions "overloaded or unavailable" and references the `fallbackModel` settings key
- No surrounding HTML is broken
- Grep confirms `fallbackModel` appears in the settings callout section
