import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import type { CycleCardView } from "@/lib/cycle-card";

export function CycleCard({ card }: { card: CycleCardView }) {
  return (
    <div className="ccard">
      <span className="wrow">
        <span>
          <b className="block text-[15px]">{card.label}</b>
          <span className="small">{card.sub}</span>
        </span>
        <Chip status={card.status} label={card.statusLabel} />
      </span>
      <span className="wrow mt-2.5">
        <span className="small">Safe to spend</span>
        <b
          className={`num text-2xl tracking-tight ${card.negative ? "text-red-ink" : ""}`}
        >
          {card.safe}
        </b>
      </span>
      <span className="kv">
        <span>
          In<b className="num">{card.income}</b>
        </span>
        <span>
          Bills<b className="num">{card.bills}</b>
        </span>
        <span>
          Per day<b className="num">{card.perDay}</b>
        </span>
      </span>
      {card.href && (
        <Link href={card.href} className="link">
          Open on Home
        </Link>
      )}
    </div>
  );
}
