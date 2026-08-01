import { defineManifest } from "@absolutejs/manifest";
import { Type } from "@sinclair/typebox";

export const manifest = defineManifest<Record<string, never>>()({
  contract: 2,
  discovery: {
    audiences: [
      "site-owners",
      "developers",
      "security-teams",
      "platform-builders",
    ],
    intents: [
      "build a project-scoped site administration portal",
      "authorize site operations with standard roles",
      "present vulnerability posture without exposing other tenants",
    ],
    keywords: [
      "admin",
      "RBAC",
      "security",
      "project-management",
      "multi-tenant",
    ],
    protocols: ["TypeBox contracts", "capability-based authorization"],
  },
  identity: {
    accent: "#6d5dfc",
    category: "operations",
    description:
      "Standard project-scoped administration contracts, permissions, navigation, and security read models for AbsoluteJS applications.",
    docsUrl: "https://github.com/absolutejs/admin",
    name: "@absolutejs/admin",
    tagline: "Give every AbsoluteJS site a secure administration surface.",
  },
  settings: Type.Object({}),
  wiring: [],
});
