export function ScreenHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-6">
      <h1 className="text-[34px] leading-[1.05] font-extrabold tracking-tight text-balance">
        {title}
      </h1>
      {intro && <p className="mt-2.5 text-mute">{intro}</p>}
    </header>
  );
}
