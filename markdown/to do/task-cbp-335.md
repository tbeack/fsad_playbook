# CBP-335 — Update `--forward-subagent-text` row for depth-2+ nested subagent forwarding

**Source:** Claude Code v2.1.219
**Date:** 2026-07-25

## Summary

Claude Code v2.1.219 enhanced `--forward-subagent-text` so that subagents spawned at depth-2+ (nested subagents) now also appear in stream-json output when the flag is set. Each nested subagent event is keyed by its spawning Agent `tool_use` id.

## Assessment

**Does this content exist in the playbook? Where?**

The `--forward-subagent-text` row is at line 10229 in the Print/programmatic mode CLI flags table:
```
<tr><td><code>--forward-subagent-text</code></td><td>Include subagent text and thinking in stream-json output. Env var: <code>CLAUDE_CODE_FORWARD_SUBAGENT_TEXT=1</code> (v2.1.211).</td></tr>
```

The current description only covers depth-1 subagents. The v2.1.219 enhancement to include depth-2+ nested subagents is not mentioned.

**What needs to change:**
Update the description to mention that nested subagents (depth-2+) are also included, keyed by their spawning Agent `tool_use` id.

## Plan

### Step 1: Update the existing row at line 10229
Replace the current description with an updated one:
```html
<tr><td><code>--forward-subagent-text</code></td><td>Include subagent text and thinking in stream-json output. As of v2.1.219, nested subagents spawned at depth-2+ are also included, each keyed by their spawning Agent <code>tool_use</code> id — useful for automated pipelines that need full visibility into deeply-nested agentic activity. Env var: <code>CLAUDE_CODE_FORWARD_SUBAGENT_TEXT=1</code> (v2.1.211).</td></tr>
```

## Acceptance Criteria
- The `--forward-subagent-text` row description includes the depth-2+ nested subagent forwarding behavior
- The `tool_use` id keying detail is mentioned
- The original env var note and v2.1.211 attribution are preserved
- HTML is valid
