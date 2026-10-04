# CBP-603: Document telemetry-ignored/disabled startup notice, `/status`, and `claude doctor` entries (v2.1.282)

## Summary

v2.1.282 added a startup notice, plus new `/status` and `claude doctor` entries, that list telemetry-related environment variables in a project's settings files which were either ignored (overridden by a higher-precedence source) or that turned telemetry off — so a misconfigured or unexpectedly disabled telemetry setup is now surfaced instead of failing silently.

## Assessment

- `src/pages/practices.html` has a dedicated "Claude Monitoring" section (~line 3719) with a "Quick Start" collapsible covering OTEL env vars and a "Debugging Tip" callout. This is the natural home for the detail.
- The Cheat Sheet table already has rows for `/status` (~line 1985) and `/doctor` (~line 1947) that accumulate version-specific notes; each gets a short pointer back to the Monitoring section, matching the existing pattern used for `otelHeadersHelper` (CBP-574, v2.1.275).

## Plan

1. In `src/pages/practices.html`, inside the Monitoring → Quick Start collapsible, add a new paragraph after the "Debugging Tip" callout (~line 3753):

```html
<p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">As of v2.1.282, Claude Code also shows a startup notice — and matching <code>/status</code> and <code>claude doctor</code> entries — listing telemetry environment variables in a project's settings files that were ignored (overridden by a higher-precedence source) or that turned telemetry off, so a disabled or misconfigured telemetry setup is noticed instead of failing silently.</p>
```

2. Append a short clause to the end of the `/status` Cheat Sheet row (~line 1985): "As of v2.1.282, also lists any telemetry environment variables from settings files that were ignored or that turned telemetry off (see Monitoring section)."

3. Append a short clause to the end of the `/doctor` Cheat Sheet row (~line 1947): "As of v2.1.282, also flags telemetry environment variables from settings files that were ignored or that turned telemetry off (see Monitoring section)."

## Acceptance Criteria

- The Monitoring section documents the new startup notice and its purpose.
- The `/status` and `/doctor` Cheat Sheet rows each get a brief, version-tagged pointer to this behavior.
