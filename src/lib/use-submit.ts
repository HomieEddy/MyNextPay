import { useState, useTransition } from "react";
import {
  type ActionResult,
  idle,
  type SafeResult,
  toActionResult,
} from "./action-result";

/** Runs a server action from a client form and remembers its result. */
export function useSubmit<T>(
  action: (input: T) => Promise<SafeResult | undefined>,
  onDone: () => void,
) {
  const [result, setResult] = useState<ActionResult>(idle);
  const [pending, startTransition] = useTransition();

  function submit(input: T) {
    startTransition(async () => {
      const next = toActionResult(await action(input));
      setResult(next);
      if (next.ok) onDone();
    });
  }

  return { result, pending, submit };
}
