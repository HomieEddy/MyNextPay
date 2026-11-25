import { eq } from "drizzle-orm";
import type { Db } from "../db/client";
import { settings } from "../db/schema";

const SETTINGS_ID = 1;

export type Settings = typeof settings.$inferSelect;
export type SettingsInput = Omit<typeof settings.$inferInsert, "id">;

export function findSettings(db: Db): Settings | undefined {
  return db.select().from(settings).where(eq(settings.id, SETTINGS_ID)).get();
}

export function saveSettings(db: Db, input: SettingsInput) {
  db.insert(settings)
    .values({ id: SETTINGS_ID, ...input })
    .onConflictDoUpdate({ target: settings.id, set: input })
    .run();
}
