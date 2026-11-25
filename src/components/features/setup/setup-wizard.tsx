"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { ScreenHeading } from "@/components/ui/screen-heading";
import type { SetupInput } from "@/lib/schemas/setup";
import { useSubmit } from "@/lib/use-submit";
import { completeSetup } from "@/server/actions/setup/complete-setup";
import { StepBills } from "./step-bills";
import { StepPay } from "./step-pay";
import { StepTracking } from "./step-tracking";

const STEPS = [
  {
    title: "Your pay",
    intro: "When do you get paid, and how much lands in your account?",
  },
  {
    title: "How to track",
    intro: "Pick how much effort you want. You can change this later.",
  },
  {
    title: "Bills and floor",
    intro: "Add the bills that repeat. Set the least you want to keep.",
  },
];

/** Which step holds each field, so a server error can send the person back to it. */
const STEP_OF_FIELD: Record<string, number> = {
  name: 0,
  anchorPayday: 0,
  payFrequency: 0,
  payAmount: 0,
  mode: 1,
  openingBalance: 1,
  bills: 2,
  floor: 2,
  lowBalanceWarning: 2,
};

export function SetupWizard({ initial }: { initial: SetupInput }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const { result, pending, submit } = useSubmit(completeSetup, () =>
    router.push("/"),
  );
  const errors = result.ok ? {} : (result.fieldErrors ?? {});
  const patch = (change: Partial<SetupInput>) =>
    setValues((current) => ({ ...current, ...change }));
  const isLast = step === STEPS.length - 1;

  useEffect(() => {
    if (result.ok || !result.fieldErrors) return;
    const steps = Object.keys(result.fieldErrors)
      .map((field) => STEP_OF_FIELD[field])
      .filter((index): index is number => index !== undefined);
    if (steps.length > 0) setStep(Math.min(...steps));
  }, [result]);

  return (
    <>
      <ScreenHeading title={STEPS[step].title} intro={STEPS[step].intro} />
      <p className="mb-5 text-sm text-mute">
        Step {step + 1} of {STEPS.length}
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (isLast) submit(values);
          else setStep(step + 1);
        }}
        className="space-y-4"
      >
        {step === 0 && (
          <StepPay values={values} errors={errors} onChange={patch} />
        )}
        {step === 1 && (
          <StepTracking values={values} errors={errors} onChange={patch} />
        )}
        {step === 2 && (
          <StepBills values={values} errors={errors} onChange={patch} />
        )}
        <FormMessage message={result.ok ? undefined : result.error} />
        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button type="submit" disabled={pending}>
            {isLast ? "Finish" : "Continue"}
          </Button>
        </div>
      </form>
    </>
  );
}
