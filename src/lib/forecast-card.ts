import type { CycleSummary } from "@/domain/cycle-summary";
import type { HomeCard } from "./home-cards";

/** The "Next cycles" card: whether the coming paydays look healthy. */
export function forecastCard(next: CycleSummary[]): HomeCard {
  const tight = next.filter((cycle) => cycle.status !== "healthy").length;
  return {
    title: `Next ${next.length} cycles`,
    value: tight === 0 ? "All healthy" : `${tight} tight`,
    detail: "Tap to compare what's ahead",
    tone: "forecast",
    href: "/cycles",
  };
}
