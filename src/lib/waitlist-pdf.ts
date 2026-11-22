import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import logoUrl from "@/assets/oro-del-amor-logo-nieuw.png";
import { CONTACT_EMAIL, UBN_NUMBER } from "@/data/dogs";
import { waitlistSections, type WaitlistInput } from "@/data/waitlist";

const GOLD = rgb(0.72, 0.56, 0.24);
const INK = rgb(0.1, 0.09, 0.08);
const MUTED = rgb(0.4, 0.37, 0.33);
const BEIGE = rgb(0.97, 0.94, 0.88);

// Standaardfonts kennen alleen WinAnsi-tekens; de rest (emoji e.d.) weglaten.
const clean = (t: string) =>
  t.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF\u2013\u2014\u20AC\u2022]/g, "");

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const out: string[] = [];
  for (const para of clean(text).split(/\r?\n/)) {
    let line = "";
    for (const word of para.split(/\s+/)) {
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

export async function buildWaitlistPdf(data: WaitlistInput): Promise<Blob> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Aanmelding wachtlijst – ${clean(data.fullName)}`);
  doc.setAuthor("Oro Del Amor");
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const italic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  let logo: Awaited<ReturnType<typeof doc.embedPng>> | null = null;
  try {
    logo = await doc.embedPng(await (await fetch(logoUrl)).arrayBuffer());
  } catch {
    logo = null;
  }

  const W = 595.28, H = 841.89, M = 56, labelW = 150;
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;

  const footer = (p: PDFPage) => {
    p.drawLine({ start: { x: M, y: 44 }, end: { x: W - M, y: 44 }, thickness: 0.5, color: GOLD });
    p.drawText(clean(`Oro Del Amor · Pomeranians · ${CONTACT_EMAIL} · UBN ${UBN_NUMBER}`), { x: M, y: 30, size: 9, font: serif, color: MUTED });
  };
  const newPage = () => {
    footer(page);
    page = doc.addPage([W, H]);
    y = H - M;
  };

  // Kop
  page.drawRectangle({ x: 0, y: H - 150, width: W, height: 150, color: BEIGE });
  if (logo) {
    const s = 100 / logo.height;
    page.drawImage(logo, { x: W - M - logo.width * s, y: H - 125, width: logo.width * s, height: 100 });
  }
  page.drawText("ORO DEL AMOR", { x: M, y: H - 70, size: 24, font: bold, color: GOLD });
  page.drawText("Aanmelding wachtlijst", { x: M, y: H - 96, size: 16, font: serif, color: INK });
  const date = new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  page.drawText(clean(`Ingevuld op ${date}`), { x: M, y: H - 116, size: 11, font: italic, color: MUTED });
  y = H - 185;

  for (const section of waitlistSections(data)) {
    if (y < 120) newPage();
    page.drawText(section.title.toUpperCase(), { x: M, y, size: 12, font: bold, color: GOLD });
    y -= 8;
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.75, color: GOLD });
    y -= 18;
    for (const [label, value] of section.rows) {
      const lines = wrap(value, serif, 11, W - 2 * M - labelW);
      for (let i = 0; i < lines.length; i++) {
        if (y < 70) newPage();
        if (i === 0) page.drawText(clean(label), { x: M, y, size: 11, font: bold, color: INK });
        page.drawText(lines[i] ?? "", { x: M + labelW, y, size: 11, font: serif, color: INK });
        y -= 15;
      }
      y -= 5;
    }
    y -= 14;
  }

  if (y < 110) newPage();
  const note = wrap(
    `Bedankt voor je aanmelding! Bewaar deze PDF voor je eigen administratie. Je aanmelding is bij Mitchell en Jill binnengekomen; zij nemen persoonlijk contact met je op. Vragen? Mail naar ${CONTACT_EMAIL}.`,
    italic, 11, W - 2 * M,
  );
  for (const l of note) {
    page.drawText(l, { x: M, y, size: 11, font: italic, color: MUTED });
    y -= 15;
  }
  footer(page);

  const bytes = await doc.save();
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
