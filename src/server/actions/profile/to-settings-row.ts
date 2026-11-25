import type { IsoDate } from "@/domain/dates";
import type { ProfileOutput } from "@/lib/schemas/profile";
import type { SettingsInput } from "../../repos/settings-repo";

export function toSettingsRow(
  data: ProfileOutput,
  openingBalanceDate: IsoDate | null,
): SettingsInput {
  return {
    anchorPayday: data.anchorPayday,
    payFrequency: data.payFrequency,
    payAmount: data.payAmount,
    mode: data.mode,
    openingBalance: data.openingBalance,
    openingBalanceDate,
    floor: data.floor,
    lowBalanceWarning: data.lowBalanceWarning,
  };
}
