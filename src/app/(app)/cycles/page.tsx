import { redirect } from "next/navigation";
import { CycleCard } from "@/components/features/cycles/cycle-card";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { toCycleCard } from "@/lib/cycle-card";
import { getDb } from "@/server/db/client";
import { loadCycle } from "@/server/queries/load-cycle";

export const dynamic = "force-dynamic";

const OFFSETS = [0, 1, 2, 3, 4, 5];

export default function CyclesPage() {
  const db = getDb();
  const cards = OFFSETS.flatMap((offset) => {
    const summary = loadCycle(db, offset);
    return summary ? [toCycleCard(summary, offset)] : [];
  });
  if (cards.length === 0) redirect("/setup");

  return (
    <>
      <ScreenHeading title="Next six paydays" />
      {cards.map((card) => (
        <CycleCard key={card.offset} card={card} />
      ))}
    </>
  );
}
