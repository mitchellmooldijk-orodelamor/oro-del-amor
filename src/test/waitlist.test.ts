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
  petSitter: "Opa en oma passen op.",
  careCosts: "Trimmen, borstels en een verzekering.",
  pedigreeWhy: "Gezondheid en rastypische eigenschappen.",
  contractAware: true,
  keepContact: true,
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

describe("wachtlijst-pdf", () => {
  it("puts every answer in the PDF sections", async () => {
    const { waitlistSections, waitlistPdfFilename } = await import("@/data/waitlist");
    const data = waitlistSchema.parse(valid);
    const rows = Object.fromEntries(waitlistSections(data).flatMap((s) => s.rows));
    expect(rows["Naam"]).toBe("Test Persoon");
    expect(rows["Waarom een Pomeranian"]).toBe("Omdat we dol zijn op het ras.");
    expect(rows["Tuin"]).toBe("Ja");
    expect(waitlistPdfFilename(data)).toBe("aanmelding-wachtlijst-oro-del-amor-test-persoon.pdf");
  });
});

describe("wachtlijst-opslag", () => {
  it("stores a new application with status nieuw and empty optionals as null", async () => {
    const { toWaitlistRow } = await import("@/lib/waitlist-save");
    const row = toWaitlistRow(waitlistSchema.parse({ ...valid, email: "Test@Example.com", phone: "" }));
    expect(row.status).toBe("nieuw");
    expect(row.consent).toBe(true);
    expect(row.email).toBe("test@example.com");
    expect(row.phone).toBeNull();
  });

  it("requires the new questions about oppas, kosten, stamboom, contract and contact", () => {
    for (const key of ["petSitter", "careCosts", "pedigreeWhy", "contractAware", "keepContact"] as const) {
      const { [key]: _omit, ...rest } = valid;
      expect(waitlistSchema.safeParse(rest).success, key).toBe(false);
    }
  });

  it("keeps the reason for reu/teef optional", () => {
    expect(waitlistSchema.safeParse({ ...valid, sexReason: "" }).success).toBe(true);
  });
});
