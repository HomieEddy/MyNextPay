import Link from "next/link";

function Arrow({
  href,
  label,
  path,
}: {
  href: string | null;
  label: string;
  path: string;
}) {
  const icon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
  if (!href) return <span className="off">{icon}</span>;
  return (
    <Link href={href} aria-label={label}>
      {icon}
    </Link>
  );
}

export function CycleNav({
  label,
  sub,
  previousHref,
  nextHref,
}: {
  label: string;
  sub: string;
  previousHref: string | null;
  nextHref: string | null;
}) {
  return (
    <nav className="nav" aria-label="Pay cycles">
      <Arrow href={previousHref} label="Previous cycle" path="M15 5l-7 7 7 7" />
      <div className="lbl">
        {label}
        <small>{sub}</small>
      </div>
      <Arrow href={nextHref} label="Next cycle" path="M9 5l7 7-7 7" />
    </nav>
  );
}
