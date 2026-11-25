"use server";

import { cycleFor } from "@/domain/cycles";
import type { ActionResult } from "@/lib/action-result";
import { fieldErrors } from "@/lib/field-errors";
import { setupSchema } from "@/lib/schemas/setup";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { insertRecurringItems } from "../../repos/recurring-repo";
import { findSettings, saveSettings } from "../../repos/settings-repo";
import { setUserName } from "../../repos/user-repo";
import { appToday } from "../../today";
import { openingBalanceDateFor } from "../profile/opening-balance-date";
import { toSettingsRow } from "../profile/to-settings-row";
import { billRow } from "./bill-row";

/** Saves the pay profile and first bills. Runs once, on first use. */
export async function completeSetup(input: unknown): Promise<ActionResult> {
  await requireSession();
  const db = getDb();
  if (findSettings(db)) return { ok: false, error: "Setup is already done." };

  const parsed = setupSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const today = appToday();
  // Simple mode only counts bills from the first cycle on. Ledger counts them from today.
  const cycleStart = cycleFor(
    data.anchorPayday,
    data.payFrequency,
    today,
  ).start;
  const billStart = data.mode === "simple" ? cycleStart : today;

  saveSettings(
    db,
    toSettingsRow(data, openingBalanceDateFor(undefined, data, today)),
  );
  setUserName(db, data.name);
  insertRecurringItems(
    db,
    data.bills.map((bill) => billRow(bill, billStart)),
  );
  return { ok: true };
}
