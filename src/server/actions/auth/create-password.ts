"use server";

import { redirect } from "next/navigation";
import type { ActionResult } from "@/lib/action-result";
import { fieldErrors } from "@/lib/field-errors";
import { hashPassword } from "../../auth/password";
import { startSession } from "../../auth/session";
import { getDb } from "../../db/client";
import { createUser, userExists } from "../../repos/user-repo";
import { createPasswordSchema } from "./schemas";

/** First run only: sets the app password and signs in. */
export async function createPassword(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const db = getDb();
  if (userExists(db)) return { ok: false, error: "A password is already set." };

  const parsed = createPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  createUser(db, {
    name: "",
    passwordHash: await hashPassword(parsed.data.password),
  });
  await startSession();
  redirect("/setup");
}
