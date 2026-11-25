"use server";

import { profileSchema } from "@/lib/schemas/profile";
import { getDb } from "../../db/client";
import { findSettings, saveSettings } from "../../repos/settings-repo";
import { setUserName } from "../../repos/user-repo";
import { appToday } from "../../today";
import { openingBalanceDateFor } from "../profile/opening-balance-date";
import { toSettingsRow } from "../profile/to-settings-row";
import { authedAction } from "../safe-action";

export const saveSettingsAction = authedAction
  .inputSchema(profileSchema)
  .action(async ({ parsedInput: data }) => {
    const db = getDb();
    const previous = findSettings(db);
    saveSettings(
      db,
      toSettingsRow(data, openingBalanceDateFor(previous, data, appToday())),
    );
    setUserName(db, data.name);
  });
