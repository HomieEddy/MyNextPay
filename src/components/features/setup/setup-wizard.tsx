"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import type { SetupInput } from "@/lib/schemas/setup";
import { useSubmit } from "@/lib/use-submit";
import { completeSetup } from "@/server/actions/setup/complete-setup";
import { Progress } from "./progress";
import { firstStepWithError, stepsFor } from "./steps";

export function SetupWizard({ initial }: { initial: SetupInput }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [index, setIndex] = useState(0);
  const { result, pending, submit } = useSubmit(completeSetup, () =>
    router.push("/"),
  );
  const errors = result.ok ? {} : (result.fieldErrors ?? {});
  const steps = stepsFor(values.mode);
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index >= steps.length - 1;
  const onChange = (change: Partial<SetupInput>) =>
    setValues((current) => ({ ...current, ...change }));

  useEffect(() => {
    if (result.ok || !result.fieldErrors) return;
    const target = firstStepWithError(
      stepsFor(values.mode),
      result.fieldErrors,
    );
    if (target >= 0) setIndex(target);
  }, [result, values.mode]);

  return (
    <form
      className="flex min-h-svh flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        if (isLast) submit(values);
        else setIndex(index + 1);
      }}
    >
      <div className="ob-h">
        {index > 0 && (
          <button
            type="button"
            className="icon-btn"
            aria-label="Back"
            onClick={() => setIndex(index - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        )}
        <Progress total={steps.length} current={index} />
      </div>
      <div key={step.key} className="obb sr">
        <h1 className="ob-t">{step.title}</h1>
        <p className="ob-p">{step.intro}</p>
        <step.Body values={values} errors={errors} onChange={onChange} />
      </div>
      <div className="obf">
        <FormMessage message={result.ok ? undefined : result.error} />
        <Button type="submit" disabled={pending}>
          {isLast ? "See my number" : "Continue"}
        </Button>
      </div>
    </form>
  );
}
