import { createServerFn } from "@tanstack/react-start";
import { waitlistSchema } from "@/data/waitlist";

export const submitWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => waitlistSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true } | { ok: false; error: string }> => {
    // Spam-bot vult het verborgen veld in: doe alsof het gelukt is, maar sla niets op.
    if (data.website) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const empty = (v: string | undefined) => (v && v.trim() ? v.trim() : null);
    const { error } = await supabaseAdmin.from("waitlist_applications").insert({
      full_name: data.fullName,
      email: data.email.toLowerCase(),
      phone: empty(data.phone),
      city: data.city,
      housing: data.housing,
      has_garden: data.hasGarden,
      household: data.household,
      other_pets: empty(data.otherPets),
      hours_alone: data.hoursAlone,
      daily_rhythm: empty(data.dailyRhythm),
      experience: data.experience,
      sex_preference: data.sexPreference,
      color_preference: empty(data.colorPreference),
      timeframe: empty(data.timeframe),
      motivation: data.motivation,
      puppy_course: data.puppyCourse,
      consent: data.consent,
    });
    if (error) {
      console.error("waitlist insert failed", error.message);
      return { ok: false, error: "Het versturen is niet gelukt. Probeer het later opnieuw of stuur ons een WhatsApp." };
    }
    return { ok: true };
  });
