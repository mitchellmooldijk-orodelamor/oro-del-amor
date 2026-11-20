// Contactformulier: velden en controles, gedeeld door het formulier (browser) en de server.
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Vul je naam in.").max(100, "Je naam is te lang."),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(255),
  message: z.string().trim().min(1, "Schrijf een bericht.").max(2000, "Je bericht is te lang (maximaal 2000 tekens)."),
  /** Verborgen veld tegen spam; mensen laten het leeg. */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
