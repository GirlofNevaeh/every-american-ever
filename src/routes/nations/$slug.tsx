import { createFileRoute, Link } from "@tanstack/react-router";
import { NationArt } from "@/components/nation-art";
import { getNation, hasOtherName } from "@/data/nations";

export const Route = createFileRoute("/nations/$slug")({
  component: NationPage,
  head: ({ params }) => ({
    meta: [{ title: `${getNation(params.slug)?.english ?? "Nation"} · Every American Ever` }],
  }),
});

function NationPage() {
  const { slug } = Route.useParams();
  const nation = getNation(slug);
  if (!nation) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl">That nation is not on this page</h1>
        <Link to="/nations" className="btn mt-4 bg-flag-blue text-white">
          All nations here
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6">
      <p className="text-xs font-extrabold tracking-wide text-flag-red">{nation.region}</p>
      <h1 className="font-display text-5xl">{nation.name}</h1>
      {hasOtherName(nation) ? <p className="text-lg">Many people also say {nation.english}.</p> : null}
      <NationArt nation={nation} />
      <p className="rounded-[1.25rem] border-l-8 border-flag-blue bg-card p-4">{nation.homelands}</p>
      <p className="rounded-[1.25rem] bg-flag-blue p-4 text-white">{nation.remember}</p>
      {nation.people.length > 0 ? (
        <section className="space-y-2">
          <h2 className="font-display text-2xl">People</h2>
          {nation.people.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
      ) : null}
      <p className="font-extrabold">{nation.now}</p>
      <p>A Native nation is not the same thing as a state.</p>
      <Link to="/nations" className="btn w-fit bg-flag-blue text-white">
        All nations here
      </Link>
    </article>
  );
}
