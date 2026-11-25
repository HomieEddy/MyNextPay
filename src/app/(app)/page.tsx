import { LogOutButton } from "@/components/features/auth/log-out-button";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { logOut } from "@/server/actions/auth/log-out";

export default function HomePage() {
  return (
    <>
      <ScreenHeading
        title="You're signed in"
        intro="The foundation is in place. The dashboard arrives in the next step."
      />
      <LogOutButton action={logOut} />
    </>
  );
}
