"use server";

import { redirect } from "next/navigation";
import type { ActionResult } from "@/lib/action-result";
import { clientKey } from "../../auth/client-key";
import {
  clearFailedLogins,
  isLoginBlocked,
  recordFailedLogin,
} from "../../auth/login-limiter";
import { verifyPassword } from "../../auth/password";
import { startSession } from "../../auth/session";
import { getDb } from "../../db/client";
import { findUser } from "../../repos/user-repo";
import { logInSchema } from "./schemas";

const WRONG_PASSWORD: ActionResult = {
  ok: false,
  error: "That password isn't right.",
};

export async function logIn(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const key = await clientKey();
  if (isLoginBlocked(key)) {
    return { ok: false, error: "Too many attempts. Try again in 15 minutes." };
  }

  const parsed = logInSchema.safeParse(Object.fromEntries(formData));
  const user = findUser(getDb());
  if (!parsed.success || !user) return WRONG_PASSWORD;

  if (!(await verifyPassword(user.passwordHash, parsed.data.password))) {
    recordFailedLogin(key);
    return WRONG_PASSWORD;
  }

  clearFailedLogins(key);
  await startSession();
  redirect("/");
}
