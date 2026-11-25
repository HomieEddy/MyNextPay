"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { deleteAllData } from "../../repos/reset-repo";

/** Wipes all money data, keeps the password, and starts setup again. */
export async function eraseData(): Promise<void> {
  await requireSession();
  deleteAllData(getDb());
  revalidatePath("/", "layout");
  redirect("/setup");
}
