import { useState, useTransition } from "react";
import { type ActionResult, idle } from "./action-result";

/** Runs a server action from a client form and remembers its result. */
export function useSubmit<T>(
  action: (input: T) => Promise<ActionResult>,
  onDone: () => void,
) {
  const [result, setResult] = useState<ActionResult>(idle);
  const [pending, startTransition] = useTransition();

  function submit(input: T) {
    startTransition(async () => {
      const next = await action(input);
      setResult(next);
      if (next.ok) onDone();
    });
  }

  return { result, pending, submit };
}
