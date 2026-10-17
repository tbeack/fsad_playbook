# CBP-697 — Update "Auto Mode Is Now the Default Starting Mode" callout

## Summary

Claude Code v2.1.302 changed how `claude -p` and Agent SDK sessions pick their starting permission mode on third-party providers (with telemetry off or on a fresh install). Previously, v2.1.285 made them start in **auto** mode to match interactive sessions. v2.1.302 reverses this for those specific cases: they now start in **default** mode instead. `--permission-mode auto` still forces auto mode.

## Assessment

The current callout at line ~2021 of `src/pages/practices.html` says `claude -p` and "Python Agent SDK" sessions "start in auto mode the same way when no permission mode is configured." This is now wrong for the v2.1.302 conditions. The text needs updating to:
- Correct "Python Agent SDK" to "Agent SDK"
- Change "auto mode" to "default mode" for the third-party/telemetry-off/fresh-install case
- Add that `--permission-mode auto` keeps auto

## Plan

1. Open `src/pages/practices.html`.
2. Find the callout paragraph starting with "As of v2.1.284" (line ~2021).
3. Replace the sentence starting "As of v2.1.285" with an updated version:

Current text (approximate):
```
As of v2.1.285, <code>claude -p</code> and Python Agent SDK sessions on third-party providers or with telemetry off start in auto mode the same way when no permission mode is configured, matching interactive sessions; <code>--permission-mode</code> still overrides it.
```

New text:
```
As of v2.1.285, <code>claude -p</code> and Agent SDK sessions on third-party providers or with telemetry off started in auto mode when no permission mode was configured, matching interactive sessions. As of v2.1.302, those sessions start in <strong>default</strong> mode instead on third-party providers, with telemetry off, or on a fresh install. Use <code>--permission-mode auto</code> to keep auto mode. <code>permissions.defaultMode</code> in <code>settings.json</code> overrides the default for any session.
```

4. Save the file.

## Acceptance Criteria

- The callout no longer says `claude -p` and Agent SDK sessions start in "auto mode" for third-party providers.
- The callout says "default mode" for those sessions on third-party providers, with telemetry off, or fresh install.
- The callout notes that `--permission-mode auto` keeps auto.
- "Python Agent SDK" is replaced with "Agent SDK".
