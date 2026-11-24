import { describe, expect, it, vi } from "vitest";
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

describe("wachtlijst-pdf opmaak", () => {
  it("starts with a cover page, puts the answers from page 2 and stays small enough to mail", async () => {
    const { readFileSync } = await import("node:fs");
    const { PDFDocument } = await import("pdf-lib");
    const { buildWaitlistPdfBytes } = await import("@/lib/waitlist-pdf");
    const logo = new Uint8Array(readFileSync("src/assets/oro-del-amor-logo-pdf.jpg"));
    const bytes = await buildWaitlistPdfBytes(waitlistSchema.parse(valid), logo);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(2);
    // De mailfunctie accepteert maximaal 3.000.000 base64-tekens.
    expect(Math.ceil(bytes.length / 3) * 4).toBeLessThan(3_000_000);
  });
});

describe("wachtlijst-mail", () => {
  const post = (body: unknown) =>
    new Request("https://orodelamorpoms.nl/.netlify/functions/waitlist-mail", { method: "POST", body: JSON.stringify(body) });
  const payload = {
    name: "Test Persoon",
    email: "test@example.com",
    filename: "aanmelding-wachtlijst-oro-del-amor-test-persoon.pdf",
    pdf: btoa("%PDF-1.7 test"),
    text: "Naam: Test Persoon",
  };

  it("mails the PDF to the kennel and a confirmation with the same PDF to the applicant", async () => {
    vi.resetModules();
    const sendMail = vi.fn(async (_mail: { to: string; replyTo: string; text: string; attachments: { content: string }[] }) => ({}));
    vi.doMock("nodemailer", () => ({ default: { createTransport: () => ({ sendMail }) } }));
    vi.stubEnv("SMTP_HOST", "smtp.example.com");
    vi.stubEnv("SMTP_USER", "info@orodelamorpoms.nl");
    vi.stubEnv("SMTP_PASS", "x");
    // @ts-expect-error Netlify-functie is gewoon JavaScript
    const { default: handler } = await import("../../netlify/functions/waitlist-mail.mjs");

    const res: Response = await handler(post(payload));
    expect(await res.json()).toEqual({ ok: true, confirmation: true });
    expect(sendMail).toHaveBeenCalledTimes(2);
    const kennel = sendMail.mock.calls[0]?.[0];
    const applicant = sendMail.mock.calls[1]?.[0];
    expect(kennel?.to).toBe("info@orodelamorpoms.nl");
    expect(applicant?.to).toBe("test@example.com");
    expect(applicant?.replyTo).toBe("info@orodelamorpoms.nl");
    expect(applicant?.attachments[0]?.content).toBe(payload.pdf);
    expect(applicant?.text).toContain("Mitchell & Jill");
    expect(applicant?.text).toContain("(06) 16 19 11 98");

    // Geen PDF of meerdere ontvangers: er gaat niets de deur uit.
    sendMail.mockClear();
    expect((await handler(post({ ...payload, pdf: btoa("<html>spam</html>") }))).status).toBe(400);
    expect((await handler(post({ ...payload, email: "a@example.com,b@example.com" }))).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
    vi.doUnmock("nodemailer");
  });
});
