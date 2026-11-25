export function FormMessage({ message }: { message?: string }) {
  return (
    <p role="alert" className="err">
      {message}
    </p>
  );
}
