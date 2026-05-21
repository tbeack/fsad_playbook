# CBP-151 — Add Natural Language Search & Q&A (Haiku Approach)

## Source
AIR-005 research output: `/Users/theobeack/Repo/ai_research/planning/research/cheap-llm-playbook-qa.md`
User request: add Q&A layer to the playbook so users can ask natural-language questions and get direct answers.

## Summary
Add a Q&A feature to the playbook using Claude Haiku 4.5 with prompt caching. The entire playbook is stripped of HTML tags and sent as context to Haiku; a proxy server holds the API key so it is never exposed in the distributed HTML file. The Q&A UI lives in `fsad-playbook.html` as a persistent overlay.

## Assessment

### Critical constraint — API key security
The playbook is a single self-contained HTML file shared with a group. Embedding an API key in the HTML would expose it to every recipient. **This must be resolved before implementation can begin.**

Three viable options ranked by suitability:

| Option | Mechanism | Key exposure | Infrastructure |
|--------|-----------|-------------|----------------|
| A — Cloudflare Worker proxy (**recommended**) | Thin Worker proxies requests to Anthropic; key in CF encrypted env vars | Never in HTML | CF account + 1 Worker deploy |
| B — User-supplied key (localStorage) | Each user pastes their own key into a settings panel | Per-user key in browser storage | None |
| C — Hosted Node/Python proxy | Full server app; key in server env | Never in HTML | VPS / Render / Railway |

**Recommendation: Option A (Cloudflare Worker).**
- Free tier: 100 K requests/day — more than adequate for a team.
- Deployment is ~5 min (wrangler CLI or CF dashboard paste).
- CORS origin restriction can limit calls to the playbook's domain.
- API key lives only in CF's encrypted env vars; not visible in the HTML.
- If Theo does not want any external infrastructure, fallback is Option B (user-supplied key). In that case the Q&A UI adds a one-time setup step but no hosted service is required.

**Decision gate:** Theo must confirm Option A or B before Phase 2 implementation begins.

### Playbook content
Current file: `fsad-playbook.html` (~692 K chars, ~150–200 K tokens raw HTML).
Stripping HTML tags reduces the token count by ~30%, to roughly 105–140 K tokens — well within Haiku's 200 K context window.

**Text extraction:** A Python script will strip tags at build time and embed the result as a JS string in the built HTML (similar to how playgrounds are inlined today).

### Existing search UI
Current search is a sidebar input with a popover overlay (CBP-010/CBP-050). The Q&A panel should be a **distinct UI affordance** — a "Ask a question" button in the top nav that opens a separate modal, so it does not conflict with keyword search.

**Location:** `fsad-playbook.html` — top `<header>` nav bar (alongside theme toggle), and a new `<div id="qa-panel">` overlay.

## Plan

### Phase 0 — API Key Security Decision (do first; gate on user confirmation)

1. Present Option A vs Option B to user and get explicit confirmation.
2. If Option A: write `proxy/worker.js` (Cloudflare Worker script) and `proxy/README.md` deployment guide.
3. If Option B: design a key-entry settings panel (first-use prompt + localStorage persistence).
4. Either path: the proxy URL (A) or key-entry flow (B) is stored in a single JS config constant at the top of the `<script>` block in `fsad-playbook.html` so future operators can reconfigure easily.

### Phase 1 — Playbook Text Extraction

5. Write `scripts/extract-playbook-text.py`:
   - Parse `fsad-playbook.html` with `html.parser` (stdlib — no deps).
   - Strip `<script>`, `<style>`, `<svg>` blocks entirely (not just tags).
   - Strip remaining HTML tags; collapse whitespace.
   - Output: `dist/playbook-text.txt` (for inspection) and `dist/playbook-text.json` (`{"text": "..."}`) for embedding.
6. Update `scripts/build-dist.py` to call the extraction script and inline the JSON blob as a JS const `PLAYBOOK_TEXT` in the built `dist/fsad-playbook.html`.
   - Source `fsad-playbook.html` does NOT embed the text — only `dist/` does.
   - This keeps the source file clean and the dist self-contained.

### Phase 2 — Q&A UI in fsad-playbook.html

7. Add an "Ask" button (magnifying-glass-with-speech-bubble icon or similar) to the top nav bar, alongside the theme toggle.
8. Write `<div id="qa-panel">` overlay (hidden by default):
   - Full-screen or half-screen dark modal.
   - `<textarea>` for question input.
   - Submit button + `Enter` to submit.
   - Response area with loading spinner.
   - Clear/close controls.
9. Write `askPlaybook(question)` JS function:
   - Reads `PLAYBOOK_TEXT` constant (populated at build time).
   - If Option A: POSTs `{ question }` to the proxy URL constant.
   - If Option B: reads key from localStorage; calls Anthropic API directly (`https://api.anthropic.com/v1/messages`) via fetch with the key in `x-api-key` header.
   - Displays streamed or complete response in the response area.
10. Wire up open/close keyboard shortcut (`Cmd+K` or `Ctrl+K` — check for conflict with existing bindings first).

### Phase 3 — Cloudflare Worker (Option A path)

11. Write `proxy/worker.js`:
    ```js
    export default {
      async fetch(request, env) {
        // CORS preflight
        if (request.method === 'OPTIONS') return corsResponse();
        const { question, playbookText } = await request.json();
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: [
              { type: 'text', text: 'You are an assistant ...', cache_control: { type: 'ephemeral' } },
              { type: 'text', text: playbookText, cache_control: { type: 'ephemeral' } },
            ],
            messages: [{ role: 'user', content: question }],
          }),
        });
        return new Response(await resp.text(), { headers: corsHeaders() });
      }
    };
    ```
    (Exact implementation may differ; Worker sends playbook text on every call to leverage Anthropic's prompt caching — the CF Worker itself is stateless.)
12. Write `proxy/README.md`: wrangler deploy steps, how to set `ANTHROPIC_API_KEY` as a CF secret, CORS origin restriction.

### Phase 4 — Playbook Documentation

13. Add a collapsible "Natural Language Search" entry to the Claude Best Practices page documenting:
    - What the feature does and how to invoke it.
    - The proxy model (why the key isn't in the HTML).
    - The Cloudflare Worker deployment path (one-time setup).
    - Cost expectations (caching, per-query estimate).
14. Version bump: increment version in `fsad-playbook.html` `<title>`, `README.md`, and `CHANGELOG.md`.

## Acceptance Criteria
- [ ] API key is NOT present in `fsad-playbook.html` or `dist/fsad-playbook.html`
- [ ] Chosen proxy option (A or B) is documented and deployed/configured
- [ ] `scripts/extract-playbook-text.py` runs without error and produces clean text output
- [ ] `dist/fsad-playbook.html` contains the inlined `PLAYBOOK_TEXT` constant after build
- [ ] Q&A panel opens and closes correctly in the browser
- [ ] A question receives a relevant answer drawn from playbook content
- [ ] Loading state is displayed while the API call is in flight
- [ ] Proxy URL / key config is a single named constant easy to reconfigure
- [ ] `proxy/worker.js` and `proxy/README.md` exist (Option A) OR localStorage key-entry flow works end-to-end (Option B)
- [ ] CHANGELOG updated and version bumped
- [ ] Todo entry marked complete
