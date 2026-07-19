import { Type, type Static } from "@sinclair/typebox";

export const SiteAdminRoleSchema = Type.Union([
  Type.Literal("owner"),
  Type.Literal("administrator"),
  Type.Literal("security"),
  Type.Literal("developer"),
  Type.Literal("viewer"),
]);
export type SiteAdminRoleContract = Static<typeof SiteAdminRoleSchema>;

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
    capabilities: Type.Array(Type.String()),
    projectId: Type.String({ minLength: 1 }),
    role: SiteAdminRoleSchema,
  },
  { additionalProperties: false },
);
export type SiteAdminAccess = Static<typeof SiteAdminAccessSchema>;
