import { sql } from "drizzle-orm";
import { getDb } from "@/server/db/client";

export const dynamic = "force-dynamic";

export function GET() {
  getDb().get(sql`select 1`);
  return Response.json({ ok: true });
}
