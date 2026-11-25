import Link from "next/link";

export function TopBar() {
  return (
    <header className="top mx-auto max-w-md">
      <span className="brand">NextPay</span>
      <Link
        href="/?sheet=add"
        scroll={false}
        className="icon-btn add"
        aria-label="Log an expense"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>
    </header>
  );
}
