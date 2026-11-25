import "server-only";
import { type IsoDate, today } from "@/domain/dates";

/** Today's calendar date in the household's time zone. */
export function appToday(): IsoDate {
  return today(process.env.TZ || "America/Toronto");
}
