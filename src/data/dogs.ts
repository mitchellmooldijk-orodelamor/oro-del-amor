import nachoImg from "@/assets/nacho-dekreu-profiel.png.asset.json";
import lunaImg from "@/assets/luna-profiel.png.asset.json";

export type Dog = {
  slug: string;
  name: string;
  role: string;
  color: string;
  /** Officiële kennel van herkomst, getoond bij de foto. */
  origin: string;
  tagline: string;
  image: string;
  facts: { label: string; value: string }[];
  description: string;
};

export const dogs: Dog[] = [
  {
    slug: "nacho",
    name: "Nacho",
    role: "Dekreu",
    color: "Black & tan",
    origin: "Corazón de la Vida",
    tagline: "Compact, kleine bouw — lief, speels karakter",
    image: nachoImg.url,
    facts: [
      { label: "Geslacht", value: "Reu" },
      { label: "Geboortedatum", value: "02-01-2026" },
      { label: "Gewicht", value: "2,5 kg" },
      { label: "Schofthoogte", value: "25 cm" },
      { label: "Stamboom", value: "FCI (Corazón de la Vida)" },
      { label: "Gezondheid", value: "Getest op patella en SM/CM" },
    ],
    description:
      "Nacho is onze trotse black-tan reu met een prachtige, volle vacht en een compacte bouw. Speels, nieuwsgierig en vol liefde — precies het karakter dat wij in onze lijn willen doorgeven.",
  },
  {
    slug: "luna",
    name: "Luna",
    role: "Moeder",
    color: "Cream",
    origin: "Poms Jewels of my heart",
    tagline: "A sweet little girl with a big heart",
    image: lunaImg.url,
    facts: [
      { label: "Geslacht", value: "Teef" },
      { label: "Geboortedatum", value: "18-10-2025" },
      { label: "Gewicht", value: "± 2,5 kg" },
      { label: "Schofthoogte", value: "± 24–25 cm" },
      { label: "Stamboom", value: "FCI (Poms Jewels of my heart)" },
      { label: "Gezondheid", value: "Getest op patella en SM/CM" },
    ],
    description:
      "Luna is ons zonnetje in huis: een zachte, crèmekleurige teef met een vrolijke blik en een groot hart. Als liefdevolle moeder vormt zij het hart van Poms de Oro.",
  },
];

export const INSTAGRAM_HANDLE = "nacho.thepom_";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const CONTACT_EMAIL = "info@pomsdeoro.nl";

export const TEUNTJEPLUIS_INSTAGRAM_HANDLE = "teuntjepluis_babyenkind";
export const TEUNTJEPLUIS_INSTAGRAM_URL = `https://www.instagram.com/${TEUNTJEPLUIS_INSTAGRAM_HANDLE}/`;
