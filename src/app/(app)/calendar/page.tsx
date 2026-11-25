import { format } from "date-fns";
import { redirect } from "next/navigation";
import { EventRows } from "@/components/features/calendar/event-rows";
import { Legend } from "@/components/features/calendar/legend";
import { MonthGrid } from "@/components/features/calendar/month-grid";
import { WeekList } from "@/components/features/calendar/week-list";
import { CycleNav } from "@/components/features/home/cycle-nav";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { SegmentedLinks } from "@/components/ui/segmented-links";
import { eventsByDate } from "@/domain/calendar-events";
import { addDays, toDate } from "@/domain/dates";
import {
  monthGrid,
  monthTitle,
  parseDay,
  parseMonth,
  shiftMonth,
  weekOf,
} from "@/lib/calendar-grid";
import { calendarHref } from "@/lib/calendar-links";
import { toCells, toEventRows } from "@/lib/calendar-view";
import { getDb } from "@/server/db/client";
import { loadCalendar } from "@/server/queries/load-calendar";
import { loadCycle } from "@/server/queries/load-cycle";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const today = appToday();
  const day = parseDay(params.d, today);
  const month = parseMonth(params.m, day);
  const week = params.v === "week";
  const grid = monthGrid(month);
  const days = week ? weekOf(day) : grid.map((cell) => cell.date);
  const db = getDb();
  const events = loadCalendar(db, days[0], days[days.length - 1]);
  if (!events) redirect("/setup");

  const byDate = eventsByDate(events);
  const state = { month, day, week };
  const title = week
    ? `${format(toDate(days[0]), "MMM d")} – ${format(toDate(days[6]), "MMM d")}`
    : monthTitle(month);
  const step = (count: number) =>
    week
      ? calendarHref({
          ...state,
          day: addDays(day, count * 7),
          month: addDays(day, count * 7).slice(0, 7),
        })
      : calendarHref({ ...state, month: shiftMonth(month, count) });

  return (
    <>
      <ScreenHeading title="Calendar" />
      <SegmentedLinks
        label="View"
        links={[
          {
            href: calendarHref({ ...state, week: false }),
            label: "Month",
            active: !week,
          },
          {
            href: calendarHref({ ...state, week: true }),
            label: "Week",
            active: week,
          },
        ]}
      />
      <CycleNav
        label={title}
        sub=""
        previousHref={step(-1)}
        nextHref={step(1)}
      />
      {week ? (
        <WeekList
          days={days.map((date) => ({
            date,
            weekday: format(toDate(date), "EEE"),
            day: toDate(date).getDate(),
            today: date === today,
            rows: toEventRows(byDate.get(date) ?? []),
          }))}
        />
      ) : (
        <>
          <MonthGrid
            cells={toCells(grid, byDate, {
              today,
              selected: day,
              cycle: loadCycle(db, 0)?.cycle ?? null,
            })}
            hrefFor={Object.fromEntries(
              grid.map((cell) => [
                cell.date,
                calendarHref({ ...state, day: cell.date }),
              ]),
            )}
          />
          <Legend />
          <div className="sec">{format(toDate(day), "EEEE, MMM d")}</div>
          <EventRows rows={toEventRows(byDate.get(day) ?? [])} />
        </>
      )}
    </>
  );
}
