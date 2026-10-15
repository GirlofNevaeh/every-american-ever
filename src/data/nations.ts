export type CultureRegion =
  | "Northeast"
  | "Southeast"
  | "Plains"
  | "Southwest"
  | "Great Basin"
  | "Plateau"
  | "Northwest Coast"
  | "California"
  | "Arctic"
  | "Subarctic"
  | "Hawaii";

export type Nation = {
  slug: string;
  name: string;
  english: string;
  region: CultureRegion;
  homelands: string;
  remember: string;
  now: string;
  people: string[];
  today: string;
  past: string;
  mark: "longhouse" | "wetu" | "syllabary" | "river" | "tipi" | "hogan" | "mesa" | "canoe" | "tomol" | "ice" | "outrigger" | "basin";
};

export const NATIONS: Nation[] = [
  {
    slug: "wampanoag",
    name: "Wampanoag",
    english: "Wampanoag",
    region: "Northeast",
    homelands: "Their homelands are along the coast of Massachusetts and Rhode Island, including Cape Cod and the islands nearby.",
    remember: "In 1621, Wampanoag people shared a harvest meal with English settlers at Plymouth. The nation did not end there.",
    now: "Many Wampanoag people live in their homelands now.",
    people: ["Ousamequin, also called Massasoit, was a Wampanoag leader who met the English."],
    today: "A jacket and jeans",
    past: "A woven wrap by the shore",
    mark: "wetu",
  },
  {
    slug: "haudenosaunee",
    name: "Haudenosaunee",
    english: "Iroquois",
    region: "Northeast",
    homelands: "Their homelands are in New York and nearby lands. Communities also live in Canada. The Six Nations are the Mohawk, Oneida, Onondaga, Cayuga, Seneca, and Tuscarora.",
    remember: "Haudenosaunee means People of the Longhouse. The Great Law of Peace brought the nations together.",
    now: "Many Haudenosaunee people live in these homelands now.",
    people: [],
    today: "A warm coat",
    past: "A tunic beside a longhouse",
    mark: "longhouse",
  },
  {
    slug: "cherokee",
    name: "ᏣᎳᎩ (Tsalagi)",
    english: "Cherokee",
    region: "Southeast",
    homelands: "Their homelands are in the southern Appalachian mountains. Today the Cherokee Nation is in Oklahoma, and the Eastern Band of Cherokee Indians is in North Carolina.",
    remember: "Sequoyah made a writing system so Cherokee words could be written down.",
    now: "Many Cherokee people live in Oklahoma and in North Carolina now.",
    people: [
      "Wilma Mankiller led the Cherokee Nation. She was the first woman elected Principal Chief.",
    ],
    today: "A shirt and jeans",
    past: "A woven shawl",
    mark: "syllabary",
  },
  {
    slug: "muscogee",
    name: "Muscogee (Mvskoke)",
    english: "Creek",
    region: "Southeast",
    homelands: "Their homelands are in Alabama and Georgia. The Muscogee Nation is now also in Oklahoma.",
    remember: "Muscogee towns joined together in a confederacy.",
    now: "Many Muscogee people live in Oklahoma and in the Southeast now.",
    people: [],
    today: "A hoodie",
    past: "A simple town robe",
    mark: "river",
  },
  {
    slug: "lakota",
    name: "Lakota",
    english: "Sioux",
    region: "Plains",
    homelands: "Their homelands are on the northern Plains, especially in North Dakota and South Dakota. The Black Hills are a sacred place.",
    remember: "Lakota is one nation in the Oceti Sakowin, the Seven Council Fires. Some people call this group Sioux.",
    now: "Many Lakota people live in the Dakotas now.",
    people: [],
    today: "A jacket on the prairie",
    past: "A blanket beside a tipi",
    mark: "tipi",
  },
  {
    slug: "dine",
    name: "Diné",
    english: "Navajo",
    region: "Southwest",
    homelands: "Their homelands are in Arizona, New Mexico, and Utah. The Navajo Nation is a large nation there.",
    remember: "Diné weavers make wool rugs with bold patterns. Four sacred mountains mark the homeland.",
    now: "Many Diné people live in the Southwest now.",
    people: [],
    today: "A modern jacket",
    past: "A woven dress beside a hogan",
    mark: "hogan",
  },
  {
    slug: "hopi",
    name: "Hopi",
    english: "Hopi",
    region: "Southwest",
    homelands: "Their homelands are on tall mesas in northern Arizona.",
    remember: "Hopi villages sit high on the mesas. Corn is an important food and a respected plant.",
    now: "Many Hopi people live on the mesas and nearby now.",
    people: [],
    today: "A school jacket",
    past: "A cotton mantle",
    mark: "mesa",
  },
  {
    slug: "chinook",
    name: "Chinook",
    english: "Chinook",
    region: "Northwest Coast",
    homelands: "Their homelands are along the Columbia River in Washington and Oregon, where the river meets the Pacific.",
    remember: "Chinook people built cedar canoes and traded along the great river.",
    now: "Many Chinook people live near the Columbia River now.",
    people: [],
    today: "A rain jacket",
    past: "A cedar-bark cape",
    mark: "canoe",
  },
  {
    slug: "chumash",
    name: "Chumash",
    english: "Chumash",
    region: "California",
    homelands: "Their homelands are on the California coast around Santa Barbara and on the nearby Channel Islands.",
    remember: "Chumash builders made tomol canoes from redwood planks to cross the channel.",
    now: "Many Chumash people live on this coast now.",
    people: [],
    today: "A t-shirt by the sea",
    past: "A wrap beside a tomol",
    mark: "tomol",
  },
  {
    slug: "inupiat",
    name: "Iñupiat",
    english: "Inupiat",
    region: "Arctic",
    homelands: "Their homelands are on the northern and northwestern coast of Alaska.",
    remember: "Iñupiat towns sit by the Arctic Ocean. Families know the sea ice, the long winter dark, and the long summer sun.",
    now: "Many Iñupiat people live in Alaska now. They are not the same as Native Hawaiians.",
    people: [],
    today: "A winter parka",
    past: "A fur-ruffed parka",
    mark: "ice",
  },
  {
    slug: "kanaka-maoli",
    name: "Kānaka Maoli",
    english: "Native Hawaiians",
    region: "Hawaii",
    homelands: "Their homelands are the Hawaiian islands.",
    remember: "The Hawaiian language is still spoken, and hula tells stories. Queen Liliʻuokalani was the last Hawaiian monarch. She wrote songs, including Aloha ʻOe.",
    now: "Many Kānaka Maoli live in Hawaii now. They are not the same as Alaska Native peoples.",
    people: ["Queen Liliʻuokalani loved her people and her islands."],
    today: "A bright shirt",
    past: "A kihei cape by a canoe",
    mark: "outrigger",
  },
  {
    slug: "shoshone",
    name: "Newe",
    english: "Shoshone",
    region: "Great Basin",
    homelands: "Their homelands stretch across the Great Basin and nearby mountains, in Nevada, Utah, Idaho, and Wyoming.",
    remember: "Sacagawea was a Lemhi Shoshone woman. She helped travelers find their way in the West. She was a real person with a real life.",
    now: "Many Shoshone people live in these homelands now.",
    people: [],
    today: "A hoodie and sneakers",
    past: "A hide robe in sagebrush country",
    mark: "basin",
  },
];

export const REGIONS: { id: CultureRegion; blurb: string }[] = [
  {
    id: "Northeast",
    blurb: "Woods, rivers, and a cold coast. Wampanoag and Haudenosaunee nations are two of many here.",
  },
  {
    id: "Southeast",
    blurb: "Forests, rivers, and a warm coast. Cherokee and Muscogee nations are two of many here.",
  },
  {
    id: "Plains",
    blurb: "Wide grass and a big sky. The Lakota nation is one of many here.",
  },
  {
    id: "Southwest",
    blurb: "Desert, mesas, and canyons. Diné and Hopi are two different nations here.",
  },
  {
    id: "Great Basin",
    blurb: "Dry valleys between mountain ranges. Shoshone homelands are here.",
  },
  {
    id: "Plateau",
    blurb: "Rivers cut through high land between the Cascades and the Rockies. Many nations live here. This site can show only some.",
  },
  {
    id: "Northwest Coast",
    blurb: "Cedar forests and the ocean. The Chinook nation is one of many here.",
  },
  {
    id: "California",
    blurb: "Many nations have lived from the mountains to the sea. The Chumash nation is one.",
  },
  {
    id: "Arctic",
    blurb: "Sea, ice, and long summer light. Iñupiat homelands are here. They are not the only Alaska Native people.",
  },
  {
    id: "Subarctic",
    blurb: "Forests of the far north, south of the Arctic coast. Many nations live here, including Athabascan peoples. This site can show only some.",
  },
  {
    id: "Hawaii",
    blurb: "Islands in the Pacific. Kānaka Maoli are the Native people here. They are not the same as Arctic peoples.",
  },
];

const bySlug = new Map(NATIONS.map((n) => [n.slug, n]));

export function getNation(slug: string): Nation | undefined {
  return bySlug.get(slug);
}

function foldName(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function hasOtherName(nation: Nation): boolean {
  return foldName(nation.name) !== foldName(nation.english);
}
