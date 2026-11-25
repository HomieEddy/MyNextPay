"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { TextField } from "@/components/ui/text-field";
import { type ActionResult, idle } from "@/lib/action-result";

type Props = {
  action: (previous: ActionResult, formData: FormData) => Promise<ActionResult>;
};

export function LogInForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, idle);

  return (
    <form action={formAction}>
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <FormMessage message={state.ok ? undefined : state.error} />
      <Button type="submit" disabled={pending} className="mt-4">
        Sign in
      </Button>
    </form>
  );
}
