# CBP-806: Add plugin `optionalDependencies` note (v2.1.331)

## Summary
Claude Code v2.1.331 added `optionalDependencies` to plugin manifests: plugins that install alongside the declaring plugin but, unlike required dependencies, can be disabled or uninstalled on their own.

## Assessment
`src/pages/practices.html`'s Plugins section already has a "Dependency enforcement" bullet (~line 2654) covering required dependencies (`claude plugin disable`/`enable` behavior). `optionalDependencies` is a natural extension of that bullet.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the "Dependency enforcement" bullet:
   ```
   As of v2.1.331, a manifest can also list optionalDependencies — plugins that install alongside it but, unlike the required dependencies above, can be disabled or uninstalled on their own.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Dependency enforcement bullet documents `optionalDependencies`.
- HTML is valid (no unclosed tags).

## Status
Implemented.
