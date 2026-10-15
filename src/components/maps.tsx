import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GEO, type Ring } from "@/data/state-geo";
import { STATES, getState, type UsState } from "@/data/states";
import { REGIONS, type CultureRegion } from "@/data/nations";

function project48(lon: number, lat: number): [number, number] {
  const x = ((lon + 125) / (125 - 66.5)) * 900 + 16;
  const y = ((49.5 - lat) / (49.5 - 24.2)) * 540 + 12;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function projectAK(lon: number, lat: number): [number, number] {
  const x = ((lon + 168) / (168 - 129)) * 200 + 6;
  const y = ((72 - lat) / (72 - 54)) * 120 + 6;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringPath(ring: Ring, project: (lon: number, lat: number) => [number, number]): string {
  return ring
    .map((point, index) => {
      const [x, y] = project(point[0], point[1]);
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ") + " Z";
}

function pathsFor(state: UsState): string[] {
  const rings = GEO[state.slug] ?? [];
  if (state.proj === "ak") return rings.map((ring) => ringPath(ring, projectAK));
  if (state.proj === "hi") return rings.map((ring) => ringPath(ring, (x, y) => [x, y]));
  return rings.map((ring) => ringPath(ring, project48));
}

function capitalPoint(state: UsState): [number, number] {
  if (state.proj === "hi") return state.capitalLL;
  if (state.proj === "ak") return projectAK(state.capitalLL[0], state.capitalLL[1]);
  return project48(state.capitalLL[0], state.capitalLL[1]);
}

export function CountryMap({
  highlight,
  interactive = true,
  stars = false,
  numbers = false,
}: {
  highlight?: string;
  interactive?: boolean;
  stars?: boolean;
  numbers?: boolean;
}) {
  const lower = STATES.filter((state) => state.proj === "48");
  return (
    <svg viewBox="0 0 960 800" className="h-auto w-full" role="img" aria-label="Map of the United States">
      <rect x="1" y="1" width="958" height="798" rx="18" fill="var(--color-card)" stroke="var(--color-flag-blue)" strokeWidth="2" />
      {lower.map((state) => (
        <StateShape key={state.slug} state={state} highlight={highlight} interactive={interactive} />
      ))}
      {stars &&
        lower.map((state) => {
          const [x, y] = capitalPoint(state);
          return <circle key={`${state.slug}-star`} cx={x} cy={y} r="3.2" fill="var(--color-flag-red)" pointerEvents="none" />;
        })}
      {numbers &&
        lower.map((state) => {
          const [x, y] = capitalPoint(state);
          const n = alphaIndex(state.slug);
          return (
            <text key={`${state.slug}-n`} x={x} y={y + 3} fontSize="11" fontWeight="800" fill="var(--color-flag-red)" textAnchor="middle">
              {n}
            </text>
          );
        })}
      <Inset x={16} y={568} w={300} h={168} label="Alaska">
        <StateShape state={getState("alaska")!} highlight={highlight} interactive={interactive} />
        {stars && <Star state={getState("alaska")!} />}
      </Inset>
      <Inset x={336} y={568} w={280} h={168} label="Hawaii">
        <g transform="translate(4 2) scale(1.4)">
          <StateShape state={getState("hawaii")!} highlight={highlight} interactive={interactive} />
          {stars && <Star state={getState("hawaii")!} />}
        </g>
      </Inset>
      <text x="640" y="630" fill="var(--color-ink)" fontSize="15" fontWeight="800">
        <tspan x="640" dy="0">Alaska and Hawaii</tspan>
        <tspan x="640" dy="20">are not next to</tspan>
        <tspan x="640" dy="20">California.</tspan>
      </text>
    </svg>
  );
}

function alphaIndex(slug: string): number {
  const ordered = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
  return ordered.findIndex((state) => state.slug === slug) + 1;
}

function Star({ state }: { state: UsState }) {
  const [x, y] = capitalPoint(state);
  return <circle cx={x} cy={y} r="3" fill="var(--color-flag-red)" pointerEvents="none" />;
}

function Inset({
  x,
  y,
  w,
  h,
  label,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="var(--color-paper)" stroke="var(--color-flag-blue)" strokeWidth="2" />
      <text x={x + 10} y={y + 16} fill="var(--color-flag-red)" fontSize="12" fontWeight="800">
        {label}
      </text>
      <g transform={`translate(${x + 8} ${y + 22})`}>{children}</g>
    </g>
  );
}

function StateShape({
  state,
  highlight,
  interactive,
}: {
  state: UsState;
  highlight?: string;
  interactive: boolean;
}) {
  const d = pathsFor(state).join(" ");
  const active = highlight === state.slug;
  const fill = active ? "var(--color-flag-blue)" : "var(--color-card)";
  const stroke = "var(--color-flag-blue)";
  if (!interactive) {
    return <path d={d} fill={fill} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />;
  }
  return (
    <Link to="/states/$slug" params={{ slug: state.slug }} aria-label={state.name} className="group">
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        className={active ? "" : "group-hover:fill-flag-blue"}
      />
    </Link>
  );
}

export function StateOutline({ slug, className = "h-64 w-full" }: { slug: string; className?: string }) {
  const state = getState(slug);
  if (!state) return null;
  const rings = GEO[state.slug] ?? [];
  const project =
    state.proj === "ak" ? projectAK : state.proj === "hi" ? (x: number, y: number) => [x, y] as [number, number] : project48;
  const pts = rings.flat().map((point) => (state.proj === "hi" ? point : project(point[0], point[1])));
  const xs = pts.map((point) => point[0]);
  const ys = pts.map((point) => point[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = 16;
  const [sx, sy] = capitalPoint(state);
  return (
    <svg
      viewBox={`${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`}
      className={className}
      role="img"
      aria-label={`Outline of ${state.name}`}
    >
      <rect
        x={minX - pad}
        y={minY - pad}
        width={maxX - minX + pad * 2}
        height={maxY - minY + pad * 2}
        fill="var(--color-card)"
      />
      {pathsFor(state).map((d) => (
        <path key={d.slice(0, 24)} d={d} fill="var(--color-card)" stroke="var(--color-flag-blue)" strokeWidth="3" strokeLinejoin="round" />
      ))}
      <circle cx={sx} cy={sy} r="5" fill="var(--color-flag-red)" />
    </svg>
  );
}

const blobs: Record<CultureRegion, string> = {
  Arctic: "M 40 18 H 250 Q 270 50 240 78 H 70 Q 30 60 40 18 Z",
  Subarctic: "M 50 84 H 280 Q 300 120 250 150 H 80 Q 40 130 50 84 Z",
  "Northwest Coast": "M 18 150 H 110 Q 130 190 100 250 H 30 Q 8 210 18 150 Z",
  Plateau: "M 120 156 H 230 Q 250 200 220 250 H 130 Q 108 210 120 156 Z",
  California: "M 16 260 H 120 Q 140 310 100 360 H 24 Q 4 320 16 260 Z",
  "Great Basin": "M 130 260 H 250 Q 270 310 240 370 H 140 Q 112 320 130 260 Z",
  Southwest: "M 250 250 H 400 Q 430 310 390 390 H 260 Q 230 330 250 250 Z",
  Plains: "M 300 120 H 470 Q 500 190 470 280 H 320 Q 280 210 300 120 Z",
  Northeast: "M 520 70 H 700 Q 730 120 690 180 H 530 Q 500 130 520 70 Z",
  Southeast: "M 470 200 H 690 Q 720 270 680 360 H 500 Q 450 290 470 200 Z",
  Hawaii: "M 560 390 H 730 Q 750 430 700 460 H 570 Q 540 430 560 390 Z",
};

export function CultureMap({
  active,
  onPick,
}: {
  active?: CultureRegion;
  onPick: (region: CultureRegion) => void;
}) {
  return (
    <svg viewBox="0 0 760 490" className="h-auto w-full" role="img" aria-label="Culture regions of Native nations">
      <rect x="1" y="1" width="758" height="488" rx="18" fill="var(--color-paper)" stroke="var(--color-flag-blue)" strokeWidth="2" />
      {REGIONS.map((region) => {
        const on = active === region.id;
        return (
          <path
            key={region.id}
            d={blobs[region.id]}
            fill={on ? "var(--color-flag-blue)" : "var(--color-card)"}
            stroke="var(--color-flag-blue)"
            strokeWidth="2"
            role="button"
            tabIndex={0}
            aria-label={region.id}
            className="cursor-pointer"
            onClick={() => onPick(region.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onPick(region.id);
              }
            }}
          />
        );
      })}
      {labelPositions.map((item) => (
        <text
          key={item.id}
          x={item.x}
          y={item.y}
          fill={active === item.id ? "white" : "var(--color-ink)"}
          fontSize="13"
          fontWeight="800"
          textAnchor="middle"
          className="pointer-events-none"
        >
          {item.id === "Northwest Coast" ? "Northwest" : item.id}
        </text>
      ))}
    </svg>
  );
}

const labelPositions: { id: CultureRegion; x: number; y: number }[] = [
  { id: "Arctic", x: 150, y: 52 },
  { id: "Subarctic", x: 160, y: 122 },
  { id: "Northwest Coast", x: 68, y: 200 },
  { id: "Plateau", x: 175, y: 208 },
  { id: "California", x: 68, y: 312 },
  { id: "Great Basin", x: 186, y: 318 },
  { id: "Southwest", x: 330, y: 320 },
  { id: "Plains", x: 390, y: 200 },
  { id: "Northeast", x: 610, y: 128 },
  { id: "Southeast", x: 580, y: 280 },
  { id: "Hawaii", x: 650, y: 432 },
];
