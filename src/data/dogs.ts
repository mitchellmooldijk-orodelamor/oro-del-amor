import nachoImg from "@/assets/nacho-dekreu-profiel-oro-del-amor.png";
import lunaImg from "@/assets/luna-profiel-oro-del-amor.png";

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
  /** Toont bij het profiel een verwijzing naar de dekvoorwaarden op /faq#dekreu. */
  availableAsStud?: boolean;
};

export const dogs: Dog[] = [
  {
    slug: "nacho",
    name: "Nacho",
    role: "Dekreu",
    color: "Black & tan",
    origin: "Corazón de la Vida",
    tagline: "Compact, kleine bouw — lief, speels karakter",
    image: nachoImg,
    facts: [
      { label: "Geslacht", value: "Reu" },
      { label: "Geboortedatum", value: "02-01-2026" },
      { label: "Gewicht", value: "2,5 kg" },
      { label: "Schofthoogte", value: "22 cm" },
      { label: "Stamboom", value: "FCI (Corazón de la Vida)" },
      { label: "Gezondheid", value: "Getest op patella en SM/CM" },
    ],
    description:
      "Nacho is onze trotse black-tan reu met een prachtige, volle vacht en een compacte bouw. Speels, nieuwsgierig en vol liefde — precies het karakter dat wij in onze lijn willen doorgeven.",
    availableAsStud: true,
  },
  {
    slug: "luna",
    name: "Luna",
    role: "Moeder",
    color: "Cream",
    origin: "Poms Jewels of my heart",
    tagline: "A sweet little girl with a big heart",
    image: lunaImg,
    facts: [
      { label: "Geslacht", value: "Teef" },
      { label: "Geboortedatum", value: "18-10-2025" },
      { label: "Gewicht", value: "± 2,5 kg" },
      { label: "Schofthoogte", value: "± 24–25 cm" },
      { label: "Stamboom", value: "FCI (Poms Jewels of my heart)" },
      { label: "Gezondheid", value: "Getest op patella en SM/CM" },
    ],
    description:
      "Luna is ons zonnetje in huis: een zachte, crèmekleurige teef met een vrolijke blik en een groot hart. Als liefdevolle moeder vormt zij het hart van Oro Del Amor.",
  },
];

export const INSTAGRAM_HANDLE = "nacho.thepom_";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
/** Uniek Bedrijfsnummer (UBN), verplicht voor fokkers in Nederland. */
export const UBN_NUMBER = "8976923";

export const CONTACT_EMAIL = "info@orodelamorpoms.nl";

export const PHONE_DISPLAY = "06 16 19 11 98";
/** Internationaal formaat zonder +, zoals wa.me het verwacht. */
export const WHATSAPP_NUMBER = "31616191198";
export const WHATSAPP_MESSAGE = "Hallo Mitchell en Jill, ik heb interesse in een Pomeranian pup van Oro Del Amor.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Alleen de woonplaats wordt getoond; het exacte adres delen we pas na een afspraak. */
export const ADDRESS_CITY = "Nieuwerkerk aan den IJssel";
const addressQuery = encodeURIComponent(ADDRESS_CITY);
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`;

export const TEUNTJEPLUIS_INSTAGRAM_HANDLE = "teuntjepluis_babyenkind";
export const TEUNTJEPLUIS_INSTAGRAM_URL = `https://www.instagram.com/${TEUNTJEPLUIS_INSTAGRAM_HANDLE}/`;
