import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Crown, Ornament, SectionHeading } from "@/components/site/Ornament";
import logo from "@/assets/oro-del-amor-logo-nieuw.png";
import aboutHome from "@/assets/about-home.jpg";
import puppies from "@/assets/puppies.jpg";
import { dogs } from "@/data/dogs";
import { NewsCarousel } from "@/components/site/NewsCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oro Del Amor Pomeranians — Pomeranians met een gouden hart" },
      {
        name: "description",
        content:
          "Kennel Oro Del Amor fokt Pomeranians met liefde, passie en oog voor gezondheid. Ontmoet Nacho en Luna en ontdek onze pups.",
      },
      { property: "og:title", content: "Oro Del Amor Pomeranians" },
      {
        property: "og:description",
        content: "Pomeranians gefokt met liefde, excellence en passie. Ontmoet onze honden en pups.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: Heart,
    title: "Met liefde",
    text: "Onze pups groeien op in huis, midden in het gezin, omringd door aandacht en knuffels.",
  },
  {
    icon: ShieldCheck,
    title: "Excellence",
    text: "Ouderdieren met FCI-stamboom, getest op alle eisen die gelden binnen het fokreglement.",
  },
  {
    icon: Sparkles,
    title: "Passie",
    text: "Wij leven voor dit ras en begeleiden je ook na het ophalen met raad en daad.",
  },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-night absolute inset-0" aria-hidden="true" />
        <div className="sparkle animate-twinkle absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-10 pb-20 md:grid-cols-[1.1fr_1fr] md:pt-20 md:pb-28">
          <div className="animate-rise order-2 text-center md:order-1 md:text-left">
            <p className="eyebrow">Pomeranian kennel</p>
            <h1 className="mt-5 font-script text-6xl leading-[0.95] text-gold sm:text-7xl lg:text-8xl">
              Oro Del Amor
            </h1>
            <p className="mt-4 font-display text-sm tracking-[0.4em] text-foreground/80 uppercase">
              Goud van de Liefde
            </p>
            <p className="mx-auto mt-6 max-w-md font-serif text-xl leading-relaxed text-muted-foreground md:mx-0">
              Kleine Pomeranians met een groot hart — met zorg gefokt, liefdevol opgevoed en klaar om
              jouw thuis te vullen met goud.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild variant="gold" size="xl">
                <Link to="/pups">Interesse in een pup</Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <Link to="/onze-honden">Ontmoet onze honden</Link>
              </Button>
            </div>
          </div>

          <div className="animate-rise order-1 md:order-2">
            <img
              src={logo}
              alt="Logo Oro Del Amor Pomeranians: een gouden pomeriaan onder een kroon"
              width={1264}
              height={1264}
              className="edge-fade mx-auto w-full max-w-md"
            />
          </div>
        </div>
        <div className="gold-rule mx-auto w-full max-w-4xl" />
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading eyebrow="Waar wij voor staan" title="Breeding with love" script="excellence & passion" />
        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="bg-background p-10 text-center">
              <p.icon className="mx-auto size-7 text-primary" strokeWidth={1.2} />
              <h3 className="mt-5 font-display text-lg tracking-[0.18em] uppercase">{p.title}</h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nieuws */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Nieuws" title="Laatste updates" script="uit de kennel" />
          <NewsCarousel />
        </div>
      </section>

      {/* Dogs teaser */}
      <section className="relative overflow-hidden border-y border-border bg-card py-24">
        <div className="sparkle pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Onze honden" title="Het hart van de kennel" script="Nacho & Luna" />
          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            {dogs.map((dog) => (
              <Link key={dog.slug} to="/onze-honden" className="group block">
                <div className="relative overflow-hidden">
                  <img
                    src={dog.image}
                    alt={`${dog.name}, ${dog.color} Pomeranian`}
                    loading="lazy"
                    width={1200}
                    height={1300}
                    className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 border border-primary/0 transition-colors duration-500 group-hover:border-primary/60" />
                </div>
                <div className="mt-6 text-center">
                  <p className="eyebrow">{dog.role}</p>
                  <p className="mt-1 font-script text-5xl text-gold">{dog.name}</p>
                  <p className="mt-1 font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                    {dog.color}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Beige story */}
      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
          <img
            src={aboutHome}
            alt="Pomeranian pup wordt liefdevol vastgehouden op de bank"
            loading="lazy"
            width={1200}
            height={1408}
            className="w-full"
          />
          <div>
            <p className="eyebrow text-primary-deep">Opgegroeid in huis</p>
            <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">
              Een warm begin
            </h2>
            <p className="mt-2 font-script text-4xl text-beige-muted">voor elk klein hartje</p>
            <p className="mt-6 font-serif text-xl leading-relaxed text-beige-muted">
              Bij Oro Del Amor is iedere pup familie. Ze worden geboren en groeien op in onze
              woonkamer, wennen aan geluiden, kinderen en bezoek, en krijgen zo de beste start voor een
              stabiel en vrolijk karakter.
            </p>
            <div className="mt-8">
              <Link
                to="/over-ons"
                className="font-display text-xs tracking-[0.3em] text-beige-foreground uppercase underline decoration-primary-deep underline-offset-8 hover:text-primary-deep"
              >
                Lees ons verhaal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Puppies CTA */}
      <section className="relative overflow-hidden">
        <img
          src={puppies}
          alt="Drie Pomeranian pups in een linnen mand"
          loading="lazy"
          width={1200}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-background/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
          <Crown className="mx-auto h-7" />
          <h2 className="mt-6 font-display text-3xl tracking-[0.08em] uppercase sm:text-5xl">Pups & wachtlijst</h2>
          <p className="mt-3 font-script text-4xl text-gold sm:text-5xl">jouw gouden mandje</p>
          <Ornament className="mt-6" />
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-foreground/85">
            Benieuwd naar een toekomstig nestje? Zet je op onze wachtlijst en wij houden je persoonlijk op de
            hoogte.
          </p>
          <Button asChild variant="gold" size="xl" className="mt-10 px-5 tracking-[0.12em] sm:px-7 sm:tracking-[0.25em]">
            <Link to="/wachtlijst">Aanmelden voor de wachtlijst</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
