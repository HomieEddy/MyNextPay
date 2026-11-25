import { redirect } from "next/navigation";
import { LogInForm } from "@/components/features/auth/log-in-form";
import { IntroHeading } from "@/components/ui/intro-heading";
import { logIn } from "@/server/actions/auth/log-in";
import { hasValidSession } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { userExists } from "@/server/repos/user-repo";

export default async function LoginPage() {
  if (!userExists(getDb())) redirect("/onboarding");
  if (await hasValidSession()) redirect("/");

  return (
    <>
      <IntroHeading
        title="Welcome back"
        intro="Enter your password to open NextPay."
      />
      <LogInForm action={logIn} />
    </>
  );
}
