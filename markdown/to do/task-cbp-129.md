# CBP-129 — Add `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` to Monitoring section

## Summary

Claude Code v2.1.136 introduced `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` — an env var that re-enables the session quality survey for enterprise teams that capture responses through OpenTelemetry. When OTEL is active, the survey is disabled by default (to avoid noise in telemetry pipelines); this flag opts back in so organizations can collect qualitative feedback alongside quantitative metrics.

## Assessment

The playbook's Monitoring section (section 16) has a "Quick Start" collapsible (~line 7720) with an env var code block. The section also has an "Enterprise Setup" collapsible (~line 7815) which is the most relevant location since this env var is only relevant for enterprise OTEL deployments.

This env var is not mentioned anywhere in the playbook. The best place to add it is as a list item in the "Enterprise Setup" collapsible's tips list (the bullet list that mentions multi-team segmentation, dynamic auth, and cardinality control), or as a note in the Quick Start. Given it's enterprise-specific, the Enterprise Setup collapsible is the right location.

## Plan

1. Read lines ~7810–7835 of `fsad-playbook.html` to confirm the Enterprise Setup collapsible structure
2. Add a new bullet `<li>` to the existing tips `<ul>` in the Enterprise Setup collapsible

The new bullet should be appended after the last existing bullet (cardinality control):
```html
<li><strong>Survey re-opt-in</strong> &mdash; set <code>CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL=1</code> to re-enable the session quality survey for enterprises capturing responses through OpenTelemetry (the survey is disabled by default when OTEL is active)</li>
```

## Acceptance Criteria

- `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` appears in the Enterprise Setup collapsible of the Monitoring section
- The description explains why it's needed (survey disabled by default when OTEL is on) and what it does (re-enables it)
- No other content is changed
- HTML validates (no broken tags)
