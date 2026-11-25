"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Segmented } from "@/components/ui/segmented";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import type { RecurringInput } from "@/lib/schemas/recurring";
import { useSubmit } from "@/lib/use-submit";
import { saveRecurringItem } from "@/server/actions/recurring/save-recurring-item";
import { RecurringScheduleFields } from "./recurring-schedule-fields";

export function RecurringForm({ initial }: { initial: RecurringInput }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const { result, pending, submit } = useSubmit(saveRecurringItem, () =>
    router.push("/recurring"),
  );
  const errors = result.ok ? {} : (result.fieldErrors ?? {});
  const patch = (change: Partial<RecurringInput>) =>
    setValues((current) => ({ ...current, ...change }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit(values);
      }}
      className="space-y-4"
    >
      <Segmented
        label="Kind"
        value={values.kind}
        onChange={(kind) => patch({ kind })}
        options={[
          { value: "bill", label: "Bill" },
          { value: "income", label: "Income" },
        ]}
      />
      <TextField
        label="Name"
        name="name"
        value={values.name}
        onChange={(event) => patch({ name: event.target.value })}
        error={errors.name}
        required
      />
      <TextField
        label="Amount"
        name="amount"
        inputMode="decimal"
        placeholder="0.00"
        value={values.amount}
        onChange={(event) => patch({ amount: event.target.value })}
        error={errors.amount}
      />
      <TextField
        label="Category"
        name="category"
        value={values.category}
        onChange={(event) => patch({ category: event.target.value })}
        error={errors.category}
      />
      <RecurringScheduleFields
        values={values}
        errors={errors}
        onChange={patch}
      />
      {values.kind === "bill" && (
        <Switch
          label="Log it automatically when due"
          checked={values.autoPay}
          onChange={(autoPay) => patch({ autoPay })}
        />
      )}
      <FormMessage message={result.ok ? undefined : result.error} />
      <Button type="submit" disabled={pending}>
        Save
      </Button>
    </form>
  );
}
