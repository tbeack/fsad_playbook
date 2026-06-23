# CBP-270 — Document rollout token budgets in Codex Power Usage section

## Summary

Codex rust-v0.142.0 introduced configurable rollout token budgets: a per-agent-thread budget that tracks token usage across the thread, provides remaining-budget reminders as the budget runs low, and aborts turns when exhausted. This is a meaningful feature for teams managing cost across large multi-agent Codex workflows — particularly useful in CI/CD pipelines or scheduled agents where uncontrolled token spend is a concern.

## Assessment

The Codex Power Usage section (page-codex, starting at line 12690) does not document rollout token budgets. The "Multi-Agent Workflows" collapsible at line 12695 covers `max_threads`, `max_depth`, and `job_max_runtime_seconds` config but says nothing about token budgets. Adding a note about rollout token budgets to the Multi-Agent Workflows collapsible is the best fit since token budgets are applied at the agent-thread level and complement the existing concurrency settings.

## Plan

1. Read `fsad-playbook.html` lines 12694–12720 to confirm the Multi-Agent Workflows collapsible structure.
2. After the existing "Batch processing" `<p>` tag in the Multi-Agent Workflows collapsible body (before the `</div></div>` close), add a new paragraph:
   ```html
   <p style="margin-top:1rem;"><strong>Rollout token budgets (v0.142.0):</strong> Configure a per-thread token budget to track and cap usage across agent threads. When nearing the limit, Codex surfaces remaining-budget reminders; turns are aborted automatically when the budget is exhausted. Set in <code>config.toml</code> under <code>[agents]</code>:</p>
   <div class="code-block" style="margin-top:0.75rem;">
     <pre><code><span class="cm"># ~/.codex/config.toml</span>
   <span class="kw">[agents]</span>
   <span class="val">rollout_token_budget</span> = 100000    <span class="cm"># abort turn when exceeded</span>
   <span class="val">rollout_budget_reminder_threshold</span> = 0.8  <span class="cm"># warn at 80% consumed</span></code></pre>
   </div>
   ```
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- Rollout token budgets are documented in the Multi-Agent Workflows collapsible in the Codex Power Usage section.
- The config.toml keys (`rollout_token_budget`, `rollout_budget_reminder_threshold`) are shown in a code block.
- Version annotation (v0.142.0) is included.
- No other content changed.
