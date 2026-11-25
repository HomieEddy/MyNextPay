import type { Cents } from "./money";

export type CycleStatus = "healthy" | "tight" | "deficit";

export function cycleStatus(safeToSpend: Cents, floor: Cents): CycleStatus {
  if (safeToSpend < 0) return "deficit";
  if (safeToSpend < floor) return "tight";
  return "healthy";
}

export const STATUS_LABEL: Record<CycleStatus, string> = {
  healthy: "Healthy",
  tight: "Tight",
  deficit: "Deficit",
};
