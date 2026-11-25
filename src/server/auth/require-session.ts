import "server-only";
import { redirect } from "next/navigation";
import { hasValidSession } from "./session";

/** Sends the visitor to the login page unless they are signed in. */
export async function requireSession() {
  if (!(await hasValidSession())) redirect("/login");
}
