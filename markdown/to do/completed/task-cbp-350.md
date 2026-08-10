# CBP-350 — [Claude] Extend `sandbox.credentials` row with masking modes (mask / extract / decode:jwt / awsPairs+sigv4)

## Source
Claude Code v2.1.221, extended v2.1.224

## Summary
Two related additions to sandbox credential handling:
- v2.1.221: `mode: "mask"` for sandbox credential files on Linux/WSL — sandboxed commands read a sentinel copy while the sandbox proxy substitutes the real value on egress (macOS falls back to `deny`).
- v2.1.224: extended with `extract`/`onExtractNoMatch` for structured env values, `decode: "jwt"` with `maskClaims` for JWT-aware masking, and `awsPairs`/`sigv4` for AWS SigV4 re-signing — these require `network.tlsTerminate`.

## Assessment
`fsad-playbook.html` line 11793, Power Usage → Subprocess Sandboxing → "Key settings.json keys" table, `sandbox.credentials` row:
```html
<tr><td><code>sandbox.credentials</code></td><td>Set to <code>false</code> to block sandboxed commands from reading credential files (e.g. <code>~/.aws/credentials</code>, <code>~/.ssh/id_rsa</code>) and secret environment variables. Recommended in high-security or shared CI environments where subprocess access to credentials must be prevented (v2.1.187).</td></tr>
```
Only documents the boolean block-read behavior — no mention of masking modes.

## Plan

### Step 1 — Extend the row at line 11793
```html
<tr><td><code>sandbox.credentials</code></td><td>Set to <code>false</code> to block sandboxed commands from reading credential files (e.g. <code>~/.aws/credentials</code>, <code>~/.ssh/id_rsa</code>) and secret environment variables. Recommended in high-security or shared CI environments where subprocess access to credentials must be prevented (v2.1.187). Beyond block/allow, credential files can be <strong>masked</strong> instead: <code>mode: "mask"</code> (Linux/WSL; macOS falls back to <code>deny</code>) has sandboxed commands read a sentinel copy while the sandbox proxy substitutes the real value on egress (v2.1.221). As of v2.1.224, masking supports <code>extract</code>/<code>onExtractNoMatch</code> for structured env values, <code>decode: "jwt"</code> with <code>maskClaims</code> for JWT-aware masking, and <code>awsPairs</code>/<code>sigv4</code> for AWS SigV4 re-signing — these require <code>network.tlsTerminate</code>.</td></tr>
```

## Acceptance Criteria
- `sandbox.credentials` row documents `mode: "mask"` (v2.1.221) and its macOS fallback
- Row documents `extract`/`onExtractNoMatch`, `decode: "jwt"` + `maskClaims`, and `awsPairs`/`sigv4` (v2.1.224), noting the `network.tlsTerminate` requirement
- HTML is valid
