# CBP-246: Update Bedrock setup note — AWS region fallback from ~/.aws config

## Summary
Claude Code v2.1.172: Amazon Bedrock now reads the AWS region from `~/.aws` config files when `AWS_REGION` isn't set, matching AWS SDK precedence. The `/status` command now shows where the region came from (env var vs config file).

## Assessment
The playbook's Bedrock/Vertex setup note (line 8657) reads:
"Running Claude Code with Amazon Bedrock or Google Vertex AI? Use the interactive setup wizard..."
It mentions `AWS_REGION` in the env vars table (line 12665) but does not describe the fallback behavior. The setup note should be updated to mention that `AWS_REGION` env var is no longer required if `~/.aws/config` specifies a region, and `/status` shows where the region came from.

**Location:** Line ~8657, near `Setting Up MCP Connections via /plugin` heading search area. The Bedrock setup note is a `<p>` tag containing "Running Claude Code with Amazon Bedrock".

## Plan
1. Read line 8657 context to get exact text.
2. Append a sentence: "If `AWS_REGION` is not set, Bedrock now reads the region from `~/.aws/config` (matching AWS SDK precedence) — run `/status` to see which source is active."
3. Also update the env vars table row for `AWS_REGION` to note it's optional if `~/.aws/config` sets a region.

## Acceptance Criteria
- The Bedrock setup paragraph notes the `~/.aws/config` fallback.
- The env vars table `AWS_REGION` row is updated to note it is optional when `~/.aws/config` specifies the region.
