import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import Database from "better-sqlite3";
import {
  type BetterSQLite3Database,
  drizzle,
} from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

export type Db = BetterSQLite3Database<typeof schema>;

const MIGRATIONS_FOLDER = join(process.cwd(), "drizzle");

/** Opens a database, applies pending migrations and returns a Drizzle client. */
export function createDb(path: string): Db {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const sqlite = new Database(path);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
  return db;
}

const globalForDb = globalThis as unknown as { nextpayDb?: Db };

/** The app's shared database connection, opened on first use. */
export function getDb(): Db {
  globalForDb.nextpayDb ??= createDb(
    process.env.DATABASE_PATH ?? "./data/nextpay.db",
  );
  return globalForDb.nextpayDb;
}
