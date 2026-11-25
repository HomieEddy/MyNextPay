export function FormMessage({ message }: { message?: string }) {
  return (
    <p role="alert" className="min-h-5 text-[13px] text-red-ink">
      {message}
    </p>
  );
}
