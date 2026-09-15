# CBP-301 — Add `PreModelSwitch`/`PostModelSwitch` hook events to Hooks table (v2.1.252)

## Summary

Claude Code v2.1.252 added two new hook events: `PreModelSwitch` and `PostModelSwitch`. These fire before and after a model switch, letting hooks block, confirm, or annotate the switch. `SessionStart` resume hooks also now receive session staleness and estimated re-cache cost.

## Assessment

`PreModelSwitch` and `PostModelSwitch` are absent from the hooks table in the playbook. They belong in the "Environment & context hooks" table (lines 10142–10159), which already contains `ConfigChange`, `CwdChanged`, `PreCompact`, and `PostCompact`.

Insertion point: after `ConfigChange` (line 10147), before `CwdChanged`.

## Plan

1. Read the Environment & context hooks table in `fsad-playbook.html` around line 10142.
2. Insert two new `<tr>` rows for `PreModelSwitch` and `PostModelSwitch` after the `ConfigChange` row (line 10147).

## New row content

```html
<tr><td><code>PreModelSwitch</code></td><td>Before a model switch — block, confirm, or annotate the switch (v2.1.252).</td></tr>
<tr><td><code>PostModelSwitch</code></td><td>After a model switch completes (v2.1.252).</td></tr>
```

## Acceptance Criteria

- `PreModelSwitch` and `PostModelSwitch` rows appear in the Environment & context hooks table, after `ConfigChange`.
- No other rows are changed.
