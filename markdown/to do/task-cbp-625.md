# CBP-625: Extend Auto Mode default-starting-mode callout to `claude -p`/Python Agent SDK (v2.1.285)

## Summary

v2.1.285 changed `claude -p` and Python Agent SDK sessions on third-party providers or with telemetry off to start in auto mode when no permission mode is configured, like interactive sessions; `--permission-mode` still overrides it. This extends the v2.1.284 change (interactive terminal/VS Code sessions starting in auto mode by default on every plan/provider) to headless and SDK sessions in this narrower case.

## Assessment

- `src/pages/practices.html`'s "Auto Mode Is Now the Default Starting Mode" callout (Permission Modes section, ~line 2124-2127) currently only describes interactive terminal and VS Code sessions (CBP-611, v2.1.284). It needs a second sentence covering the v2.1.285 extension.

## Plan

1. In `src/pages/practices.html`, in the "Auto Mode Is Now the Default Starting Mode" callout, insert a new sentence after the existing v2.1.284 sentence and before the `permissions.defaultMode` sentence:
   `As of v2.1.285, <code>claude -p</code> and Python Agent SDK sessions on third-party providers or with telemetry off start in auto mode the same way when no permission mode is configured, matching interactive sessions; <code>--permission-mode</code> still overrides it.`

## Acceptance Criteria

- The Auto Mode callout documents the v2.1.285 extension to `claude -p` and Python Agent SDK sessions.
