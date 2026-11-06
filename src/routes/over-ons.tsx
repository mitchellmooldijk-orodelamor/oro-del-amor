import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Ornament } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";
import aboutHome from "@/assets/about-home.jpg";
import hero from "@/assets/hero-pomeranian.jpg";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over ons | Corazón de Oro Pomeranians" },
      {
        name: "description",
        content: "Het verhaal achter kennel Corazón de Oro: kleinschalig, liefdevol en met passie voor de Pomeranian.",
      },
      { property: "og:title", content: "Over Corazón de Oro" },
      { property: "og:description", content: "Kleinschalig fokken met liefde en passie voor de Pomeranian." },
    ],
  }),
  component: OverOns,
});

function OverOns() {
  return (
    <>
      <PageHero eyebrow="Over ons" title="Ons verhaal" script="een gouden hart" />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
        <img src={hero} alt="Pomeranian op een zwart fluwelen krukje" loading="lazy" width={1600} height={1072} className="w-full shadow-gold" />
        <div>
          <p className="eyebrow">Corazón de Oro</p>
          <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase">Waarom deze naam?</h2>
          <p className="mt-6 font-serif text-xl leading-relaxed text-foreground/90">
            Corazón de Oro betekent “gouden hart”. Zo zien wij onze Pomeranians: klein van formaat, maar met
            een hart van goud. Die liefde en toewijding willen wij in alles terug laten komen.
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed text-muted-foreground">
            Wij zijn een kleinschalige kennel. Dat betekent bewust weinig nestjes, veel aandacht en ouderdieren
            die volledig deel uitmaken van ons gezin.
          </p>
        </div>
      </section>

      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
          <div className="md:order-2">
            <img src={aboutHome} alt="Pomeranian pup op een beige bank" loading="lazy" width={1200} height={1408} className="w-full" />
          </div>
          <div>
            <p className="eyebrow text-primary-deep">Onze belofte</p>
            <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase">Breeding with love</h2>
            <ul className="mt-8 space-y-6 font-serif text-xl leading-relaxed text-beige-muted">
              <li>
                <span className="font-display text-sm tracking-[0.2em] text-beige-foreground uppercase">Gezondheid</span>
                <br />Ouderdieren met FCI-stamboom en een zorgvuldige selectie.
              </li>
              <li>
                <span className="font-display text-sm tracking-[0.2em] text-beige-foreground uppercase">Socialisatie</span>
                <br />Pups groeien op in huis, tussen het dagelijks leven.
              </li>
              <li>
                <span className="font-display text-sm tracking-[0.2em] text-beige-foreground uppercase">Begeleiding</span>
                <br />Ook na het ophalen blijven wij bereikbaar voor al je vragen.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <Ornament />
        <p className="mt-8 font-script text-5xl text-gold">Excellence · Passion</p>
        <Button asChild variant="goldOutline" size="xl" className="mt-10">
          <Link to="/onze-honden">Ontmoet Nacho & Luna</Link>
        </Button>
      </section>
    </>
  );
}
