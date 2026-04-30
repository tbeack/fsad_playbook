# CBP-022 — Add Claude Monitoring Section

## Summary

Add a new section to the Claude Best Practices page covering Claude Code's OpenTelemetry-based monitoring system for tracking usage, costs, and tool activity. This is a significant enterprise/team feature that helps organizations measure ROI and manage Claude Code adoption.

**Source:** https://code.claude.com/docs/en/monitoring-usage

## Assessment

- **Current state:** No monitoring content exists in the playbook. Searched for "telemetry", "monitoring", "OTEL", "cost" — no matches in the Best Practices page.
- **Where it fits:** New section between "Power Usage" (section 14) and "Open Source Frameworks" (section 15). Monitoring is an advanced/operational topic that logically follows power usage features. Alternatively, it could be a subsection within Power Usage as a collapsible — but given the depth of content, a standalone section is better.
- **Section number:** Will become section 15 ("Claude Monitoring"), bumping Open Source to section 16.

## Research Summary

Claude Code exports telemetry via OpenTelemetry (OTel) with three signal types:
1. **Metrics** — time series data (sessions, tokens, cost, LOC, commits, PRs, active time, tool decisions)
2. **Events/Logs** — structured events (user prompts, tool results, API requests, API errors, tool decisions)
3. **Traces (beta)** — distributed spans linking prompts to API calls and tool executions

### Key Content to Cover

#### Quick Start (env vars)
- `CLAUDE_CODE_ENABLE_TELEMETRY=1` — required to enable
- `OTEL_METRICS_EXPORTER` — otlp, prometheus, console, none
- `OTEL_LOGS_EXPORTER` — otlp, console, none
- `OTEL_EXPORTER_OTLP_ENDPOINT` — collector endpoint
- `OTEL_EXPORTER_OTLP_PROTOCOL` — grpc, http/json, http/protobuf

#### Available Metrics
| Metric | Description |
|--------|-------------|
| `claude_code.session.count` | CLI sessions started |
| `claude_code.lines_of_code.count` | Lines modified (added/removed) |
| `claude_code.pull_request.count` | PRs created |
| `claude_code.commit.count` | Git commits created |
| `claude_code.cost.usage` | Session cost in USD |
| `claude_code.token.usage` | Tokens used (input/output/cacheRead/cacheCreation) |
| `claude_code.code_edit_tool.decision` | Tool permission decisions |
| `claude_code.active_time.total` | Active time in seconds |

#### Events
- `claude_code.user_prompt` — prompt submissions
- `claude_code.tool_result` — tool completions with success/failure/duration
- `claude_code.api_request` — API calls with model, cost, tokens, duration
- `claude_code.api_error` — failed API requests with retry info
- `claude_code.tool_decision` — accept/reject decisions

#### Enterprise Features
- Admin-managed settings via MDM
- Dynamic header authentication (`otelHeadersHelper`)
- Multi-team segmentation via `OTEL_RESOURCE_ATTRIBUTES`
- Cardinality control variables
- Traces (beta) with `TRACEPARENT` propagation

#### Privacy & Security
- Opt-in only
- No raw code in metrics/events by default
- Prompt content redacted by default (`OTEL_LOG_USER_PROMPTS=1` to enable)
- Tool inputs redacted by default (`OTEL_LOG_TOOL_DETAILS=1` to enable)

#### Backend Options
- Metrics: Prometheus, ClickHouse, Datadog, Honeycomb
- Logs: Elasticsearch, Loki, ClickHouse
- Traces: Jaeger, Zipkin, Grafana Tempo

#### ROI Measurement
- Link to official guide: https://github.com/anthropics/claude-code-monitoring-guide
- Docker Compose configs, Prometheus setup, Linear integration templates

## Plan

### Step 1: Add sidebar nav entry
- In the `page-practices` sidebar nav, add "Monitoring" entry between "Power Usage" and "Open Source"
- Update `sectionToPageMap` in JS to include `'monitoring': 'practices'`

### Step 2: Renumber sections
- Current section 15 "Open Source Frameworks" → section 16
- New section 15 = "Claude Monitoring"

### Step 3: Create the section HTML
Insert new `<section id="monitoring">` at **line 4519** — between the `</section>` closing power-usage (line 4517) and the `<hr class="divider">` before open-source (line 4519). The new section replaces that existing `<hr>` and adds its own after. Exact insertion point:

```html
  </section>          <!-- end of power-usage (line 4517) -->

<hr class="divider">  <!-- NEW: divider before monitoring -->

<section id="monitoring">
  ...
</section>

<hr class="divider">  <!-- existing divider, now before open-source -->

<section id="open-source">
```

Structure:

```
<hr class="divider">
<section id="monitoring">
  <span class="section-label">15 — Claude Monitoring</span>
  <h2 class="section-title">Track Usage, Costs & Tool Activity</h2>
  <p class="section-subtitle">...</p>

  <!-- Collapsible: Quick Start -->
  <!-- Code block with essential env vars -->

  <!-- Collapsible: Available Metrics -->
  <!-- Table of 8 metrics -->

  <!-- Collapsible: Events & Logs -->
  <!-- Table of 5 event types with key attributes -->

  <!-- Collapsible: Enterprise Configuration -->
  <!-- Admin settings, multi-team, dynamic auth -->

  <!-- Collapsible: Backend Options -->
  <!-- Grid or table of recommended backends -->

  <!-- Collapsible: Privacy & Security -->
  <!-- What's collected, what's redacted, opt-in controls -->

  <!-- Callout: ROI Measurement Guide -->
  <!-- Link to github.com/anthropics/claude-code-monitoring-guide -->
</section>
```

### Step 4: Update scroll spy and sidebar
- Ensure the new section is picked up by `sectionObserver`
- Add indicator pill if applicable

### Step 5: Verify
- Open in browser, navigate to new section
- Test sidebar highlighting
- Test search finds monitoring content
- Check light/dark theme rendering
- Verify collapsibles open/close correctly

## Content Guidelines

- Keep it practical — focus on "how to set up" and "what you can track", not exhaustive env var lists
- Include a ready-to-copy Quick Start code block
- Use the metrics table as a scannable reference
- Highlight cost tracking as the primary use case (most teams care about this first)
- Keep enterprise/advanced config in separate collapsibles so the section isn't overwhelming
- Link to official docs and ROI guide for deeper dives

## Acceptance Criteria

- [x] New "Monitoring" section visible on Claude Best Practices page
- [x] Sidebar nav includes "Monitoring" link that scrolls to section
- [x] Quick Start code block with essential env vars
- [x] Metrics reference table with all 8 metrics
- [x] Events overview (5 event types)
- [x] Enterprise configuration collapsible
- [x] Privacy/security callout
- [x] Link to ROI measurement guide
- [x] Section renders correctly in both light and dark themes
- [x] Search returns results for "monitoring", "telemetry", "cost tracking"
- [x] Collapsibles expand/collapse correctly
