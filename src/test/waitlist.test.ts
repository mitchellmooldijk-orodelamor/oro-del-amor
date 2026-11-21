import { describe, expect, it } from "vitest";
import { waitlistSchema } from "@/data/waitlist";

const valid = {
  fullName: "Test Persoon",
  email: "test@example.com",
  city: "Gouda",
  housing: "Tussenwoning",
  hasGarden: true,
  household: "2 volwassenen",
  hoursAlone: "Minder dan 2 uur per dag",
  experience: "Eerder een hond gehad",
  sexPreference: "Geen voorkeur",
  motivation: "Omdat we dol zijn op het ras.",
  puppyCourse: true,
  consent: true,
};

describe("wachtlijst-vragenlijst", () => {
  it("accepts a complete application", () => {
    expect(waitlistSchema.safeParse(valid).success).toBe(true);
  });

  it("requires permission to store the answers", () => {
    expect(waitlistSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("requires a valid e-mail address", () => {
    expect(waitlistSchema.safeParse({ ...valid, email: "geen-email" }).success).toBe(false);
  });

  it("requires woonsituatie, leefritme and ervaring", () => {
    for (const key of ["housing", "hoursAlone", "experience", "household"] as const) {
      const { [key]: _omit, ...rest } = valid;
      expect(waitlistSchema.safeParse(rest).success, key).toBe(false);
    }
  });
});

describe("wachtlijst-mail", () => {
  it("opens a mail to info@orodelamorpoms.nl with the answers", async () => {
    const { buildWaitlistMailto } = await import("@/data/waitlist");
    const { CONTACT_EMAIL } = await import("@/data/dogs");
    const url = buildWaitlistMailto(waitlistSchema.parse(valid), CONTACT_EMAIL);
    expect(url.startsWith("mailto:info@orodelamorpoms.nl?")).toBe(true);
    const body = decodeURIComponent(url.split("&body=")[1] ?? "");
    expect(body).toContain("Naam: Test Persoon");
    expect(body).toContain("Waarom een Pomeranian: Omdat we dol zijn op het ras.");
  });
});
