# CBP-088 — Embed full specialist definition markdown in each Specialist Definitions collapsible

## Summary
The 13 specialist collapsibles under "Specialist Definitions" currently show a curated HTML summary (Primary scope, Threat model, Coverage categories). The actual specialist markdown files contain the agent brief, overlap boundaries, output file contract, allowed tools, and scanner integration — sections that aren't visible to playbook readers. This task adds the full markdown source of each specialist file as a new "Definition file" sub-section at the bottom of each collapsible.

## Assessment
**13 specialist collapsibles** exist in `fsad-playbook.html` starting at line 4536, one per file in `.claude/skills/sec-review-team/specialists/`. Each collapsible ends with a Coverage categories paragraph followed by `</div></div></div>`. The markdown files contain YAML frontmatter (stripped on display) followed by `# name`, Primary scope, Overlap, Brief, Output files, Allowed tools, Coverage categories, and Scanner integration.

**Location:** `fsad-playbook.html` — Specialist Definitions collapsibles (lines ~4539–4853)

Specialist → collapsible ID → markdown file:
1. `secrets-crypto-auditor` → `sec-spec--secrets-crypto` → `specialists/secrets-crypto-auditor.md`
2. `dependency-supplychain-auditor` → `sec-spec--dependency-supplychain` → `specialists/dependency-supplychain-auditor.md`
3. `silent-failure-hunter` → `sec-spec--silent-failure` → `specialists/silent-failure-hunter.md`
4. `data-exposure-auditor` → `sec-spec--data-exposure` → `specialists/data-exposure-auditor.md`
5. `auth-authz-auditor` → `sec-spec--auth-authz` → `specialists/auth-authz-auditor.md`
6. `input-validation-auditor` → `sec-spec--input-validation` → `specialists/input-validation-auditor.md`
7. `frontend-security-auditor` → `sec-spec--frontend-security` → `specialists/frontend-security-auditor.md`
8. `prompt-injection-auditor` → `sec-spec--prompt-injection` → `specialists/prompt-injection-auditor.md`
9. `iac-auditor` → `sec-spec--iac` → `specialists/iac-auditor.md`
10. `container-runtime-auditor` → `sec-spec--container-runtime` → `specialists/container-runtime-auditor.md`
11. `ci-cd-security-auditor` → `sec-spec--ci-cd` → `specialists/ci-cd-security-auditor.md`
12. `concurrency-race-auditor` → `sec-spec--concurrency-race` → `specialists/concurrency-race-auditor.md`
13. `privacy-telemetry-auditor` → `sec-spec--privacy-telemetry` → `specialists/privacy-telemetry-auditor.md`

## Plan

1. Read all 13 specialist markdown files to capture their full content (strip YAML frontmatter block `---…---` before embedding).

2. For each of the 13 collapsibles, locate the closing `</div></div>\n    </div>` of the collapsible-content, and insert a new `<h4>` label + `<pre><code class="language-markdown">` block containing the specialist file content (HTML-escaped: `&amp;`, `&lt;`, `&gt;`, `&quot;`). Pattern to insert before each `      </div></div>\n    </div>`:

```html
        <h4 style="font-size:0.74rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin:1.2rem 0 0.5rem;">Definition file</h4>
        <pre style="background:var(--surface-2); border:1px solid var(--border); border-radius:6px; padding:1rem; font-size:0.8rem; overflow-x:auto; white-space:pre-wrap; color:var(--text-secondary);"><code>{MARKDOWN CONTENT}</code></pre>
```

3. Bump version v37 → v38 in:
   - `fsad-playbook.html` `<title>` tag
   - `README.md` version table (add new row above current latest)

4. Add CHANGELOG.md entry for v38.

All criteria verified 2026-04-30 before commit.

## Acceptance Criteria
- [x] All 13 specialist collapsibles include a "Definition file" sub-section at the bottom of their content
- [x] Each sub-section shows the full specialist markdown (frontmatter stripped, content HTML-escaped) in a styled pre/code block
- [x] The pre block is scrollable for long content and does not overflow the page layout
- [x] Existing Primary scope / Threat model / Coverage categories content is unchanged
- [x] Version updated to v38 in `<title>`, README, and CHANGELOG
