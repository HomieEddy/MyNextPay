import Link from "next/link";

export function FloorBanner({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="banner">
      <b>{title}</b>
      <span>{detail}</span>
      <br />
      <Link
        href="/settings"
        className="inline-block min-h-8 pt-2 font-bold underline"
      >
        Adjust floor
      </Link>
    </div>
  );
}
