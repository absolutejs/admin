import { Type, type Static } from "@sinclair/typebox";

export const SiteAdminRoleSchema = Type.Union([
  Type.Literal("owner"),
  Type.Literal("administrator"),
  Type.Literal("security"),
  Type.Literal("developer"),
  Type.Literal("viewer"),
]);
export type SiteAdminRoleContract = Static<typeof SiteAdminRoleSchema>;

export const SiteAdminCapabilitySchema = Type.Union([
  Type.Literal("site.read"),
  Type.Literal("site.deploy"),
  Type.Literal("site.configure"),
  Type.Literal("site.data.read"),
  Type.Literal("site.data.manage"),
  Type.Literal("site.secrets.manage"),
  Type.Literal("site.security.read"),
  Type.Literal("site.security.respond"),
  Type.Literal("site.security.remediate"),
  Type.Literal("site.team.manage"),
  Type.Literal("site.delete"),
]);

export const SiteAdminMemberSchema = Type.Object(
  {
    createdAt: Type.String({ format: "date-time" }),
    email: Type.String({ format: "email" }),
    name: Type.Union([Type.Null(), Type.String()]),
    role: SiteAdminRoleSchema,
    userId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);
export type SiteAdminMember = Static<typeof SiteAdminMemberSchema>;

export const SiteAdminAccessSchema = Type.Object(
  {
    capabilities: Type.Array(SiteAdminCapabilitySchema, { uniqueItems: true }),
    projectId: Type.String({ minLength: 1 }),
    role: SiteAdminRoleSchema,
  },
  { additionalProperties: false },
);
export type SiteAdminAccess = Static<typeof SiteAdminAccessSchema>;
