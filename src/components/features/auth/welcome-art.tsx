/** The fanned Wallet cards from the onboarding welcome screen. Decorative. */
export function WelcomeArt() {
  return (
    <div className="ob-art" aria-hidden="true">
      <div className="oc oc1">
        <span className="wt">Bills</span>
      </div>
      <div className="oc oc2">
        <span className="wt">Income</span>
      </div>
      <div className="oc oc3">
        <div className="cap">Safe to spend</div>
        <b className="num">
          $858<small style={{ fontSize: ".5em", opacity: 0.7 }}>.25</small>
        </b>
      </div>
    </div>
  );
}
