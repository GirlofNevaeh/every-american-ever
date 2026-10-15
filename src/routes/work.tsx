import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CountryMap } from "@/components/maps";
import { AGE_BANDS, PROJECTS, type AgeBand } from "@/data/projects";
import { STATES } from "@/data/states";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({ meta: [{ title: "Work · Every American Ever" }] }),
});

function WorkPage() {
  const [age, setAge] = useState<AgeBand | "all">("5-6");
  const visible = age === "all" ? PROJECTS : PROJECTS.filter((item) => item.age === age);
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header>
        <p className="text-xs font-extrabold tracking-wide text-flag-red">Print and make</p>
        <h1 className="font-display text-5xl">Work</h1>
        <p className="mt-2 max-w-2xl">Pages to print, and projects to do on your own or with a team.</p>
      </header>
      <section className="no-print grid gap-4 md:grid-cols-2">
        <article className="card p-4">
          <h2 className="font-display text-3xl">Map to label</h2>
          <p className="mt-1 text-sm">Print the map and write the state names.</p>
          <button type="button" className="btn mt-3 bg-flag-blue text-white" onClick={() => printSheet("map")}>
            Print the map
          </button>
        </article>
        <article className="card border-flag-red p-4">
          <h2 className="font-display text-3xl">President card</h2>
          <p className="mt-1 text-sm">Born, died, and terms.</p>
          <button type="button" className="btn mt-3 bg-flag-red text-white" onClick={() => printSheet("card")}>
            Print the card
          </button>
        </article>
      </section>
      <div className="no-print flex flex-wrap gap-2">
        {AGE_BANDS.map((band) => (
          <button key={band} type="button" className={`btn text-sm ${age === band ? "bg-flag-red text-white" : "bg-flag-blue text-white"}`} onClick={() => setAge(band)}>
            Ages {band.replace("-", "–")}
          </button>
        ))}
        <button type="button" className={`btn text-sm ${age === "all" ? "bg-flag-red text-white" : "border-2 border-flag-blue bg-card"}`} onClick={() => setAge("all")}>
          All
        </button>
      </div>
      <div className="no-print flex flex-col gap-8">
        {AGE_BANDS.filter((band) => age === "all" || age === band).map((band) => (
          <section key={band}>
            <h2 className="font-display text-3xl">Ages {band.replace("-", "–")}</h2>
            <div className={`mt-3 grid gap-3 ${band === "5-6" ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
              {visible
                .filter((item) => item.age === band)
                .map((item) => (
                  <article key={item.id} className={cardClass(band)}>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-2xl">{item.title}</h3>
                      <span className="rounded-full bg-flag-red px-2 py-1 text-xs font-extrabold text-white">
                        {item.mode === "solo" ? "On your own" : "With a team"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-extrabold">{item.minutes} minutes</p>
                    <p className="mt-2 text-sm">What you need: {item.need}</p>
                    <ol className="mt-2 list-decimal space-y-1 pl-5">
                      {item.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <p className="mt-3 border-t-2 border-current pt-2 text-sm font-extrabold">Done: {item.done}</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
      <section id="sheet-map" className="print-sheet card p-4">
        <h2 className="font-display text-3xl">Label the states</h2>
        <p className="text-sm">Alaska and Hawaii are in boxes. They are not next to California.</p>
        <CountryMap interactive={false} numbers />
        <ol className="mt-4 columns-2 gap-8 text-sm">
          {[...STATES]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((state, index) => (
              <li key={state.slug} className="mb-1">
                {index + 1}. {state.name[0]}____________
              </li>
            ))}
        </ol>
      </section>
      <section id="sheet-card" className="print-sheet card p-4">
        <h2 className="font-display text-3xl">President card</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Card filled name="George Washington" born="February 22, 1732" died="December 14, 1799" terms="1789–1797" />
          <Card />
          <Card />
        </div>
      </section>
    </div>
  );
}

function cardClass(band: AgeBand): string {
  if (band === "5-6") return "rounded-[1.25rem] border-4 border-dashed border-flag-blue bg-card p-4";
  if (band === "6-7") return "rounded-[1.25rem] border-t-8 border-flag-red bg-card p-4";
  if (band === "7-8") return "rounded-[1.25rem] border-l-8 border-flag-blue bg-card p-4";
  if (band === "8-9") return "rounded-[1.25rem] border-2 border-flag-blue bg-paper p-4";
  if (band === "9-10") return "rounded-[1.25rem] bg-flag-blue p-4 text-white";
  if (band === "10-11") return "rounded-[1.25rem] border-2 border-flag-red bg-card p-4";
  return "rounded-[1.25rem] border-2 border-ink bg-card p-4";
}

function Card({
  filled,
  name,
  born,
  died,
  terms,
}: {
  filled?: boolean;
  name?: string;
  born?: string;
  died?: string;
  terms?: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-flag-blue p-4">
      <p className="text-xs font-extrabold text-flag-red">{filled ? "Example" : "Your card"}</p>
      <p className="mt-2">Name: {filled ? name : "____________________"}</p>
      <p>Born: {filled ? born : "____________________"}</p>
      <p>Died or still living: {filled ? died : "____________________"}</p>
      <p>Terms: {filled ? terms : "____________________"}</p>
      <div className="mt-3 flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-flag-blue text-sm">
        {filled ? "A calm portrait" : "Draw the person"}
      </div>
    </div>
  );
}

function printSheet(kind: "map" | "card") {
  document.body.dataset.print = kind;
  const done = () => {
    delete document.body.dataset.print;
  };
  window.addEventListener("afterprint", done, { once: true });
  window.print();
}
