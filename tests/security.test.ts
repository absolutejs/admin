import { describe, expect, test } from "bun:test";
import { Value } from "@sinclair/typebox/value";
import { SiteSecuritySnapshotSchema, summarizeSiteSecurity } from "../src";

describe("site security summaries", () => {
  test("summarizes only actionable posture", () => {
    expect(
      summarizeSiteSecurity({
        findings: [
          { severity: "critical", status: "open" },
          { severity: "high", status: "false_positive" },
          { severity: "low", status: "resolved" },
        ],
        incidents: [{ status: "open" }, { status: "acknowledged" }],
        remediation: [{ status: "executing" }, { status: "completed" }],
      }),
    ).toEqual({
      actionableFindings: 1,
      criticalFindings: 1,
      openIncidents: 1,
      remediationInProgress: 1,
      totalFindings: 3,
    });
  });

  test("validates the complete project-scoped wire model", () => {
    expect(
      Value.Check(SiteSecuritySnapshotSchema, {
        findings: [],
        generatedAt: "2026-07-19T12:00:00.000Z",
        incidents: [],
        projectId: "project-a",
        releases: [
          {
            activatedAt: null,
            admission: {
              evaluatedAt: "2026-07-19T11:00:00.000Z",
              exceptions: 0,
              status: "passed",
              violations: 0,
            },
            createdAt: "2026-07-19T10:00:00.000Z",
            releaseId: "release-a",
            status: "retained",
          },
        ],
        remediation: [],
        summary: {
          actionableFindings: 0,
          criticalFindings: 0,
          openIncidents: 0,
          remediationInProgress: 0,
          totalFindings: 0,
        },
      }),
    ).toBe(true);
  });
});
