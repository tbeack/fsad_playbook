# CBP-469 — Subprocess Sandboxing: malformed `&&`/`||` commands always require approval

## Summary
Claude Code v2.1.246 fixed Bash permission checks to always require approval for malformed commands with a dangling `&&` or `||` operator — closing a permission-check gap where a syntactically-broken compound command could previously bypass the intended approval flow.

## Assessment
The Subprocess Sandboxing collapsible's opening paragraph (line 12541) already documents a similar Bash-permission-checking nuance — the v2.1.238 zsh-conditional-syntax fix ("Bash tool permission checking was also improved for zsh-specific syntax in shell conditionals, reducing false permission prompts..."). The new v2.1.246 fix is the same category of content (permission-check edge-case hardening) and fits directly alongside it.

## Plan
1. In `fsad-playbook.html`, locate the Subprocess Sandboxing intro paragraph (line 12541):
   ```html
   <p>Claude Code supports OS-level sandboxing that restricts what Bash subprocesses can read, write, and reach on the network — enforced by <strong>Seatbelt</strong> on macOS and <strong>bubblewrap</strong> on Linux / WSL2. Run <code>/sandbox</code> to enable it and choose a mode. Linux and WSL2 users must first install the required packages: <code>sudo apt-get install bubblewrap socat</code> (Ubuntu/Debian) or <code>sudo dnf install bubblewrap socat</code> (Fedora). Bash tool permission checking was also improved for zsh-specific syntax in shell conditionals, reducing false permission prompts for zsh-style conditional commands (v2.1.238).</p>
   ```
2. Append a sentence documenting the v2.1.246 fix:
   ```html
   <p>...Bash tool permission checking was also improved for zsh-specific syntax in shell conditionals, reducing false permission prompts for zsh-style conditional commands (v2.1.238). As of v2.1.246, Bash permission checks always require approval for malformed commands with a dangling <code>&amp;&amp;</code> or <code>||</code> operator, closing a gap where a syntactically-broken compound command could otherwise skip the intended approval flow.</p>
   ```

## Acceptance Criteria
- [ ] Subprocess Sandboxing intro paragraph documents the v2.1.246 dangling-operator fix.
- [ ] Paragraph remains a single well-formed `<p>`.
