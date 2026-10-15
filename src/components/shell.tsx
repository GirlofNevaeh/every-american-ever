import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { searchAll, type SearchHit } from "@/data/search";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/states", label: "States", exact: false },
  { to: "/nations", label: "Nations", exact: false },
  { to: "/presidents", label: "Presidents", exact: false },
  { to: "/time", label: "Time", exact: true },
  { to: "/quiz", label: "Quiz", exact: true },
  { to: "/work", label: "Work", exact: true },
  { to: "/about", label: "About", exact: true },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-flag-blue focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <header className="border-b-4 border-flag-red bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <Link to="/" className="min-w-0">
            <p className="text-xs font-extrabold tracking-wide text-flag-red">Ages 5 to 12</p>
            <p className="font-display text-2xl leading-none sm:text-3xl">Every American Ever</p>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-2" aria-label="Pages">
          {NAV.map((item) => {
            const on = item.exact ? path === item.to : path === item.to || path.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`btn px-2.5 text-xs sm:text-sm ${on ? "bg-flag-red text-white" : "bg-flag-blue text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <SearchBox />
      </div>
    </header>
  );
}

export function SearchBox({ large = false }: { large?: boolean }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [note, setNote] = useState("");

  function open(hit: SearchHit) {
    setHits(null);
    setNote("");
    if (hit.kind === "state") {
      void navigate({ to: "/states/$slug", params: { slug: hit.slug } });
    } else if (hit.kind === "president") {
      void navigate({ to: "/presidents/$slug", params: { slug: hit.slug } });
    } else if (hit.kind === "dc") {
      void navigate({ to: "/states", hash: "district" });
    } else if (hit.slug === "people") {
      void navigate({ to: "/nations", hash: "people" });
    } else {
      void navigate({ to: "/nations/$slug", params: { slug: hit.slug } });
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = searchAll(query);
    if (found.length === 0) {
      setHits(null);
      setNote("No match. Try a state, a nation, or a president.");
      return;
    }
    const top = found[0]?.score ?? 0;
    const best = found.filter((hit) => hit.score === top);
    if (best.length === 1) {
      open(best[0]);
      return;
    }
    setNote("");
    setHits(found);
  }

  return (
    <form onSubmit={onSubmit} className="flex min-w-0 flex-col gap-2" role="search">
      <div className="flex min-w-0 gap-2">
        <label className="sr-only" htmlFor={large ? "search-large" : "search-header"}>
          Search
        </label>
        <input
          id={large ? "search-large" : "search-header"}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="State, nation, or president"
          className={`min-w-0 flex-1 rounded-full border-2 border-flag-blue bg-card px-4 text-ink ${large ? "h-14 text-lg" : "h-11"}`}
        />
        <button type="submit" className={`btn shrink-0 bg-flag-red text-white ${large ? "px-5 text-base" : "px-3 text-sm"}`}>
          SEARCH
        </button>
      </div>
      {note && <p className="text-sm">{note}</p>}
      {hits && hits.length > 0 && (
        <ul className="card divide-y divide-flag-blue/20 overflow-hidden">
          {hits.map((hit) => (
            <li key={`${hit.kind}-${hit.slug}-${hit.label}`}>
              <button type="button" onClick={() => open(hit)} className="flex w-full flex-col px-4 py-3 text-left hover:bg-paper">
                <span className="font-extrabold">{hit.label}</span>
                <span className="text-sm">{hit.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

function SiteFooter() {
  const [open, setOpen] = useState(false);
  return (
    <footer className="mt-12 border-t-4 border-flag-blue bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm">The United States has 50 states. Native nations were here first. A president serves a term.</p>
        <button type="button" className="btn bg-flag-blue text-white" onClick={() => setOpen(true)}>
          Add to iPhone or iPad
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="add-title">
          <div className="card w-full max-w-md p-6">
            <p className="text-xs font-extrabold tracking-wide text-flag-red">Home screen</p>
            <h2 id="add-title" className="mt-1 font-display text-3xl">Add to iPhone or iPad</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              <li>Use Safari.</li>
              <li>Tap Share.</li>
              <li>Tap Add to Home Screen.</li>
            </ol>
            <button type="button" className="btn mt-5 bg-flag-blue text-white" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
