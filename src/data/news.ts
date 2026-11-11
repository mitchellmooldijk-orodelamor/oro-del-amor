import logo from "@/assets/oro-del-amor-logo.jpg";
import lunaNachoImg from "@/assets/luna-nacho-kussen.jpg.asset.json";
import lunaImg from "@/assets/luna-profiel-oro-del-amor.png.asset.json";
import puppies from "@/assets/puppies.jpg";

export type NewsItem = {
  id: string;
  /** Soort bericht, bijv. "Verwachte pups", "Pups geboren", "Update". */
  category: string;
  /** Vrije datumtekst, bijv. "November 2026". */
  date?: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  link?: { to: "/contact" | "/pups" | "/onze-honden" | "/wie-zijn-wij"; label: string };
};

/** Nieuwste bericht bovenaan; de carrousel op de homepagina toont ze in deze volgorde. */
export const news: NewsItem[] = [
  {
    id: "website-online",
    category: "Nieuws",
    date: "November 2026",
    title: "Welkom op onze nieuwe website",
    text: "Oro Del Amor heeft een eigen website! Hier lees je voortaan al het nieuws over onze honden, toekomstige nestjes en pups.",
    image: logo,
    imageAlt: "Logo van Oro Del Amor Pomeranians",
  },
  {
    id: "verwachte-pups",
    category: "Verwachte pups",
    title: "Nog geen nestje gepland",
    text: "Zodra er een nestje verwacht wordt, lees je het hier als eerste. Wil je niets missen? Zet je dan op onze wachtlijst.",
    image: puppies,
    imageAlt: "Drie Pomeranian pups in een linnen mand",
    link: { to: "/contact", label: "Op de wachtlijst" },
  },
  {
    id: "gezondheid",
    category: "Gezondheid",
    title: "Nacho en Luna getest",
    text: "Nacho en Luna zijn allebei getest op patella en SM/CM. Gezondheid staat bij ons altijd voorop.",
    image: lunaNachoImg.url,
    imageAlt: "Luna en Nacho samen op een zacht kussen",
    link: { to: "/onze-honden", label: "Ontmoet onze honden" },
  },
  {
    id: "luna",
    category: "Update",
    title: "Luna, uit Poms Jewels of my heart",
    text: "Luna is geboren op 18 oktober 2025 en komt uit kennel Poms Jewels of my heart. Ze heeft haar plekje in ons gezin helemaal gevonden.",
    image: lunaImg.url,
    imageAlt: "Luna, onze crèmekleurige Pomeranian",
  },
];
