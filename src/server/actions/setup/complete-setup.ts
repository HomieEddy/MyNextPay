"use server";

import { cycleFor } from "@/domain/cycles";
import type { ActionResult } from "@/lib/action-result";
import { setupSchema } from "@/lib/schemas/setup";
import { getDb } from "../../db/client";
import { insertRecurringItems } from "../../repos/recurring-repo";
import { findSettings, saveSettings } from "../../repos/settings-repo";
import { setUserName } from "../../repos/user-repo";
import { appToday } from "../../today";
import { openingBalanceDateFor } from "../profile/opening-balance-date";
import { toSettingsRow } from "../profile/to-settings-row";
import { authedAction } from "../safe-action";
import { billRow } from "./bill-row";

/** Saves the pay profile and first bills. Runs once, on first use. */
export const completeSetup = authedAction
  .inputSchema(setupSchema)
  .action(async ({ parsedInput: data }): Promise<ActionResult> => {
    const db = getDb();
    if (findSettings(db)) return { ok: false, error: "Setup is already done." };
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
  });
