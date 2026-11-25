import { eq, lt } from "drizzle-orm";
import type { Db } from "../db/client";
import { session } from "../db/schema";

export function insertSession(db: Db, tokenHash: string, expiresAt: number) {
  db.insert(session).values({ tokenHash, expiresAt }).run();
}

export function findSession(db: Db, tokenHash: string) {
  return db
    .select()
    .from(session)
    .where(eq(session.tokenHash, tokenHash))
    .get();
}

export function deleteSession(db: Db, tokenHash: string) {
  db.delete(session).where(eq(session.tokenHash, tokenHash)).run();
}

export function deleteExpiredSessions(db: Db, now: number) {
  db.delete(session).where(lt(session.expiresAt, now)).run();
}
