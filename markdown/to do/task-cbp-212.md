# CBP-212 — Add `CLAUDE_CODE_ENABLE_AUTO_MODE=1` to Subprocess Sandboxing env vars table (v2.1.158)

## Summary

Claude Code v2.1.158 made auto mode available on Amazon Bedrock, Google Vertex AI, and Azure Foundry for Opus 4.7 and Opus 4.8. Users opt in by setting the `CLAUDE_CODE_ENABLE_AUTO_MODE=1` environment variable.

This is significant for enterprise teams running Claude Code via Bedrock or Vertex — auto mode previously required the standard Anthropic API.

## Assessment

The playbook's Subprocess Sandboxing collapsible contains a "Hardening env vars" table (around lines 10152–10171) that documents enterprise-facing environment variables. There is no mention of `CLAUDE_CODE_ENABLE_AUTO_MODE`. The Bedrock/Vertex Wizard section (around line 7005) documents the interactive setup wizard but not auto mode opt-in.

**Action needed:**
Add `CLAUDE_CODE_ENABLE_AUTO_MODE=1` to the hardening env vars table in the Subprocess Sandboxing collapsible.

## Plan

### Step 1 — Add row to the hardening env vars table

Find the end of the hardening env vars table (before the closing `</tbody></table>` tags, after the `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N` row). Add a new row for `CLAUDE_CODE_ENABLE_AUTO_MODE=1`.

**Old text (last row before closing tags):**
```html
<tr><td><code>CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N</code></td><td>Maximum number of consecutive stop-hook blocks before the turn ends with a warning. Default: <code>8</code>. Raise the cap if your stop hook legitimately needs more retry cycles; set to <code>1</code> to fail fast.</td></tr>
            </tbody>
```

**New text:**
```html
<tr><td><code>CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N</code></td><td>Maximum number of consecutive stop-hook blocks before the turn ends with a warning. Default: <code>8</code>. Raise the cap if your stop hook legitimately needs more retry cycles; set to <code>1</code> to fail fast.</td></tr>
              <tr><td><code>CLAUDE_CODE_ENABLE_AUTO_MODE=1</code></td><td>Opt in to auto mode on Amazon Bedrock, Google Vertex AI, and Azure Foundry. Enables auto mode for Opus 4.7 and Opus 4.8 on these platforms. Without this flag, auto mode is only available on the standard Anthropic API (v2.1.158).</td></tr>
            </tbody>
```

## Acceptance Criteria

- [ ] `CLAUDE_CODE_ENABLE_AUTO_MODE=1` appears in the hardening env vars table
- [ ] Description correctly identifies Bedrock, Vertex, Foundry and the models supported (Opus 4.7 and 4.8)
- [ ] Version reference v2.1.158 is included
- [ ] No existing rows are removed or broken
- [ ] HTML is valid
