import type { IsoDate } from "@/domain/dates";

export type CalendarState = { month: string; day: IsoDate; week: boolean };

export function calendarHref(state: CalendarState): string {
  const view = state.week ? "&v=week" : "";
  return `/calendar?m=${state.month}&d=${state.day}${view}`;
}
