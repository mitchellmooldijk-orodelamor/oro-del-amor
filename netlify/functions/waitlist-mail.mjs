// Stuurt een wachtlijst-aanmelding (PDF-bijlage) naar de kennel via de Strato-mailserver.
// Draait als Netlify-functie; SMTP_HOST, SMTP_PORT, SMTP_USER en SMTP_PASS staan in Netlify.
// Ontvanger staat vast, zodat deze functie niet als open mailrelay misbruikt kan worden.
import nodemailer from "nodemailer";

const TO = "info@orodelamorpoms.nl";
const MAX_PDF_BASE64 = 3_000_000;

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { ok: false });
  const safeName = typeof filename === "string" && /^[a-z0-9-]{1,120}\.pdf$/.test(filename) ? filename : "aanmelding-wachtlijst.pdf";

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return json(500, { ok: false, error: "mail not configured" });
  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  try {
    await transport.sendMail({
      from: `"Oro Del Amor website" <${SMTP_USER}>`,
      to: TO,
      replyTo: email,
      subject: `Nieuwe wachtlijst-aanmelding: ${name.replace(/[\r\n]/g, " ")}`,
      text: `Nieuwe aanmelding voor de wachtlijst via de website.\n\n${text}\n\nDe volledige vragenlijst zit als PDF in de bijlage. Beantwoorden van deze mail gaat naar ${email}.`,
      attachments: [{ filename: safeName, content: pdf, encoding: "base64", contentType: "application/pdf" }],
    });
    return json(200, { ok: true });
  } catch (e) {
    console.error("waitlist mail failed", e?.message);
    return json(502, { ok: false });
  }
};
