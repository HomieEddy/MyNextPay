/** The NextPay payday ring: a cycle most of the way round, with payday as the orange dot. */
export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="114" fill="var(--color-green)" />
      <circle
        cx="256"
        cy="256"
        r="150"
        fill="none"
        stroke="var(--color-card)"
        strokeOpacity=".2"
        strokeWidth="54"
      />
      <path
        d="M352.4 141.1A150 150 0 1 1 108.3 229.9"
        fill="none"
        stroke="var(--color-card)"
        strokeWidth="54"
        strokeLinecap="round"
      />
      <circle cx="256" cy="106" r="38" fill="var(--color-orange)" />
    </svg>
  );
}
