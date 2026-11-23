// Vragenlijst voor de wachtlijst. Gedeeld door het formulier (browser) en de server.
import { z } from "zod";

export const housingOptions = ["Appartement", "Tussenwoning", "Hoekwoning", "Twee-onder-een-kap", "Vrijstaand", "Anders"] as const;
export const hoursAloneOptions = [
  "Bijna nooit alleen",
  "Minder dan 2 uur per dag",
  "2 tot 4 uur per dag",
  "Meer dan 4 uur per dag",
] as const;
export const experienceOptions = [
  "Nog geen ervaring met honden",
  "Eerder een hond gehad",
  "Nu een hond in huis",
  "Ervaring met Pomeranians of keeshonden",
] as const;
export const sexOptions = ["Geen voorkeur", "Reu", "Teef"] as const;

const required = (label: string, max = 120) =>
  z.string().trim().min(1, `Vul ${label} in.`).max(max, `${label} is te lang.`);
const optional = (max = 300) => z.string().trim().max(max).optional().or(z.literal(""));

export const waitlistSchema = z.object({
  fullName: required("je naam", 100),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(200),
  phone: optional(30),
  city: required("je woonplaats", 100),
  housing: z.enum(housingOptions, { errorMap: () => ({ message: "Kies je type woning." }) }),
  hasGarden: z.boolean(),
  household: required("je gezinssamenstelling", 500),
  otherPets: optional(300),
  hoursAlone: z.enum(hoursAloneOptions, { errorMap: () => ({ message: "Kies hoe lang de pup alleen is." }) }),
  dailyRhythm: optional(800),
  petSitter: required("wie er oppast en waar de pup heen gaat bij vakantie", 1000),
  experience: z.enum(experienceOptions, { errorMap: () => ({ message: "Kies je ervaring met honden." }) }),
  sexPreference: z.enum(sexOptions),
  sexReason: optional(1000),
  colorPreference: optional(100),
  timeframe: optional(100),
  motivation: required("waarom je voor een Pomeranian kiest", 2000),
  puppyCourse: z.boolean(),
  careCosts: required("wat je weet over de kosten van verzorging en verzekering", 1500),
  pedigreeWhy: required("waarom fokken met FCI-stamboom en geteste ouders belangrijk is", 1500),
  contractAware: z.boolean(),
  keepContact: z.boolean(),
  consent: z.literal(true, { errorMap: () => ({ message: "Geef toestemming om je gegevens te bewaren." }) }),
  /** Verborgen veld tegen spam; mensen laten het leeg. */
  website: z.string().max(200).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

const yesNo = (v: boolean) => (v ? "Ja" : "Nee");
const orDash = (v: string | undefined) => (v && v.trim() ? v.trim() : "—");

export type WaitlistSection = { title: string; rows: [string, string][] };

/** Alle antwoorden per onderdeel; gebruikt voor de PDF. */
export function waitlistSections(data: WaitlistInput): WaitlistSection[] {
  return [
    { title: "Over mij", rows: [["Naam", data.fullName], ["Woonplaats", data.city], ["E-mailadres", data.email], ["Telefoon", orDash(data.phone)]] },
    { title: "Woonsituatie", rows: [["Type woning", data.housing], ["Tuin", yesNo(data.hasGarden)], ["Wie wonen er in huis", data.household], ["Andere huisdieren", orDash(data.otherPets)]] },
    { title: "Leefritme", rows: [["Pup alleen thuis", data.hoursAlone], ["Een gewone dag", orDash(data.dailyRhythm)], ["Oppas en vakantie", data.petSitter]] },
    {
      title: "Ervaring & wensen",
      rows: [
        ["Ervaring met honden", data.experience],
        ["Voorkeur reu of teef", data.sexPreference],
        ["Waarom die voorkeur, hoe zwaar weegt het", orDash(data.sexReason)],
        ["Voorkeur kleur", orDash(data.colorPreference)],
        ["Wanneer een pup", orDash(data.timeframe)],
        ["Waarom een Pomeranian", data.motivation],
        ["Puppycursus volgen", yesNo(data.puppyCourse)],
      ],
    },
    {
      title: "Verzorging & afspraken",
      rows: [
        ["Kosten verzorging en verzekering", data.careCosts],
        ["Waarom NKC-rasstandaard en FCI-stamboom", data.pedigreeWhy],
        ["Bewust van bindend koopcontract", yesNo(data.contractAware)],
        ["Bereid contact te houden", yesNo(data.keepContact)],
      ],
    },
  ];
}

export function waitlistPdfFilename(data: WaitlistInput): string {
  const slug = data.fullName.normalize("NFD").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "aanmelding";
  return `aanmelding-wachtlijst-oro-del-amor-${slug}.pdf`;
}
