"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/action-result";
import { requireSession } from "../../auth/require-session";
import { backupSchema } from "../../backup/backup-schema";
import { importBackup } from "../../backup/import-backup";
import { getDb } from "../../db/client";

const MAX_BYTES = 10_000_000;

function readJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Replaces everything with the contents of an uploaded backup file. */
export async function restoreBackup(form: FormData): Promise<ActionResult> {
  await requireSession();
  const file = form.get("file");
  if (!(file instanceof File) || file.size > MAX_BYTES)
    return { ok: false, error: "Pick a NextPay backup file." };
  const parsed = backupSchema.safeParse(readJson(await file.text()));
  if (!parsed.success)
    return { ok: false, error: "That file isn't a NextPay backup." };
  try {
    importBackup(getDb(), parsed.data);
  } catch {
    return {
      ok: false,
      error: "That backup doesn't hold together. Nothing changed.",
    };
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
