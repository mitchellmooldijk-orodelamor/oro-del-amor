import nachoImg from "@/assets/nacho-dekreu.png.asset.json";
import lunaImg from "@/assets/luna-moeder.png.asset.json";

export type Dog = {
  slug: string;
  name: string;
  role: string;
  color: string;
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
    tagline: "Compact, kleine bouw — lief, speels karakter",
    image: nachoImg.url,
    facts: [
      { label: "Geslacht", value: "Reu" },
      { label: "Geboortedatum", value: "02-01-2026" },
      { label: "Gewicht", value: "2,5 kg" },
      { label: "Schofthoogte", value: "25 cm" },
      { label: "Stamboom", value: "FCI (Corazón de la Vida)" },
      { label: "DNA-testen", value: "—" },
    ],
    description:
      "Nacho is onze trotse black-tan reu met een prachtige, volle vacht en een compacte bouw. Speels, nieuwsgierig en vol liefde — precies het karakter dat wij in onze lijn willen doorgeven.",
  },
  {
    slug: "luna",
    name: "Luna",
    role: "Moeder",
    color: "Cream",
    tagline: "A sweet little girl with a big heart",
    image: lunaImg.url,
    facts: [
      { label: "Geslacht", value: "Teef" },
      { label: "Geboortedatum", value: "Op aanvraag" },
      { label: "Gewicht", value: "± 2,5 kg" },
      { label: "Schofthoogte", value: "± 24–25 cm" },
      { label: "Stamboom", value: "FCI (Corazón de la Vida)" },
      { label: "DNA-testen", value: "—" },
    ],
    description:
      "Luna is ons zonnetje in huis: een zachte, crèmekleurige teef met een vrolijke blik en een groot hart. Als liefdevolle moeder vormt zij het hart van Poms de Oro.",
  },
];

export const INSTAGRAM_HANDLE = "nacho.thepom_";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const CONTACT_EMAIL = "info@pomsdeoro.nl";
