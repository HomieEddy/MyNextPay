export function LogOutButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <button type="submit" className="row rowbtn">
        <span className="t">
          <b>Sign out</b>
        </span>
      </button>
    </form>
  );
}
