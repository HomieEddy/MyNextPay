import { Button } from "@/components/ui/button";

export function LogOutButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <Button type="submit" variant="ghost">
        Sign out
      </Button>
    </form>
  );
}
