import { Type, type Static } from "@sinclair/typebox";

const TimestampSchema = Type.String({ format: "date-time" });

export const SiteSecurityFindingSchema = Type.Object(
  {
    componentId: Type.String(),
    findingId: Type.String(),
    firstSeenAt: TimestampSchema,
    lastSeenAt: TimestampSchema,
    priority: Type.Union([Type.Null(), Type.String()]),
    remediateBy: Type.Union([Type.Null(), TimestampSchema]),
    severity: Type.String(),
    status: Type.String(),
    value: Type.Record(Type.String(), Type.Unknown()),
  },
  { additionalProperties: false },
);
export type SiteSecurityFinding = Static<typeof SiteSecurityFindingSchema>;

export const SiteSecurityIncidentSchema = Type.Object(
  {
    acknowledgedAt: Type.Union([Type.Null(), TimestampSchema]),
    alertId: Type.String(),
    body: Type.String(),
    dueAt: Type.Union([Type.Null(), TimestampSchema]),
    firstObservedAt: TimestampSchema,
    kind: Type.String(),
    lastObservedAt: TimestampSchema,
    severity: Type.String(),
    status: Type.Union([
      Type.Literal("acknowledged"),
      Type.Literal("open"),
      Type.Literal("resolved"),
    ]),
    title: Type.String(),
  },
  { additionalProperties: false },
);
export type SiteSecurityIncident = Static<typeof SiteSecurityIncidentSchema>;

export const SiteSecurityRemediationSchema = Type.Object(
  {
    createdAt: TimestampSchema,
    planId: Type.String(),
    status: Type.String(),
    updatedAt: TimestampSchema,
    value: Type.Record(Type.String(), Type.Unknown()),
  },
  { additionalProperties: false },
);
export type SiteSecurityRemediation = Static<
  typeof SiteSecurityRemediationSchema
>;

export const SiteSecuritySnapshotSchema = Type.Object(
  {
    findings: Type.Array(SiteSecurityFindingSchema),
    generatedAt: TimestampSchema,
    incidents: Type.Array(SiteSecurityIncidentSchema),
    projectId: Type.String(),
    remediation: Type.Array(SiteSecurityRemediationSchema),
    summary: Type.Object(
      {
        actionableFindings: Type.Integer({ minimum: 0 }),
        criticalFindings: Type.Integer({ minimum: 0 }),
        openIncidents: Type.Integer({ minimum: 0 }),
        remediationInProgress: Type.Integer({ minimum: 0 }),
        totalFindings: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);
export type SiteSecuritySnapshot = Static<typeof SiteSecuritySnapshotSchema>;

export const summarizeSiteSecurity = (input: {
  findings: readonly Pick<SiteSecurityFinding, "severity" | "status">[];
  incidents: readonly Pick<SiteSecurityIncident, "status">[];
  remediation: readonly Pick<SiteSecurityRemediation, "status">[];
}) => ({
  actionableFindings: input.findings.filter(
    (finding) =>
      !["resolved", "suppressed", "false_positive"].includes(finding.status),
  ).length,
  criticalFindings: input.findings.filter(
    (finding) => finding.severity.toLowerCase() === "critical",
  ).length,
  openIncidents: input.incidents.filter(
    (incident) => incident.status === "open",
  ).length,
  remediationInProgress: input.remediation.filter((plan) =>
    ["approved", "executing", "verifying"].includes(plan.status),
  ).length,
  totalFindings: input.findings.length,
});
