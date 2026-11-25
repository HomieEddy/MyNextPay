import { requireSession } from "@/server/auth/require-session";

export const dynamic = "force-dynamic";

export default async function SetupLayout({ children }: LayoutProps<"/">) {
  await requireSession();
  return <main className="mx-auto w-full max-w-md">{children}</main>;
}
