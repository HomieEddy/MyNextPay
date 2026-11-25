"use client";

import { useState } from "react";
import { BalanceField } from "@/components/features/profile/balance-field";
import { FloorFields } from "@/components/features/profile/floor-fields";
import { PayFields } from "@/components/features/profile/pay-fields";
import { TrackingChoice } from "@/components/features/profile/tracking-choice";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Section } from "@/components/ui/section";
import type { ProfileInput } from "@/lib/schemas/profile";
import { useSubmit } from "@/lib/use-submit";
import { saveSettingsAction } from "@/server/actions/settings/save-settings";

export function SettingsForm({ initial }: { initial: ProfileInput }) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(false);
  const { result, pending, submit } = useSubmit(saveSettingsAction, () =>
    setSaved(true),
  );
  const errors = result.ok ? {} : (result.fieldErrors ?? {});
  const patch = (change: Partial<ProfileInput>) => {
    setSaved(false);
    setValues((current) => ({ ...current, ...change }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit(values);
      }}
    >
      <Section title="Pay">
        <div className="space-y-4 p-4">
          <PayFields values={values} errors={errors} onChange={patch} />
        </div>
      </Section>
      <Section title="Tracking">
        <div className="space-y-4 p-4">
          <TrackingChoice
            value={values.mode}
            onChange={(mode) => patch({ mode })}
          />
          {values.mode === "ledger" && (
            <BalanceField
              value={values.openingBalance}
              error={errors.openingBalance}
              onChange={(openingBalance) => patch({ openingBalance })}
            />
          )}
        </div>
      </Section>
      <Section title="Safety">
        <div className="space-y-4 p-4">
          <FloorFields values={values} errors={errors} onChange={patch} />
        </div>
      </Section>
      <div className="mt-6 space-y-3">
        <FormMessage message={result.ok ? undefined : result.error} />
        {saved && <p className="text-center text-sm text-green">Saved.</p>}
        <Button type="submit" disabled={pending}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
