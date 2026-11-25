import type { Db } from "../db/client";
import { entry } from "../db/schema";

export type Entry = typeof entry.$inferSelect;
export type EntryInput = Omit<typeof entry.$inferInsert, "id" | "createdAt">;

export function listEntries(db: Db): Entry[] {
  return db.select().from(entry).all();
}

export function insertEntries(db: Db, entries: EntryInput[]) {
  if (entries.length === 0) return;
  db.insert(entry).values(entries).run();
}
