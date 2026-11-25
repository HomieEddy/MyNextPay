import "server-only";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, number[]>();

function recentAttempts(key: string, now: number): number[] {
  return (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
}

export function isLoginBlocked(key: string, now = Date.now()): boolean {
  return recentAttempts(key, now).length >= MAX_ATTEMPTS;
}

export function recordFailedLogin(key: string, now = Date.now()) {
  attempts.set(key, [...recentAttempts(key, now), now]);
}

export function clearFailedLogins(key: string) {
  attempts.delete(key);
}
