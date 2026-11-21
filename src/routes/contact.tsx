import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CalendarHeart, Instagram, Mail, MapPin, Navigation } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import {
  ADDRESS_CITY,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
  PHONE_DISPLAY,
  UBN_NUMBER,
  WHATSAPP_URL,
} from "@/data/dogs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Oro Del Amor Pomeranians" },
      {
        name: "description",
        content:
          "Neem contact op met kennel Oro Del Amor in Nieuwerkerk aan den IJssel via WhatsApp, Instagram of e-mail. Bezoek op afspraak.",
      },
      { property: "og:title", content: "Contact — Oro Del Amor" },
      {
        property: "og:description",
        content: "Vragen over onze Pomeranians of de wachtlijst? App, mail of bezoek ons op afspraak.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const fieldClass =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 font-serif text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none";

function Contact() {
  const [form, setForm] = useState({ naam: "", email: "", bericht: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Aanvraag via website — ${form.naam}`);
    const body = encodeURIComponent(`${form.bericht}\n\n${form.naam}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Neem contact op"
        script="wij horen graag van je"
        intro="Vragen over onze honden, een toekomstig nestje of de wachtlijst? Stuur ons een bericht."
      />

      <section className="mx-auto grid max-w-6xl gap-16 px-5 py-24 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-10">
          <div className="border border-primary/50 bg-card p-8">
            <WhatsAppIcon className="size-7 text-primary" />
            <p className="eyebrow mt-5">WhatsApp</p>
            <p className="mt-2 font-serif text-2xl">{PHONE_DISPLAY}</p>
            <p className="mt-2 font-serif text-lg text-muted-foreground">
              Stuur ons direct een berichtje, we reageren zo snel mogelijk.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-6 w-full sm:w-auto">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="size-4" /> Chat via WhatsApp
              </a>
            </Button>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="group block border border-border p-8 transition-colors hover:border-primary">
            <Instagram className="size-6 text-primary" strokeWidth={1.3} />
            <p className="eyebrow mt-5">Instagram</p>
            <p className="mt-2 font-serif text-2xl group-hover:text-primary">@{INSTAGRAM_HANDLE}</p>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="group block border border-border p-8 transition-colors hover:border-primary">
            <Mail className="size-6 text-primary" strokeWidth={1.3} />
            <p className="eyebrow mt-5">E-mail</p>
            <p className="mt-2 font-serif text-2xl break-all group-hover:text-primary">{CONTACT_EMAIL}</p>
          </a>
        </div>

        <form onSubmit={onSubmit} className="border border-border bg-card p-8 sm:p-12">
          <h2 className="font-display text-2xl tracking-[0.12em] uppercase">Stuur een bericht</h2>
          <div className="mt-8 space-y-8">
            <label className="block">
              <span className="eyebrow">Naam</span>
              <input required maxLength={100} className={fieldClass} value={form.naam} onChange={(e) => setForm({ ...form, naam: e.target.value })} placeholder="Je naam" />
            </label>
            <label className="block">
              <span className="eyebrow">E-mail</span>
              <input required type="email" maxLength={255} className={fieldClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jij@voorbeeld.nl" />
            </label>
            <label className="block">
              <span className="eyebrow">Bericht</span>
              <textarea required rows={5} maxLength={2000} className={fieldClass} value={form.bericht} onChange={(e) => setForm({ ...form, bericht: e.target.value })} placeholder="Vertel ons iets over jezelf en je wensen…" />
            </label>
          </div>
          <Button type="submit" variant="gold" size="xl" className="mt-10 w-full sm:w-auto">
            Verstuur bericht
          </Button>
        </form>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl items-stretch gap-12 px-5 py-24 md:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col justify-center">
            <MapPin className="size-6 text-primary" strokeWidth={1.3} />
            <p className="eyebrow mt-5">Locatie</p>
            <h2 className="mt-3 font-display text-2xl tracking-[0.12em] uppercase">Oro Del Amor</h2>
            <address className="mt-4 font-serif text-2xl leading-snug not-italic">
              {ADDRESS_CITY}
            </address>
            <p className="mt-4 font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
              UBN {UBN_NUMBER}
            </p>
            <p className="mt-6 flex items-center gap-3 font-serif text-lg text-primary italic">
              <CalendarHeart className="size-5 shrink-0" strokeWidth={1.3} />
              Bezoek uitsluitend op afspraak
            </p>
            <Button asChild variant="goldOutline" size="lg" className="mt-8 w-full sm:w-auto">
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer">
                <Navigation className="size-4" /> Routebeschrijving
              </a>
            </Button>
          </div>
          <div className="relative min-h-80 border border-border">
            <iframe
              title={`Kaart: ${ADDRESS_CITY}`}
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
