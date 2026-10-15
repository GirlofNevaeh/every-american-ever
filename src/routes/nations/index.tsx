import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CultureMap } from "@/components/maps";
import { NATIONS, REGIONS, type CultureRegion } from "@/data/nations";

export const Route = createFileRoute("/nations/")({
  component: NationsPage,
  head: () => ({ meta: [{ title: "Nations · Every American Ever" }] }),
});

function NationsPage() {
  const [region, setRegion] = useState<CultureRegion>("Northeast");
  const info = REGIONS.find((item) => item.id === region);
  const shown = NATIONS.filter((nation) => nation.region === region);
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="max-w-3xl">
        <p className="text-xs font-extrabold tracking-wide text-flag-red">Native nations</p>
        <h1 className="font-display text-5xl">Many nations</h1>
        <p className="mt-3">Native Americans are many nations, not one people.</p>
        <p>There are hundreds of nations. This site can show only some.</p>
        <p>Alaska Native peoples and Native Hawaiians are not the same as one another.</p>
      </header>
      <CultureMap active={region} onPick={setRegion} />
      <p className="text-sm">These shapes are culture regions. They are not state lines, and they are not old borders.</p>
      <section className="rounded-[1.25rem] bg-flag-blue p-5 text-white">
        <h2 className="font-display text-3xl">{region}</h2>
        <p className="mt-2">{info?.blurb}</p>
        {shown.length === 0 ? (
          <p className="mt-2">This site can show only some nations from this region.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {shown.map((nation) => (
              <li key={nation.slug}>
                <Link to="/nations/$slug" params={{ slug: nation.slug }} className="btn bg-card text-ink">
                  {nation.english}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <ul className="flex flex-col gap-3">
        {NATIONS.map((nation, index) => (
          <li key={nation.slug} className={index % 2 === 0 ? "mr-0 sm:mr-16" : "ml-0 sm:ml-16"}>
            <Link to="/nations/$slug" params={{ slug: nation.slug }} className="card flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span>
                <span className="block text-xs font-extrabold text-flag-red">{nation.region}</span>
                <span className="font-display text-3xl">{nation.name}</span>
              </span>
              <span className="text-sm">Also called {nation.english}</span>
            </Link>
          </li>
        ))}
      </ul>
      <section id="people" className="card p-5">
        <h2 className="font-display text-3xl">Real people</h2>
        <ul className="mt-3 space-y-2">
          <li>Sequoyah made a writing system for the Cherokee language.</li>
          <li>Wilma Mankiller led the Cherokee Nation.</li>
          <li>Sacagawea was Lemhi Shoshone. She helped travelers find their way.</li>
          <li>Maria Tallchief was Osage. She danced ballet. Osage homelands are on the Plains.</li>
        </ul>
      </section>
    </div>
  );
}
