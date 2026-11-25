"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import type { ProfileInput } from "@/lib/schemas/profile";
import { useSubmit } from "@/lib/use-submit";
import { saveSettingsAction } from "@/server/actions/settings/save-settings";
import { PayRows } from "./pay-rows";
import { TrackingRows } from "./tracking-rows";
import { WarningRows } from "./warning-rows";

export function SettingsForm({ initial }: { initial: ProfileInput }) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(false);
  const { result, pending, submit } = useSubmit(saveSettingsAction, () =>
    setSaved(true),
  );
  const errors = result.ok ? {} : (result.fieldErrors ?? {});
  const onChange = (change: Partial<ProfileInput>) => {
    setSaved(false);
    setValues((current) => ({ ...current, ...change }));
  };
  const group = { values, errors, onChange };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit(values);
      }}
    >
      <TrackingRows {...group} />
      <PayRows {...group} />
      <WarningRows {...group} />
      <FormMessage message={result.ok ? undefined : result.error} />
      {saved && <p className="small text-center">Saved.</p>}
      <Button type="submit" disabled={pending}>
        Save changes
      </Button>
    </form>
  );
}
