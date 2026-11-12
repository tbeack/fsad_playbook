# CBP-738: Document new OTel account attributes (v2.1.317)

## Summary
Claude Code v2.1.317 added `anthropic.plan`, `anthropic.seat_type`, `anthropic.provider`, and `anthropic.custom_base_url` to OTel metrics, events, and spans.

## Assessment
`src/pages/practices.html`'s Monitoring → Metrics collapsible (~line 3936-3939) already documents the standard attributes every metric carries, plus `OTEL_METRICS_INCLUDE_REPOSITORY`. This is exactly the kind of cross-cutting attribute addition that section tracks. Rather than duplicating the note across the Metrics, Events & Logs, and Traces collapsibles, add one paragraph in the Metrics section noting it applies to metrics, events, and spans alike.

## Plan
1. Open `src/pages/practices.html`.
2. After the `OTEL_METRICS_INCLUDE_REPOSITORY` paragraph in the Metrics collapsible, insert:
   ```html
   <p style="margin-top:0.5rem; font-size:0.88rem; color:var(--text-secondary);">As of v2.1.317, metrics, events, and trace spans also carry <code>anthropic.plan</code>, <code>anthropic.seat_type</code>, <code>anthropic.provider</code>, and <code>anthropic.custom_base_url</code> — segment any OTel view by plan tier, seat type, model provider, or custom base URL without a secondary join.</p>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Metrics collapsible notes that metrics, events, and spans all carry the four new `anthropic.*` attributes as of v2.1.317.
- HTML is valid (no unclosed tags).
