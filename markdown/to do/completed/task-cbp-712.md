# CBP-712: Add `@claude review stop`/`off`/`pause` to Code Review section

## Summary
Claude Code v2.1.307 added `@claude review stop` (also `off` and `pause`) to Code Review. These commands end an `@claude review always` subscription on a pull request without starting a new review. The playbook's Code Review Agent section does not document any `@claude review` PR comment commands.

## Assessment
The content does not exist in the playbook. The Code Review section is in `src/pages/practices.html` around line 938. The section describes setup steps, reading results, and alternatives. It does not have a table of `@claude` PR comment commands. A small table of review interaction commands should be added at the end of the "Reading the Results" subsection, before the "Alternative: GitHub Actions" subsection.

## Plan
1. Open `src/pages/practices.html`.
2. Find the closing `</div>` of the "Important" callout (around line 1074), which ends the "Reading the Results" subsection.
3. After that callout, insert a new sub-heading and table:

```html
    <!-- @claude review comment commands -->
    <h3 style="font-family:var(--font-display); font-size:1.3rem; margin-top:2.5rem; margin-bottom:1rem; font-weight:700;">PR Comment Commands</h3>
    <p style="color:var(--text-secondary); margin-bottom:1rem;">Post these commands as PR comments to control Code Review from GitHub:</p>
    <div class="table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>@claude review</code></td><td>Trigger a one-off review of the current PR</td></tr>
          <tr><td><code>@claude review always</code></td><td>Subscribe to reviews on every future push to this PR</td></tr>
          <tr><td><code>@claude review stop</code> / <code>off</code> / <code>pause</code></td><td>End an <code>@claude review always</code> subscription without starting a new review (v2.1.307)</td></tr>
        </tbody>
      </table>
    </div>
```

## Acceptance Criteria
- The table appears in the Code Review Agent section after the "Reading the Results" callout.
- The `@claude review stop`/`off`/`pause` commands are listed.
- No other content is disturbed.
