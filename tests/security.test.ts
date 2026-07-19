import { describe, expect, test } from "bun:test";
import { summarizeSiteSecurity } from "../src";

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
});
