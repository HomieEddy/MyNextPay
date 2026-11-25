import type { ComponentType } from "react";
import type { TrackingMode } from "@/domain/cycle-summary";
import { StepBalance } from "./step-balance";
import { StepBills } from "./step-bills";
import { StepFloor } from "./step-floor";
import { StepMode } from "./step-mode";
import { StepPay } from "./step-pay";
import type { StepProps } from "./step-props";

export type Step = {
  key: string;
  title: string;
  intro: string;
  fields: string[];
  Body: ComponentType<StepProps>;
};

const PAY: Step = {
  key: "pay",
  title: "Your pay",
  intro: "Every number in NextPay is built around your paydays.",
  fields: ["name", "anchorPayday", "payFrequency", "payAmount"],
  Body: StepPay,
};
const MODE: Step = {
  key: "mode",
  title: "How do you want to track?",
  intro: "Pick what fits your habits. You can switch anytime in Settings.",
  fields: ["mode"],
  Body: StepMode,
};
const BALANCE: Step = {
  key: "balance",
  title: "Where you stand",
  intro:
    "How much is in your account right now? This is where your ledger starts.",
  fields: ["openingBalance"],
  Body: StepBalance,
};
const BILLS: Step = {
  key: "bills",
  title: "Your regular bills",
  intro:
    "Tap the ones you have, then fill in amounts. You can set exact schedules later in Recurring.",
  fields: ["bills"],
  Body: StepBills,
};
const FLOOR: Step = {
  key: "floor",
  title: "Set your floor",
  intro:
    "If safe-to-spend dips below this, NextPay marks the cycle as tight and warns you on Home.",
  fields: ["floor", "lowBalanceWarning"],
  Body: StepFloor,
};

/** The balance step only exists in Ledger mode. */
export function stepsFor(mode: TrackingMode): Step[] {
  return mode === "ledger"
    ? [PAY, MODE, BALANCE, BILLS, FLOOR]
    : [PAY, MODE, BILLS, FLOOR];
}

/** The first step holding a field with an error, or -1. */
export function firstStepWithError(
  steps: Step[],
  errors: Record<string, string>,
): number {
  return steps.findIndex((step) =>
    step.fields.some((field) => field in errors),
  );
}
