# CBP-117 — Add HTTP Hooks (Webhooks) & Managed Web Agents section

## Source
User request: add a section covering Claude Webhooks (HTTP hook type) from https://code.claude.com/docs/en/hooks-guide and Managed Web Agents from https://platform.claude.com/docs/en/managed-agents/overview, with examples, use cases, and gotchas. Task explicitly asked for Research first, then plan.

## Summary
The playbook lacks dedicated coverage of two cloud-integration patterns: (1) HTTP hooks — the `type: "http"` hook that POSTs event data to external endpoints, enabling webhook-style integrations with audit services, Slack, CI/CD, and approval workflows; (2) Managed Web Agents — Anthropic's beta platform API for running Claude as a cloud-hosted autonomous agent for long-running tasks without building your own agent loop. A new section "15.5 — HTTP Hooks & Managed Web Agents" should be inserted between the existing Hooks (15) and Monitoring (16) sections.

## Assessment
**Existing hooks section coverage (section 15, `#hooks-deep-dive`):**
- Already lists `http` as one of five hook types in the "Five Hook Types" table (line 7053)
- Shows one HTTP hook config snippet (lines 7072–7077)
- No expanded discussion of HTTP hooks: no use cases, no gotchas, no real-world patterns

**Managed Web Agents:**
- Entirely absent from the playbook
- Anthropic beta API (requires `managed-agents-2026-04-01` header)
- 4 core concepts: Agent, Environment, Session, Events
- Supports Bash, file ops, web search, MCP servers
- Rate limits: 300 create/min, 600 read/min
- SDK handles beta header automatically

**Section numbering:** After Hooks (15) and before Monitoring (16). New section label: `15.5 — HTTP Hooks & Managed Web Agents`. Section ID: `cloud-integrations`.

**Location for insertion:** `fsad-playbook.html` — after closing `</section>` of `hooks-deep-dive` (~line 7409), before `<section id="monitoring">` (~line 7410).

**Nav location:** Left sidebar, under Claude Best Practices, after the `hooks-deep-dive` nav entry. Pattern matches existing nav sub-items.

## Plan

### Phase 1 — Research (done in plan mode)
- [x] Fetch https://code.claude.com/docs/en/hooks-guide — full HTTP hook syntax, all 26 events, practical recipes
- [x] Fetch https://platform.claude.com/docs/en/managed-agents/overview — concepts, rate limits, tooling, beta status

### Phase 2 — Research (execute mode: novel use cases)
1. Web-search for real-world community examples of HTTP hooks and Managed Web Agents in production — aim for 3–5 novel patterns not in the official docs.

### Phase 3 — Write new HTML section
Insert a new `<section id="cloud-integrations">` block after the closing `</section>` of `hooks-deep-dive` (before `<section id="monitoring">`). The section contains three collapsibles:

**Collapsible A — HTTP Hooks (Webhook Integrations)**
- Opening prose: what HTTP hooks are and why they matter (server doesn't need to be co-located, enables team-wide shared services)
- Config schema snippet (url, headers with `$ENV_VAR` interpolation, allowedEnvVars)
- Three recipe cards:
  1. Team audit log service (PostToolUse → POST to shared logging endpoint)
  2. Slack notification on session end (Stop hook → POST to Slack webhook URL)
  3. External approval gateway (PreToolUse → POST to approval service; block via JSON body, not HTTP status)
- Callout: "What to watch out for" — 4 gotchas:
  - Cannot block via HTTP status codes alone (must return JSON body)
  - `allowedEnvVars` list required for env interpolation in headers
  - Default timeout 10 min — set per-hook `timeout` field explicitly for fast gates
  - Endpoints must return 2xx; non-2xx causes hook error (action still proceeds)

**Collapsible B — Managed Web Agents**
- Opening prose: what Managed Web Agents are (pre-built cloud harness vs. Messages API DIY loop)
- Comparison table: Messages API vs. Managed Web Agents (from official docs)
- 4 core concepts table: Agent, Environment, Session, Events
- Quick-start code example (Python SDK: create agent → create env → start session → send event → stream SSE)
- Use cases section with 4 scenarios:
  1. CI pipeline code review (long-running, triggered on PR)
  2. Scheduled maintenance tasks (cron → managed agent session)
  3. Customer-facing AI features (product embeds managed agent per user)
  4. Bulk data processing (parallel sessions, each handles a file/chunk)
- Callout: "What to watch out for" — 5 gotchas:
  - Beta: requires `managed-agents-2026-04-01` header (SDK sets automatically)
  - Rate limits: 300 create/min, 600 read/min
  - Not for fine-grained control — use Messages API for custom agent loops
  - Container environments vary — specify packages in Environment config
  - Outcomes and multiagent features require separate access request

**Collapsible C — Novel Patterns & Community Use Cases**
- 4–6 novel real-world patterns discovered during execute-mode research
- Each as a brief "pattern card": Problem → Hook/Agent solution → Key config

### Phase 4 — Update left nav
Add a nav entry for `cloud-integrations` in the sidebar under Claude Best Practices, after the `hooks-deep-dive` entry. Match existing nav sub-item pattern:
```html
<a class="nav-sub-item" href="#practices/cloud-integrations" onclick="scrollToSection('cloud-integrations')">HTTP Hooks & Web Agents</a>
```

### Phase 5 — Update sectionToPageMap in JS router
Add `'cloud-integrations': 'practices'` to the `sectionToPageMap` object (search for existing entries to find location).

### Phase 6 — Update search index
Add the new section's key terms to the search data array (`searchData`) so the content is discoverable. Match existing search entry pattern.

### Phase 7 — CHANGELOG + version bump
- Add entry to CHANGELOG.md under the next unreleased block
- Bump version in `fsad-playbook.html` `<title>` tag from v49 to v50
- Bump version in `README.md` version table

All criteria verified 2026-05-06 before commit.

## Acceptance Criteria
- [x] New section exists at `#practices/cloud-integrations` and scrolls correctly from the nav
- [x] HTTP Hooks collapsible includes the 3-recipe set and the "what to watch out for" callout
- [x] Managed Web Agents collapsible includes the comparison table, 4 core concepts, Python code example, and gotchas
- [x] Novel Patterns collapsible includes at least 3 real-world patterns from execute-mode research
- [x] Left nav entry "HTTP Hooks & Web Agents" appears under Claude Best Practices and links correctly
- [x] `sectionToPageMap` includes `'cloud-integrations': 'practices'` so deep links and search navigation work
- [x] Search index updated with key terms from the new section
- [x] `fsad-playbook.html` title shows v50
- [x] `README.md` version table row added for v50
- [x] `CHANGELOG.md` entry written for CBP-117
