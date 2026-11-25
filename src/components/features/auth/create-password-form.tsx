"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { TextField } from "@/components/ui/text-field";
import { type ActionResult, idle } from "@/lib/action-result";

type Props = {
  action: (previous: ActionResult, formData: FormData) => Promise<ActionResult>;
};

export function CreatePasswordForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, idle);
  const errors = state.ok ? {} : (state.fieldErrors ?? {});

  return (
    <form action={formAction}>
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        error={errors.password}
      />
      <TextField
        label="Confirm password"
        name="confirm"
        type="password"
        autoComplete="new-password"
        required
        error={errors.confirm}
      />
      <FormMessage message={state.ok ? undefined : state.error} />
      <Button type="submit" disabled={pending} className="mt-4">
        Continue
      </Button>
    </form>
  );
}
