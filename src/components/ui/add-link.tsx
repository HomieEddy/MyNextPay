import Link from "next/link";

/** Round "+" button that links to a create page. */
export function AddLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="icon-btn">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </Link>
  );
}
