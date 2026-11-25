import Link from "next/link";

export type SegmentLink = { href: string; label: string; active: boolean };

export function SegmentedLinks({
  label,
  links,
}: {
  label: string;
  links: SegmentLink[];
}) {
  return (
    <nav
      aria-label={label}
      className="seg"
      style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={link.active ? "page" : undefined}
          className={`grid min-h-10 place-items-center rounded-[10px] text-sm font-semibold ${link.active ? "on" : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
