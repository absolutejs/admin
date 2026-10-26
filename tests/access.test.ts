import { describe, expect, test } from "bun:test";
import {
  SITE_ADMIN_CAPABILITIES,
  authorizeSiteAdmin,
  capabilitiesForRole,
  navigationForCapabilities,
  roleHasCapability,
  SiteAdminAuthorizationError,
} from "../src";

describe("site administration access", () => {
  test("the owner is the only role allowed to delete a project", () => {
    expect(roleHasCapability("owner", "site.delete")).toBe(true);
    for (const role of [
      "administrator",
      "security",
      "developer",
      "viewer",
    ] as const)
      expect(roleHasCapability(role, "site.delete")).toBe(false);
  });

  test("security operators cannot access deployment, data, secrets, or team controls", () => {
    expect(capabilitiesForRole("security")).toEqual([
      "site.read",
      "site.security.read",
      "site.security.respond",
      "site.security.remediate",
    ]);
  });

  test("developers manage secrets and data but not the team, security response or deletion", () => {
    expect(capabilitiesForRole("developer")).toEqual([
      "site.read",
      "site.deploy",
      "site.configure",
      "site.data.read",
      "site.data.manage",
      "site.secrets.manage",
      "site.security.read",
    ]);
    for (const capability of [
      "site.team.manage",
      "site.security.respond",
      "site.security.remediate",
      "site.delete",
    ] as const)
      expect(roleHasCapability("developer", capability)).toBe(false);
  });

  test("viewer mutation attempts fail closed", () => {
    expect(() => authorizeSiteAdmin("viewer", "site.security.respond")).toThrow(
      SiteAdminAuthorizationError,
    );
  });

  test("navigation only exposes sections granted to the actor", () => {
    expect(
      navigationForCapabilities(capabilitiesForRole("security")).map(
        ({ id }) => id,
      ),
    ).toEqual(["overview", "security"]);
    expect(navigationForCapabilities(SITE_ADMIN_CAPABILITIES)).toHaveLength(8);
  });
});
