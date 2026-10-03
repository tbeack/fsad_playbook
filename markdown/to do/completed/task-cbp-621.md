# CBP-621: Add `claude plugin configure <plugin>` to Plugins collapsible (v2.1.285)

## Summary

v2.1.285 added `claude plugin configure <plugin>` to show a plugin's options and which are unset, or save new values read from stdin with `--values-stdin`.

## Assessment

- `src/pages/practices.html`'s Plugins collapsible (`id="power-usage--plugins"`, ~line 2628) has a code block of `claude plugin` subcommands followed by a bullet list explaining notable ones (e.g. `claude plugin eval`, ~line 2667).

## Plan

1. In `src/pages/practices.html`, append to the code block (after the `claude plugin eval my-plugin` line):
   ```
   # Show a plugin's options and which are unset, or save new values from stdin
   claude plugin configure my-plugin
   claude plugin configure my-plugin --values-stdin
   ```
2. Add a bullet after the `claude plugin eval` bullet:
   `<li><strong><code>claude plugin configure &lt;plugin&gt;</code>:</strong> shows a plugin's options and which are still unset, or reads new values from stdin with <code>--values-stdin</code> and saves them without visiting <code>/plugin</code> → Configure (v2.1.285).</li>`

## Acceptance Criteria

- The Plugins collapsible documents `claude plugin configure`, version-tagged v2.1.285.
