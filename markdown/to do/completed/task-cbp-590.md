# CBP-590: Add note to PermissionRequest hook row — agent-type hooks not allowed (v2.1.280)

## Summary

v2.1.280 changed `PermissionRequest` hooks: an agent-type hook no longer runs there, since its answer could never allow or deny the request. It now shows an error pointing to command or http hooks. This affects teams that tried to use agent-type hooks on PermissionRequest.

## Assessment

The hooks table in `src/pages/practices.html` at approximately line 2143 has:
```html
<tr><td><code>PermissionRequest</code></td><td>When a permission prompt is shown</td></tr>
```

The description should be extended to note that only `command` and `http` hook types work here; agent-type hooks produce an error.

## Plan

Find and update the PermissionRequest row in the "Tool & permission hooks" table:

Old:
```html
<tr><td><code>PermissionRequest</code></td><td>When a permission prompt is shown</td></tr>
```

New:
```html
<tr><td><code>PermissionRequest</code></td><td>When a permission prompt is shown. Only <code>command</code> and <code>http</code> hook types are accepted — agent-type hooks produce an error here because they cannot return an allow/deny decision (v2.1.280).</td></tr>
```

## Acceptance Criteria

- The PermissionRequest row notes that only command and http hook types work.
- The version tag v2.1.280 is present.
