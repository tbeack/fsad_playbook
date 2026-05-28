# CBP-197 — Update `/model` Cheat Sheet row to v2.1.153 behavior

## Summary
Claude Code v2.1.153 reversed the `/model` behavior introduced in v2.1.144 (CBP-167). The command now **saves your selection as the default for new sessions** again (the original behavior). Press `s` in the picker to switch models for the current session only. The keybinding was renamed from `modelPicker:setAsDefault` to `modelPicker:thisSessionOnly`.

The current playbook text (line 8492) is stale — it says "current session only. Press `d` in the picker to set a default" which was accurate for v2.1.144–v2.1.152 but is now wrong.

Release note: "If you customized the `modelPicker:setAsDefault` keybinding, rename it to `modelPicker:thisSessionOnly` in keybindings.json (the `d` action was replaced by `s`)"

## Assessment
Line 8492 in `fsad-playbook.html`:
```html
<tr><td><code>/model</code></td><td>Select or change AI model for the current session only. Press <code>d</code> in the picker to set a default for new sessions. Startup header shows when the active model comes from a project or managed-settings pin. When <code>ANTHROPIC_BASE_URL</code> points at a compatible gateway, set <code>CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1</code> to list gateway models in the picker (opt-in as of v2.1.129).</td></tr>
```

Needs: description changed from "current session only. Press `d` to set default" → "saves as default for new sessions. Press `s` for current session only".

## Plan
1. Edit line 8492: replace "Select or change AI model for the current session only. Press `d` in the picker to set a default for new sessions." with "Select or change AI model — selection is saved as the default for new sessions. Press `s` in the picker to switch models for the current session only."
2. Keep the gateway discovery and managed-settings pin text intact.

## Acceptance Criteria
- `/model` row no longer says "current session only" or "press `d`"  
- Row correctly documents that `/model` sets the default, `s` is for session-only switch
- All other text in the row is preserved
