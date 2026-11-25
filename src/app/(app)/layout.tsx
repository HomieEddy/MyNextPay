import { requireSession } from "@/server/auth/require-session";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  await requireSession();
  return (
    <main className="mx-auto w-full max-w-md px-5 pt-10 pb-10">{children}</main>
  );
}
