import { eq } from "drizzle-orm";
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

export function findEntry(db: Db, id: number): Entry | undefined {
  return db.select().from(entry).where(eq(entry.id, id)).get();
}

export function updateEntry(db: Db, id: number, input: EntryInput) {
  db.update(entry).set(input).where(eq(entry.id, id)).run();
}

export function deleteEntry(db: Db, id: number) {
  db.delete(entry).where(eq(entry.id, id)).run();
}
