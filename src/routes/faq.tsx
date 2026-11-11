import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { FaqSection } from "@/components/site/FaqSection";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/data/dogs";
import { puppyFaq, studFaq } from "@/data/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Veelgestelde vragen | Oro Del Amor Pomeranians" },
      {
        name: "description",
        content:
          "Antwoorden op de meest gestelde vragen over de wachtlijst, het opgroeien van onze pups, de eerste weken thuis en de dekvoorwaarden van Nacho.",
      },
      { property: "og:title", content: "Veelgestelde vragen — Oro Del Amor" },
      {
        property: "og:description",
        content: "Alles over de wachtlijst, de eerste weken thuis en dekaanvragen voor Nacho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

function Faq() {
  const hash = useLocation({ select: (l) => l.hash });
  const [puppyOpen, setPuppyOpen] = useState<string[]>([]);
  const [studOpen, setStudOpen] = useState<string[]>([]);

  // Links naar /faq#dekreu openen meteen de eerste dekvraag en scrollen erheen.
  useEffect(() => {
    if (hash !== studFaq.id && hash !== puppyFaq.id) return;
    if (hash === studFaq.id) {
      const first = studFaq.items[0]?.id;
      if (first) setStudOpen((v) => (v.length ? v : [first]));
    }
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }));
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Veelgestelde vragen"
        script="alles wat je wilt weten"
        intro="Over de wachtlijst, het opgroeien van onze pups, de eerste weken thuis en dekaanvragen voor Nacho."
      />

      <nav className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-5 pt-16">
        <Button asChild variant="goldOutline" size="lg">
          <Link to="/faq" hash={puppyFaq.id}>
            {puppyFaq.eyebrow}
          </Link>
        </Button>
        <Button asChild variant="goldOutline" size="lg">
          <Link to="/faq" hash={studFaq.id}>
            {studFaq.title}
          </Link>
        </Button>
      </nav>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <FaqSection group={puppyFaq} open={puppyOpen} onOpenChange={setPuppyOpen} />
        <FaqSection group={studFaq} open={studOpen} onOpenChange={setStudOpen} className="mt-20" />
      </section>

      <section className="mx-auto max-w-3xl border-t border-border px-5 py-24 text-center">
        <h2 className="font-display text-3xl tracking-[0.08em] uppercase">Staat je vraag er niet bij?</h2>
        <p className="mt-4 font-serif text-xl text-muted-foreground">
          Stuur ons gerust een berichtje — we denken graag met je mee.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="xl">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <WhatsAppIcon className="size-4" /> WhatsApp ons
            </a>
          </Button>
          <Button asChild variant="goldOutline" size="xl">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
