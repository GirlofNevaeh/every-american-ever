import { norm } from "@/data/format";
import { NATIONS } from "@/data/nations";
import { PRESIDENTS } from "@/data/presidents";
import { STATES } from "@/data/states";

export type SearchHit = {
  kind: "state" | "nation" | "president" | "dc";
  slug: string;
  label: string;
  hint: string;
  score: number;
};

const extra: Record<string, string[]> = {
  "george-washington": ["washington"],
  "john-adams": ["adams"],
  "john-quincy-adams": ["quincy", "adams"],
  "william-henry-harrison": ["harrison"],
  "benjamin-harrison": ["harrison"],
  "theodore-roosevelt": ["teddy", "teddy roosevelt", "tr"],
  "franklin-d-roosevelt": ["fdr", "roosevelt"],
  "john-f-kennedy": ["jfk", "kennedy"],
  "lyndon-b-johnson": ["lbj", "johnson"],
  "andrew-johnson": ["johnson"],
  "george-h-w-bush": ["bush"],
  "george-w-bush": ["bush"],
  "ulysses-s-grant": ["grant"],
  dine: ["navajo", "dine"],
  haudenosaunee: ["iroquois", "six nations"],
  muscogee: ["creek"],
  lakota: ["sioux"],
  inupiat: ["inupiat", "inupiaq", "alaska native"],
  "kanaka-maoli": ["native hawaiian", "native hawaiians", "hawaiian", "hawaiians"],
  shoshone: ["newe", "sacagawea"],
  cherokee: ["tsalagi", "sequoyah"],
};

function scoreText(query: string, label: string, aliases: string[]): number {
  const q = norm(query);
  if (!q) return 0;
  const names = [label, ...aliases].map(norm);
  if (names.some((name) => name === q)) return 100;
  if (names.some((name) => name.startsWith(q))) return 80;
  const words = q.split(" ");
  if (names.some((name) => words.every((word) => name.split(" ").includes(word)))) return 70;
  if (names.some((name) => name.includes(q))) return 55;
  return 0;
}

export function searchAll(query: string): SearchHit[] {
  const q = norm(query);
  if (!q) return [];
  const hits: SearchHit[] = [];

  if (["dc", "d c", "washington dc", "washington d c", "district of columbia"].includes(q)) {
    hits.push({
      kind: "dc",
      slug: "dc",
      label: "Washington, D.C.",
      hint: "The capital city. Not a state.",
      score: 100,
    });
  }

  for (const state of STATES) {
    const aliases = [state.postal, state.nickname, `${state.name} state`];
    const score = scoreText(query, state.name, aliases);
    if (q === "washington" && state.slug === "washington") {
      hits.push({
        kind: "state",
        slug: state.slug,
        label: state.name,
        hint: `${state.capital} · a state`,
        score: 70,
      });
      continue;
    }
    if (score > 0) {
      hits.push({
        kind: "state",
        slug: state.slug,
        label: state.name,
        hint: `${state.capital} · state`,
        score,
      });
    }
  }

  for (const nation of NATIONS) {
    const score = scoreText(query, nation.name, [nation.english, ...(extra[nation.slug] ?? [])]);
    if (score > 0) {
      hits.push({
        kind: "nation",
        slug: nation.slug,
        label: nation.name,
        hint: nation.english,
        score,
      });
    }
  }

  for (const person of PRESIDENTS) {
    const score = scoreText(query, person.name, [person.short, ...(extra[person.slug] ?? [])]);
    if (q === "washington" && person.slug === "george-washington") {
      hits.push({
        kind: "president",
        slug: person.slug,
        label: person.name,
        hint: "President",
        score: 70,
      });
      continue;
    }
    if (score > 0) {
      hits.push({
        kind: "president",
        slug: person.slug,
        label: person.name,
        hint: "President",
        score,
      });
    }
  }

  if (q.includes("maria") || q.includes("tallchief") || q === "osage") {
    hits.push({
      kind: "nation",
      slug: "people",
      label: "Maria Tallchief was Osage",
      hint: "A real person on the nations page.",
      score: q === "osage" || q.includes("tallchief") ? 90 : 60,
    });
  }

  hits.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
  return hits.slice(0, 8);
}
