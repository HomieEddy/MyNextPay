import { redirect } from "next/navigation";
import { CardStack } from "@/components/features/home/card-stack";
import { CycleNav } from "@/components/features/home/cycle-nav";
import { DayTiles } from "@/components/features/home/day-tiles";
import { FloorBanner } from "@/components/features/home/floor-banner";
import { SafeHero } from "@/components/features/home/safe-hero";
import { forecastCard } from "@/lib/forecast-card";
import { offsetHref, parseOffset, toHomeView } from "@/lib/home-view";
import { getDb } from "@/server/db/client";
import { loadCycle } from "@/server/queries/load-cycle";
import { findSettings } from "@/server/repos/settings-repo";
import { appToday } from "@/server/today";
import { HomeSheet } from "./_sheets/home-sheet";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const { c, sheet } = await searchParams;
  const offset = parseOffset(c);
  const db = getDb();
  const summary = loadCycle(db, offset);
  if (!summary) redirect("/setup");

  const warn = findSettings(db)?.lowBalanceWarning ?? false;
  const view = toHomeView(summary, { today: appToday(), offset, warn });
  const next = [1, 2]
    .map((step) => loadCycle(db, offset + step))
    .filter((cycle) => cycle !== null);
  const cards = [...view.cards, forecastCard(next)];
  return (
    <>
      <CycleNav
        label={view.periodLabel}
        sub={view.periodSub}
        previousHref={offsetHref(offset - 1)}
        nextHref={offsetHref(offset + 1)}
      />
      <SafeHero
        caption={view.caption}
        cents={view.safeToSpend}
        status={view.status}
        statusLabel={view.statusLabel}
      />
      {view.banner && (
        <FloorBanner title={view.banner.title} detail={view.banner.detail} />
      )}
      <DayTiles
        daysValue={view.daysValue}
        daysLabel={view.daysLabel}
        ringFraction={view.ringFraction}
        dailyValue={view.dailyValue}
        dailyLabel={view.dailyLabel}
      />
      <CardStack cards={cards} />
      {typeof sheet === "string" && (
        <HomeSheet sheet={sheet} summary={summary} offset={offset} />
      )}
    </>
  );
}
