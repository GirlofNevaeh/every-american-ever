import { createFileRoute, Link } from "@tanstack/react-router";
import { CountryMap, StateOutline } from "@/components/maps";
import { getState, STATES } from "@/data/states";

export const Route = createFileRoute("/states/$slug")({
  component: StatePage,
  head: ({ params }) => ({
    meta: [{ title: `${getState(params.slug)?.name ?? "State"} · Every American Ever` }],
  }),
});

function StatePage() {
  const { slug } = Route.useParams();
  const state = getState(slug);
  if (!state) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl">That state is not here</h1>
        <Link to="/states" className="btn mt-4 bg-flag-blue text-white">
          All states
        </Link>
      </div>
    );
  }
  const neighbors = state.borders.map((id) => getState(id)).filter((item) => item !== undefined);
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[1.25rem] border-4 border-dashed border-flag-blue bg-card p-4">
        <StateOutline slug={state.slug} className="h-80 w-full" />
        <p className="mt-2 text-sm">The red star marks {state.capital}.</p>
      </section>
      <section>
        <p className="text-xs font-extrabold tracking-wide text-flag-red">{state.region}</p>
        <h1 className="font-display text-5xl">{state.name}</h1>
        <p className="mt-2 text-lg">{state.name} is a state in the United States.</p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-flag-blue p-3 text-white">
            <dt className="text-xs font-extrabold">Capital</dt>
            <dd className="font-display text-2xl">{state.capital}</dd>
          </div>
          <div className="rounded-2xl border-2 border-flag-blue bg-card p-3">
            <dt className="text-xs font-extrabold text-flag-red">Became a state</dt>
            <dd className="font-display text-2xl">{state.year}</dd>
          </div>
          <div className="col-span-2 rounded-2xl border-2 border-flag-red bg-card p-3">
            <dt className="text-xs font-extrabold text-flag-red">Nickname</dt>
            <dd className="text-lg font-extrabold">{state.nickname[0].toUpperCase() + state.nickname.slice(1)}</dd>
          </div>
        </dl>
        <p className="mt-4">
          {neighbors.length === 0 ? (
            `No state touches ${state.name} by land.`
          ) : neighbors.length === 1 ? (
            <>
              <Link to="/states/$slug" params={{ slug: neighbors[0].slug }} className="font-extrabold underline">
                {neighbors[0].name}
              </Link>
              {` touches ${state.name}.`}
            </>
          ) : (
            <>
              {`These states touch ${state.name}: `}
              {neighbors.map((neighbor, index) => (
                <span key={neighbor.slug}>
                  {index > 0 ? ", " : ""}
                  <Link to="/states/$slug" params={{ slug: neighbor.slug }} className="font-extrabold underline">
                    {neighbor.name}
                  </Link>
                </span>
              ))}
              .
            </>
          )}
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
        {[state.land, state.place, state.symbol, state.native].map((fact, index) => (
          <p key={fact} className={`rounded-2xl p-4 ${index === 0 ? "bg-card border-2 border-flag-blue" : index === 3 ? "bg-paper border-2 border-flag-red" : "bg-card border-2 border-flag-blue"}`}>
            <span className="mb-1 block text-xs font-extrabold text-flag-red">{["Land", "A place", "A symbol", "Nations"][index]}</span>
            {fact}
          </p>
        ))}
      </section>
      <section className="lg:col-span-2">
        <h2 className="font-display text-2xl">Where it sits</h2>
        <div className="mt-2 max-w-xl">
          <CountryMap highlight={state.slug} interactive={false} />
        </div>
        <Link to="/states" className="btn mt-4 bg-flag-blue text-white">
          All states
        </Link>
      </section>
      <p className="sr-only">{STATES.length} states</p>
    </div>
  );
}
