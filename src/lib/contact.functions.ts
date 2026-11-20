import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "@/data/contact";

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true } | { ok: false; error: string }> => {
    // Spam-bot vult het verborgen veld in: doe alsof het gelukt is, maar sla niets op.
    if (data.website) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      message: data.message,
    });
    if (error) {
      console.error("contact insert failed", error.message);
      return { ok: false, error: "Het versturen is niet gelukt. Probeer het later opnieuw of stuur ons een WhatsApp." };
    }
    return { ok: true };
  });
