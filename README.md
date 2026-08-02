# @absolutejs/admin

Framework-neutral contracts and policy for a standard AbsoluteJS project administration portal.

The package defines:

- project roles and their exact capabilities;
- fail-closed authorization helpers;
- capability-filtered portal navigation;
- public, project-scoped security snapshot contracts;
- deterministic security posture summaries.

It deliberately does not provide authentication, persistence, or a platform-wide operator console. A host application supplies those adapters and enforces authorization before querying project data.

## Roles

| Role            | Intended access                                                 |
| --------------- | --------------------------------------------------------------- |
| `owner`         | Every project operation, including team management and deletion |
| `administrator` | Every project operation except deletion                         |
| `security`      | Read posture, acknowledge incidents, and manage remediation     |
| `developer`     | Deploy, configure, inspect data, and read security posture      |
| `viewer`        | Read-only overview, data posture, and security posture          |

```ts
import {
  authorizeSiteAdmin,
  capabilitiesForRole,
  navigationForCapabilities,
} from "@absolutejs/admin";

authorizeSiteAdmin("security", "site.security.respond");

const navigation = navigationForCapabilities(capabilitiesForRole("developer"));
```

Authorization must be enforced on the server. Navigation filtering is a presentation aid, not a security boundary.

## License

Business Source License 1.1. See [LICENSE](./LICENSE).
