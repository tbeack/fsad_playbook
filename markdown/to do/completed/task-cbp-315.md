# CBP-315 — Add `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` to hardening env vars table

## Summary

Claude Code v2.1.214 added a new environment variable `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` that lets users configure the maximum byte length of content attributes in OpenTelemetry (OTel) log events. The default truncation limit is 60 KB (61 440 bytes). This is useful in enterprise environments using OTel-based observability pipelines where payload size matters.

## Assessment

The playbook's Subprocess Sandboxing collapsible (`power-usage--subprocess-sandboxing`) contains a "Hardening env vars" table ending with `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` (line 10746 in fsad-playbook.html). The `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` env var belongs in this table alongside the other monitoring/infra env vars.

The playbook already documents OTel configuration (`otelHeadersHelper`, monitoring section). `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` is the companion env var for controlling truncation of content attributes in those OTel events.

**Action: New row in hardening env vars table — "Update existing" (additive row).**

## Plan

1. Read fsad-playbook.html lines ~10744–10748 to confirm exact context
2. Insert a new `<tr>` row after the `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` row (line 10746), before the closing `</tbody>`
3. New row content:
   ```html
   <tr><td><code>CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH</code></td><td>Maximum byte length of content attributes in OpenTelemetry log events. Default <code>61440</code> (60 KB). Increase for richer trace data in low-volume pipelines; decrease to cap payload size in high-throughput environments (v2.1.214).</td></tr>
   ```
4. Mark task complete in todo.md

## Acceptance Criteria

- `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` appears in the hardening env vars table
- The row follows the same HTML pattern as surrounding rows
- The description mentions default value of 61440 (60 KB) and version v2.1.214
- No surrounding rows are disturbed
