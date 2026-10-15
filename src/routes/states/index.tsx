import { createFileRoute, Link } from "@tanstack/react-router";
import { CountryMap } from "@/components/maps";
import { STATES } from "@/data/states";

export const Route = createFileRoute("/states/")({
  component: StatesPage,
  head: () => ({ meta: [{ title: "States · Every American Ever" }] }),
});

function StatesPage() {
  const ordered = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header>
        <p className="text-xs font-extrabold tracking-wide text-flag-red">50 states</p>
        <h1 className="font-display text-5xl">States</h1>
        <p className="mt-2 max-w-2xl">Tap a state. Each one is part of the United States.</p>
      </header>
      <CountryMap stars />
      <p className="text-sm font-extrabold">Alaska and Hawaii are in boxes. They are not next to California.</p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {ordered.map((state) => (
          <li key={state.slug}>
            <Link to="/states/$slug" params={{ slug: state.slug }} className="card flex min-h-14 items-center px-3 py-2 font-extrabold">
              {state.name}
            </Link>
          </li>
        ))}
      </ul>
      <aside id="district" className="max-w-md rounded-[1.25rem] border-2 border-flag-red bg-card p-4">
        <p className="text-xs font-extrabold tracking-wide text-flag-red">Not a state</p>
        <h2 className="font-display text-2xl">Washington, D.C.</h2>
        <p>Washington, D.C. is the capital city. It is not a state.</p>
      </aside>
    </div>
  );
}
