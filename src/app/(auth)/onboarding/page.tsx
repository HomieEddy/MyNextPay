import { redirect } from "next/navigation";
import { CreatePasswordForm } from "@/components/features/auth/create-password-form";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { createPassword } from "@/server/actions/auth/create-password";
import { getDb } from "@/server/db/client";
import { userExists } from "@/server/repos/user-repo";

export default function OnboardingPage() {
  if (userExists(getDb())) redirect("/login");

  return (
    <>
      <ScreenHeading
        title="Lock it down"
        intro="NextPay runs on your own server. Choose a password so only you can open it."
      />
      <CreatePasswordForm action={createPassword} />
    </>
  );
}
