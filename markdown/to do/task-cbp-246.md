# CBP-246 — [Claude] Update `claude_code.lines_of_code.count` OTEL metric footnote to include `model` attribute (v2.1.172)

## Summary

Claude Code v2.1.172 added a `model` attribute to the `claude_code.lines_of_code.count` OTEL metric. This allows teams to slice lines-of-code contributions by model — e.g., to compare how much code was written by Opus vs Sonnet sessions.

## Assessment

The metric is documented in the **Monitoring collapsible** at line 11480:

```html
<tr><td><code>claude_code.lines_of_code.count</code></td><td>Lines added or removed</td><td>count</td></tr>
```

The footnote at line 11487 currently states:
```
All metrics carry standard attributes: session.id, organization.id, user.account_uuid, and terminal.type. Token and cost metrics also include model.
```

The footnote needs updating: `claude_code.lines_of_code.count` now also carries `model`, but it is not a "token or cost metric." The cleanest fix is to update the footnote to include `lines_of_code.count` in the set of metrics that carry `model`, or broaden the language to "Token, cost, and lines-of-code metrics also include `model`."

**No new rows needed** — the metric row itself doesn't need to change; only the footnote sentence changes.

## Plan

**Target:** Line 11487 — the footnote `<p>` in the Monitoring metrics table.

**Current text:**
```html
<p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">All metrics carry standard attributes: <code>session.id</code>, <code>organization.id</code>, <code>user.account_uuid</code>, and <code>terminal.type</code>. Token and cost metrics also include <code>model</code>.</p>
```

**New text:** Expand "Token and cost metrics" to also include lines-of-code:
```html
<p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">All metrics carry standard attributes: <code>session.id</code>, <code>organization.id</code>, <code>user.account_uuid</code>, and <code>terminal.type</code>. Token, cost, and lines-of-code metrics also include <code>model</code> (v2.1.172).</p>
```

## Acceptance Criteria

- The Monitoring metrics footnote now lists token, cost, and lines-of-code as metric types that carry the `model` attribute.
- Version reference `(v2.1.172)` appended.
- No other HTML is changed.
