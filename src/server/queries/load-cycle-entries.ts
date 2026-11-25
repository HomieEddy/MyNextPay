import "server-only";
import type { Cycle } from "@/domain/cycles";
import { isBetween } from "@/domain/dates";
import type { Db } from "../db/client";
import { type Entry, listEntries } from "../repos/entry-repo";

/** The one-offs logged inside a cycle, newest first. */
export function loadCycleEntries(db: Db, cycle: Cycle): Entry[] {
  return listEntries(db)
    .filter((e) => isBetween(e.date, cycle.start, cycle.end))
    .sort((a, b) => b.date.localeCompare(a.date));
}
