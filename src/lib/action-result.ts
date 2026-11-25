export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export const idle: ActionResult = { ok: true };

/** What a next-safe-action call returns, narrowed to the parts the UI reads. */
export type SafeResult = {
  data?: unknown;
  serverError?: string;
  validationErrors?: { fieldErrors?: Partial<Record<string, string[]>> };
};

function isActionResult(value: unknown): value is ActionResult {
  return typeof value === "object" && value !== null && "ok" in value;
}

function firstErrors(errors: Partial<Record<string, string[]>>) {
  const result: Record<string, string> = {};
  for (const [key, messages] of Object.entries(errors)) {
    if (messages?.[0]) result[key] = messages[0];
  }
  return result;
}

/** Turns a next-safe-action result into the ActionResult the forms show. */
export function toActionResult(result: SafeResult | undefined): ActionResult {
  if (result?.validationErrors) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: firstErrors(result.validationErrors.fieldErrors ?? {}),
    };
  }
  if (result?.serverError) return { ok: false, error: result.serverError };
  return isActionResult(result?.data) ? result.data : idle;
}
