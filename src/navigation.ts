import type { SiteAdminCapability } from "./access";

export type SiteAdminNavigationItem = {
  capability: SiteAdminCapability;
  description: string;
  id: string;
  label: string;
};

export const SITE_ADMIN_NAVIGATION: readonly SiteAdminNavigationItem[] = [
  {
    capability: "site.read",
    description: "Runtime and health summary",
    id: "overview",
    label: "Overview",
  },
  {
    capability: "site.deploy",
    description: "Releases, builds, and source ingestion",
    id: "deployments",
    label: "Deployments",
  },
  {
    capability: "site.configure",
    description: "Domains and hosted application settings",
    id: "domains",
    label: "Domains",
  },
  {
    capability: "site.data.read",
    description: "Files, databases, backups, and usage",
    id: "data",
    label: "Data",
  },
  {
    capability: "site.security.read",
    description: "Findings, incidents, remediation, and evidence",
    id: "security",
    label: "Security",
  },
  {
    capability: "site.configure",
    description: "Operational policy and diagnostics",
    id: "operations",
    label: "Operations",
  },
  {
    capability: "site.team.manage",
    description: "Team roles and project access",
    id: "team",
    label: "Team",
  },
  {
    capability: "site.configure",
    description: "Secrets and project lifecycle",
    id: "settings",
    label: "Settings",
  },
] as const;

export const navigationForCapabilities = (
  capabilities: readonly SiteAdminCapability[],
) =>
  SITE_ADMIN_NAVIGATION.filter((item) =>
    capabilities.includes(item.capability),
  );
