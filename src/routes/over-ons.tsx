import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Crown, Ornament } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";
import vinoImg from "@/assets/vino-pomeranian-zon.jpg.asset.json";
import nachoImg from "@/assets/nacho-bloemen.jpg.asset.json";
import lunaImg from "@/assets/luna-nacho-kussen.jpg.asset.json";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Ons verhaal | Poms de Oro Pomeranians" },
      {
        name: "description",
        content:
          "Het verhaal achter Poms de Oro: begonnen bij Vino, gegroeid met Nacho en Luna. Verantwoord fokken met liefde, kennis en eerlijkheid.",
      },
      { property: "og:title", content: "Ons verhaal — Poms de Oro Pomeranians" },
      {
        property: "og:description",
        content: "Geboren uit liefde. Gedreven door ervaring. Gebouwd op verantwoordelijkheid.",
      },
    ],
  }),
  component: OverOns,
});

function Paragraphs({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <div className="mt-6 space-y-5">
      {items.map((p) => (
        <p
          key={p.slice(0, 24)}
          className={`font-serif text-xl leading-relaxed ${muted ? "text-beige-muted" : "text-foreground/85"}`}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function Chapter({ eyebrow, title, children, onBeige = false }: { eyebrow: string; title: string; children?: ReactNode; onBeige?: boolean }) {
  return (
    <>
      <p className={`eyebrow ${onBeige ? "text-primary-deep" : ""}`}>{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">{title}</h2>
      {children}
    </>
  );
}

function OverOns() {
  return (
    <>
      <PageHero
        eyebrow="Poms de Oro Pomeranians"
        title="Ons verhaal"
        script="een gouden hart"
        intro="Geboren uit liefde. Gedreven door ervaring. Gebouwd op verantwoordelijkheid."
      />

      <section className="mx-auto max-w-3xl px-5 pt-20 text-center">
        <p className="font-serif text-2xl leading-relaxed text-foreground/90 italic sm:text-3xl">
          Sommige verhalen beginnen met een droom. Dat van ons begon met een hond die ons leven voorgoed zou
          veranderen: <span className="text-gold not-italic">Vino</span>.
        </p>
      </section>

      {/* Vino */}
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 md:grid-cols-[5fr_7fr] md:gap-16">
        <figure className="md:sticky md:top-28">
          <img
            src={vinoImg.url}
            alt="Vino, onze eerste Pomeranian, in de ochtendzon op een berijpt grasveld"
            loading="lazy"
            width={1440}
            height={1920}
            className="aspect-[3/4] w-full object-cover shadow-gold"
          />
          <figcaption className="mt-4 text-center font-script text-3xl text-gold">Vino</figcaption>
        </figure>
        <div>
          <Chapter eyebrow="Waar het begon" title="Het begon allemaal met Vino">
            <Paragraphs
              items={[
                "Toen wij Vino kochten, waren we vooral verliefd. Een prachtig klein Pomeriaantje dat ons hart direct had veroverd. We kochten hem destijds zonder stamboom, zonder echt te beseffen hoeveel invloed dat uiteindelijk op zijn gezondheid en ons leven zou hebben.",
                "Helaas kregen we te maken met verschillende gezondheidsproblemen. De zorgen om Vino, de behandelingen, dierenartsbezoeken en de hoge medische kosten hebben ons laten ervaren hoe ingrijpend gezondheidsproblemen bij een hond kunnen zijn. Het was een periode waarin we niet alleen veel geld, maar vooral ook veel emoties en zorgen hebben gekend.",
                "We zouden Vino voor geen goud willen missen. Hij heeft ons ontzettend veel liefde gegeven. Maar zijn verhaal heeft ons ook iets belangrijks geleerd: achter een mooi uiterlijk moet een gezonde hond staan. En achter iedere verantwoorde fok moet een bewuste keuze zitten.",
                "We zijn ons steeds meer gaan verdiepen in het ras, erfelijke aandoeningen, gezondheidsonderzoeken, stambomen en verantwoord fokken. We wilden begrijpen waar de risico’s vandaan komen en vooral wat je als fokker kunt doen om deze risico’s zo veel mogelijk te beperken.",
              ]}
            />
            <p className="mt-8 font-script text-4xl text-gold">Daar is uiteindelijk onze droom ontstaan.</p>
          </Chapter>
        </div>
      </section>

      {/* Bewuste keuze */}
      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto max-w-3xl px-5 py-24">
          <Chapter eyebrow="Onze missie" title="Van ervaring naar een bewuste keuze" onBeige>
            <Paragraphs
              muted
              items={[
                "Wat begon als liefde voor onze eigen honden, groeide uit tot de wens om zelf een positieve bijdrage te leveren aan het Pomeranian-ras.",
                "We willen niet zomaar puppy’s fokken omdat ze klein, schattig of populair zijn. We willen met aandacht en verantwoordelijkheid werken aan gezonde, sociale en mooie Pomeranians, waarbij het welzijn van de hond altijd vooropstaat.",
                "We geloven dat verantwoord fokken begint voordat er überhaupt een nestje is. Met het maken van bewuste combinaties, het uitvoeren van passende gezondheidsonderzoeken, het bestuderen van afstammingen en het eerlijk informeren van toekomstige baasjes.",
                "Een garantie op een volledig gezond hondenleven kan niemand geven. Ook niet wanneer alle mogelijke onderzoeken zijn uitgevoerd. Maar we zijn ervan overtuigd dat je door kennis, zorgvuldigheid, transparantie en de juiste keuzes de gezondheidsrisico’s aanzienlijk kunt verkleinen.",
              ]}
            />
          </Chapter>
          <blockquote className="mt-10 border-l-2 border-primary-deep pl-6 font-display text-xl tracking-[0.06em] uppercase sm:text-2xl">
            En precies dát is waar wij ons voor willen inzetten.
          </blockquote>
        </div>
      </section>

      {/* Nacho */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-24 md:grid-cols-2 md:gap-20">
        <img
          src={nachoImg.url}
          alt="Nacho, onze black-tan Pomeranian, met een kanten kraagje bij een bos bloemen"
          loading="lazy"
          width={1440}
          height={1920}
          className="aspect-[4/5] w-full object-cover object-[50%_75%] shadow-gold"
        />
        <div>
          <Chapter eyebrow="Nacho" title="Een nieuw hoofdstuk">
            <Paragraphs
              items={[
                "Met de komst van Nacho kreeg onze liefde voor het Pomeranian-ras een nieuwe dimensie.",
                "Nacho is een klein, compact en ontzettend lief Pomeriaantje met een speels karakter. Zijn vrolijke aanwezigheid en bijzondere uitstraling hebben onze passie alleen maar verder versterkt.",
                "Met zijn FCI-stamboom en de aandacht voor zijn gezondheid vormt hij een belangrijk onderdeel van onze toekomstplannen. We kijken niet alleen naar zijn uiterlijk, maar vinden zijn achtergrond, gezondheid en karakter minstens zo belangrijk.",
                "Nacho staat voor een nieuw hoofdstuk: een toekomst waarin we onze liefde voor dit prachtige ras willen combineren met kennis en verantwoordelijkheid.",
              ]}
            />
          </Chapter>
        </div>
      </section>

      {/* Luna */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
        <img
          src={lunaImg.url}
          alt="Luna en Nacho samen op een zacht kussen"
          loading="lazy"
          width={1440}
          height={1920}
          className="aspect-[4/5] w-full object-cover object-[50%_65%] shadow-gold md:order-2"
        />
        <div>
          <Chapter eyebrow="Luna" title="Een waardevolle toevoeging">
            <Paragraphs
              items={[
                "Ook Luna heeft een bijzondere plek binnen ons gezin en onze kennel.",
                "Met haar lieve uitstraling, zachte karakter en prachtige verschijning heeft ze ons hart veroverd. We zien in haar een waardevolle toevoeging aan onze kennel en hopen haar in de toekomst een mooie rol te kunnen geven binnen onze fokplannen.",
                "Voor ons is Luna veel meer dan alleen een toekomstige moederhond. Haar welzijn, gezondheid en geluk staan altijd voorop. We willen haar de tijd en aandacht geven die ze verdient en pas wanneer alles verantwoord en passend is, kijken we naar een eventueel nestje.",
              ]}
            />
          </Chapter>
        </div>
      </section>

      {/* Naam */}
      <section className="relative overflow-hidden border-y border-border">
        <div className="bg-night absolute inset-0" aria-hidden="true" />
        <div className="sparkle absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <Crown className="mx-auto h-6" />
          <p className="eyebrow mt-6">Poms de Oro</p>
          <h2 className="mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">Een naam met betekenis</h2>
          <p className="mt-4 font-script text-5xl text-gold sm:text-6xl">Hart van Goud</p>
          <Ornament className="mt-6" />
          <div className="mx-auto max-w-2xl">
            <Paragraphs
              items={[
                "De naam Poms de Oro betekent letterlijk Hart van Goud.",
                "Voor ons staat deze naam symbool voor alles waar onze kennel voor staat. Het hart waarmee het ooit begon bij Vino, de liefde die we voor onze honden voelen en de verantwoordelijkheid die we nemen voor iedere volgende generatie.",
                "Een gouden hart staat voor liefde, vertrouwen, warmte en toewijding. Waarden die we niet alleen terug willen laten komen in de naam van onze kennel, maar vooral in de manier waarop we met onze honden omgaan en onze fokplannen vormgeven.",
                "We willen toekomstige puppy-eigenaren niet alleen een prachtige Pomeranian meegeven, maar ook het vertrouwen dat er met aandacht, eerlijkheid en zorgvuldigheid is gewerkt aan de basis van hun nieuwe gezinslid.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Belofte */}
      <section className="bg-beige text-beige-foreground">
        <div className="mx-auto max-w-3xl px-5 py-24">
          <Chapter eyebrow="Eerlijk & transparant" title="Onze belofte" onBeige>
            <Paragraphs
              muted
              items={[
                "Wij zullen nooit beloven dat een hond honderd procent vrij is van gezondheidsproblemen. Dat zou niet eerlijk en niet realistisch zijn.",
                "Wat we wél kunnen beloven, is dat we ons uiterste best doen om gezondheidsrisico’s zo veel mogelijk te beperken. Door ons te blijven verdiepen in het ras, passende gezondheidsonderzoeken uit te voeren, bewuste combinaties te maken en open te zijn over de achtergrond van onze honden.",
              ]}
            />
          </Chapter>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Kwaliteit", "boven kwantiteit"],
              ["Welzijn", "boven commerciële belangen"],
              ["Eerlijkheid", "boven mooie beloftes"],
            ].map(([a, b]) => (
              <li key={a} className="border border-primary-deep/40 px-5 py-6 text-center">
                <span className="block font-display text-sm tracking-[0.2em] uppercase">{a}</span>
                <span className="mt-2 block font-serif text-lg text-beige-muted">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-serif text-xl leading-relaxed text-beige-foreground italic">
            Want iedere puppy verdient een gezonde, liefdevolle start. En iedere toekomstige eigenaar verdient
            vertrouwen.
          </p>
        </div>
      </section>

      {/* Slot */}
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <Ornament />
        <p className="eyebrow mt-8">Poms de Oro Pomeranians</p>
        <p className="mt-4 font-script text-4xl text-gold sm:text-5xl">Breeding with Love, Excellence &amp; Passion</p>
        <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-muted-foreground">
          Een verhaal dat begon bij Vino. Een passie die verder groeide met Nacho en Luna. En een toekomst die we
          met heel ons hart willen opbouwen.
        </p>
        <Button asChild variant="goldOutline" size="xl" className="mt-10">
          <Link to="/onze-honden">Ontmoet Nacho & Luna</Link>
        </Button>
      </section>
    </>
  );
}
