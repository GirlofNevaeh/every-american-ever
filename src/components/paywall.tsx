import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { enterKey, safeNext } from "@/lib/gate";

export function Paywall({ next }: { next: string }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await enterKey({ data: { key } });
      if (result.ok) {
        window.location.assign(safeNext(next) || "/");
        return;
      }
      setError(result.error);
    } catch {
      setError("That key does not work. Check it and try again.");
    }
    setPending(false);
  }

  return (
    <div className="mx-auto grid max-w-xl gap-4 px-4 py-8">
      <section className="rounded-[1.25rem] bg-flag-blue p-5 text-white">
        <p className="text-sm font-extrabold">Ages 5 to 12</p>
        <h1 className="mt-2 font-display text-4xl">Every American Ever</h1>
        <p className="mt-3 text-lg">The pages inside stay locked until you enter an access key.</p>
      </section>
      <form onSubmit={onSubmit} className="card p-5">
        <label htmlFor="access-key" className="font-display text-3xl">
          Access key
        </label>
        <input
          id="access-key"
          name="key"
          value={key}
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          className="mt-3 min-h-14 w-full rounded-2xl border-2 border-flag-blue bg-paper px-4 text-lg font-extrabold"
          onChange={(event) => setKey(event.target.value)}
        />
        {error ? <p className="mt-3 font-extrabold text-flag-red">{error}</p> : null}
        <button
          type="submit"
          disabled={pending || key.trim().length === 0}
          className="btn mt-4 w-full bg-flag-blue text-white disabled:opacity-60"
        >
          Enter key
        </button>
        <Link to="/" search={{ next: undefined }} className="mt-3 block text-center font-extrabold text-flag-blue">
          Back to the home page
        </Link>
      </form>
    </div>
  );
}
