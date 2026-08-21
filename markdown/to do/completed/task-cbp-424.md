# CBP-424 — [Claude] Plugin marketplace `headersHelper`

## Source
Claude Code v2.1.238 release notes:
- "Plugin marketplaces: `headersHelper` on a url marketplace or a catalog entry runs a command that mints HTTP headers (e.g. a short-lived token) for catalog and same-origin archive fetches."
- "A catalog entry's `headersHelper` runs only when you install or update that plugin, after its command is shown; `claude plugin install/update` ask `[y/N]` (or pass `-y`)."
- "MCP `headersHelper` in a project `.mcp.json` ... now require that folder's trust dialog to have been accepted (also under `claude -p`)."
- "MCP `headersHelper` from a project `.mcp.json`, plugin, or agent file runs without inherited credential env vars; user, managed and claude.ai-scope helpers now run from the Claude config dir."

## Summary
Plugin marketplaces gain a `headersHelper` mechanism: a command that mints HTTP headers (e.g. a short-lived auth token) for catalog and same-origin archive fetches, with a `[y/N]` confirmation on install/update and credential-isolation hardening. The Plugins collapsible (`id="power-usage--plugins"`, ~line 11675-11722+) already documents marketplace source types (`archive`, `command`) with the same versioned-bullet pattern this fits.

## Assessment
Content does not exist. The Plugins collapsible documents `archive`-type sources (v2.1.224, integrity via SHA-256) and `command`-type sources (v2.1.229) but nothing about `headersHelper` or HTTP header minting for catalog/archive fetches.

## Plan
1. In `fsad-playbook.html`, locate `id="power-usage--plugins"` bullet list (lines 11709-11714+, following the `archive`/`command`-source bullet pattern at lines 11711-11712).
2. Add a new `<li>` describing: a url marketplace or catalog entry can declare `headersHelper` — a command that mints HTTP headers (e.g. a short-lived token) for catalog and same-origin archive fetches. It runs only on install/update, after the command is shown, and `claude plugin install`/`update` prompt `[y/N]` (or accept `-y`). It runs without inherited credential env vars for project/plugin/agent-file scope; user/managed/claude.ai-scope helpers run from the Claude config dir. Tag `(v2.1.238)`.
3. Match the existing bullet style (bold lead term, e.g. `<strong>Marketplace headersHelper:</strong> ...`).

## Acceptance Criteria
- [ ] New bullet documents `headersHelper` for marketplaces/catalog entries, the install/update confirmation flow, and the credential-isolation behavior, tagged `(v2.1.238)`.
- [ ] Bullet placed among the other marketplace-source bullets (near `archive`/`command` source bullets).
- [ ] No existing bullets removed or altered.
