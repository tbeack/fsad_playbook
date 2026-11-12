# CBP-718: `self-hosted-runner` — add `--hold-idle-file` and `--max-hold-min` (v2.1.311)

## Summary
Claude Code v2.1.311 adds two new flags to `claude self-hosted-runner`: `--hold-idle-file` and `--max-hold-min`. Together they let a runner stay registered as idle while the host machine still has processes the runner left running (e.g. a long-lived dev server a session started), instead of the runner being torn down or marked idle prematurely. `--max-hold-min` presumably bounds how long the idle hold can persist.

## Assessment
`src/pages/practices.html` has a "Self-Hosted Runner" collapsible (`id="power-usage--self-hosted-runner"`, around line 2471) that documents `claude self-hosted-runner` and its flags (`--defer-shutdown-max-min` from v2.1.238, `--proxy-authorization-command`/`--proxy-authorization-file` from v2.1.238, `--client-label` from v2.1.248) in a code block, each flag with a one-line comment citing its version. This is the right place to add the new flags in the same style.

## Plan
1. Open `src/pages/practices.html`.
2. In the `power-usage--self-hosted-runner` code block (after the `--client-label` example), add a new example:
   ```
   # Keep the runner marked idle while it reports processes left running on the host, up to N minutes (v2.1.311)
   claude self-hosted-runner --hold-idle-file <path> --max-hold-min <N>
   ```

## Acceptance Criteria
- The self-hosted-runner code block documents `--hold-idle-file` and `--max-hold-min`.
- Version-tagged `(v2.1.311)`.
- Existing flag documentation (`--defer-shutdown-max-min`, `--proxy-authorization-command`, `--client-label`) preserved unchanged.
