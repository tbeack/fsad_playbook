# CBP-352 — [Claude] Add `ANTHROPIC_BEDROCK_REGION_PREFIX` env var to hardening table

## Source
Claude Code v2.1.224

## Summary
v2.1.224 added `ANTHROPIC_BEDROCK_REGION_PREFIX` for Bedrock, to prefer a specific cross-region inference profile over the `AWS_REGION`-derived one.

## Assessment
`fsad-playbook.html` line 11808, Power Usage → Subprocess Sandboxing → "Hardening env vars" table, sibling row `ANTHROPIC_BEDROCK_SERVICE_TIER`:
```html
<tr><td><code>ANTHROPIC_BEDROCK_SERVICE_TIER</code></td><td>Select Bedrock service tier: <code>default</code> | <code>flex</code> | <code>priority</code>. Sent as the <code>X-Amzn-Bedrock-Service-Tier</code> header. Use <code>priority</code> for provisioned-capacity deployments.</td></tr>
```

## Plan

### Step 1 — Insert a new row after line 11808
```html
<tr><td><code>ANTHROPIC_BEDROCK_REGION_PREFIX</code></td><td>Have Bedrock prefer a specific cross-region inference profile over the one derived automatically from <code>AWS_REGION</code>. Set to the desired region prefix (e.g. <code>us</code>, <code>eu</code>) (v2.1.224).</td></tr>
```

## Acceptance Criteria
- `ANTHROPIC_BEDROCK_REGION_PREFIX` row present in the hardening env vars table, next to `ANTHROPIC_BEDROCK_SERVICE_TIER`
- HTML is valid
