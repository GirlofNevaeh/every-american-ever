export type Skin = "pale" | "light" | "tan" | "brown" | "deep";
export type HairColor = "white" | "gray" | "black" | "brown" | "dark" | "blond" | "red";
export type HairStyle =
  | "tied"
  | "balding"
  | "receding"
  | "short"
  | "thick"
  | "swept"
  | "wavy"
  | "curly"
  | "pompadour"
  | "parted"
  | "bob"
  | "ponytail"
  | "braids"
  | "pigtails"
  | "bun"
  | "long"
  | "buzz"
  | "side";
export type FaceShape = "oval" | "round" | "long" | "square";
export type Facial = "none" | "beard" | "mustache" | "sideburns" | "mutton" | "chinbeard" | "full";
export type Glasses = "none" | "round" | "brow" | "pince";
export type Neckwear = "cravat" | "bow" | "tie" | "open" | "dress" | "tee";

export type FaceSpec = {
  skin: Skin;
  hair: HairStyle;
  hairColor: HairColor;
  face: FaceShape;
  facial: Facial;
  glasses: Glasses;
  brows: "soft" | "thick" | "straight";
  smile: "calm" | "warm" | "slight" | "serious";
  neckwear: Neckwear;
  tie: "red" | "blue" | "none";
  coat: "blue" | "ink" | "none";
};

export type KidFace = {
  id: string;
  group: "girl" | "boy";
  aria: string;
  spec: FaceSpec;
};

const girl = (
  id: string,
  aria: string,
  spec: Omit<FaceSpec, "facial" | "coat"> & { facial?: Facial; coat?: FaceSpec["coat"] },
): KidFace => ({
  id,
  group: "girl",
  aria,
  spec: { facial: "none", coat: "none", ...spec },
});

const boy = (
  id: string,
  aria: string,
  spec: Omit<FaceSpec, "facial" | "coat"> & { facial?: Facial; coat?: FaceSpec["coat"] },
): KidFace => ({
  id,
  group: "boy",
  aria,
  spec: { facial: "none", coat: "none", ...spec },
});

export const KIDS: KidFace[] = [
  girl("g1", "Girl with pale skin and black pigtails", {
    skin: "pale",
    hair: "pigtails",
    hairColor: "black",
    face: "round",
    glasses: "none",
    brows: "soft",
    smile: "warm",
    neckwear: "dress",
    tie: "none",
  }),
  girl("g2", "Girl with light skin and brown braids", {
    skin: "light",
    hair: "braids",
    hairColor: "brown",
    face: "oval",
    glasses: "none",
    brows: "straight",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  girl("g3", "Girl with tan skin and a dark ponytail", {
    skin: "tan",
    hair: "ponytail",
    hairColor: "dark",
    face: "oval",
    glasses: "round",
    brows: "soft",
    smile: "calm",
    neckwear: "dress",
    tie: "none",
  }),
  girl("g4", "Girl with brown skin and a black bun", {
    skin: "brown",
    hair: "bun",
    hairColor: "black",
    face: "round",
    glasses: "none",
    brows: "thick",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  girl("g5", "Girl with deep brown skin and long black hair", {
    skin: "deep",
    hair: "long",
    hairColor: "black",
    face: "long",
    glasses: "none",
    brows: "soft",
    smile: "slight",
    neckwear: "dress",
    tie: "none",
  }),
  girl("g6", "Girl with pale skin, red hair, and a bob", {
    skin: "pale",
    hair: "bob",
    hairColor: "red",
    face: "square",
    glasses: "none",
    brows: "straight",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  girl("g7", "Girl with light skin and blond pigtails", {
    skin: "light",
    hair: "pigtails",
    hairColor: "blond",
    face: "round",
    glasses: "brow",
    brows: "soft",
    smile: "warm",
    neckwear: "dress",
    tie: "none",
  }),
  girl("g8", "Girl with tan skin and wavy brown hair", {
    skin: "tan",
    hair: "long",
    hairColor: "brown",
    face: "oval",
    glasses: "none",
    brows: "soft",
    smile: "calm",
    neckwear: "tee",
    tie: "none",
  }),
  girl("g9", "Girl with brown skin and a short black bob", {
    skin: "brown",
    hair: "bob",
    hairColor: "black",
    face: "square",
    glasses: "none",
    brows: "thick",
    smile: "warm",
    neckwear: "dress",
    tie: "none",
  }),
  girl("g10", "Girl with deep brown skin and two braids", {
    skin: "deep",
    hair: "braids",
    hairColor: "black",
    face: "round",
    glasses: "none",
    brows: "straight",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  girl("g11", "Girl with pale skin and a brown bun", {
    skin: "pale",
    hair: "bun",
    hairColor: "brown",
    face: "oval",
    glasses: "none",
    brows: "soft",
    smile: "slight",
    neckwear: "dress",
    tie: "none",
  }),
  girl("g12", "Girl with light skin and a dark ponytail", {
    skin: "light",
    hair: "ponytail",
    hairColor: "dark",
    face: "long",
    glasses: "none",
    brows: "straight",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b1", "Boy with pale skin and short blond hair", {
    skin: "pale",
    hair: "short",
    hairColor: "blond",
    face: "round",
    glasses: "none",
    brows: "soft",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b2", "Boy with light skin and thick brown hair", {
    skin: "light",
    hair: "thick",
    hairColor: "brown",
    face: "oval",
    glasses: "none",
    brows: "straight",
    smile: "slight",
    neckwear: "open",
    tie: "none",
  }),
  boy("b3", "Boy with tan skin and curly black hair", {
    skin: "tan",
    hair: "curly",
    hairColor: "black",
    face: "round",
    glasses: "none",
    brows: "soft",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b4", "Boy with brown skin and a short black cut", {
    skin: "brown",
    hair: "buzz",
    hairColor: "black",
    face: "square",
    glasses: "none",
    brows: "thick",
    smile: "calm",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b5", "Boy with deep brown skin and short black hair", {
    skin: "deep",
    hair: "short",
    hairColor: "black",
    face: "oval",
    glasses: "round",
    brows: "soft",
    smile: "warm",
    neckwear: "open",
    tie: "none",
  }),
  boy("b6", "Boy with pale skin, red hair, and a side part", {
    skin: "pale",
    hair: "side",
    hairColor: "red",
    face: "long",
    glasses: "none",
    brows: "straight",
    smile: "slight",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b7", "Boy with light skin and wavy dark hair", {
    skin: "light",
    hair: "wavy",
    hairColor: "dark",
    face: "oval",
    glasses: "none",
    brows: "soft",
    smile: "warm",
    neckwear: "open",
    tie: "none",
  }),
  boy("b8", "Boy with tan skin and a brown buzz cut", {
    skin: "tan",
    hair: "buzz",
    hairColor: "brown",
    face: "square",
    glasses: "brow",
    brows: "straight",
    smile: "calm",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b9", "Boy with brown skin and thick black hair", {
    skin: "brown",
    hair: "thick",
    hairColor: "black",
    face: "round",
    glasses: "none",
    brows: "thick",
    smile: "warm",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b10", "Boy with deep brown skin and curly hair", {
    skin: "deep",
    hair: "curly",
    hairColor: "black",
    face: "oval",
    glasses: "none",
    brows: "soft",
    smile: "warm",
    neckwear: "open",
    tie: "none",
  }),
  boy("b11", "Boy with pale skin and a brown side part", {
    skin: "pale",
    hair: "side",
    hairColor: "brown",
    face: "long",
    glasses: "none",
    brows: "straight",
    smile: "serious",
    neckwear: "tee",
    tie: "none",
  }),
  boy("b12", "Boy with light skin and short black hair", {
    skin: "light",
    hair: "short",
    hairColor: "black",
    face: "square",
    glasses: "none",
    brows: "thick",
    smile: "warm",
    neckwear: "open",
    tie: "none",
  }),
];
