"use server";

import { redirect } from "next/navigation";
import { endSession } from "../../auth/session";

export async function logOut() {
  await endSession();
  redirect("/login");
}
