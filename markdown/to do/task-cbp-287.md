# CBP-287 — Add `CLAUDE_ENABLE_STREAM_WATCHDOG=0` to hardening env vars table (v2.1.196)

## Summary

Claude Code v2.1.196 enabled the streaming idle watchdog by default for **all providers**. Previously the watchdog was not default-on. Now, when a response stream produces no events for 5 minutes, the session aborts and retries automatically. Users who need to opt out (e.g. very long-running streaming batch jobs, or custom streaming pipelines that send intermittent events) can set `CLAUDE_ENABLE_STREAM_WATCHDOG=0`.

Release note: "The streaming idle watchdog is now on by default for all providers — it aborts and retries when a response stream produces no events for 5 minutes. Set `CLAUDE_ENABLE_STREAM_WATCHDOG=0` to disable."

Note: `API_FORCE_IDLE_TIMEOUT=0` (already documented at line 10723) is a related but distinct setting — it controls the idle timeout specifically on Vertex AI and Foundry deployments. The stream watchdog operates at the Claude Code client layer and covers all providers including the standard Anthropic API.

## Assessment

The env var `CLAUDE_ENABLE_STREAM_WATCHDOG` does **not** appear anywhere in `fsad-playbook.html`. The hardening env vars table (starting at line 10704) is the correct home for this row — it documents env vars useful in shared environments and CI/CD. The most recent row added was `CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1` at line 10728.

## Plan

1. Read lines 10725–10730 of `fsad-playbook.html` to confirm exact context around the last row.
2. Insert a new `<tr>` row after line 10728 (after the `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` row, before `</tbody>`):
   ```html
   <tr><td><code>CLAUDE_ENABLE_STREAM_WATCHDOG=0</code></td><td>Disables the streaming idle watchdog, which is on by default for all providers. By default, Claude Code aborts and retries a response stream that produces no events for 5 minutes — set this to <code>0</code> to opt out for long-running streaming batch jobs or custom pipelines with intermittent event patterns. Distinct from <code>API_FORCE_IDLE_TIMEOUT=0</code>, which controls the idle timeout on Vertex AI and Foundry only (v2.1.196).</td></tr>
   ```
3. Mark CBP-287 complete in `todo.md`.

## Acceptance Criteria

- `CLAUDE_ENABLE_STREAM_WATCHDOG` appears in the hardening env vars table.
- The description distinguishes it from `API_FORCE_IDLE_TIMEOUT=0`.
- The row is the last entry in the table (after `CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1`).
- No existing rows are modified.
