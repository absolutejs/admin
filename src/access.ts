export const SITE_ADMIN_ROLES = [
  "owner",
  "administrator",
  "security",
  "developer",
  "viewer",
] as const;

export type SiteAdminRole = (typeof SITE_ADMIN_ROLES)[number];

export const SITE_ADMIN_CAPABILITIES = [
  "site.read",
  "site.deploy",
  "site.configure",
  "site.data.read",
  "site.data.manage",
  "site.secrets.manage",
  "site.security.read",
  "site.security.respond",
  "site.security.remediate",
  "site.team.manage",
  "site.delete",
] as const;

export type SiteAdminCapability = (typeof SITE_ADMIN_CAPABILITIES)[number];

const ROLE_CAPABILITIES: Readonly<
  Record<SiteAdminRole, readonly SiteAdminCapability[]>
> = {
  owner: SITE_ADMIN_CAPABILITIES,
  administrator: SITE_ADMIN_CAPABILITIES.filter(
    (capability) => capability !== "site.delete",
  ),
  security: [
    "site.read",
    "site.security.read",
    "site.security.respond",
    "site.security.remediate",
  ],
  developer: [
    "site.read",
    "site.deploy",
    "site.configure",
    "site.data.read",
    "site.security.read",
  ],
  viewer: ["site.read", "site.data.read", "site.security.read"],
};

export const capabilitiesForRole = (
  role: SiteAdminRole,
): readonly SiteAdminCapability[] => ROLE_CAPABILITIES[role];

export const roleHasCapability = (
  role: SiteAdminRole,
  capability: SiteAdminCapability,
) => ROLE_CAPABILITIES[role].includes(capability);

export const authorizeSiteAdmin = (
  role: SiteAdminRole,
  capability: SiteAdminCapability,
) => {
  if (!roleHasCapability(role, capability))
    throw new SiteAdminAuthorizationError(role, capability);
};

export class SiteAdminAuthorizationError extends Error {
  constructor(
    readonly role: SiteAdminRole,
    readonly capability: SiteAdminCapability,
  ) {
    super(`The ${role} role does not grant ${capability}`);
    this.name = "SiteAdminAuthorizationError";
  }
}
