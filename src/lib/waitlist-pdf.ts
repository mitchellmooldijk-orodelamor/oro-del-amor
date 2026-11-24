import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import logoUrl from "@/assets/oro-del-amor-logo-pdf.jpg";
import { CONTACT_EMAIL, PHONE_DISPLAY, UBN_NUMBER } from "@/data/dogs";
import { waitlistSections, type WaitlistInput } from "@/data/waitlist";

const GOLD = rgb(0.72, 0.56, 0.24);
const INK = rgb(0.1, 0.09, 0.08);
const MUTED = rgb(0.4, 0.37, 0.33);
const BEIGE = rgb(0.97, 0.94, 0.88);
const BLACK = rgb(0, 0, 0);
const GOLD_DEEP = rgb(0.55, 0.41, 0.13);
const GOLD_LIGHT = rgb(0.86, 0.7, 0.36);

// Standaardfonts kennen alleen WinAnsi-tekens; de rest (emoji e.d.) weglaten.
const clean = (t: string) =>
  t.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF\u2013\u2014\u20AC\u2022]/g, "");

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const out: string[] = [];
  for (const para of clean(text).split(/\r?\n/)) {
    let line = "";
    for (let word of para.split(/\s+/)) {
      // Een woord dat breder is dan de regel (bv. een lange link) in stukken breken.
      while (font.widthOfTextAtSize(word, size) > width && word.length > 1) {
        let n = word.length - 1;
        while (n > 1 && font.widthOfTextAtSize(word.slice(0, n), size) > width) n--;
        if (line) out.push(line);
        line = "";
        out.push(word.slice(0, n));
        word = word.slice(n);
      }
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) <= width) line = test;
      else {
        if (line) out.push(line);
        line = word;
      }
    }
    out.push(line);
  }
  return out;
}

const PHONE_PDF = PHONE_DISPLAY.replace(/^06/, "(06)");

/** Voorblad van de PDF: eerste regel is de bedankzin, daarna de alinea's. */
export const WAITLIST_INTRO = [
  "Bedankt voor het invullen van ons aanmeldformulier.",
  "Wij gaan zorgvuldig om met het selecteren van de juiste gezinnen bij de juiste pups. Na het invullen van het formulier nemen wij contact met je op om eventueel een gesprek bij ons thuis in te plannen.",
  "Het invullen van dit formulier geeft geen garantie op het definitief plaatsen van een pup. Ook kan het voorkomen dat je wensen uiteindelijk niet de gewenste pup opleveren: wij kunnen het geslacht, de kleuren en het aantal pups dat geboren wordt niet vooraf bepalen.",
];
export const WAITLIST_CLOSING =
  "Bedankt voor het invullen van het formulier! Wij nemen zo snel mogelijk contact met je op. Mocht je geen reactie van ons ontvangen, stuur ons dan even een WhatsApp om te controleren of het formulier goed is aangekomen.";

/** Bouwt de PDF: voorblad met logo en introductie, vanaf pagina 2 de vragen met antwoorden, afgesloten met een dankblok. */
export async function buildWaitlistPdfBytes(data: WaitlistInput, logoBytes: ArrayBuffer | Uint8Array | null): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Aanmelding wachtlijst – ${clean(data.fullName)}`);
  doc.setAuthor("Oro Del Amor");
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const italic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  let logo: Awaited<ReturnType<typeof doc.embedJpg>> | null = null;
  try {
    logo = logoBytes ? await doc.embedJpg(logoBytes) : null;
  } catch {
    logo = null;
  }

  const W = 595.28, H = 841.89, M = 56, CW = W - 2 * M;
  const name = clean(data.fullName);
  const date = new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  const centered = (p: PDFPage, text: string, y: number, size: number, font: PDFFont, color = INK) =>
    p.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

  // Pagina 1: voorblad
  const cover = doc.addPage([W, H]);
  const bandH = 400;
  cover.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: BLACK });
  cover.drawRectangle({ x: 0, y: H - bandH - 3, width: W, height: 3, color: GOLD });
  if (logo) cover.drawImage(logo, { x: (W - 350) / 2, y: H - bandH + 25, width: 350, height: 350 });
  else centered(cover, "ORO DEL AMOR", H - bandH / 2, 34, bold, GOLD);
  let cy = H - bandH - 52;
  centered(cover, "AANMELDING WACHTLIJST", cy, 22, bold, GOLD);
  cy -= 26;
  centered(cover, name, cy, 15, serif);
  cy -= 18;
  centered(cover, clean(`Ingevuld op ${date}`), cy, 11, italic, MUTED);
  cy -= 20;
  cover.drawLine({ start: { x: W / 2 - 45, y: cy }, end: { x: W / 2 + 45, y: cy }, thickness: 0.75, color: GOLD });
  cy -= 30;
  WAITLIST_INTRO.forEach((para, i) => {
    const font = i === 0 ? italic : serif;
    const size = i === 0 ? 15 : 12.5;
    for (const l of wrap(para, font, size, CW - 40)) {
      centered(cover, l, cy, size, font, i === 0 ? GOLD_DEEP : INK);
      cy -= i === 0 ? 22 : 18;
    }
    cy -= i === 0 ? 8 : 10;
  });

  // Pagina 2 en verder: vragen met antwoorden, vraag boven antwoord
  let page: PDFPage = cover;
  let y = 0;
  const newPage = () => {
    page = doc.addPage([W, H]);
    page.drawText("ORO DEL AMOR", { x: M, y: H - 46, size: 11, font: bold, color: GOLD });
    const right = `Aanmelding wachtlijst · ${name}`;
    page.drawText(right, { x: W - M - italic.widthOfTextAtSize(right, 10), y: H - 46, size: 10, font: italic, color: MUTED });
    page.drawLine({ start: { x: M, y: H - 56 }, end: { x: W - M, y: H - 56 }, thickness: 0.75, color: GOLD });
    y = H - 92;
  };
  newPage();

  for (const section of waitlistSections(data)) {
    if (y < 170) newPage();
    page.drawRectangle({ x: M, y: y - 8, width: CW, height: 24, color: BEIGE });
    page.drawRectangle({ x: M, y: y - 8, width: 3, height: 24, color: GOLD });
    page.drawText(clean(section.title.toUpperCase()), { x: M + 14, y, size: 11.5, font: bold, color: GOLD_DEEP });
    y -= 32;
    for (const [label, value] of section.rows) {
      const lines = wrap(value, serif, 11.5, CW - 14);
      if (y < 100) newPage();
      page.drawText(clean(label), { x: M + 14, y, size: 9.5, font: bold, color: GOLD_DEEP });
      y -= 15;
      for (const line of lines) {
        if (y < 70) newPage();
        page.drawText(line, { x: M + 14, y, size: 11.5, font: serif, color: INK });
        y -= 15;
      }
      y -= 7;
    }
    y -= 12;
  }

  // Afsluitend dankblok in dezelfde stijl als het voorblad
  const pad = 24, logoS = logo ? 96 : 0;
  const textW = CW - 2 * pad - (logo ? logoS + 16 : 0);
  const closing = wrap(WAITLIST_CLOSING, italic, 12, textW);
  const blockH = pad * 2 + closing.length * 16 + 14 + 16 + 26 + 20 + 12;
  if (y - blockH < 64) newPage();
  const top = y + 6;
  page.drawRectangle({ x: M, y: top - blockH, width: CW, height: blockH, color: BLACK });
  page.drawRectangle({ x: M, y: top - 2, width: CW, height: 2, color: GOLD });
  page.drawRectangle({ x: M, y: top - blockH, width: CW, height: 2, color: GOLD });
  if (logo) page.drawImage(logo, { x: W - M - pad - logoS, y: top - blockH / 2 - logoS / 2, width: logoS, height: logoS });
  let ty = top - pad - 12;
  for (const l of closing) {
    page.drawText(l, { x: M + pad, y: ty, size: 12, font: italic, color: BEIGE });
    ty -= 16;
  }
  ty -= 14;
  page.drawText("Met vriendelijke groet,", { x: M + pad, y: ty, size: 12, font: serif, color: BEIGE });
  ty -= 26;
  page.drawText("Mitchell & Jill", { x: M + pad, y: ty, size: 16, font: bold, color: GOLD_LIGHT });
  ty -= 20;
  page.drawText(clean(PHONE_PDF), { x: M + pad, y: ty, size: 12, font: serif, color: BEIGE });

  // Voettekst met paginanummer op elke pagina
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: 44 }, end: { x: W - M, y: 44 }, thickness: 0.5, color: GOLD });
    p.drawText(clean(`Oro Del Amor · Pomeranians · ${CONTACT_EMAIL} · UBN ${UBN_NUMBER}`), { x: M, y: 30, size: 9, font: serif, color: MUTED });
    const nr = `Pagina ${i + 1} van ${pages.length}`;
    p.drawText(nr, { x: W - M - serif.widthOfTextAtSize(nr, 9), y: 30, size: 9, font: serif, color: MUTED });
  });

  return doc.save();
}

export async function buildWaitlistPdf(data: WaitlistInput): Promise<Blob> {
  let logoBytes: ArrayBuffer | null = null;
  try {
    const res = await fetch(logoUrl);
    logoBytes = res.ok ? await res.arrayBuffer() : null;
  } catch {
    logoBytes = null;
  }
  const bytes = await buildWaitlistPdfBytes(data, logoBytes);
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/** Stuurt de PDF als bijlage naar de kennel (Netlify-functie met Strato-mail). Mislukken is stil: de aanmelding is al opgeslagen. */
export async function mailWaitlistPdf(blob: Blob, filename: string, data: WaitlistInput): Promise<boolean> {
  try {
    const buf = new Uint8Array(await blob.arrayBuffer());
    let bin = "";
    for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    const text = waitlistSections(data)
      .map((s) => `${s.title.toUpperCase()}\n${s.rows.map(([l, v]) => `${l}: ${v}`).join("\n")}`)
      .join("\n\n");
    const res = await fetch("/.netlify/functions/waitlist-mail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: data.fullName, email: data.email, filename, pdf: btoa(bin), text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
