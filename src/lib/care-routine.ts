// Stelt de dagroutine van de verzorgingshulp samen, volledig in de browser.
// Alle adviezen komen uit de eigen verzorgingstips van de kennel (src/data/care.ts).
import { focusOptions, getAgeStage, type AgeStageId, type FocusId } from "@/data/care";

export type CareTask = { task: string; tip: string };
export type CareMoment = { label: string; time: string; tasks: CareTask[] };
export type CareRoutine = {
  title: string;
  intro: string;
  moments: CareMoment[];
  weekly: string[];
  kennelNote: string;
};
export type CareRoutineResult = { stageLabel: string; routine: CareRoutine };

/** Een taak met `focus` verschijnt alleen als de bezoeker dat aandachtspunt koos. */
type PlanTask = CareTask & { focus?: FocusId };
type PlanMoment = { label: string; time: string; tasks: PlanTask[] };
type Plan = { moments: PlanMoment[]; weekly: string[] };

const TEETH: PlanTask = {
  task: "Tanden poetsen",
  tip: "Poets dagelijks met een zachte hondentandenborstel en hondentandpasta.",
};
const EYES: PlanTask = {
  task: "Ogen en oren nakijken",
  tip: "Veeg traanvocht zacht weg met een vochtig doekje.",
};
const HARNESS = "Gebruik bij het uitlaten een tuigje in plaats van een halsband; dat is prettiger voor de tere hals.";
const NAILS = "Knip of vijl de nagels elke 2 tot 4 weken. Hoor je ze tikken op de vloer, dan zijn ze te lang.";
const WASH = "Was alleen als het nodig is, met een milde hondenshampoo, en föhn de vacht daarna goed droog.";
const NO_SHAVE = "Scheer de dubbele vacht nooit kort.";

export function cleanDogName(name: string | undefined): string | null {
  const cleaned = (name ?? "").replace(/[^\p{L}\p{N} '-]/gu, "").trim().slice(0, 30);
  return cleaned.length ? cleaned : null;
}

/** Vuistregel van de kennel: ongeveer 5 minuten wandelen per levensmaand. */
export function pupWalkMinutes(ageMonths: number): number {
  return ageMonths * 5;
}

const plans: Record<AgeStageId, (who: string, ageMonths: number) => Plan> = {
  pup: (who, ageMonths) => {
    const walk = `ongeveer ${pupWalkMinutes(ageMonths)} minuten`;
    return {
      moments: [
        {
          label: "Ochtend",
          time: "07:00",
          tasks: [
            {
              task: "Meteen na het wakker worden naar buiten",
              tip: "Na het slapen, eten en spelen direct naar buiten helpt bij de zindelijkheid.",
            },
            {
              task: "Eerste kleine maaltijd",
              tip: "Verdeel het eten over 3 à 4 kleine maaltijden op vaste tijden; houd de hoeveelheid aan zoals op de verpakking of in ons puppypakket staat.",
            },
            {
              task: `Korte wandeling van ${walk}`,
              tip: "Als vuistregel ongeveer 5 minuten per levensmaand, twee keer per dag, met een tuigje.",
            },
            {
              task: "Na het spelen weer even naar buiten",
              tip: "Een vaste dagindeling maakt zindelijk worden een stuk makkelijker.",
              focus: "training",
            },
          ],
        },
        {
          label: "Middag",
          time: "rond 12:00",
          tasks: [
            { task: "Maaltijd en daarna naar buiten", tip: "Na het eten meteen even naar buiten voor de zindelijkheid." },
            {
              task: "Middagdutje op de vaste slaapplek",
              tip: "Pups slapen zo'n 18 tot 20 uur per dag; een bench op de vaste slaapplek geeft een veilig gevoel.",
            },
            {
              task: "Kort wennen aan borstelen, pootjes vasthouden en in het bekje kijken",
              tip: "Elke dag even kort oefenen, altijd met een beloning.",
            },
            {
              task: "Laat de vacht laag voor laag aanraken met de borstel",
              tip: "Zo wordt het borstelen tot op de huid later een fijn moment.",
              focus: "vacht",
            },
          ],
        },
        {
          label: "Namiddag",
          time: "rond 16:00",
          tasks: [
            { task: `Tweede korte wandeling van ${walk}`, tip: "Houd wandelingen kort; lange afstanden zijn nog te veel." },
            {
              task: "Rustig kennismaken met iets nieuws",
              tip: "Nieuwe geluiden, mensen en ondergronden in een rustig tempo, en start met een puppycursus.",
            },
            { task: "Maaltijd en daarna naar buiten", tip: "Vaste tijden geven houvast." },
            {
              task: "Til op en zet neer bij de bank en de trap",
              tip: `Laat ${who} niet van de bank of de trap springen.`,
              focus: "beweging",
            },
          ],
        },
        {
          label: "Avond",
          time: "19:00",
          tasks: [
            { ...TEETH, task: "Tanden poetsen oefenen" },
            EYES,
            {
              task: "Nog een extra rustmoment inplannen",
              tip: "Veel rust hoort erbij; stoor je pup niet op de vaste slaapplek.",
              focus: "rust",
            },
            {
              task: "Bekje nog eens rustig bekijken met een beloning",
              tip: "Wie dit als pup leert, vindt tandenpoetsen later heel gewoon.",
              focus: "tanden",
            },
          ],
        },
        {
          label: "Voor het slapen",
          time: "22:00",
          tasks: [
            { task: "Laatste keer naar buiten", tip: "Zo begint de nacht met een lege blaas." },
            {
              task: "Halsband af en naar de bench",
              tip: "Doe de halsband 's nachts en in de bench af, zodat je pup nergens achter kan blijven haken.",
            },
          ],
        },
      ],
      weekly: [NAILS, WASH, HARNESS, NO_SHAVE],
    };
  },

  junior: () => ({
    moments: [
      {
        label: "Ochtend",
        time: "07:30",
        tasks: [
          { task: "Wandeling met een tuigje", tip: "Bouw de wandelingen geleidelijk op en vermijd nog lange afstanden en wild springen." },
          { task: "Eerste maaltijd", tip: "Geef 2 à 3 maaltijden per dag op vaste tijden." },
          { task: "Korte training van 5 tot 10 minuten", tip: "Train kort en vaak, altijd positief belonen." },
        ],
      },
      {
        label: "Middag",
        time: "rond 12:30",
        tasks: [
          { task: "Korte wandeling en eventueel een maaltijd", tip: "Vaste tijden geven rust en regelmaat." },
          {
            task: "Rust op de vaste plek",
            tip: "Rust blijft belangrijk; zorg voor een vaste, rustige plek waar je hond niet gestoord wordt.",
          },
          {
            task: "Nog een trainingsmoment van 5 minuten",
            tip: "Liever vaak kort dan één keer lang.",
            focus: "training",
          },
        ],
      },
      {
        label: "Namiddag",
        time: "rond 17:00",
        tasks: [
          { task: "Wandeling in een rustig tempo", tip: "Nog geen lange afstanden en geen wild springen." },
          {
            task: "Vacht borstelen",
            tip: "De puppyvacht maakt plaats voor de volwassen vacht; borstel in deze periode het liefst dagelijks even.",
          },
          {
            task: "Borstel laag voor laag tot op de huid",
            tip: "Met een speldenborstel en een kam; scheer de dubbele vacht nooit kort.",
            focus: "vacht",
          },
          {
            task: "Bouw de afstand stap voor stap op",
            tip: "Geleidelijk opbouwen is prettiger dan ineens een lange wandeling.",
            focus: "beweging",
          },
        ],
      },
      {
        label: "Avond",
        time: "19:00",
        tasks: [
          { task: "Laatste maaltijd", tip: "Op een vaste tijd, net als de andere maaltijden." },
          TEETH,
          { task: "Kauwspeelgoed aanbieden", tip: "De tandenwisseling kan tot ongeveer 7 maanden duren; geschikt kauwspeelgoed helpt." },
          EYES,
          {
            task: "Extra kauwmoment met geschikt kauwspeelgoed",
            tip: "Fijn tijdens de tandenwisseling.",
            focus: "tanden",
          },
        ],
      },
      {
        label: "Voor het slapen",
        time: "22:00",
        tasks: [
          { task: "Laatste rondje buiten", tip: "Kort en rustig, zonder nog te spelen." },
          {
            task: "Naar de vaste, rustige slaapplek",
            tip: "Een plek waar je hond niet gestoord wordt geeft een goede nachtrust.",
            focus: "rust",
          },
        ],
      },
    ],
    weekly: [NAILS, WASH, HARNESS, NO_SHAVE],
  }),

  volwassen: () => ({
    moments: [
      {
        label: "Ochtend",
        time: "07:30",
        tasks: [
          {
            task: "Ochtendwandeling met een tuigje",
            tip: "Wandel dagelijks 2 à 3 keer, samen ongeveer 45 tot 60 minuten, met tijd om te snuffelen en te spelen.",
          },
          { task: "Eerste maaltijd", tip: "Geef 2 maaltijden per dag op vaste tijden." },
          EYES,
        ],
      },
      {
        label: "Middag",
        time: "rond 13:00",
        tasks: [
          { task: "Wandeling met tijd om te snuffelen", tip: "Snuffelen en spelen horen bij een fijne wandeling." },
          {
            task: "Hersenwerk",
            tip: "Bied een snuffelmat, zoekspelletjes of een nieuw trucje aan.",
          },
          {
            task: "Oefen een nieuw trucje",
            tip: "Hersenwerk houdt je hond scherp en tevreden.",
            focus: "training",
          },
          {
            task: "Rustmoment na de wandeling",
            tip: "Gun je hond daarna een rustig plekje om bij te komen.",
            focus: "rust",
          },
        ],
      },
      {
        label: "Avond",
        time: "18:00",
        tasks: [
          { task: "Tweede maaltijd", tip: "Op een vaste tijd, net als 's ochtends." },
          { task: "Avondwandeling", tip: "Samen met de andere wandelingen kom je op ongeveer 45 tot 60 minuten per dag." },
          TEETH,
          {
            task: "Extra speeltijd tijdens de wandeling",
            tip: "Tijd om te snuffelen en te spelen maakt de wandeling compleet.",
            focus: "beweging",
          },
          {
            task: "Vacht kort doorborstelen",
            tip: "Tijdens de rui dagelijks; anders 2 à 3 keer per week tot op de huid.",
            focus: "vacht",
          },
          {
            task: "Neem rustig de tijd voor het poetsen",
            tip: "Een zachte hondentandenborstel en hondentandpasta, elke dag opnieuw.",
            focus: "tanden",
          },
        ],
      },
      {
        label: "Voor het slapen",
        time: "22:00",
        tasks: [{ task: "Laatste rondje buiten", tip: "Kort en rustig, als afsluiting van de dag." }],
      },
    ],
    weekly: [
      "Borstel de vacht 2 à 3 keer per week met een speldenborstel en een kam, laag voor laag tot op de huid, en tijdens de rui dagelijks.",
      NAILS,
      WASH,
      NO_SHAVE,
    ],
  }),

  senior: () => ({
    moments: [
      {
        label: "Ochtend",
        time: "08:00",
        tasks: [
          { task: "Korte, rustige wandeling met een tuigje", tip: "Kies een rustiger tempo: liever vaker kort wandelen dan één lange wandeling." },
          { task: "Eerste maaltijd", tip: "Geef 2 maaltijden per dag op vaste tijden." },
          EYES,
        ],
      },
      {
        label: "Middag",
        time: "rond 12:30",
        tasks: [
          { task: "Kort rondje buiten", tip: "Vaker kort is prettiger dan één keer lang." },
          { task: "Rustig hersenwerk", tip: "Blijf hersenwerk aanbieden, in een korter en rustiger tempo." },
          {
            task: "Rust op een zachte, warme ligplek",
            tip: "Zorg voor een zachte, warme ligplek en antislipmatjes op gladde vloeren.",
          },
          {
            task: "Een rustig zoekspelletje",
            tip: "Kort en in een rustig tempo blijft hersenwerk leuk.",
            focus: "training",
          },
        ],
      },
      {
        label: "Namiddag",
        time: "rond 16:00",
        tasks: [
          { task: "Nog een korte wandeling", tip: "Houd het tempo rustig en laat je hond het ritme bepalen." },
          {
            task: "Borstelen en je hond goed bekijken",
            tip: "Gebruik het borstelmoment om je hond goed te bekijken; valt je iets op, overleg dan met je dierenarts.",
            focus: "vacht",
          },
          {
            task: "Een extra kort rondje in plaats van een langer stuk",
            tip: "Liever vaker kort wandelen dan één lange wandeling.",
            focus: "beweging",
          },
        ],
      },
      {
        label: "Avond",
        time: "18:00",
        tasks: [
          { task: "Tweede maaltijd", tip: "Op een vaste tijd, net als 's ochtends." },
          TEETH,
          {
            task: "Neem rustig de tijd voor het poetsen",
            tip: "Een zachte hondentandenborstel en hondentandpasta, elke dag opnieuw.",
            focus: "tanden",
          },
        ],
      },
      {
        label: "Voor het slapen",
        time: "21:30",
        tasks: [
          { task: "Laatste korte rondje buiten", tip: "Rustig aan, als afsluiting van de dag." },
          {
            task: "Controleer de ligplek",
            tip: "Zacht en warm ligt het fijnst; antislipmatjes helpen op gladde vloeren.",
            focus: "rust",
          },
        ],
      },
    ],
    weekly: [
      "Borstel de vacht 2 à 3 keer per week met een speldenborstel en een kam, laag voor laag tot op de huid.",
      NAILS,
      WASH,
      NO_SHAVE,
    ],
  }),
};

export function buildCareRoutine(input: {
  ageMonths: number;
  dogName?: string | undefined;
  focus: FocusId[];
}): CareRoutineResult {
  const stage = getAgeStage(input.ageMonths);
  const name = cleanDogName(input.dogName);
  const who = name ?? (stage.id === "pup" ? "je pup" : "je hond");
  const plan = plans[stage.id](who, input.ageMonths);
  const focusLabels = focusOptions.filter((f) => input.focus.includes(f.id)).map((f) => f.label.toLowerCase());

  const moments = plan.moments.map((m) => ({
    label: m.label,
    time: m.time,
    tasks: m.tasks
      .filter((t) => !t.focus || input.focus.includes(t.focus))
      .map(({ task, tip }) => ({ task, tip })),
  }));

  const intro =
    `Een vaste dagindeling geeft ${who} rust en houvast.` +
    (focusLabels.length ? ` In deze routine is extra aandacht voor ${focusLabels.join(", ")}.` : "") +
    " Schuif de tijden gerust op, zolang de volgorde ongeveer gelijk blijft.";

  return {
    stageLabel: `${stage.label} · ${stage.range}`,
    routine: {
      title: name ? `Dagroutine voor ${name}` : `Dagroutine voor je ${stage.id === "pup" ? "pup" : "Pomeranian"}`,
      intro,
      moments,
      weekly: plan.weekly,
      kennelNote: `Veel plezier samen met ${who} — Mitchell & Jill`,
    },
  };
}
