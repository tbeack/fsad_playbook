# CBP-553: Document `OTEL_METRICS_INCLUDE_REPOSITORY` in Monitoring → Available Metrics collapsible

## Source
Claude Code v2.1.269 changelog: "Added `OTEL_METRICS_INCLUDE_REPOSITORY` to tag OpenTelemetry metrics events with `vcs.*` repository attributes; commit events also get `vcs.ref.head.*`."

## Summary
New opt-in env var that adds repository attributes (`vcs.*`, and `vcs.ref.head.*` on commit-count events specifically) to OTel metrics. The Monitoring page's Available Metrics collapsible already has a sentence listing the standard attributes carried by all metrics — this is the natural place to note the opt-in addition.

## Assessment
Not documented. `src/pages/practices.html`'s `monitoring--metrics` collapsible, the paragraph at line 3750: "All metrics carry standard attributes: `session.id`, `organization.id`, `user.account_uuid`, and `terminal.type`. Token and cost metrics also include `model`."

## Plan
1. Open `src/pages/practices.html`, locate line ~3750 (the "All metrics carry standard attributes..." paragraph) inside `id="monitoring--metrics"`.
2. Append a new sentence to that paragraph (or a new one immediately after it):
   ```html
   <p style="margin-top:0.5rem; font-size:0.88rem; color:var(--text-secondary);">Set <code>OTEL_METRICS_INCLUDE_REPOSITORY=1</code> to also tag metrics events with <code>vcs.*</code> repository attributes; the commit-count metric additionally gets <code>vcs.ref.head.*</code> (v2.1.269).</p>
   ```

## Acceptance Criteria
- [ ] New sentence/paragraph documents the opt-in env var and the `vcs.*` / `vcs.ref.head.*` attributes.
- [ ] Cites v2.1.269.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
