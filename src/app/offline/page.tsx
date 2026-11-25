import { IntroHeading } from "@/components/ui/intro-heading";

export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <IntroHeading
        title="You're offline"
        intro="NextPay needs your server to show your numbers. Check your connection and try again."
      />
    </main>
  );
}
