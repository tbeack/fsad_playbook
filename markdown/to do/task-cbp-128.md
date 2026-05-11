# CBP-128 — Add `settings.autoMode.hard_deny` to Notable settings.json Keys

## Summary

Claude Code v2.1.136 introduced `settings.autoMode.hard_deny` — a new settings key for auto mode classifier rules that block unconditionally regardless of user intent or allow exceptions. Unlike regular `deny` rules that the classifier can override when user intent is clear, `hard_deny` rules are absolute blocks.

## Assessment

The playbook's Config Cascade section (section 09) has a "Notable `settings.json` Keys" callout at approximately line 3804. It currently lists:
- `prUrlTemplate`
- `otelHeadersHelper`
- `disableAllHooks`
- `skillOverrides`

`settings.autoMode.hard_deny` is not mentioned anywhere in the playbook. It needs to be added to this callout as a new bullet.

## Plan

1. Read lines ~3803–3813 of `fsad-playbook.html` to confirm exact structure
2. Add a new `<li>` bullet after `skillOverrides` (last item) for `settings.autoMode.hard_deny`

The new bullet text should be:
```
<li style="margin-bottom:0;"><code>settings.autoMode.hard_deny</code> — Auto mode classifier rules that block unconditionally regardless of user intent or allow exceptions. Unlike regular deny rules (which the classifier can override when intent is clear), hard-deny rules are absolute. Format: same pattern array as <code>allow</code>/<code>deny</code> rules.</li>
```

The existing last item (`skillOverrides`) currently has `margin-bottom:0;`. The new item should become the last item, so update `skillOverrides` to `margin-bottom:0.4rem` and the new entry gets `margin-bottom:0`.

## Acceptance Criteria

- `settings.autoMode.hard_deny` appears in the Notable settings.json Keys callout
- The bullet explains the unconditional blocking behavior vs. regular deny rules
- No other content is changed
- HTML validates (no broken tags)
