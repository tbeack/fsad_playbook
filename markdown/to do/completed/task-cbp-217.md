# CBP-217 — Update OTEL_RESOURCE_ATTRIBUTES: values now labels on metric datapoints

## Summary
In Claude Code v2.1.161, `OTEL_RESOURCE_ATTRIBUTES` values are now included as labels on metric datapoints. This means custom dimensions (team, repo, cost_center) can be used to slice usage metrics in your observability platform — not just as resource-level metadata. Previously this variable was documented as a way to "tag metrics by team" but the actual propagation to datapoint labels was not implemented.

## Assessment
**Existing content:** Line 11106 in `fsad-playbook.html`:
```
<li><strong>Multi-team segmentation</strong> — use <code>OTEL_RESOURCE_ATTRIBUTES="department=eng,team.id=platform,cost_center=123"</code> to tag metrics by team</li>
```
This mentions the variable but doesn't explain that the values propagate as labels on individual metric datapoints. The description should be updated to reflect the actual behavior and the practical benefit (slice by dimension in Grafana/Datadog dashboards).

**Action needed:** UPDATE EXISTING — update the Multi-team segmentation bullet to clarify that attribute values are now included as labels on metric datapoints (as of v2.1.161).

## Plan
1. Read the surrounding context (lines ~11104–11110) — already done.
2. Edit the `Multi-team segmentation` list item to add the datapoint-label clarification.

**Old text:**
```
<li><strong>Multi-team segmentation</strong> &mdash; use <code>OTEL_RESOURCE_ATTRIBUTES="department=eng,team.id=platform,cost_center=123"</code> to tag metrics by team</li>
```

**New text:**
```
<li><strong>Multi-team segmentation</strong> &mdash; use <code>OTEL_RESOURCE_ATTRIBUTES="department=eng,team.id=platform,cost_center=123"</code> to tag metrics by team. As of v2.1.161, these values are included as labels on every metric datapoint — slice by team or repo in Grafana/Datadog without a secondary join</li>
```

## Acceptance Criteria
- The Multi-team segmentation bullet in the Enterprise Configuration collapsible (Monitoring section) mentions datapoint labels.
- No other HTML structure is changed.
