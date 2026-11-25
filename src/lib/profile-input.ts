import type { IsoDate } from "@/domain/dates";
import type { Settings } from "@/server/repos/settings-repo";
import { centsToText } from "./money-text";
import type { ProfileInput } from "./schemas/profile";

/** Starting values for the pay, tracking and floor fields. */
export function blankProfile(today: IsoDate): ProfileInput {
  return {
    name: "",
    anchorPayday: today,
    payFrequency: "biweekly",
    payAmount: "",
    mode: "simple",
    openingBalance: "0.00",
    floor: "300.00",
    lowBalanceWarning: true,
  };
}

/** The form values for the saved settings. */
export function toProfileInput(settings: Settings, name: string): ProfileInput {
  return {
    name,
    anchorPayday: settings.anchorPayday,
    payFrequency: settings.payFrequency,
    payAmount: centsToText(settings.payAmount),
    mode: settings.mode,
    openingBalance: centsToText(settings.openingBalance),
    floor: centsToText(settings.floor),
    lowBalanceWarning: settings.lowBalanceWarning,
  };
}
