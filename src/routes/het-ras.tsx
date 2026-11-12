import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CareRoutineHelper } from "@/components/site/CareRoutineHelper";
import { SectionHeading } from "@/components/site/Ornament";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { ageStages, breedFacts, generalCareTips } from "@/data/care";

export const Route = createFileRoute("/het-ras")({
  head: () => ({
    meta: [
      { title: "Het ras: de Pomeranian | Oro Del Amor Pomeranians" },
      {
        name: "description",
        content:
          "Alles over de Pomeranian: karakter, formaat en vacht, onze verzorgingstips per leeftijd en een hulp die een dagelijkse verzorgingsroutine voor je hond maakt.",
      },
      { property: "og:title", content: "Het ras: de Pomeranian — Oro Del Amor" },
      {
        property: "og:description",
        content: "Rasinformatie, onze verzorgingstips per levensfase en een persoonlijke dagroutine voor jouw Pomeranian.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HetRas,
});

function HetRas() {
  return (
    <>
      <PageHero
        eyebrow="Rasinformatie"
        title="Het ras"
        script="de Pomeranian"
        intro="Klein van stuk, groot van hart. Lees meer over het karakter en de verzorging van dit bijzondere ras."
      />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <p className="eyebrow">Herkomst & karakter</p>
            <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase">Een kleine kees met een grote persoonlijkheid</h2>
            <div className="mt-6 space-y-5 font-serif text-xl leading-relaxed text-muted-foreground">
              <p>
                De Pomeranian is de kleinste van de Duitse keeshonden. De naam verwijst naar de streek Pommeren, aan de
                Oostzee. Binnen de FCI heet het ras officieel Dwergkees.
              </p>
              <p>
                Pomeranians zijn vrolijk, slim en aanhankelijk. Ze zijn alert en laten graag even horen wie er aan de
                deur staat. Ze hechten zich sterk aan hun gezin en zijn het liefst overal bij.
              </p>
              <p>
                Opvallend is de dikke dubbele vacht met een zachte ondervacht. Die vraagt om vaste verzorging — met
                een goede routine is dat juist een fijn moment samen.
              </p>
            </div>
          </div>
          <dl className="grid content-start gap-px self-start border border-border bg-border sm:grid-cols-2">
            {breedFacts.map((f) => (
              <div key={f.label} className="bg-background p-6">
                <dt className="font-display text-[0.65rem] tracking-[0.25em] text-primary uppercase">{f.label}</dt>
                <dd className="mt-2 font-serif text-xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <p className="eyebrow text-primary-deep">Onze verzorgingstips</p>
            <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">Per levensfase</h2>
            <p className="mt-2 font-script text-4xl text-beige-muted">met liefde verzorgd</p>
          </div>

          <div className="mt-14 grid gap-px border border-beige-foreground/15 bg-beige-foreground/15 md:grid-cols-2">
            {ageStages.map((s) => (
              <article key={s.id} className="bg-beige p-8">
                <h3 className="font-display text-lg tracking-[0.18em] uppercase">{s.label}</h3>
                <p className="font-serif text-lg text-beige-muted italic">{s.range}</p>
                <ul className="mt-5 space-y-3">
                  {s.tips.map((t) => (
                    <li key={t} className="flex items-start gap-3 font-serif text-lg leading-snug">
                      <Check className="mt-1 size-4 shrink-0 text-primary-deep" strokeWidth={1.5} />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-center font-display text-lg tracking-[0.18em] uppercase">Voor iedere leeftijd</h3>
            <ul className="mx-auto mt-6 grid max-w-5xl gap-x-10 gap-y-3 md:grid-cols-2">
              {generalCareTips.map((t) => (
                <li key={t} className="flex items-start gap-3 font-serif text-lg leading-snug">
                  <Check className="mt-1 size-4 shrink-0 text-primary-deep" strokeWidth={1.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="verzorgingshulp" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24">
        <SectionHeading eyebrow="Verzorgingshulp" title="Jouw dagroutine" script="op maat voor jouw Pom" />
        <p className="mx-auto mt-8 mb-12 max-w-2xl text-center font-serif text-xl leading-relaxed text-muted-foreground">
          Kies de leeftijd van je Pomeranian en wij zetten onze verzorgingstips om in een overzichtelijke routine voor
          de hele dag.
        </p>
        <CareRoutineHelper />
      </section>

      <section className="mx-auto max-w-3xl border-t border-border px-5 py-24 text-center">
        <h2 className="font-display text-3xl tracking-[0.08em] uppercase">Nog vragen over verzorging?</h2>
        <p className="mt-4 font-serif text-xl text-muted-foreground">
          Bekijk de veelgestelde vragen of stuur ons gerust een bericht.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="goldOutline" size="xl">
            <Link to="/faq">Veelgestelde vragen</Link>
          </Button>
          <Button asChild variant="gold" size="xl">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
