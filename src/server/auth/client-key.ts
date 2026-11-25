import "server-only";
import { headers } from "next/headers";

/** Identifies the visitor for rate limiting. Trusts proxy headers only when TRUST_PROXY=true. */
export async function clientKey(): Promise<string> {
  if (process.env.TRUST_PROXY !== "true") return "direct";
  const forwarded = (await headers()).get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
