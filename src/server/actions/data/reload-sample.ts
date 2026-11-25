"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { loadSampleData } from "../../sample/load-sample-data";

export async function reloadSample(): Promise<void> {
  await requireSession();
  loadSampleData(getDb());
  revalidatePath("/", "layout");
}
