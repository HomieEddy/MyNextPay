import type { IsoDate } from "@/domain/dates";
import type { ProfileOutput } from "@/lib/schemas/profile";
import type { Settings } from "../../repos/settings-repo";

/**
 * The day the ledger balance was last set. It restarts when Ledger is switched on
 * or the balance changes, and stays put otherwise. Simple mode has no balance date.
 */
export function openingBalanceDateFor(
  previous: Settings | undefined,
  data: ProfileOutput,
  today: IsoDate,
): IsoDate | null {
  if (data.mode === "simple") return null;
  if (
    previous?.mode === "ledger" &&
    previous.openingBalance === data.openingBalance &&
    previous.openingBalanceDate
  ) {
    return previous.openingBalanceDate;
  }
  return today;
}
