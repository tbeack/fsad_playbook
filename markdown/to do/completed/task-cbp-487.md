# CBP-487 — Extend Self-Hosted Runner section with `--client-label`

## Summary
Claude Code v2.1.248 added `claude self-hosted-runner --client-label <label>` (or `SELF_HOSTED_RUNNER_CLIENT_LABEL`) to override the label the runner registers with (default: hostname).

## Assessment
The Self-Hosted Runner collapsible in `src/pages/practices.html` (~line 2505-2524) has a code block showing `claude self-hosted-runner` flags added over time (`--defer-shutdown-max-min` and `--proxy-authorization-command`/`--proxy-authorization-file`, both v2.1.238). `--client-label` is the same kind of flag and belongs in the same code block.

## Plan
1. In `src/pages/practices.html`, locate the self-hosted-runner code block (~line 2512-2520).
2. Add a new example line after the `--proxy-authorization-command` line:
   ```html

   <span class="cm"># Override the registered runner label instead of using the hostname (v2.1.248)</span>
   <span class="kw">claude</span> self-hosted-runner <span class="val">--client-label</span> <span class="str">"ci-runner-3"</span></code></pre>
   ```
   (adjust the closing `</code></pre>` so it only appears once, at the end of the block).

## Acceptance Criteria
- [x] `--client-label` / `SELF_HOSTED_RUNNER_CLIENT_LABEL` documented in the Self-Hosted Runner code example.
