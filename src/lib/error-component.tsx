import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink">
      <p className="btn bg-flag-red px-3 text-xs font-bold tracking-wide text-white">
        Something went wrong
      </p>
      <h1 className="font-display text-3xl">Try that page again</h1>
      <p className="max-w-md text-base break-words">{errorMessage(error)}</p>
    </main>
  );
}
