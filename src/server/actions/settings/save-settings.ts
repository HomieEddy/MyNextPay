"use server";

import type { ActionResult } from "@/lib/action-result";
import { fieldErrors } from "@/lib/field-errors";
import { profileSchema } from "@/lib/schemas/profile";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { findSettings, saveSettings } from "../../repos/settings-repo";
import { setUserName } from "../../repos/user-repo";
import { appToday } from "../../today";
import { openingBalanceDateFor } from "../profile/opening-balance-date";
import { toSettingsRow } from "../profile/to-settings-row";

export async function saveSettingsAction(
  input: unknown,
): Promise<ActionResult> {
  await requireSession();
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const db = getDb();
  const data = parsed.data;
  const previous = findSettings(db);
  saveSettings(
    db,
    toSettingsRow(data, openingBalanceDateFor(previous, data, appToday())),
  );
  setUserName(db, data.name);
  return { ok: true };
}
