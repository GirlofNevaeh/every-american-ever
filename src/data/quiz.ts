import { norm, ordinal } from "@/data/format";
import { NATIONS } from "@/data/nations";
import { PRESIDENCY, PRESIDENTS, getPresident, termLabel } from "@/data/presidents";
import { STATES, getState } from "@/data/states";

export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleIn<T>(items: T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function uniqueWrongs(correct: string, pool: string[], rng: () => number, count = 3): string[] {
  const seen = new Set<string>([norm(correct)]);
  const bag = shuffleIn(
    pool.filter((item) => !seen.has(norm(item))),
    rng,
  );
  const out: string[] = [];
  for (const item of bag) {
    const key = norm(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length === count) break;
  }
  return out;
}

function make(
  id: string,
  prompt: string,
  correct: string,
  wrongs: string[],
  why: string,
  rng: () => number,
): Question | null {
  if (wrongs.length < 3) return null;
  const choices = shuffleIn([correct, ...wrongs.slice(0, 3)], rng);
  const answer = choices.indexOf(correct);
  if (new Set(choices.map(norm)).size !== 4) return null;
  return { id, prompt, choices, answer, why };
}

function build(): Question[] {
  const rng = mulberry32(1959);
  let n = 1;
  const nextId = () => `q${n++}`;
  const capitals = STATES.map((s) => s.capital);
  const names = STATES.map((s) => s.name);
  const years = [...new Set(STATES.map((s) => String(s.year)))];
  const regions = [...new Set(STATES.map((s) => s.region))];
  const symbols = STATES.map((s) => s.symbol.replace(/\.$/, ""));
  const places = STATES.map((s) => s.place.replace(/^You can picture /, "").replace(/\.$/, ""));
  const presidentNames = PRESIDENTS.map((p) => p.name);

  const capitalQs: Question[] = [];
  for (const state of STATES) {
    const q = make(
      nextId(),
      `What is the capital of ${state.name}?`,
      state.capital,
      uniqueWrongs(state.capital, capitals, rng),
      `${state.capital} is the capital of ${state.name}.`,
      rng,
    );
    if (q) capitalQs.push(q);
  }

  const nickQs: Question[] = [];
  for (const state of STATES.filter((_, i) => i % 2 === 0)) {
    const q = make(
      nextId(),
      `Which state is called ${state.nickname}?`,
      state.name,
      uniqueWrongs(state.name, names, rng),
      `${state.name} is called ${state.nickname}.`,
      rng,
    );
    if (q) nickQs.push(q);
  }

  const yearQs: Question[] = [];
  for (const state of STATES.filter((_, i) => i % 2 === 1)) {
    const q = make(
      nextId(),
      `In what year did ${state.name} become a state?`,
      String(state.year),
      uniqueWrongs(String(state.year), years, rng),
      `${state.name} became a state in ${state.year}.`,
      rng,
    );
    if (q) yearQs.push(q);
  }

  const regionQs: Question[] = [];
  for (const state of STATES.filter((_, i) => i % 3 === 0)) {
    const q = make(
      nextId(),
      `Which region is ${state.name} in?`,
      state.region,
      uniqueWrongs(state.region, regions, rng),
      `${state.name} is in the ${state.region}.`,
      rng,
    );
    if (q) regionQs.push(q);
  }

  const borderQs: Question[] = [];
  for (const state of STATES) {
    if (state.borders.length === 0) {
      const q = make(
        nextId(),
        `Which state touches ${state.name} by land?`,
        "No other state",
        uniqueWrongs("No other state", ["California", "Texas", "Florida", "New York", "Washington"], rng),
        `No state touches ${state.name} by land.`,
        rng,
      );
      if (q) borderQs.push(q);
      continue;
    }
    if (state.order % 2 !== 0) continue;
    const neighbor = getState(state.borders[0]);
    if (!neighbor) continue;
    const q = make(
      nextId(),
      `Which state touches ${state.name}?`,
      neighbor.name,
      uniqueWrongs(
        neighbor.name,
        names.filter((name) => !state.borders.includes(STATES.find((s) => s.name === name)?.slug ?? "")),
        rng,
      ),
      `${neighbor.name} touches ${state.name}.`,
      rng,
    );
    if (q) borderQs.push(q);
  }

  const symbolQs: Question[] = [];
  for (const state of STATES.filter((_, i) => i % 3 === 1)) {
    const symbol = state.symbol.replace(/\.$/, "");
    const q = make(
      nextId(),
      `Which state has this symbol? ${symbol}.`,
      state.name,
      uniqueWrongs(state.name, names, rng),
      `${symbol} is a symbol of ${state.name}.`,
      rng,
    );
    if (q) symbolQs.push(q);
  }

  const placeQs: Question[] = [];
  for (const state of STATES.filter((_, i) => i % 3 === 2)) {
    const place = places[STATES.indexOf(state)];
    const q = make(
      nextId(),
      `Which state is this place in? ${place}.`,
      state.name,
      uniqueWrongs(state.name, names, rng),
      `That place is in ${state.name}.`,
      rng,
    );
    if (q) placeQs.push(q);
  }

  const numberQs: Question[] = [];
  for (const slot of PRESIDENCY) {
    const person = getPresident(slot.slug);
    if (!person) continue;
    const q = make(
      nextId(),
      `Who was the ${ordinal(slot.number)} president?`,
      person.name,
      uniqueWrongs(person.name, presidentNames, rng),
      `${person.name} is the ${ordinal(slot.number)} president.`,
      rng,
    );
    if (q) numberQs.push(q);
  }

  const termQs: Question[] = [];
  for (const person of PRESIDENTS.filter((_, i) => i % 3 === 0)) {
    const label = person.terms.map(termLabel).join(" and ");
    const wrong = PRESIDENTS.filter((p) => p.slug !== person.slug)
      .map((p) => p.terms.map(termLabel).join(" and "))
      .filter((item) => item !== label);
    const q = make(
      nextId(),
      `When was ${person.name} president?`,
      label,
      uniqueWrongs(label, wrong, rng),
      `${person.name} served ${label}.`,
      rng,
    );
    if (q) termQs.push(q);
  }

  const bornQs: Question[] = [];
  for (const person of PRESIDENTS.filter((_, i) => i % 4 === 1)) {
    const q = make(
      nextId(),
      `In what year was ${person.name} born?`,
      String(person.bornYear),
      uniqueWrongs(
        String(person.bornYear),
        PRESIDENTS.map((p) => String(p.bornYear)),
        rng,
      ),
      `${person.name} was born in ${person.bornYear}.`,
      rng,
    );
    if (q) bornQs.push(q);
  }

  const diedInOffice = [
    ["William Henry Harrison", "1841"],
    ["Zachary Taylor", "1850"],
    ["Abraham Lincoln", "1865"],
    ["James A. Garfield", "1881"],
    ["William McKinley", "1901"],
    ["Warren G. Harding", "1923"],
    ["Franklin D. Roosevelt", "1945"],
    ["John F. Kennedy", "1963"],
  ] as const;
  const deathQs: Question[] = [];
  for (const [name, year] of diedInOffice) {
    const q = make(
      nextId(),
      `Who died while he was president in ${year}?`,
      name,
      uniqueWrongs(name, presidentNames, rng),
      `${name} died while he was president, in ${year}.`,
      rng,
    );
    if (q) deathQs.push(q);
  }

  const livingQs: Question[] = [];
  for (const person of PRESIDENTS.filter((p) => p.died === null)) {
    const q = make(
      nextId(),
      `Is ${person.name} still living?`,
      "Yes. Still living.",
      ["No. He died in 1865.", "No. He died in 1963.", "No. He died in 1799."],
      `${person.name} is still living.`,
      rng,
    );
    if (q) livingQs.push(q);
  }
  const carter = make(
    nextId(),
    "Is Jimmy Carter still living?",
    "No. He died in 2024.",
    ["Yes. Still living.", "No. He died in 1799.", "He is president now."],
    "Jimmy Carter died on December 29, 2024.",
    rng,
  );
  if (carter) livingQs.push(carter);

  const nationQs: Question[] = [];
  for (const nation of NATIONS) {
    const q = make(
      nextId(),
      `Which nation uses the name ${nation.name}?`,
      nation.english === nation.name ? nation.name : `${nation.name} (${nation.english})`,
      uniqueWrongs(
        nation.english === nation.name ? nation.name : `${nation.name} (${nation.english})`,
        NATIONS.map((item) => (item.english === item.name ? item.name : `${item.name} (${item.english})`)),
        rng,
      ),
      `${nation.name} is the name they use. Many people also say ${nation.english}.`,
      rng,
    );
    if (q) nationQs.push(q);
    const place = make(
      nextId(),
      `Which culture region is home to the ${nation.english}?`,
      nation.region,
      uniqueWrongs(
        nation.region,
        ["Northeast", "Southeast", "Plains", "Southwest", "Great Basin", "Plateau", "Northwest Coast", "California", "Arctic", "Subarctic", "Hawaii"],
        rng,
      ),
      `The ${nation.english} are shown in the ${nation.region} region. Many people live there now.`,
      rng,
    );
    if (place) nationQs.push(place);
  }

  const special: Question[] = [];
  const push = (prompt: string, correct: string, wrongs: string[], why: string) => {
    const q = make(nextId(), prompt, correct, wrongs, why, rng);
    if (q) special.push(q);
  };
  push(
    "How many stripes are on the United States flag?",
    "13",
    ["50", "48", "7"],
    "The flag has 13 stripes. There are 7 red stripes and 6 white stripes.",
  );
  push(
    "How many stars are on the United States flag?",
    "50",
    ["13", "48", "52"],
    "The flag has 50 stars, one for each state.",
  );
  push("How many states are in the United States?", "50", ["48", "13", "52"], "The United States has 50 states.");
  push(
    "What is the capital of the United States?",
    "Washington, D.C.",
    ["New York City", "Philadelphia", "Washington state"],
    "Washington, D.C. is the capital. It is not a state.",
  );
  push(
    "Is Washington, D.C. a state?",
    "No. It is a city.",
    ["Yes. It is a state.", "Yes. It is Alaska.", "Yes. It is Hawaii."],
    "Washington, D.C. is the capital city. It is not a state.",
  );
  push(
    "Alaska and Hawaii became states in which year?",
    "1959",
    ["1776", "1845", "1912"],
    "Alaska and Hawaii both became states in 1959.",
  );
  push(
    "Which state was the first state?",
    "Delaware",
    ["Hawaii", "Texas", "California"],
    "Delaware was the first state, in 1787.",
  );
  push(
    "Which state was the 50th state?",
    "Hawaii",
    ["Alaska", "Arizona", "Texas"],
    "Hawaii became the 50th state in 1959. Alaska was the 49th.",
  );
  push(
    "Which state was the 49th state?",
    "Alaska",
    ["Hawaii", "Arizona", "New Mexico"],
    "Alaska became the 49th state in 1959.",
  );
  push(
    "Are Native Americans one people?",
    "No. There are many nations.",
    ["Yes. They are one nation.", "Yes. They are one state.", "They all live in one city."],
    "Native Americans are many nations, not one people.",
  );
  push(
    "Are Native Hawaiians the same as Alaska Native peoples?",
    "No. They are not the same.",
    ["Yes. They are the same.", "They are both a state.", "They both live in Texas."],
    "Kānaka Maoli and Alaska Native peoples are not the same as one another.",
  );
  push(
    "Is a Native nation the same thing as a state?",
    "No. They are not the same.",
    ["Yes. Every nation is a state.", "Yes. There are 50 nations.", "A nation is Washington, D.C."],
    "A Native nation is not the same thing as a state.",
  );
  push(
    "Who is both the 22nd and the 24th president?",
    "Grover Cleveland",
    ["Benjamin Harrison", "Theodore Roosevelt", "William Howard Taft"],
    "Grover Cleveland served two terms that were not in a row. He is the 22nd and the 24th president.",
  );
  push(
    "Who is both the 45th and the 47th president?",
    "Donald Trump",
    ["Joe Biden", "Barack Obama", "George W. Bush"],
    "Donald Trump is the 45th and the 47th president. He is president now.",
  );
  push(
    "Who is president now?",
    "Donald Trump",
    ["Joe Biden", "Barack Obama", "George Washington"],
    "Donald Trump is president now. This term began in 2025.",
  );
  push(
    "Which president was elected four times?",
    "Franklin D. Roosevelt",
    ["George Washington", "Abraham Lincoln", "Barack Obama"],
    "Franklin D. Roosevelt was elected four times. No other president has done that.",
  );
  push(
    "Which president was the first Black president?",
    "Barack Obama",
    ["Abraham Lincoln", "Joe Biden", "John F. Kennedy"],
    "Barack Obama was the first Black president.",
  );
  push(
    "Who made a writing system for the Cherokee language?",
    "Sequoyah",
    ["Sacagawea", "Wilma Mankiller", "Maria Tallchief"],
    "Sequoyah made a writing system so Cherokee words could be written down.",
  );
  push(
    "Who was the first woman elected Principal Chief of the Cherokee Nation?",
    "Wilma Mankiller",
    ["Sacagawea", "Maria Tallchief", "Queen Liliʻuokalani"],
    "Wilma Mankiller led the Cherokee Nation. She was the first woman elected Principal Chief.",
  );
  push(
    "Sacagawea was a member of which nation?",
    "Shoshone",
    ["Cherokee", "Lakota", "Hopi"],
    "Sacagawea was a Lemhi Shoshone woman. She was a real person.",
  );
  push(
    "Maria Tallchief, the ballet dancer, was a member of which nation?",
    "Osage",
    ["Hopi", "Chinook", "Chumash"],
    "Maria Tallchief was Osage. She danced ballet.",
  );
  push(
    "Is Texas its own country?",
    "No. It is a state.",
    ["Yes. It is its own country.", "Yes. It is the capital.", "No. It is Hawaii."],
    "Texas is a state. It is part of the United States.",
  );
  push(
    "Is Hawaii its own country?",
    "No. It is a state.",
    ["Yes. It is its own country.", "No. It is not part of the United States.", "Yes. It is Washington, D.C."],
    "Hawaii is a state in the United States. It became a state in 1959.",
  );
  push(
    "Where do Alaska and Hawaii sit on the states map?",
    "In inset boxes",
    ["Next to California", "Inside Texas", "They are not states"],
    "Alaska and Hawaii are drawn in boxes. They are not next to California.",
  );
  push(
    "What do the Diné call themselves?",
    "Diné",
    ["Hopi", "Lakota", "State of Arizona"],
    "They call themselves Diné. Many people also say Navajo.",
  );
  push(
    "What does Haudenosaunee mean?",
    "People of the Longhouse",
    ["People of the Islands", "One state", "People of the Canyon"],
    "Haudenosaunee means People of the Longhouse.",
  );

  void symbols;
  const groups = [
    special,
    capitalQs,
    numberQs,
    nationQs,
    nickQs,
    yearQs,
    borderQs,
    regionQs,
    symbolQs,
    placeQs,
    termQs,
    bornQs,
    deathQs,
    livingQs,
  ];
  const mixed: Question[] = [];
  let row = 0;
  while (mixed.length < 250) {
    let added = false;
    for (const group of groups) {
      const item = group[row];
      if (!item) continue;
      mixed.push({ ...item, id: `q${mixed.length + 1}` });
      added = true;
      if (mixed.length === 250) break;
    }
    if (!added) break;
    row += 1;
  }
  return mixed;
}

export const QUIZ: Question[] = build();

export function freshQuiz(count: number, rng: () => number = Math.random): Question[] {
  const copy = [...QUIZ];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
