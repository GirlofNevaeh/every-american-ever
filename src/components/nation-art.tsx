import type { FaceSpec } from "@/data/faces";
import type { Nation } from "@/data/nations";
import { Portrait } from "@/components/portrait";

const skinFor: Record<string, FaceSpec["skin"]> = {
  wampanoag: "tan",
  haudenosaunee: "brown",
  cherokee: "brown",
  muscogee: "deep",
  lakota: "brown",
  dine: "deep",
  hopi: "brown",
  chinook: "tan",
  chumash: "brown",
  inupiat: "tan",
  "kanaka-maoli": "deep",
  shoshone: "brown",
};

function look(slug: string, index: number, modern: boolean): FaceSpec {
  return {
    skin: skinFor[slug] ?? "brown",
    hair: modern ? (index % 2 === 0 ? "short" : "ponytail") : index % 2 === 0 ? "long" : "braids",
    hairColor: "black",
    face: index % 2 === 0 ? "oval" : "round",
    facial: "none",
    glasses: "none",
    brows: "soft",
    smile: "calm",
    neckwear: modern ? "tee" : "open",
    tie: "none",
    coat: "none",
  };
}

export function NationArt({ nation }: { nation: Nation }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <figure className="card p-3">
        <Portrait spec={look(nation.slug, 0, true)} label={`${nation.english} person today`} className="mx-auto h-40 w-32" />
        <figcaption className="mt-2 text-sm font-extrabold">Today. {nation.today}.</figcaption>
      </figure>
      <figure className="card border-flag-red p-3">
        <Portrait spec={look(nation.slug, 1, false)} label={`${nation.english} person in older clothes`} className="mx-auto h-40 w-32" />
        <figcaption className="mt-2 text-sm font-extrabold">In the past. {nation.past}.</figcaption>
        <Mark kind={nation.mark} />
      </figure>
    </div>
  );
}

function Mark({ kind }: { kind: Nation["mark"] }) {
  return (
    <svg viewBox="0 0 120 36" className="mt-2 h-8 w-full" aria-hidden="true">
      {kind === "longhouse" && <path d="M10 30 V16 L60 6 L110 16 V30" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "wetu" && <path d="M15 30 Q60 4 105 30" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "syllabary" && (
        <text x="8" y="26" fill="var(--color-flag-blue)" fontSize="22" fontWeight="700">
          ᏣᎳᎩ
        </text>
      )}
      {kind === "river" && <path d="M5 20 Q30 8 50 22 T110 16" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "tipi" && <path d="M20 32 L60 4 L100 32 Z" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "hogan" && <path d="M20 32 V18 L60 8 L100 18 V32" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "mesa" && <path d="M10 28 L30 12 H90 L110 28" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "canoe" && <path d="M10 20 Q60 34 110 20" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "tomol" && <path d="M8 18 H112 L100 28 H20 Z" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "ice" && <path d="M10 26 H110 M20 16 H40 M70 14 H100" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "outrigger" && <path d="M8 16 H100 M20 16 V28 H90 M100 12 V26" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
      {kind === "basin" && <path d="M8 12 L30 30 H90 L112 12" fill="none" stroke="var(--color-flag-blue)" strokeWidth="3" />}
    </svg>
  );
}
