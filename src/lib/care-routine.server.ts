import { GatewayError, PaymentRequiredError, RateLimitError, generateResponse } from "@lovable.dev/ai-gateway";
import { z } from "zod";
import { generalCareTips, getAgeStage, focusOptions, type FocusId } from "@/data/care";

const routineSchema = z.object({
  title: z.string(),
  intro: z.string(),
  moments: z
    .array(
      z.object({
        label: z.string(),
        time: z.string(),
        tasks: z.array(z.object({ task: z.string(), tip: z.string() })),
      }),
    )
    .min(1),
  weekly: z.array(z.string()),
  kennelNote: z.string(),
});

export type CareRoutine = z.infer<typeof routineSchema>;

export type CareRoutineResult =
  | { ok: true; stageLabel: string; routine: CareRoutine }
  | { ok: false; error: string };

const jsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "intro", "moments", "weekly", "kennelNote"],
  properties: {
    title: { type: "string" },
    intro: { type: "string" },
    moments: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["label", "time", "tasks"],
        properties: {
          label: { type: "string" },
          time: { type: "string" },
          tasks: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["task", "tip"],
              properties: { task: { type: "string" }, tip: { type: "string" } },
            },
          },
        },
      },
    },
    weekly: { type: "array", items: { type: "string" } },
    kennelNote: { type: "string" },
  },
} as const;

const INSTRUCTIONS = `Je bent de verzorgingshulp van kennel Oro Del Amor (Pomeranians), een gezin uit Nieuwerkerk aan den IJssel.
Je stelt een praktische dagelijkse verzorgingsroutine op in het Nederlands, warm en persoonlijk van toon (spreek de lezer aan met "je").

Strikte regels:
- Gebruik UITSLUITEND de verzorgingstips van de kennel die je krijgt. Verzin geen nieuwe adviezen, getallen of producten.
- Geef GEEN medisch advies: geen diagnoses, ziektes, symptomen, medicijnen, supplementen, doseringen, vaccinatie- of ontwormingsschema's en geen voerhoeveelheden in grammen.
- Gaat iets over gezondheid, verwijs dan alleen naar de eigen dierenarts.
- Verdeel de dag in 3 tot 5 momenten (bijvoorbeeld Ochtend, Middag, Namiddag, Avond, Voor het slapen) met een globale tijd zoals "07:30" of "rond 12:00".
- Elk moment heeft 1 tot 4 korte taken; "tip" is één korte zin met uitleg waarom.
- "weekly" bevat 2 tot 4 taken die niet dagelijks hoeven (zoals nagels of wassen).
- "kennelNote" is één warme afsluitende zin namens Mitchell en Jill.
- Geef extra aandacht aan de gekozen aandachtspunten, maar blijf binnen de tips.`;

function cleanName(name: string | undefined): string | null {
  const cleaned = (name ?? "").replace(/[^\p{L}\p{N} '-]/gu, "").trim().slice(0, 30);
  return cleaned.length ? cleaned : null;
}

function describeAge(months: number): string {
  if (months < 12) return `${months} maanden`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1 jaar" : `${years} jaar`;
}

export async function createCareRoutine(input: {
  ageMonths: number;
  dogName?: string | undefined;
  focus: FocusId[];
}): Promise<CareRoutineResult> {
  const stage = getAgeStage(input.ageMonths);
  const name = cleanName(input.dogName);
  const focusLabels = focusOptions.filter((f) => input.focus.includes(f.id)).map((f) => f.label);

  const userMessage = [
    `Leeftijd van de Pomeranian: ${describeAge(input.ageMonths)} (levensfase: ${stage.label}, ${stage.range}).`,
    name ? `Naam van de hond: ${name}.` : "De naam van de hond is niet opgegeven.",
    focusLabels.length ? `Gekozen aandachtspunten: ${focusLabels.join(", ")}.` : "Geen extra aandachtspunten gekozen.",
    "",
    `Verzorgingstips van de kennel voor deze levensfase:`,
    ...stage.tips.map((t) => `- ${t}`),
    "",
    "Verzorgingstips van de kennel voor iedere leeftijd:",
    ...generalCareTips.map((t) => `- ${t}`),
    "",
    "Maak hiermee de dagelijkse routine. Return JSON.",
  ].join("\n");

  try {
    const response = await generateResponse({
      model: "openai/gpt-6-astra",
      instructions: INSTRUCTIONS,
      input: [{ role: "user", content: userMessage }],
      reasoning: { effort: "low" },
      text: { format: { type: "json_schema", name: "verzorgingsroutine", strict: true, schema: jsonSchema } },
    });

    let text = "";
    for (const item of response.output ?? []) {
      if (item.type !== "message") continue;
      for (const part of item.content) if (part.type === "output_text") text += part.text;
    }
    const parsed = routineSchema.safeParse(JSON.parse(text || "null"));
    if (!parsed.success) {
      console.error("care routine: unexpected AI output", parsed.error.message);
      return { ok: false, error: "Het lukte niet om een routine te maken. Probeer het nog eens." };
    }
    return { ok: true, stageLabel: `${stage.label} · ${stage.range}`, routine: parsed.data };
  } catch (error) {
    if (error instanceof GatewayError) {
      console.error("care routine: gateway error", error.code, error.httpStatus, error.ids);
      if (error instanceof RateLimitError) {
        return { ok: false, error: "Het is even erg druk. Probeer het over een minuutje opnieuw." };
      }
      if (error instanceof PaymentRequiredError) {
        return { ok: false, error: "De verzorgingshulp is tijdelijk niet beschikbaar. Probeer het later opnieuw." };
      }
    } else {
      console.error("care routine: failed", error);
    }
    return { ok: false, error: "Er ging iets mis bij het maken van de routine. Probeer het later opnieuw." };
  }
}
