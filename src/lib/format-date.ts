import { format } from "date-fns";
import { type IsoDate, toDate } from "@/domain/dates";

export function shortDate(day: IsoDate): string {
  return format(toDate(day), "MMM d");
}
