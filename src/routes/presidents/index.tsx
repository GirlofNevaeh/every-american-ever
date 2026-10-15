import { createFileRoute, Link } from "@tanstack/react-router";
import { Portrait } from "@/components/portrait";
import { ordinal } from "@/data/format";
import { PRESIDENCY, getPresident, termLabel } from "@/data/presidents";

export const Route = createFileRoute("/presidents/")({
  component: PresidentsPage,
  head: () => ({ meta: [{ title: "Presidents · Every American Ever" }] }),
});

function PresidentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <p className="text-xs font-extrabold tracking-wide text-flag-red">In order</p>
      <h1 className="font-display text-5xl">Presidents</h1>
      <p className="mt-2">From the first president to the president now.</p>
      <ol className="mt-6 flex flex-col">
        {PRESIDENCY.map((slot) => {
          const person = getPresident(slot.slug)!;
          const term = person.terms[person.numbers.indexOf(slot.number)] ?? person.terms[0];
          return (
            <li key={slot.number} className="flex gap-3 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-flag-blue text-xs font-extrabold text-white">
                {slot.number}
              </span>
              <Link
                to="/presidents/$slug"
                params={{ slug: person.slug }}
                search={{ n: slot.number }}
                className="card flex items-center gap-3 p-3"
              >
                <Portrait spec={person.look} label={person.name} className="h-20 w-16 shrink-0" />
                <span>
                  <span className="block text-xs font-extrabold text-flag-red">{ordinal(slot.number)}</span>
                  <span className="block font-display text-2xl">{person.name}</span>
                  <span className="text-sm">{termLabel(term)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
