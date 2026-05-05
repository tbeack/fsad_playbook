# CBP-102 — Update Monitoring section: OTEL vars no longer inherited by subprocesses

## Summary
In Claude Code v2.1.128, subprocesses (Bash, hooks, MCP, LSP) no longer inherit `OTEL_*` environment variables. This is a behavior change: previously, OTEL-instrumented apps run via the Bash tool would pick up the CLI's own OTLP endpoint, causing unintended telemetry mixing.

## Assessment
The Monitoring section (around line 7480–7482) currently states:
> "Bash subprocesses inherit a `TRACEPARENT` env var for W3C trace context propagation"

This needs a clarifying note: `TRACEPARENT` is still propagated for distributed tracing, but the full set of `OTEL_*` configuration vars (exporter, endpoint, etc.) are no longer passed down. This means OTEL-instrumented services run via the Bash tool use their own OTEL config, not the CLI's.

This is important guidance for teams running OTEL-instrumented services via the Bash tool — they won't accidentally inherit Claude's OTLP endpoint.

## Plan
1. Read lines 7478–7486 of `fsad-playbook.html`
2. Update the bullet point that currently says "Bash subprocesses inherit a `TRACEPARENT` env var for W3C trace context propagation" to add the clarification that `OTEL_*` config vars (exporter, endpoint, headers) are intentionally NOT inherited — subprocesses use their own OTEL config. `TRACEPARENT` is still passed for trace context.

Pattern: add a clarifying sentence or second bullet after the TRACEPARENT bullet.

## Acceptance Criteria
- The TRACEPARENT bullet is updated or a new bullet is added clarifying that `OTEL_*` config vars are NOT inherited by subprocesses
- The change prevents user confusion about OTEL env var inheritance behavior
- HTML remains valid
