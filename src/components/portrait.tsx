import type { FaceSpec, HairColor, Skin } from "@/data/faces";

const skinFill: Record<Skin, string> = {
  pale: "var(--skin-pale)",
  light: "var(--skin-light)",
  tan: "var(--skin-tan)",
  brown: "var(--skin-brown)",
  deep: "var(--skin-deep)",
};

const hairFill: Record<HairColor, string> = {
  white: "var(--hair-white)",
  gray: "var(--hair-gray)",
  black: "var(--hair-black)",
  brown: "var(--hair-brown)",
  dark: "var(--hair-dark)",
  blond: "var(--hair-blond)",
  red: "var(--hair-red)",
};

const faceBox = {
  oval: { rx: 46, ry: 54 },
  round: { rx: 52, ry: 50 },
  long: { rx: 40, ry: 58 },
  square: { rx: 48, ry: 52 },
};

export function Portrait({
  spec,
  label,
  className = "h-28 w-24",
}: {
  spec: FaceSpec;
  label: string;
  className?: string;
}) {
  const box = faceBox[spec.face];
  const skin = skinFill[spec.skin];
  const hair = hairFill[spec.hairColor];
  const hairEdge = spec.hairColor === "white" ? "#6e695f" : spec.hairColor === "gray" ? "#5e646c" : "none";
  const edgeWidth = hairEdge === "none" ? 0 : 3.2;
  const coat = spec.coat === "blue" ? "var(--color-flag-blue)" : spec.coat === "ink" ? "var(--color-ink)" : "transparent";
  const smile =
    spec.smile === "warm"
      ? "M 84 128 Q 100 140 116 128"
      : spec.smile === "slight"
        ? "M 88 130 Q 100 136 112 130"
        : spec.smile === "serious"
          ? "M 88 132 L 112 130"
          : "M 88 130 Q 100 136 112 130";
  const brow =
    spec.brows === "thick" ? 3.4 : spec.brows === "straight" ? 2.4 : 2;

  return (
    <svg viewBox="0 0 200 230" className={className} role="img" aria-label={label}>
      <title>{label}</title>
      {spec.coat !== "none" && (
        <path d="M 38 230 L 58 168 Q 100 150 142 168 L 162 230 Z" fill={coat} />
      )}
      {spec.neckwear === "dress" && (
        <path d="M 62 168 Q 100 188 138 168 L 168 230 L 32 230 Z" fill="var(--color-flag-blue)" />
      )}
      {spec.neckwear === "tee" && (
        <path d="M 58 176 Q 100 160 142 176 L 156 230 L 44 230 Z" fill="var(--color-flag-blue)" />
      )}
      {spec.neckwear === "open" && (
        <path d="M 60 176 Q 100 164 140 176 L 154 230 L 46 230 Z" fill="var(--color-flag-blue)" />
      )}
      <rect x="90" y="150" width="20" height="28" rx="8" fill={skin} />
      {(spec.hair === "tied" || spec.hair === "long" || spec.hair === "wavy") && (
        <path
          d="M 62 90 Q 48 150 70 190 Q 86 160 78 110 Z"
          fill={hair}
          stroke={hairEdge}
          strokeWidth={edgeWidth}
          strokeLinejoin="round"
        />
      )}
      {spec.hair === "tied" && <circle cx="78" cy="168" r="8" fill="var(--color-flag-red)" />}
      <ellipse cx="54" cy="108" rx="8" ry="12" fill={skin} />
      <ellipse cx="146" cy="108" rx="8" ry="12" fill={skin} />
      <ellipse cx="100" cy="104" rx={box.rx} ry={box.ry} fill={skin} />
      <g stroke={hairEdge} strokeWidth={edgeWidth} strokeLinejoin="round">
        <Hair spec={spec} hair={hair} box={box} />
      </g>
      <ellipse cx="84" cy="104" rx="5" ry="6" fill="white" />
      <ellipse cx="116" cy="104" rx="5" ry="6" fill="white" />
      <circle cx="85" cy="105" r="2.4" fill="var(--color-ink)" />
      <circle cx="117" cy="105" r="2.4" fill="var(--color-ink)" />
      <path d={`M 74 90 Q 84 ${86 - brow} 94 90`} stroke="var(--color-ink)" strokeWidth={brow} fill="none" strokeLinecap="round" />
      <path d={`M 106 90 Q 116 ${86 - brow} 126 90`} stroke="var(--color-ink)" strokeWidth={brow} fill="none" strokeLinecap="round" />
      <path d="M 100 108 Q 104 118 100 120" stroke="var(--color-ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d={smile} stroke="var(--color-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g stroke={hairEdge} strokeWidth={edgeWidth} strokeLinejoin="round">
        <Facial spec={spec} hair={hair} />
      </g>
      <Glasses spec={spec} />
      {spec.neckwear === "cravat" && (
        <path d="M 90 156 L 100 188 L 110 156 L 122 176 L 100 168 L 78 176 Z" fill="white" />
      )}
      {spec.neckwear === "bow" && (
        <path d="M 78 168 L 100 176 L 78 186 L 100 178 L 122 186 L 100 176 L 122 168 Z" fill="var(--color-flag-red)" />
      )}
      {spec.neckwear === "tie" && spec.tie !== "none" && (
        <path
          d="M 94 160 L 106 160 L 102 210 L 100 214 L 98 210 Z"
          fill={spec.tie === "red" ? "var(--color-flag-red)" : "var(--color-flag-blue)"}
        />
      )}
    </svg>
  );
}

function Hair({
  spec,
  hair,
  box,
}: {
  spec: FaceSpec;
  hair: string;
  box: { rx: number; ry: number };
}) {
  if (spec.hair === "balding") {
    return (
      <path
        d={`M ${100 - box.rx + 4} 108 Q ${100 - box.rx} 70 100 78 Q ${100 + box.rx} 70 ${100 + box.rx - 4} 108 Q ${100 + box.rx + 2} 92 ${100 + box.rx - 8} 78`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "receding") {
    return (
      <path
        d={`M ${100 - box.rx + 2} 96 Q 70 46 100 58 Q 132 40 ${100 + box.rx - 2} 96 Q 150 70 128 62 Q 100 52 74 64 Q 52 78 ${100 - box.rx + 2} 96`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "buzz" || spec.hair === "short") {
    return <path d={`M ${100 - box.rx + 6} 100 Q 70 48 100 50 Q 140 46 ${100 + box.rx - 6} 100 Q 138 78 100 74 Q 64 80 ${100 - box.rx + 6} 100`} fill={hair} />;
  }
  if (spec.hair === "thick" || spec.hair === "pompadour") {
    const lift = spec.hair === "pompadour" ? 28 : 18;
    return (
      <path
        d={`M ${100 - box.rx} 108 Q 58 ${70 - lift} 100 ${46 - lift / 2} Q 148 ${62 - lift} ${100 + box.rx} 108 Q 146 78 100 70 Q 58 80 ${100 - box.rx} 108`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "swept") {
    return (
      <path
        d={`M ${100 - box.rx} 104 Q 64 40 118 42 Q 156 50 ${100 + box.rx + 2} 96 Q 150 70 120 66 Q 78 70 ${100 - box.rx} 104`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "tied") {
    return (
      <path
        d={`M ${100 - box.rx + 2} 110 Q 60 50 100 48 Q 146 50 ${100 + box.rx - 2} 110 Q 140 78 100 74 Q 62 80 ${100 - box.rx + 2} 110`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "curly") {
    return (
      <g fill={hair}>
        <path d={`M ${100 - box.rx} 108 Q 58 40 100 44 Q 150 36 ${100 + box.rx} 108 Q 140 70 100 68 Q 60 74 ${100 - box.rx} 108`} />
        <circle cx="92" cy="58" r="10" />
      </g>
    );
  }
  if (spec.hair === "parted" || spec.hair === "side") {
    return (
      <path
        d={`M ${100 - box.rx + 2} 104 Q 66 48 108 46 Q 150 58 ${100 + box.rx} 102 Q 142 74 108 70 Q 70 78 ${100 - box.rx + 2} 104`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "wavy") {
    return (
      <path
        d={`M ${100 - box.rx} 112 Q 50 60 78 48 Q 100 70 122 46 Q 156 60 ${100 + box.rx} 112 Q 140 80 100 76 Q 60 84 ${100 - box.rx} 112`}
        fill={hair}
      />
    );
  }
  if (spec.hair === "bob") {
    return <path d="M 52 100 Q 60 42 100 44 Q 146 40 150 108 Q 148 150 128 146 Q 120 100 100 96 Q 78 100 72 146 Q 52 148 52 100" fill={hair} />;
  }
  if (spec.hair === "ponytail") {
    return (
      <g fill={hair}>
        <path d="M 56 104 Q 64 44 100 46 Q 144 44 146 108 Q 140 78 100 74 Q 64 80 56 104" />
        <path d="M 128 70 Q 168 90 150 150 Q 132 120 124 90 Z" />
      </g>
    );
  }
  if (spec.hair === "pigtails") {
    return (
      <g fill={hair}>
        <path d="M 58 108 Q 66 46 100 48 Q 140 46 144 108 Q 136 80 100 76 Q 66 82 58 108" />
        <circle cx="48" cy="128" r="14" />
        <circle cx="152" cy="128" r="14" />
      </g>
    );
  }
  if (spec.hair === "braids") {
    return (
      <g fill={hair}>
        <path d="M 58 108 Q 66 46 100 48 Q 140 46 144 108 Q 136 80 100 76 Q 66 82 58 108" />
        <rect x="40" y="112" width="12" height="46" rx="6" />
        <rect x="148" y="112" width="12" height="46" rx="6" />
      </g>
    );
  }
  if (spec.hair === "bun") {
    return (
      <g fill={hair}>
        <path d="M 58 108 Q 66 50 100 50 Q 140 48 144 108 Q 136 82 100 78 Q 66 84 58 108" />
        <circle cx="100" cy="42" r="16" />
      </g>
    );
  }
  if (spec.hair === "long") {
    return (
      <path
        d="M 48 120 Q 58 40 100 42 Q 150 40 154 120 Q 160 190 130 196 Q 124 120 100 110 Q 76 120 70 196 Q 40 190 48 120"
        fill={hair}
      />
    );
  }
  return null;
}

function Facial({ spec, hair }: { spec: FaceSpec; hair: string }) {
  if (spec.facial === "none") return null;
  if (spec.facial === "mustache") {
    return <path d="M 76 122 Q 88 138 100 124 Q 112 138 124 122 Q 114 134 100 130 Q 86 134 76 122" fill={hair} />;
  }
  if (spec.facial === "chinbeard") {
    return <path d="M 70 124 Q 74 156 100 162 Q 126 156 130 124 Q 118 136 100 138 Q 82 136 70 124" fill={hair} />;
  }
  if (spec.facial === "beard") {
    return (
      <g fill={hair}>
        <path d="M 68 118 Q 70 160 100 166 Q 130 160 132 118 Q 120 132 100 134 Q 80 132 68 118" />
        <path d="M 82 122 Q 100 132 118 122 Q 108 128 100 126 Q 90 128 82 122" />
      </g>
    );
  }
  if (spec.facial === "full") {
    return <path d="M 62 112 Q 64 168 100 172 Q 136 168 138 112 Q 124 130 100 132 Q 76 130 62 112" fill={hair} />;
  }
  if (spec.facial === "sideburns") {
    return (
      <g fill={hair}>
        <path d="M 58 96 Q 48 130 62 150 Q 72 132 70 100 Z" />
        <path d="M 142 96 Q 152 130 138 150 Q 128 132 130 100 Z" />
      </g>
    );
  }
  if (spec.facial === "mutton") {
    return (
      <g fill={hair}>
        <path d="M 56 100 Q 46 140 66 156 Q 78 136 74 104 Z" />
        <path d="M 144 100 Q 154 140 134 156 Q 122 136 126 104 Z" />
        <path d="M 80 124 Q 100 134 120 124 Q 108 130 100 128 Q 90 130 80 124" />
      </g>
    );
  }
  return null;
}

function Glasses({ spec }: { spec: FaceSpec }) {
  if (spec.glasses === "none") return null;
  if (spec.glasses === "pince") {
    return (
      <g fill="none" stroke="var(--color-ink)" strokeWidth="2">
        <circle cx="84" cy="104" r="12" />
        <circle cx="116" cy="104" r="12" />
        <path d="M 96 104 H 104" />
        <path d="M 128 98 Q 148 92 152 112" />
      </g>
    );
  }
  if (spec.glasses === "brow") {
    return (
      <g fill="none" stroke="var(--color-ink)" strokeWidth="2.4">
        <rect x="68" y="92" width="26" height="20" rx="3" />
        <rect x="106" y="92" width="26" height="20" rx="3" />
        <path d="M 94 102 H 106" />
      </g>
    );
  }
  return (
    <g fill="none" stroke="var(--color-ink)" strokeWidth="2.4">
      <circle cx="84" cy="104" r="13" />
      <circle cx="116" cy="104" r="13" />
      <path d="M 97 104 H 103" />
    </g>
  );
}
