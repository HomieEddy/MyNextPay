import Link from "next/link";
import type { HomeCard } from "@/lib/home-cards";

const TONE = {
  bills: "c-bills",
  income: "c-inc",
  spend: "c-spend",
  forecast: "c-fc",
} as const;

export function CardStack({ cards }: { cards: HomeCard[] }) {
  return (
    <>
      <div className="sec">This cycle</div>
      <div className="stack">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            scroll={false}
            className={`wcard ${TONE[card.tone]}`}
          >
            <span className="wrow">
              <span className="wt">{card.title}</span>
              <span className="wv num">{card.value}</span>
            </span>
            <span className="ws">{card.detail}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
