# CBP-583 — Update `CLAUDE_CODE_AUTO_MODE_SERVER` Env Var Row: Default Now Server-Side

## Summary

Claude Code v2.1.278 changed the default auto mode classifier behavior. Previously (v2.1.273): local classifier by default on Bedrock/Vertex/Foundry; set `=1` to switch to server-side. Now (v2.1.278): server-side classifier is the **default** for Claude API and Enterprise users, and on Bedrock, Vertex, Foundry, and gateways. `CLAUDE_CODE_AUTO_MODE_SERVER=0` opts out. Warns on billed fallback.

## Assessment

The current row in `src/pages/practices.html` at line 2823:

```
<tr><td><code>CLAUDE_CODE_AUTO_MODE_SERVER=1</code></td><td>On Bedrock, Vertex AI, and Foundry, auto mode uses the <strong>local</strong> permission classifier by default as of v2.1.273. Set this var to switch to the cloud platform's own server-side classifier — useful when that platform's classifier is tuned for your organization's policies (v2.1.273).</td></tr>
```

This is now incorrect in two ways:
1. The env var key should be `CLAUDE_CODE_AUTO_MODE_SERVER=0` (opt-out, not opt-in).
2. The default is now server-side (not local) for all listed platforms plus Claude API/Enterprise.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `CLAUDE_CODE_AUTO_MODE_SERVER=1` row at line 2823.
3. Replace the entire `<tr>` with:

```html
<tr><td><code>CLAUDE_CODE_AUTO_MODE_SERVER=0</code></td><td>As of v2.1.278, auto mode defaults to the <strong>server-side</strong> classifier for Claude API and Enterprise users, and on Bedrock, Vertex AI, Foundry, and gateways — the server classifier does not charge for classifier overhead. Set this var to <code>0</code> to opt out and use the local classifier instead. Claude Code warns when a billed fallback occurs. See the <a href="https://code.claude.com/docs/en/auto-mode-classifier-billing" target="_blank" rel="noopener">auto-mode classifier billing</a> docs. (Previously, v2.1.273: local classifier was the default on Bedrock/Vertex/Foundry; <code>=1</code> switched to server-side.)</td></tr>
```

## Acceptance Criteria

- The env var key in `<code>` is now `CLAUDE_CODE_AUTO_MODE_SERVER=0`.
- The description accurately states server-side is the new default.
- The description mentions `=0` as the opt-out.
- Version `v2.1.278` is cited.
- The old v2.1.273 behavior is preserved as a parenthetical history note.
