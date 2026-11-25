"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AmountInput } from "@/components/ui/amount-input";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Segmented } from "@/components/ui/segmented";
import { TextField } from "@/components/ui/text-field";
import type { EntryFormInput } from "@/lib/schemas/entry";
import { useSubmit } from "@/lib/use-submit";
import { logEntry } from "@/server/actions/entries/log-entry";
import { categoriesFor } from "./entry-categories";

export function AddEntryForm({
  initial,
  closeHref,
}: {
  initial: EntryFormInput;
  closeHref: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const { result, pending, submit } = useSubmit(logEntry, () =>
    router.push(closeHref, { scroll: false }),
  );
  const errors = result.ok ? {} : (result.fieldErrors ?? {});
  const patch = (change: Partial<EntryFormInput>) =>
    setValues((current) => ({ ...current, ...change }));
  const setKind = (kind: EntryFormInput["kind"]) =>
    patch({ kind, category: categoriesFor(kind)[0] });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit(values);
      }}
    >
      {values.kind !== "unexpected" && (
        <Segmented
          label="Kind"
          value={values.kind}
          onChange={setKind}
          options={[
            { value: "expense", label: "Expense" },
            { value: "income", label: "Income" },
          ]}
        />
      )}
      <AmountInput
        id="entryAmount"
        label="Amount"
        value={values.amount}
        onChange={(amount) => patch({ amount })}
      />
      {errors.amount && <p className="err text-center">{errors.amount}</p>}
      <div className="cats mb-3.5">
        {categoriesFor(values.kind).map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={values.category === category}
            className={values.category === category ? "on" : ""}
            onClick={() => patch({ category })}
          >
            {category}
          </button>
        ))}
      </div>
      <TextField
        label="What was it?"
        name="description"
        placeholder={values.kind === "unexpected" ? "Brake repair" : "Optional"}
        value={values.description}
        onChange={(event) => patch({ description: event.target.value })}
        error={errors.description}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={values.date}
        onChange={(event) => patch({ date: event.target.value })}
        error={errors.date}
      />
      <FormMessage message={result.ok ? undefined : result.error} />
      <Button type="submit" disabled={pending}>
        {values.id === undefined ? "Log it" : "Save"}
      </Button>
    </form>
  );
}
