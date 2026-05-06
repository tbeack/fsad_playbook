# CBP-114: Add `skillOverrides` setting to Notable settings.json Keys callout

## Summary
Claude Code v2.1.129 activated the `skillOverrides` setting which controls per-skill visibility to the model and in the `/` menu. Three modes are now functional: `off` (hides from both model and `/`), `user-invocable-only` (hides from model only), `name-only` (collapses description — model sees skill name but not full description).

## Assessment
The `skillOverrides` setting is not mentioned anywhere in the playbook. The `Notable settings.json Keys` callout at line 3770–3778 lists `prUrlTemplate`, `otelHeadersHelper`, and `disableAllHooks`. This is the right place to add it.

## Plan
1. Read lines 3769–3778 of `fsad-playbook.html`
2. Add a new `<li>` for `skillOverrides` to the Notable settings.json Keys callout, after `disableAllHooks`
3. Example: `skillOverrides` — Control per-skill visibility: `{"skill-name": "off"}` hides from model and `/`; `"user-invocable-only"` hides from model only; `"name-only"` sends name without description to the model.

## Acceptance Criteria
- `skillOverrides` appears in the Notable settings.json Keys callout
- The three modes (`off`, `user-invocable-only`, `name-only`) are documented
- No surrounding HTML is broken
