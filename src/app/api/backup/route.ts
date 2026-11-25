import { hasValidSession } from "@/server/auth/session";
import { exportBackup } from "@/server/backup/export-backup";
import { getDb } from "@/server/db/client";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

/** Downloads every money table as one JSON file. */
export async function GET() {
  if (!(await hasValidSession()))
    return new Response("Sign in first.", { status: 401 });
  const backup = exportBackup(getDb(), new Date().toISOString());
  return new Response(JSON.stringify(backup, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="nextpay-backup-${appToday()}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
