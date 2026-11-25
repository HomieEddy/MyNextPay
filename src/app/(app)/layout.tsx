import { TabBar } from "@/components/features/nav/tab-bar";
import { TopBar } from "@/components/features/nav/top-bar";
import { requireSession } from "@/server/auth/require-session";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  await requireSession();
  return (
    <>
      <TopBar />
      <main className="page mx-auto w-full max-w-md px-5 pb-32">
        {children}
      </main>
      <TabBar />
    </>
  );
}
