import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Crown, Ornament } from "@/components/site/Ornament";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEUNTJEPLUIS_INSTAGRAM_HANDLE, TEUNTJEPLUIS_INSTAGRAM_URL } from "@/data/dogs";
import gezinImg from "@/assets/gezin-mooldijk.jpg.asset.json";
import ouderImg from "@/assets/mitchell-en-jill.jpg.asset.json";

export const Route = createFileRoute("/wie-zijn-wij")({
  head: () => ({
    meta: [
      { title: "Wie zijn wij? | Poms de Oro Pomeranians" },
      {
        name: "description",
        content:
          "Maak kennis met het gezin achter Poms de Oro: Mitchell, Jill, Chezz, Romée en onze honden Vino, Nacho en Luna uit Nieuwerkerk aan den IJssel.",
      },
      { property: "og:title", content: "Wie zijn wij? — Poms de Oro Pomeranians" },
      {
        property: "og:description",
        content: "Wij zijn een gezin van 7 — onze honden rekenen we uiteraard mee.",
      },
    ],
  }),
  component: WieZijnWij,
});

const gezin = [
  { name: "Mitchell", role: "Papa" },
  { name: "Jill", role: "Mama" },
  { name: "Chezz", role: "Zoon" },
  { name: "Romée", role: "Dochter" },
  { name: "Vino", role: "Hondenkind" },
  { name: "Nacho", role: "Hondenkind" },
  { name: "Luna", role: "Hondenkind" },
];

function WieZijnWij() {
  return (
    <>
      <PageHero
        eyebrow="Maak kennis"
        title="Wie zijn wij?"
        script="een gezin van 7"
        intro="Wow, 7 ja! Onze honden rekenen we uiteraard mee."
      />

      {/* Gezin */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20">
        <figure className="relative">
          <div className="absolute -inset-3 border border-primary/30" aria-hidden="true" />
          <img
            src={gezinImg.url}
            alt="Mitchell en Jill met hun zoon Chezz en dochter Romée"
            width={1200}
            height={1600}
            className="relative aspect-[4/5] w-full object-cover object-[50%_70%] shadow-gold"
          />
        </figure>
        <div>
          <p className="eyebrow">Ons gezin</p>
          <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">
            Wij zijn een gezin van 7!
          </h2>
          <p className="mt-6 font-serif text-xl leading-relaxed text-foreground/85">
            Wow, 7 ja — onze honden rekenen we uiteraard mee. Wij zijn Mitchell en Jill en onze zoon Chezz en
            dochter Romée. En niet te vergeten onze drie hondenkinderen Vino, Nacho en Luna.
          </p>

          <ol className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {gezin.map((lid, i) => (
              <li key={lid.name} className="bg-card px-4 py-4 text-center">
                <span className="block font-display text-[0.6rem] tracking-[0.3em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block font-script text-3xl leading-tight text-gold">{lid.name}</span>
                <span className="block font-display text-[0.55rem] tracking-[0.25em] text-muted-foreground uppercase">
                  {lid.role}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-center bg-card px-4 py-4">
              <span className="font-display text-4xl text-gold">7</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Nieuwerkerk */}
      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
          <img
            src={ouderImg.url}
            alt="Mitchell en Jill samen in de zon"
            loading="lazy"
            width={1440}
            height={1920}
            className="aspect-[4/5] w-full object-cover object-[65%_50%] md:order-2"
          />
          <div>
            <p className="eyebrow text-primary-deep">Ons thuis</p>
            <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">
              Nieuwerkerk aan den IJssel
            </h2>
            <p className="mt-2 font-script text-4xl text-beige-muted">sinds 2021</p>
            <p className="mt-6 font-serif text-xl leading-relaxed text-beige-muted">
              In 2021 zijn wij verhuisd naar onze nieuwbouwwoning in Nieuwerkerk aan den IJssel, een mooie,
              rustige en kindvriendelijke wijk. Hier groeien onze kinderen én onze honden samen op.
            </p>
          </div>
        </div>
      </section>

      {/* Teuntjepluis */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-night absolute inset-0" aria-hidden="true" />
        <div className="sparkle absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <Crown className="mx-auto h-6" />
          <p className="eyebrow mt-6">In ons dorp</p>
          <p className="mt-4 font-script text-5xl text-gold sm:text-6xl">Teuntjepluis</p>
          <p className="mt-2 font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Baby- en kinderkleding
          </p>
          <Ornament className="mt-6" />
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-foreground/85">
            Daarnaast hebben wij hier in ons dorp ook een baby- en kinderkledingwinkel: Teuntjepluis.
          </p>
          <Button asChild variant="goldOutline" size="xl" className="mt-10">
            <a href={TEUNTJEPLUIS_INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram className="size-4" /> @{TEUNTJEPLUIS_INSTAGRAM_HANDLE}
            </a>
          </Button>
        </div>
      </section>

      {/* Slot */}
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="font-script text-4xl text-gold sm:text-5xl">Benieuwd naar ons verhaal?</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="xl">
            <Link to="/over-ons">Lees ons verhaal</Link>
          </Button>
          <Button asChild variant="goldOutline" size="xl">
            <Link to="/onze-honden">Ontmoet Nacho & Luna</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
