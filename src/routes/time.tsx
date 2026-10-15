import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Portrait } from "@/components/portrait";
import { getPresident } from "@/data/presidents";
import { ERAS, PRESIDENT_STEPS, STORY, type TimeStep } from "@/data/timeline";

export const Route = createFileRoute("/time")({
  component: TimePage,
  head: () => ({ meta: [{ title: "Time · Every American Ever" }] }),
});

type Mode = "story" | "presidents";

function TimePage() {
  const [mode, setMode] = useState<Mode>("story");
  return (
    <div className="mx-auto flex min-w-0 max-w-3xl flex-col gap-4 px-4 py-6">
      <header>
        <p className="text-xs font-extrabold tracking-wide text-flag-red">1492 to today</p>
        <h1 className="mt-1 font-display text-5xl sm:text-6xl">Time</h1>
        <p className="mt-2 max-w-xl text-lg">Native nations were here first. This line runs from Columbus to today.</p>
      </header>
      <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="What to read">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "story"}
          className={`btn ${mode === "story" ? "bg-flag-blue text-white" : "border-2 border-flag-blue bg-card"}`}
          onClick={() => setMode("story")}
        >
          Story
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "presidents"}
          className={`btn ${mode === "presidents" ? "bg-flag-blue text-white" : "border-2 border-flag-blue bg-card"}`}
          onClick={() => setMode("presidents")}
        >
          Presidents
        </button>
      </div>
      {mode === "story" ? <StoryLine /> : <PresidentLine />}
    </div>
  );
}

function scrollToStep(id: string) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.getElementById(id)?.scrollIntoView({ behavior, block: "center" });
}

function StoryLine() {
  const [index, setIndex] = useState(0);
  const step = STORY[index];

  function go(next: number) {
    const clamped = Math.max(0, Math.min(STORY.length - 1, next));
    setIndex(clamped);
    requestAnimationFrame(() => scrollToStep(STORY[clamped].id));
  }

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-4 min-w-0 border-b-4 border-flag-red bg-paper px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {ERAS.map((era) => {
            const on = step.era === era.id;
            return (
              <button
                key={era.id}
                type="button"
                className={`btn shrink-0 px-3 text-xs sm:text-sm ${on ? "bg-flag-red text-white" : "border-2 border-flag-blue bg-card"}`}
                onClick={() => go(STORY.findIndex((item) => item.era === era.id))}
              >
                {era.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm font-extrabold">
          {index + 1} of {STORY.length}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button type="button" className="btn border-2 border-flag-blue bg-card disabled:opacity-40" disabled={index === 0} onClick={() => go(index - 1)}>
            Earlier
          </button>
          <button type="button" className="btn bg-flag-blue text-white disabled:opacity-40" disabled={index === STORY.length - 1} onClick={() => go(index + 1)}>
            Later
          </button>
        </div>
      </div>
      <ol className="relative mt-5 border-l-4 border-flag-blue">
        {STORY.map((item, itemIndex) => (
          <TimelineStop
            key={item.id}
            item={item}
            selected={itemIndex === index}
            onSelect={() => setIndex(itemIndex)}
          />
        ))}
      </ol>
    </div>
  );
}

function PresidentLine() {
  const [index, setIndex] = useState(0);
  const step = PRESIDENT_STEPS[index];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-extrabold">
        {index + 1} of {PRESIDENT_STEPS.length}. From the first president to now.
      </p>
      <StepCard step={step} featured />
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="btn border-2 border-flag-blue bg-card disabled:opacity-40"
          disabled={index === 0}
          onClick={() => setIndex((n) => n - 1)}
        >
          Earlier
        </button>
        <button
          type="button"
          className="btn bg-flag-blue text-white disabled:opacity-40"
          disabled={index === PRESIDENT_STEPS.length - 1}
          onClick={() => setIndex((n) => n + 1)}
        >
          Later
        </button>
      </div>
    </div>
  );
}

function TimelineStop({ item, selected, onSelect }: { item: TimeStep; selected: boolean; onSelect: () => void }) {
  return (
    <li id={item.id} className="relative scroll-mt-64 pl-5 pb-4">
      <span
        className={`absolute top-6 left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-flag-blue ${selected ? "bg-flag-red" : "bg-card"}`}
        aria-hidden="true"
      />
      <article className={`rounded-[1.25rem] border-2 p-4 ${selected ? "border-flag-blue bg-flag-blue text-white" : "border-flag-blue bg-card text-ink"}`}>
        <button type="button" className="w-full text-left" onClick={onSelect} aria-current={selected ? "step" : undefined}>
          <StepBody step={item} selected={selected} showLink={false} />
        </button>
        {item.href && item.hrefLabel && (
          <a href={item.href} className={`btn mt-4 w-fit ${selected ? "bg-card text-ink" : "bg-flag-blue text-white"}`}>
            {item.hrefLabel}
          </a>
        )}
      </article>
    </li>
  );
}

function StepCard({ step, featured }: { step: TimeStep; featured?: boolean }) {
  return (
    <article className={`rounded-[1.25rem] border-2 border-flag-blue p-6 ${featured ? "bg-card" : "bg-card"}`}>
      <StepBody step={step} />
    </article>
  );
}

function StepBody({ step, selected = false, showLink = true }: { step: TimeStep; selected?: boolean; showLink?: boolean }) {
  const person = step.portrait ? getPresident(step.portrait) : undefined;
  return (
    <>
      <p className={`text-xs font-extrabold tracking-wide ${selected ? "text-white" : "text-flag-red"}`}>{step.kicker}</p>
      {person && <Portrait spec={person.look} label={person.name} className="mt-3 h-24 w-20" />}
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">{step.title}</h2>
      <p className="mt-2 text-lg">{step.body}</p>
      {showLink && step.href && step.hrefLabel && (
        <a href={step.href} className={`btn mt-4 w-fit ${selected ? "bg-card text-ink" : "bg-flag-blue text-white"}`}>
          {step.hrefLabel}
        </a>
      )}
    </>
  );
}
