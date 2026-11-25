import { redirect } from "next/navigation";
import { CardStack } from "@/components/features/home/card-stack";
import { CycleNav } from "@/components/features/home/cycle-nav";
import { SafeHero } from "@/components/features/home/safe-hero";
import { ScreenHeading } from "@/components/ui/screen-heading";
import {
  type HomeView,
  offsetHref,
  parseOffset,
  toHomeView,
} from "@/lib/home-view";
import { getDb } from "@/server/db/client";
import { loadCycle } from "@/server/queries/load-cycle";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const { c } = await searchParams;
  const offset = parseOffset(c);
  const summary = loadCycle(getDb(), offset);
  if (!summary) redirect("/setup");

  const view: HomeView = toHomeView(summary);
  return (
    <>
      <ScreenHeading title="Home" />
      <CycleNav
        periodLabel={view.periodLabel}
        previousHref={offsetHref(offset - 1)}
        nextHref={offsetHref(offset + 1)}
      />
      <div className="mt-5">
        <SafeHero view={view} />
      </div>
      <p className="mt-6 mb-1 px-1 text-[13px] font-semibold text-mute uppercase tracking-wide">
        This cycle
      </p>
      <CardStack rows={view.rows} />
      <p className="mt-4 px-1 text-sm text-mute">
        {view.daysValue} {view.daysLabel}, about {view.dailyValue} a day.
      </p>
    </>
  );
}
