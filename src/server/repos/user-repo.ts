import { eq } from "drizzle-orm";
import type { Db } from "../db/client";
import { user } from "../db/schema";

const USER_ID = 1;

export function findUser(db: Db) {
  return db.select().from(user).where(eq(user.id, USER_ID)).get();
}

export function userExists(db: Db): boolean {
  return findUser(db) !== undefined;
}

export function createUser(
  db: Db,
  input: { name: string; passwordHash: string },
) {
  db.insert(user)
    .values({ id: USER_ID, ...input })
    .run();
}

export function setUserName(db: Db, name: string) {
  db.update(user).set({ name }).where(eq(user.id, USER_ID)).run();
}
