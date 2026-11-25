export function IntroHeading({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <>
      <h1 className="ob-t">{title}</h1>
      <p className="ob-p">{intro}</p>
    </>
  );
}
