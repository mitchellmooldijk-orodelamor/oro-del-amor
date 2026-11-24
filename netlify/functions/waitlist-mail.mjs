// Stuurt een wachtlijst-aanmelding (PDF-bijlage) naar de kennel via de Strato-mailserver.
// Draait als Netlify-functie; SMTP_HOST, SMTP_PORT, SMTP_USER en SMTP_PASS staan in Netlify.
// De kennel krijgt de aanmelding; de aanmelder krijgt een bevestiging met dezelfde PDF.
// Tegen misbruik: de bevestiging heeft een vaste tekst, alleen een echte PDF mag mee en
// de naam in de aanhef wordt opgeschoond.
import nodemailer from "nodemailer";

const TO = "info@orodelamorpoms.nl";
const MAX_PDF_BASE64 = 3_000_000;
const PHONE = "(06) 16 19 11 98";

/** Vaste tekst van de bevestiging aan de aanmelder. */
export const confirmationText = (greetingName) =>
  `Beste ${greetingName},

Bedankt voor het invullen van ons aanmeldformulier. Je aanmelding voor de wachtlijst is bij ons binnengekomen.

Wij gaan zorgvuldig om met het selecteren van de juiste gezinnen bij de juiste pups. Wij nemen zo snel mogelijk contact met je op om eventueel een gesprek bij ons thuis in te plannen. Het invullen van het formulier geeft geen garantie op het definitief plaatsen van een pup.

In de bijlage vind je jouw ingevulde formulier als PDF. Bewaar deze goed. Mocht je geen reactie van ons ontvangen, stuur ons dan even een WhatsApp of stuur deze mail met de PDF naar ons door, zodat we kunnen controleren of je aanmelding goed is aangekomen.

Met vriendelijke groet,

Mitchell & Jill
Oro Del Amor Pomeranians
${PHONE}
${TO}`;

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return json(405, { ok: false });
  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false });
  }
  const { name, email, filename, pdf, text } = body ?? {};
  const str = (v, max) => typeof v === "string" && v.length > 0 && v.length <= max;
  if (!str(name, 100) || !str(email, 200) || !str(pdf, MAX_PDF_BASE64) || !str(text, 20000)) return json(400, { ok: false });
  if (!/^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]+$/.test(email)) return json(400, { ok: false });
  // Alleen een echte PDF ("%PDF-" in base64) mag als bijlage mee.
  if (!pdf.startsWith("JVBERi0")) return json(400, { ok: false });
  const safeName = typeof filename === "string" && /^[a-z0-9-]{1,120}\.pdf$/.test(filename) ? filename : "aanmelding-wachtlijst.pdf";

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return json(500, { ok: false, error: "mail not configured" });
  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  const attachments = [{ filename: safeName, content: pdf, encoding: "base64", contentType: "application/pdf" }];
  try {
    await transport.sendMail({
      from: `"Oro Del Amor website" <${SMTP_USER}>`,
      to: TO,
      replyTo: email,
      subject: `Nieuwe wachtlijst-aanmelding: ${name.replace(/[\r\n]/g, " ")}`,
      text: `Nieuwe aanmelding voor de wachtlijst via de website.\n\n${text}\n\nDe volledige vragenlijst zit als PDF in de bijlage. Beantwoorden van deze mail gaat naar ${email}.`,
      attachments,
    });
  } catch (e) {
    console.error("waitlist mail failed", e?.message);
    return json(502, { ok: false });
  }

  // Bevestiging aan de aanmelder; mislukt die, dan is de aanmelding zelf toch binnen.
  let confirmation = true;
  try {
    const greetingName = name.replace(/[^\p{L}\p{M} .'-]/gu, "").trim().slice(0, 60) || "aanmelder";
    await transport.sendMail({
      from: `"Oro Del Amor Pomeranians" <${SMTP_USER}>`,
      to: email,
      replyTo: TO,
      subject: "Bevestiging van je aanmelding voor de wachtlijst - Oro Del Amor Pomeranians",
      text: confirmationText(greetingName),
      attachments,
    });
  } catch (e) {
    confirmation = false;
    console.error("waitlist confirmation failed", e?.message);
  }
  return json(200, { ok: true, confirmation });
};
