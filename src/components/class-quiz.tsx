import { useEffect, useMemo, useState } from "react";
import { KIDS } from "@/data/faces";
import { QUIZ, type Question } from "@/data/quiz";
import { Portrait } from "@/components/portrait";
import { armQuizAudio, playCheer, playFart, warmAudio } from "@/lib/quiz-sounds";

type Child = { id: string; name: string; face: string };
type Team = { id: string; name: string; childIds: string[] };

type Phase = "pass" | "ask" | "wait" | "reveal" | "final";

type Game = {
  count: 10 | 25;
  solo: boolean;
  children: Child[];
  teams: Team[];
  order: Question[];
  cursor: number;
  teamIndex: number;
  phase: Phase;
  pick: number | null;
  scores: Record<string, number>;
  playoffRound: number;
  playoffTeams: string[] | null;
  result: "winner" | "draw" | null;
  winnerId: string | null;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ClassQuiz() {
  const [count, setCount] = useState<10 | 25>(10);
  const [solo, setSolo] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);
  const [teams, setTeams] = useState<Team[]>([
    { id: "t1", name: "Team 1", childIds: [] },
    { id: "t2", name: "Team 2", childIds: [] },
  ]);
  const [name, setName] = useState("");
  const [face, setFace] = useState(KIDS[0].id);
  const [game, setGame] = useState<Game | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    armQuizAudio();
  }, []);

  function addChild() {
    const trimmed = name.trim() || `Child ${children.length + 1}`;
    setChildren((list) => [...list, { id: `c${Date.now()}`, name: trimmed, face }]);
    setName("");
  }

  function toggleChild(teamId: string, childId: string) {
    setTeams((list) =>
      list.map((team) => {
        if (team.id !== teamId) return team;
        if (team.childIds.includes(childId)) {
          return { ...team, childIds: team.childIds.filter((id) => id !== childId) };
        }
        if (team.childIds.length >= 4) return team;
        return { ...team, childIds: [...team.childIds, childId] };
      }),
    );
  }

  function start() {
    const readyTeams = teams.filter((team) => team.childIds.length > 0).slice(0, 10);
    if (!solo && readyTeams.length < 1) return;
    const order = shuffle(QUIZ);
    const scoreTeams = solo ? [{ id: "solo", name: "You", childIds: [] }] : readyTeams;
    const scores: Record<string, number> = {};
    for (const team of scoreTeams) scores[team.id] = 0;
    warmAudio();
    setFlash(false);
    setGame({
      count,
      solo,
      children,
      teams: scoreTeams,
      order,
      cursor: 0,
      teamIndex: 0,
      phase: solo ? "ask" : "pass",
      pick: null,
      scores,
      playoffRound: 0,
      playoffTeams: null,
      result: null,
      winnerId: null,
    });
  }

  if (game) {
    return (
      <Play
        game={game}
        setGame={setGame}
        flash={flash}
        setFlash={setFlash}
        onExit={() => {
          setGame(null);
          setFlash(false);
        }}
      />
    );
  }

  const canStart = solo || teams.some((team) => team.childIds.length > 0);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
      <header>
        <p className="text-xs font-extrabold tracking-wide text-flag-red">Class quiz</p>
        <h1 className="font-display text-5xl">Quiz</h1>
        <p className="mt-2 max-w-2xl">Pick Quick 10 or Mega 25. Play alone, or with teams. One answer for the whole team.</p>
      </header>
      <section className="grid gap-3 sm:grid-cols-2">
        <button type="button" className={`card p-5 text-left ${count === 10 ? "bg-flag-blue text-white" : ""}`} onClick={() => setCount(10)}>
          <span className="font-display text-3xl">Quick 10</span>
          <span className="mt-1 block">Ten questions.</span>
        </button>
        <button type="button" className={`card p-5 text-left ${count === 25 ? "bg-flag-blue text-white" : ""}`} onClick={() => setCount(25)}>
          <span className="font-display text-3xl">Mega 25</span>
          <span className="mt-1 block">Twenty-five questions.</span>
        </button>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <button type="button" className={`card p-5 text-left ${solo ? "bg-flag-blue text-white" : ""}`} onClick={() => setSolo(true)}>
          <span className="font-display text-3xl">Just me</span>
        </button>
        <button type="button" className={`card p-5 text-left ${!solo ? "bg-flag-blue text-white" : ""}`} onClick={() => setSolo(false)}>
          <span className="font-display text-3xl">Teams</span>
          <span className="mt-1 block">Up to 10 teams.</span>
        </button>
      </section>
      {!solo && (
        <section className="flex flex-col gap-4">
          <div className="card p-4">
            <h2 className="font-display text-2xl">Children</h2>
            <p className="text-sm">A child can be on more than one team. A team can have up to 4 children.</p>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {KIDS.map((kid) => (
                <button
                  key={kid.id}
                  type="button"
                  aria-label={kid.aria}
                  onClick={() => setFace(kid.id)}
                  className={`rounded-2xl border-2 p-1 ${face === kid.id ? "border-flag-red bg-paper" : "border-flag-blue bg-card"}`}
                >
                  <Portrait spec={kid.spec} label={kid.aria} className="h-16 w-full" />
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Child's name"
                className="h-11 min-w-0 flex-1 rounded-full border-2 border-flag-blue px-4"
              />
              <button type="button" className="btn bg-flag-red text-white" onClick={addChild}>
                Add child
              </button>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {children.map((child) => {
                const kid = KIDS.find((item) => item.id === child.face) ?? KIDS[0];
                return (
                  <li key={child.id} className="flex items-center gap-2 rounded-full border-2 border-flag-blue bg-paper pr-3">
                    <Portrait spec={kid.spec} label="" className="h-10 w-10" />
                    <span className="text-sm font-extrabold">{child.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {teams.map((team) => (
            <div key={team.id} className="card p-4">
              <input
                value={team.name}
                onChange={(event) =>
                  setTeams((list) => list.map((item) => (item.id === team.id ? { ...item, name: event.target.value } : item)))
                }
                className="h-11 w-full rounded-full border-2 border-flag-blue px-4 font-extrabold"
                aria-label="Team name"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {children.map((child) => {
                  const on = team.childIds.includes(child.id);
                  const elsewhere = teams.filter((item) => item.id !== team.id && item.childIds.includes(child.id));
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => toggleChild(team.id, child.id)}
                      className={`rounded-full border-2 px-3 py-2 text-sm font-extrabold ${on ? "border-flag-blue bg-flag-blue text-white" : "border-flag-blue bg-card"}`}
                    >
                      {child.name}
                      {elsewhere.length > 0 ? ` · also on ${elsewhere.map((item) => item.name).join(", ")}` : ""}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-sm">{team.childIds.length} of 4 children</p>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            {teams.length < 10 && (
              <button
                type="button"
                className="btn border-2 border-flag-blue bg-card"
                onClick={() => setTeams((list) => [...list, { id: `t${list.length + 1}`, name: `Team ${list.length + 1}`, childIds: [] }])}
              >
                Add a team
              </button>
            )}
            {teams.length > 2 && (
              <button type="button" className="btn border-2 border-flag-blue bg-card" onClick={() => setTeams((list) => list.slice(0, -1))}>
                Remove last team
              </button>
            )}
          </div>
        </section>
      )}
      <button type="button" className="btn bg-flag-red text-white disabled:opacity-50" disabled={!canStart} onClick={start}>
        Start
      </button>
    </div>
  );
}

function leadersOf(scores: Record<string, number>, ids: string[]): string[] {
  const best = Math.max(...ids.map((id) => scores[id] ?? 0));
  return ids.filter((id) => (scores[id] ?? 0) === best);
}

function Play({
  game,
  setGame,
  flash,
  setFlash,
  onExit,
}: {
  game: Game;
  setGame: (game: Game) => void;
  flash: boolean;
  setFlash: (value: boolean) => void;
  onExit: () => void;
}) {
  const activeTeams = game.playoffTeams ?? game.teams.map((team) => team.id);
  const team = game.teams.find((item) => item.id === activeTeams[game.teamIndex]) ?? game.teams[0];
  const question = game.order[game.cursor];

  useEffect(() => {
    if (game.phase !== "wait") return;
    const timer = window.setTimeout(() => {
      setGame({ ...game, phase: "reveal" });
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [game, setGame]);

  const faces = useMemo(() => {
    return team.childIds
      .map((id) => game.children.find((child) => child.id === id))
      .filter((child): child is Child => Boolean(child));
  }, [game.children, team.childIds]);

  function choose(index: number) {
    if (game.phase !== "ask" || !question) return;
    const correct = index === question.answer;
    try {
      warmAudio();
      if (correct) playCheer();
      else playFart();
    } catch {
      // A failed sound should not stop the quiz.
    }
    const scores = { ...game.scores, [team.id]: (game.scores[team.id] ?? 0) + (correct ? 1 : 0) };
    setGame({ ...game, phase: "wait", pick: index, scores });
  }

  function finishIfNeeded(next: Game): Game {
    const ids = next.playoffTeams ?? next.teams.map((item) => item.id);
    const leaders = leadersOf(next.scores, ids);
    if (!next.playoffTeams && next.cursor < next.count) return next;
    if (leaders.length === 1) {
      if (next.teams.length > 1) setFlash(true);
      return { ...next, phase: "final", result: "winner", winnerId: leaders[0], playoffTeams: leaders };
    }
    if ((next.playoffRound ?? 0) >= 3) {
      return { ...next, phase: "final", result: "draw", winnerId: null };
    }
    return {
      ...next,
      playoffTeams: leaders,
      playoffRound: next.playoffRound + (next.playoffTeams ? 1 : 1),
      teamIndex: 0,
      cursor: Math.max(next.cursor, next.count),
      phase: next.solo ? "ask" : "pass",
      pick: null,
    };
  }

  function next() {
    const ids = game.playoffTeams ?? game.teams.map((teamId) => teamId.id);
    const moreTeams = game.teamIndex + 1 < ids.length;
    if (moreTeams) {
      setGame({ ...game, teamIndex: game.teamIndex + 1, phase: game.solo ? "ask" : "pass", pick: null });
      return;
    }
    const inMain = !game.playoffTeams && game.cursor + 1 < game.count;
    if (inMain) {
      setGame({
        ...game,
        cursor: game.cursor + 1,
        teamIndex: 0,
        phase: game.solo ? "ask" : "pass",
        pick: null,
      });
      return;
    }
    const advancedCursor = game.playoffTeams ? game.cursor + 1 : game.count;
    setGame(
      finishIfNeeded({
        ...game,
        cursor: advancedCursor,
        teamIndex: 0,
        pick: null,
      }),
    );
  }

  const winner = game.teams.find((item) => item.id === game.winnerId);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-extrabold">
          {game.playoffTeams ? `Playoff round ${Math.min(game.playoffRound, 3)}` : `Question ${Math.min(game.cursor + 1, game.count)} of ${game.count}`}
        </p>
        <button type="button" className="btn border-2 border-flag-blue bg-card text-sm" onClick={onExit}>
          Exit
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {game.teams.map((item) => (
          <li key={item.id} className={`rounded-full px-3 py-2 text-sm font-extrabold ${item.id === team.id && game.phase !== "final" ? "bg-flag-blue text-white" : "bg-card text-ink"}`}>
            {item.name}: {game.scores[item.id] ?? 0}
          </li>
        ))}
      </ul>
      {game.phase === "final" && (
        <section className="card p-6">
          {game.result === "draw" ? (
            <>
              <h2 className="font-display text-4xl">It is a draw</h2>
              <p className="mt-2">Three rounds stayed tied.</p>
            </>
          ) : (
            <>
              <h2 className="font-display text-4xl">{winner?.name} wins</h2>
              <p className="mt-2">The score is {game.scores[winner?.id ?? ""] ?? 0}.</p>
            </>
          )}
        </section>
      )}
      {game.phase === "pass" && (
        <section className="card p-6">
          <p className="text-xs font-extrabold tracking-wide text-flag-red">Pass the screen</p>
          <h2 className="font-display text-4xl">{team.name}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {faces.map((child) => {
              const kid = KIDS.find((item) => item.id === child.face) ?? KIDS[0];
              return <Portrait key={child.id} spec={kid.spec} label={child.name} className="h-20 w-16" />;
            })}
          </div>
          <button type="button" className="btn mt-4 bg-flag-blue text-white" onClick={() => { warmAudio(); setGame({ ...game, phase: "ask" }); }}>
            We are ready
          </button>
        </section>
      )}
      {(game.phase === "ask" || game.phase === "wait" || game.phase === "reveal") && question && (
        <section className="card p-4 sm:p-6">
          {!game.solo && <p className="text-sm font-extrabold text-flag-blue">{team.name}</p>}
          <h2 className="font-display text-3xl sm:text-4xl">{question.prompt}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {question.choices.map((choice, index) => {
              const picked = game.pick === index;
              const show = game.phase === "reveal";
              const right = index === question.answer;
              let tone = "border-flag-blue bg-card";
              if (picked && !show) tone = "border-flag-blue bg-flag-blue text-white";
              if (show && picked && right) tone = "border-flag-blue bg-flag-blue text-white";
              if (show && picked && !right) tone = "border-flag-red bg-paper";
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={game.phase !== "ask"}
                  onClick={() => choose(index)}
                  className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left font-extrabold break-words ${tone}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
          {game.phase === "reveal" && (
            <div className="mt-4">
              <p className="font-display text-3xl">{game.pick === question.answer ? "Yes" : "Not this one"}</p>
              <p className="mt-1">{question.why}</p>
              <button type="button" className="btn mt-4 bg-flag-red text-white" onClick={next}>
                Next
              </button>
            </div>
          )}
        </section>
      )}
      {flash && game.result === "winner" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-flag-blue p-6 text-center text-white">
          <div className="congrats-pop">
            <p className="font-display text-5xl sm:text-7xl">CONGRATULATIONS</p>
            <p className="mt-3 text-2xl font-extrabold">{winner?.name}</p>
            <button type="button" className="btn mt-6 bg-card text-ink" onClick={() => setFlash(false)}>
              See the score
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
