import "server-only";
import { cookies } from "next/headers";
import { getDb } from "../db/client";
import {
  deleteExpiredSessions,
  deleteSession,
  findSession,
  insertSession,
} from "../repos/session-repo";
import { hashSessionToken, newSessionToken } from "./session-token";

export const SESSION_COOKIE = "nextpay_session";
const SESSION_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Creates a session and sets its cookie. Call only from a server action. */
export async function startSession() {
  const db = getDb();
  const token = newSessionToken();
  const expiresAt = Date.now() + SESSION_DAYS * DAY_MS;
  deleteExpiredSessions(db, Date.now());
  insertSession(db, hashSessionToken(token), expiresAt);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** True when the request carries a valid, unexpired session. */
export async function hasValidSession(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const found = findSession(getDb(), hashSessionToken(token));
  return found !== undefined && found.expiresAt > Date.now();
}

/** Deletes the session and its cookie. Call only from a server action. */
export async function endSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) deleteSession(getDb(), hashSessionToken(token));
  store.delete(SESSION_COOKIE);
}
