# CBP-096 — Add `ANTHROPIC_BEDROCK_SERVICE_TIER` env var to Subprocess Sandboxing / Bedrock section (v2.1.122)

## Summary
Claude Code v2.1.122 added the `ANTHROPIC_BEDROCK_SERVICE_TIER` environment variable to select a Bedrock service tier: `default`, `flex`, or `priority`. It is sent as the `X-Amzn-Bedrock-Service-Tier` header. This is relevant to enterprise teams using AWS Bedrock with provisioned capacity tiers.

## Assessment
The playbook has a Subprocess Sandboxing collapsible in Power Usage that lists env vars (DISABLE_UPDATES, CLAUDE_CODE_HIDE_CWD, etc.). The Bedrock/Vertex interactive setup wizard note is in the Getting Started section (~line 3840).

Neither section currently mentions `ANTHROPIC_BEDROCK_SERVICE_TIER`. The most appropriate place is the Subprocess Sandboxing env vars table (which already lists deployment-related env vars) or a note near the Bedrock setup wizard callout.

The Subprocess Sandboxing env vars table is at approximately lines 7023–7040 (contains CLAUDE_CODE_HIDE_CWD, DISABLE_UPDATES, etc.). The Bedrock note at line 3840 is in Getting Started.

Best placement: add to the Subprocess Sandboxing env vars table alongside other enterprise/deployment env vars, since teams using Bedrock are already configuring env vars there.

## Plan
1. Read lines 7020–7045 to find the exact env vars table in Subprocess Sandboxing.
2. Add a new row for `ANTHROPIC_BEDROCK_SERVICE_TIER` after the existing Bedrock-related content (or at end of env vars list).

### HTML row to add
```html
<tr><td><code>ANTHROPIC_BEDROCK_SERVICE_TIER</code></td><td>Select Bedrock service tier: <code>default</code> | <code>flex</code> | <code>priority</code>. Sent as the <code>X-Amzn-Bedrock-Service-Tier</code> header. Use <code>priority</code> for provisioned-capacity deployments.</td></tr>
```

## Acceptance Criteria
- `ANTHROPIC_BEDROCK_SERVICE_TIER` appears in the env vars table with tier options documented
- No existing rows are changed
- The env vars table HTML remains valid
