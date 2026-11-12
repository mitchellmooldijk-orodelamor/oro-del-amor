import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { FOCUS_IDS, MAX_AGE_MONTHS, MIN_AGE_MONTHS } from "@/data/care";

const inputSchema = z.object({
  ageMonths: z.number().int().min(MIN_AGE_MONTHS).max(MAX_AGE_MONTHS),
  dogName: z.string().max(30).optional(),
  focus: z.array(z.enum(FOCUS_IDS)).max(FOCUS_IDS.length),
});

export const generateCareRoutine = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { createCareRoutine } = await import("./care-routine.server");
    return createCareRoutine(data);
  });
