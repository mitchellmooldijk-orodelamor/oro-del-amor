import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { WaitlistForm } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/wachtlijst")({
  head: () => ({
    meta: [
      { title: "Aanmelden voor de wachtlijst | Oro Del Amor Pomeranians" },
      {
        name: "description",
        content:
          "Meld je aan voor de wachtlijst van Oro Del Amor Pomeranians. Vertel ons over je woonsituatie, leefritme en ervaring, dan nemen wij persoonlijk contact op.",
      },
      { property: "og:title", content: "Wachtlijst — Oro Del Amor Pomeranians" },
      {
        property: "og:description",
        content: "Vul onze vragenlijst in en kom op de wachtlijst voor een toekomstig nestje Pomeranians.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Wachtlijst,
});

function Wachtlijst() {
  return (
    <>
      <PageHero
        eyebrow="Pups & wachtlijst"
        title="Aanmelden"
        script="voor de wachtlijst"
        intro="Wij vinden een goede match tussen pup en gezin het allerbelangrijkste. Vertel ons daarom iets over jezelf, je woonsituatie en je leefritme."
      />
      <section id="aanmelding" className="mx-auto max-w-4xl scroll-mt-28 px-5 py-20">
        <p className="mx-auto mb-12 max-w-2xl text-center font-serif text-xl leading-relaxed text-muted-foreground">
          Aan de hand van je antwoorden beoordelen wij of een pup uit ons nest goed bij jullie past. Meer weten over hoe
          dit werkt? Lees de{" "}
          <Link to="/faq" className="text-primary underline-offset-4 hover:underline">
            veelgestelde vragen
          </Link>
          .
        </p>
        <WaitlistForm />
      </section>
    </>
  );
}
