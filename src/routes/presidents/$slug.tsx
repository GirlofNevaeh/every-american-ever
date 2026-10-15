import { createFileRoute, Link } from "@tanstack/react-router";
import { Portrait } from "@/components/portrait";
import { ordinal } from "@/data/format";
import { PRESIDENCY, getPresident, termLabel } from "@/data/presidents";

export const Route = createFileRoute("/presidents/$slug")({
  validateSearch: (search: Record<string, unknown>): { n?: number } => {
    const raw = search.n;
    const value = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : undefined;
    if (value === undefined || Number.isNaN(value)) return {};
    return { n: value };
  },
  component: PresidentPage,
  head: ({ params }) => ({
    meta: [{ title: `${getPresident(params.slug)?.name ?? "President"} · Every American Ever` }],
  }),
});

function PresidentPage() {
  const { slug } = Route.useParams();
  const { n } = Route.useSearch();
  const person = getPresident(slug);
  if (!person) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl">That president is not here</h1>
        <Link to="/presidents" className="btn mt-4 bg-flag-blue text-white">
          All presidents
        </Link>
      </div>
    );
  }
  const number = person.numbers.includes(n ?? -1) ? (n as number) : person.numbers[0];
  const index = PRESIDENCY.findIndex((slot) => slot.number === number);
  const prev = PRESIDENCY[index - 1];
  const next = PRESIDENCY[index + 1];
  return (
    <article className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-[16rem_1fr]">
      <div className="rounded-[1.25rem] bg-flag-blue p-4">
        <Portrait spec={person.look} label={person.name} className="mx-auto h-64 w-52" />
      </div>
      <div>
        <p className="text-xs font-extrabold tracking-wide text-flag-red">
          {person.numbers.map((value) => ordinal(value)).join(" and ")} president
        </p>
        <h1 className="font-display text-5xl">{person.name}</h1>
        {person.numbers.length > 1 && (
          <p className="mt-2">
            He {person.died ? "was" : "is"} the {person.numbers.map((value) => ordinal(value)).join(" and the ")} president. Count each term. He is still one person.
          </p>
        )}
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-flag-blue bg-card p-3">
            <dt className="text-xs font-extrabold text-flag-red">Born</dt>
            <dd className="text-xl font-extrabold">{person.born}</dd>
          </div>
          <div className="rounded-2xl border-2 border-flag-blue bg-card p-3">
            <dt className="text-xs font-extrabold text-flag-red">{person.died ? "Died" : "Living"}</dt>
            <dd className="text-xl font-extrabold">{person.died ?? "Still living"}</dd>
          </div>
        </dl>
        <ul className="mt-4 flex flex-col gap-2">
          {person.terms.map((term) => (
            <li key={`${term.start}-${term.end ?? "now"}`} className="rounded-full bg-card px-4 py-2 font-extrabold">
              Term {termLabel(term)}
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2">
          {person.facts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {prev && (
            <Link to="/presidents/$slug" params={{ slug: prev.slug }} search={{ n: prev.number }} className="btn bg-card border-2 border-flag-blue">
              Earlier
            </Link>
          )}
          {next && (
            <Link to="/presidents/$slug" params={{ slug: next.slug }} search={{ n: next.number }} className="btn bg-flag-blue text-white">
              Later
            </Link>
          )}
          <Link to="/presidents" className="btn bg-card border-2 border-flag-red">
            All presidents
          </Link>
        </div>
      </div>
    </article>
  );
}
