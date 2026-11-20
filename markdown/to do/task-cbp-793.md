# CBP-793: Add Code Mode + OpenTelemetry note to Power Usage collapsible (v2.1.329)

## Summary
Claude Code v2.1.329 added support for turning on Code Mode while OpenTelemetry events and metrics are enabled; each tool call the code makes sends its events, while tracing still keeps Code Mode off.

## Assessment
`src/pages/practices.html`'s Code Mode collapsible (~line 2461, Power Usage section) was last updated for v2.1.326's agent-teams interaction but doesn't mention this OpenTelemetry interaction, which matters for orgs running telemetry alongside Code Mode.

## Plan
1. Open `src/pages/practices.html`.
2. In the Code Mode collapsible's opening paragraph, append after the existing v2.1.326 sentence:
   ```
    As of v2.1.329, Code Mode can also be turned on while OpenTelemetry events and metrics are enabled — each tool call the code makes sends its events; tracing still keeps Code Mode off.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Code Mode collapsible documents the v2.1.329 OpenTelemetry interaction.
- HTML is valid (no unclosed tags).

## Status
Implemented.
