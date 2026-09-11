# CBP-551: Document `claude plugin eval` in Power Usage → Plugins collapsible

## Source
Claude Code v2.1.269 changelog: "Added `claude plugin eval`: run a plugin's eval suite against Claude Code and get scored, reproducible results (JSON + HTML report); see `claude plugin eval --help`."

## Summary
New CLI subcommand for running a plugin's eval suite and getting a scored, reproducible report (JSON + HTML). This belongs in the existing Power Usage → Plugins collapsible, which already documents `claude plugin` subcommands (prune, uninstall, disable, enable, init, details).

## Assessment
Not documented. `src/pages/practices.html`'s `power-usage--plugins` collapsible (around line 2600) has a code block of `claude plugin ...` commands and a bullet list below it — the natural place for both a command example and an explanatory bullet.

## Plan
1. Open `src/pages/practices.html`, locate `id="power-usage--plugins"` (~line 2600).
2. In the code block (the `<pre><code class="language-bash">` block listing `claude plugin` commands), add near the `claude plugin init my-plugin` line:
   ```
   <span class="cm"># Run a plugin's eval suite and get a scored report</span>
   <span class="kw">claude</span> plugin eval my-plugin
   ```
3. In the `<ul>` bullet list beneath the code block, add a new `<li>`:
   ```html
   <li><strong><code>claude plugin eval</code>:</strong> run a plugin's eval suite against Claude Code and get scored, reproducible results as a JSON and HTML report — see <code>claude plugin eval --help</code> for suite format and options (v2.1.269).</li>
   ```

## Acceptance Criteria
- [ ] Code block includes a `claude plugin eval` example.
- [ ] Bullet list explains the eval suite / scored report / JSON+HTML output, citing v2.1.269.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
