import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Instagram, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/dogs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Corazón de Oro Pomeranians" },
      {
        name: "description",
        content: "Neem contact op met kennel Corazón de Oro voor vragen over onze Pomeranians of de wachtlijst.",
      },
      { property: "og:title", content: "Contact — Corazón de Oro" },
      { property: "og:description", content: "Vragen over onze Pomeranians of de wachtlijst? Neem contact op." },
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
    </>
  );
}
