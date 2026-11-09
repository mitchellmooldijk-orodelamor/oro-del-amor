import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/Ornament";
import { FaqSection } from "@/components/site/FaqSection";
import { Button } from "@/components/ui/button";
import { puppyFaq, studFaq } from "@/data/faq";
import puppies from "@/assets/puppies.jpg";

export const Route = createFileRoute("/pups")({
  head: () => ({
    meta: [
      { title: "Pups & wachtlijst | Poms de Oro Pomeranians" },
      {
        name: "description",
        content:
          "Interesse in een Pomeranian pup van Poms de Oro? Lees onze werkwijze, veelgestelde vragen en de dekvoorwaarden van Nacho.",
      },
      { property: "og:title", content: "Pups & wachtlijst — Poms de Oro" },
      {
        property: "og:description",
        content: "Onze werkwijze, de wachtlijst, veelgestelde vragen en dekaanvragen voor Nacho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pups,
});

const steps = [
  { n: "I", title: "Kennismaken", text: "Vertel ons over jezelf en je thuissituatie. We maken graag persoonlijk kennis." },
  { n: "II", title: "Wachtlijst", text: "Na het gesprek plaatsen wij je op de wachtlijst voor een toekomstig nestje." },
  { n: "III", title: "Opgroeien", text: "Je ontvangt regelmatig foto's en updates terwijl jouw pup bij ons opgroeit." },
  { n: "IV", title: "Thuiskomst", text: "Rond 8 à 9 weken mag je pup mee naar huis, met alle uitleg en begeleiding." },
];

const included = [
  "FCI-stamboom",
  "Gechipt en geregistreerd",
  "Leeftijdsgebonden vaccinaties en ontworming",
  "Dierenarts-check en EU-paspoort",
  "Puppypakket met vertrouwd dekentje",
  "Levenslange begeleiding en advies",
];

function Pups() {
  const hash = useLocation({ select: (l) => l.hash });
  const [puppyOpen, setPuppyOpen] = useState<string[]>([]);
  const [studOpen, setStudOpen] = useState<string[]>([]);

  // Links naar /pups#dekreu openen meteen de eerste dekvraag en scrollen erheen.
  useEffect(() => {
    if (hash !== studFaq.id) return;
    const first = studFaq.items[0]?.id;
    if (first) setStudOpen((v) => (v.length ? v : [first]));
    requestAnimationFrame(() => document.getElementById(studFaq.id)?.scrollIntoView({ block: "start" }));
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Pups"
        title="Pups & wachtlijst"
        script="jouw gouden mandje"
        intro="Momenteel zijn er geen pups beschikbaar. Schrijf je in voor de wachtlijst en wees als eerste op de hoogte van een nieuw nestje."
      />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading eyebrow="Onze werkwijze" title="Van eerste contact tot thuis" />
        <ol className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="bg-background p-8">
              <span className="font-display text-3xl text-gold">{s.n}</span>
              <h3 className="mt-4 font-display text-base tracking-[0.18em] uppercase">{s.title}</h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
          <div>
            <p className="eyebrow text-primary-deep">Inbegrepen</p>
            <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">Een zorgeloze start</h2>
            <p className="mt-2 font-script text-4xl text-beige-muted">met alles erop en eraan</p>
            <ul className="mt-8 space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 font-serif text-xl">
                  <Check className="mt-1 size-5 shrink-0 text-primary-deep" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img src={puppies} alt="Drie Pomeranian pups" loading="lazy" width={1200} height={1200} className="w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24">
        <SectionHeading eyebrow="FAQ" title="Veelgestelde vragen" script="alles wat je wilt weten" />
        <FaqSection group={puppyFaq} open={puppyOpen} onOpenChange={setPuppyOpen} className="mt-16" />
        <FaqSection group={studFaq} open={studOpen} onOpenChange={setStudOpen} className="mt-20" />
      </section>

      <section className="mx-auto max-w-3xl border-t border-border px-5 py-24 text-center">
        <h2 className="font-display text-3xl tracking-[0.08em] uppercase">Op de wachtlijst?</h2>
        <p className="mt-4 font-serif text-xl text-muted-foreground">
          Stuur ons een bericht — we nemen persoonlijk contact met je op.
        </p>
        <Button asChild variant="gold" size="xl" className="mt-10">
          <Link to="/contact">Aanmelden</Link>
        </Button>
      </section>
    </>
  );
}
