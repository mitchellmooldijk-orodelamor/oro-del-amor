// Slaat een wachtlijst-aanmelding op vanuit de browser. Werkt op elke hosting (ook Netlify),
// omdat er geen eigen serverfunctie of geheime sleutel nodig is. De database staat alleen
// toevoegen toe; bezoekers kunnen aanmeldingen niet lezen, wijzigen of verwijderen.
import { supabase } from "@/integrations/supabase/client";
import type { WaitlistInput } from "@/data/waitlist";

const empty = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

export function toWaitlistRow(data: WaitlistInput) {
  return {
    full_name: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: empty(data.phone),
    city: data.city.trim(),
    housing: data.housing,
    has_garden: data.hasGarden,
    household: data.household.trim(),
    other_pets: empty(data.otherPets),
    hours_alone: data.hoursAlone,
    daily_rhythm: empty(data.dailyRhythm),
    experience: data.experience,
    sex_preference: data.sexPreference,
    color_preference: empty(data.colorPreference),
    timeframe: empty(data.timeframe),
    motivation: data.motivation.trim(),
    puppy_course: data.puppyCourse,
    consent: data.consent,
    status: "nieuw",
  };
}

export async function saveWaitlist(data: WaitlistInput): Promise<void> {
  const { error } = await supabase.from("waitlist_applications").insert(toWaitlistRow(data));
  if (error) {
    console.error("waitlist insert failed", error.message);
    throw new Error(error.message);
  }
}
