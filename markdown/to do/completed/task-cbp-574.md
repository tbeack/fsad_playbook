# CBP-574 — Update `otelHeadersHelper` note: startup warning on failure (v2.1.275)

**Source:** Claude Code v2.1.275
**Tag:** [Claude]

## Summary
v2.1.275 adds a startup warning when a configured `otelHeadersHelper` fails, so sessions that silently export no telemetry are noticed.

## Assessment
`otelHeadersHelper` is documented in two places in `src/pages/practices.html`: the "Notable settings.json Keys" callout (which points to the Monitoring section) and the Monitoring collapsible's "Dynamic auth" bullet. Both need the v2.1.275 addition to stay in sync, matching how the v2.1.193 reconnect behavior was documented in both spots.

## Plan
1. Open `src/pages/practices.html`
2. Append the startup-warning note to the `otelHeadersHelper` entry in Notable settings.json Keys
3. Append the same note to the "Dynamic auth" bullet in the Monitoring collapsible
4. Mark CBP-574 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- Both `otelHeadersHelper` locations mention the v2.1.275 startup warning
- Build passes without errors
