import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Portrait } from "@/components/portrait";
import { SearchBox } from "@/components/shell";
import { StateOutline } from "@/components/maps";
import { getPresident, PRESIDENTS } from "@/data/presidents";
import { STATES } from "@/data/states";

export const Route = createFileRoute("/")({ component: Home });

const stripStates = ["california", "texas", "florida", "new-york", "michigan", "alaska", "hawaii", "colorado"];
const stripPresidents = ["george-washington", "abraham-lincoln", "theodore-roosevelt", "john-f-kennedy", "barack-obama", "donald-trump"];

function Home() {
  const navigate = useNavigate();

  function surprise() {
    const pool = [
      ...STATES.map((state) => ({ kind: "state" as const, slug: state.slug })),
      ...PRESIDENTS.map((person) => ({ kind: "president" as const, slug: person.slug })),
    ];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick.kind === "state") void navigate({ to: "/states/$slug", params: { slug: pick.slug } });
    else void navigate({ to: "/presidents/$slug", params: { slug: pick.slug } });
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
      <section className="overflow-hidden rounded-[1.25rem] border-2 border-flag-blue">
        <div className="bg-flag-blue px-5 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-extrabold">Ages 5 to 12</p>
              <h1 className="mt-2 max-w-3xl font-display text-5xl sm:text-7xl">Every American Ever</h1>
            </div>
            <figure className="w-full max-w-sm lg:mb-1 lg:w-80 lg:shrink-0">
              <WhiteHouse className="h-auto w-full" />
              <figcaption className="text-center text-sm font-extrabold">The White House</figcaption>
            </figure>
          </div>
        </div>
        <div className="h-3 bg-card" />
        <div className="h-3 bg-flag-red" />
        <div className="h-3 bg-card" />
        <div className="h-3 bg-flag-red" />
        <div className="bg-paper px-5 py-6 sm:px-8">
          <p className="max-w-xl text-xl">Fifty states. Many Native nations. Every president.</p>
          <div className="mt-4">
            <SearchBox large />
          </div>
          <button type="button" className="btn mt-4 bg-flag-blue text-white" onClick={surprise}>
            Surprise me
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link to="/states" className="flex min-h-56 flex-col justify-between rounded-[1.25rem] bg-flag-blue p-5 text-white">
          <p className="text-xs font-extrabold tracking-wide text-flag-red">50</p>
          <h2 className="font-display text-4xl">States</h2>
          <p>Open the map.</p>
        </Link>
        <Link to="/nations" className="card flex min-h-56 flex-col justify-between p-5">
          <p className="text-xs font-extrabold tracking-wide text-flag-red">Nations</p>
          <h2 className="font-display text-4xl">Many nations</h2>
          <p>Not one people.</p>
        </Link>
        <Link to="/presidents" className="flex min-h-56 flex-col justify-between rounded-[1.25rem] border-2 border-flag-red bg-card p-5">
          <p className="text-xs font-extrabold tracking-wide text-flag-red">Presidents</p>
          <h2 className="font-display text-4xl">Every president</h2>
          <p>From the first to now.</p>
        </Link>
      </section>

      <section>
        <h2 className="font-display text-3xl">State shapes</h2>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {stripStates.map((slug) => (
            <Link key={slug} to="/states/$slug" params={{ slug }} className="card p-1" aria-label={STATES.find((state) => state.slug === slug)?.name}>
              <StateOutline slug={slug} className="h-16 w-full" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl">A few presidents</h2>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {stripPresidents.map((slug) => {
            const person = getPresident(slug)!;
            return (
              <Link key={slug} to="/presidents/$slug" params={{ slug }} className="card flex flex-col items-center p-2 text-center">
                <Portrait spec={person.look} label={person.name} className="h-24 w-20" />
                <span className="mt-1 text-sm font-extrabold">{person.short}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Link to="/time" className="flex flex-col gap-2 rounded-[1.25rem] border-2 border-flag-blue bg-card p-5">
        <p className="text-xs font-extrabold tracking-wide text-flag-red">1492 to today</p>
        <h2 className="font-display text-4xl">The timeline</h2>
        <p className="max-w-xl text-lg">From Columbus to now. Native nations were here first.</p>
      </Link>

      <p className="rounded-[1.25rem] bg-flag-blue px-5 py-4 text-lg font-extrabold text-white">
        The United States flag has 13 stripes and 50 stars.
      </p>
    </div>
  );
}

function WhiteHouse({ className }: { className?: string }) {
  const ink = "var(--color-ink)";
  const red = "var(--color-flag-red)";
  const blue = "var(--color-flag-blue)";
  return (
    <svg viewBox="0 0 400 210" className={className} role="img" aria-label="A cartoon of the White House">
      <title>A cartoon of the White House</title>
      <ellipse cx="200" cy="196" rx="168" ry="12" fill="var(--color-paper)" />
      <rect x="36" y="124" width="88" height="66" fill="white" stroke={ink} strokeWidth="3" />
      <rect x="276" y="124" width="88" height="66" fill="white" stroke={ink} strokeWidth="3" />
      <rect x="44" y="112" width="16" height="14" fill="white" stroke={ink} strokeWidth="3" />
      <rect x="340" y="112" width="16" height="14" fill="white" stroke={ink} strokeWidth="3" />
      <path d="M112 190 V96 L200 46 L288 96 V190 Z" fill="white" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="200" cy="74" r="7" fill={blue} />
      <rect x="124" y="114" width="152" height="8" fill="white" stroke={ink} strokeWidth="3" />
      {[128, 156, 220, 248].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="114" width="20" height="7" fill="white" stroke={ink} strokeWidth="2.5" />
          <rect x={x} y="120" width="16" height="64" fill="white" stroke={ink} strokeWidth="2.5" />
        </g>
      ))}
      {[52, 78, 292, 318].map((x) => (
        <rect key={x} x={x} y="140" width="16" height="24" fill={blue} />
      ))}
      {[146, 186, 230].map((x) => (
        <rect key={x} x={x} y="100" width="16" height="12" fill={blue} />
      ))}
      <rect x="182" y="146" width="36" height="44" fill={blue} />
      <path d="M182 154 Q200 136 218 154 V146 H182 Z" fill="white" />
      <rect x="170" y="188" width="60" height="7" fill="white" stroke={ink} strokeWidth="2.5" />
      <rect x="158" y="194" width="84" height="7" fill="white" stroke={ink} strokeWidth="2.5" />
      <line x1="200" y1="14" x2="200" y2="46" stroke="white" strokeWidth="3" />
      <rect x="200" y="8" width="58" height="34" fill="white" stroke={ink} strokeWidth="2" />
      <rect x="200" y="8" width="24" height="16" fill={blue} stroke="white" strokeWidth="1.5" />
      <circle cx="206" cy="13" r="1.6" fill="white" />
      <circle cx="216" cy="13" r="1.6" fill="white" />
      <circle cx="211" cy="19" r="1.6" fill="white" />
      <rect x="226" y="12" width="30" height="4" fill={red} />
      <rect x="226" y="20" width="30" height="4" fill={red} />
      <rect x="202" y="28" width="54" height="4" fill={red} />
      <rect x="202" y="36" width="54" height="4" fill={red} />
    </svg>
  );
}
