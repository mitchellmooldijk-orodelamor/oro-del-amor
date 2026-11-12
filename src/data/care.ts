// Rasinformatie en de eigen verzorgingstips van Oro Del Amor.
// De verzorgingshulp op /het-ras gebruikt uitsluitend deze tips.

export type AgeStageId = "pup" | "junior" | "volwassen" | "senior";

export type AgeStage = {
  id: AgeStageId;
  label: string;
  range: string;
  /** Vanaf deze leeftijd in maanden (inclusief). */
  fromMonths: number;
  tips: string[];
};

export const ageStages: AgeStage[] = [
  {
    id: "pup",
    label: "Pup",
    range: "tot 6 maanden",
    fromMonths: 0,
    tips: [
      "Houd een vaste dagindeling aan: na het slapen, eten en spelen meteen even naar buiten voor de zindelijkheid.",
      "Gun je pup veel rust — pups slapen zo'n 18 tot 20 uur per dag. Een bench op de vaste slaapplek geeft een veilig gevoel.",
      "Houd wandelingen kort: als vuistregel ongeveer 5 minuten per levensmaand, twee keer per dag.",
      "Verdeel het eten over 3 à 4 kleine maaltijden op vaste tijden; houd de hoeveelheid aan zoals op de verpakking of in ons puppypakket staat.",
      "Laat je pup elke dag even kort wennen aan borstelen, pootjes vasthouden en in het bekje kijken, altijd met een beloning.",
      "Laat je pup rustig kennismaken met nieuwe geluiden, mensen en ondergronden, en start met een puppycursus.",
      "Doe de halsband 's nachts en in de bench af, zodat je pup nergens achter kan blijven haken.",
      "Laat je pup niet van de bank of de trap springen; til hem liever op en zet hem neer.",
    ],
  },
  {
    id: "junior",
    label: "Jonge hond",
    range: "6 tot 12 maanden",
    fromMonths: 6,
    tips: [
      "De tandenwisseling kan tot ongeveer 7 maanden duren: geef geschikt kauwspeelgoed.",
      "De puppyvacht maakt plaats voor de volwassen vacht. Borstel in deze periode vaker, het liefst dagelijks even.",
      "Bouw de wandelingen geleidelijk op en vermijd nog lange afstanden en wild springen.",
      "Geef 2 à 3 maaltijden per dag op vaste tijden.",
      "Train kort en vaak: sessies van 5 tot 10 minuten, altijd positief belonen.",
      "Rust blijft belangrijk; zorg voor een vaste, rustige plek waar je hond niet gestoord wordt.",
    ],
  },
  {
    id: "volwassen",
    label: "Volwassen",
    range: "1 tot 8 jaar",
    fromMonths: 12,
    tips: [
      "Geef 2 maaltijden per dag op vaste tijden.",
      "Wandel dagelijks 2 à 3 keer, samen ongeveer 45 tot 60 minuten, met tijd om te snuffelen en te spelen.",
      "Bied hersenwerk aan, zoals een snuffelmat, zoekspelletjes of een nieuw trucje.",
      "Borstel de vacht 2 à 3 keer per week tot op de huid, en tijdens de rui dagelijks.",
    ],
  },
  {
    id: "senior",
    label: "Senior",
    range: "8 jaar en ouder",
    fromMonths: 96,
    tips: [
      "Kies een rustiger tempo: liever vaker kort wandelen dan één lange wandeling.",
      "Zorg voor een zachte, warme ligplek en antislipmatjes op gladde vloeren.",
      "Blijf hersenwerk aanbieden, in een korter en rustiger tempo.",
      "Geef 2 maaltijden per dag op vaste tijden.",
      "Gebruik het borstelmoment om je hond goed te bekijken; valt je iets op, overleg dan met je dierenarts.",
    ],
  },
];

/** Tips die voor iedere leeftijd gelden. */
export const generalCareTips: string[] = [
  "Borstel 2 à 3 keer per week met een speldenborstel en een kam, laag voor laag tot op de huid. Scheer de dubbele vacht nooit kort.",
  "Poets dagelijks de tanden met een zachte hondentandenborstel en hondentandpasta.",
  "Knip of vijl de nagels elke 2 tot 4 weken. Hoor je ze tikken op de vloer, dan zijn ze te lang.",
  "Kijk dagelijks even naar de ogen en oren en veeg traanvocht zacht weg met een vochtig doekje.",
  "Was je hond alleen als het nodig is, met een milde hondenshampoo, en föhn de vacht daarna goed droog.",
  "Gebruik bij het uitlaten een tuigje in plaats van een halsband; dat is prettiger voor de tere hals.",
];

export const focusOptions = [
  { id: "vacht", label: "Vacht" },
  { id: "tanden", label: "Tanden" },
  { id: "training", label: "Training & zindelijkheid" },
  { id: "beweging", label: "Beweging" },
  { id: "rust", label: "Rust & slapen" },
] as const;

export type FocusId = (typeof focusOptions)[number]["id"];
export const FOCUS_IDS = focusOptions.map((f) => f.id) as [FocusId, ...FocusId[]];

export const MIN_AGE_MONTHS = 2;
export const MAX_AGE_MONTHS = 216; // 18 jaar

export function getAgeStage(ageMonths: number): AgeStage {
  let stage = ageStages[0]!;
  for (const s of ageStages) if (ageMonths >= s.fromMonths) stage = s;
  return stage;
}

/** Keuzes voor het leeftijdmenu: 2–11 maanden, daarna 1–18 jaar. */
export const ageChoices: { months: number; label: string }[] = [
  ...Array.from({ length: 10 }, (_, i) => ({ months: i + 2, label: `${i + 2} maanden` })),
  ...Array.from({ length: 18 }, (_, i) => ({ months: (i + 1) * 12, label: i === 0 ? "1 jaar" : `${i + 1} jaar` })),
];

export const CARE_DISCLAIMER =
  "Deze routine is een algemene verzorgingshulp en geen medisch advies. Twijfel je over de gezondheid van je hond, neem dan altijd contact op met je dierenarts.";

export const breedFacts = [
  { label: "Officiële naam", value: "Dwergkees (Pomeranian)" },
  { label: "FCI-rasgroep", value: "Groep 5 · standaard nr. 97" },
  { label: "Schofthoogte", value: "ongeveer 18–22 cm" },
  { label: "Gewicht", value: "ongeveer 1,9–3,5 kg" },
  { label: "Levensverwachting", value: "gemiddeld 12–16 jaar" },
  { label: "Vacht", value: "Dubbele vacht, veel kleuren" },
];
