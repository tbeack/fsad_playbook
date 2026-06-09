# CBP-244 — Add `API_FORCE_IDLE_TIMEOUT=0` to Subprocess Sandboxing env vars table

## Summary
Claude Code v2.1.169 restored a default 5-minute idle timeout on Vertex AI and Foundry deployments. If a stream stalls (e.g. a hung API call), it will now abort automatically after 5 minutes instead of hanging indefinitely. Teams that need to opt out of this timeout (e.g. long-running batch jobs) can set `API_FORCE_IDLE_TIMEOUT=0`.

## Assessment
`API_FORCE_IDLE_TIMEOUT` is not present in the playbook. It should be added to the hardening env vars table in the Subprocess Sandboxing collapsible, alongside the other deployment-specific env vars.

## Plan

### Step 1 — Add to Subprocess Sandboxing hardening env vars table
In the hardening env vars table (last row is `CLAUDE_CODE_ENABLE_AUTO_MODE` at line 10609), add after the new entries from CBP-240 and CBP-242:

```html
<tr><td><code>API_FORCE_IDLE_TIMEOUT=0</code></td><td>Opt out of the default 5-minute idle timeout on Vertex AI and Foundry. By default, a stalled stream is aborted after 5 minutes; set to <code>0</code> to disable the timeout for long-running batch jobs or custom streaming pipelines.</td></tr>
```

## Acceptance Criteria
- `API_FORCE_IDLE_TIMEOUT=0` row appears in the hardening env vars table of the Subprocess Sandboxing collapsible
- Description explains the 5-minute Vertex/Foundry idle timeout default and the opt-out use case
