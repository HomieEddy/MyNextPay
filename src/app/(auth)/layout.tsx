export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-md px-6 pt-16 pb-10">{children}</main>
  );
}
