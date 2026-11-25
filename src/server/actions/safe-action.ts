import "server-only";
import { createSafeActionClient } from "next-safe-action";
import { requireSession } from "../auth/require-session";

/** Base for signed-in server actions: checks the session, then validates input with the action's Zod schema. */
export const authedAction = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleServerError: () => "Something went wrong. Try again.",
}).use(async ({ next }) => {
  await requireSession();
  return next();
});
