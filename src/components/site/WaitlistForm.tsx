import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/data/dogs";
import {
  experienceOptions,
  hoursAloneOptions,
  housingOptions,
  sexOptions,
  waitlistSchema,
} from "@/data/waitlist";
import { submitWaitlist } from "@/lib/waitlist.functions";
import { cn } from "@/lib/utils";

const field =
  "mt-3 w-full border border-border bg-background px-3 font-serif text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none";
const labelText = "font-display text-[0.7rem] tracking-[0.25em] text-primary uppercase";

function Field({ label, hint, children, className }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className={labelText}>{label}</span>
      {children}
      {hint && <span className="mt-2 block font-serif text-base text-muted-foreground">{hint}</span>}
    </label>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-10 first:border-t-0 first:pt-0">
      <legend className="flex items-baseline gap-3">
        <span className="font-script text-3xl text-gold">{n}</span>
        <span className="font-display text-lg tracking-[0.15em] uppercase">{title}</span>
      </legend>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function YesNo({ name, value, onChange }: { name: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="mt-3 flex gap-2" role="radiogroup">
      {[
        { v: true, l: "Ja" },
        { v: false, l: "Nee" },
      ].map((o) => (
        <button
          key={o.l}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          name={name}
          onClick={() => onChange(o.v)}
          className={cn(
            "h-12 min-w-24 border px-5 font-sans text-sm transition-colors",
            value === o.v
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

export function WaitlistForm() {
  const send = useServerFn(submitWaitlist);
  const [hasGarden, setHasGarden] = useState<boolean | null>(null);
  const [puppyCourse, setPuppyCourse] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const s = (k: string) => String(fd.get(k) ?? "");
    if (hasGarden === null) return setError("Geef aan of je een tuin hebt.");
    if (puppyCourse === null) return setError("Geef aan of je een puppycursus wilt volgen.");
    const parsed = waitlistSchema.safeParse({
      fullName: s("fullName"),
      email: s("email"),
      phone: s("phone"),
      city: s("city"),
      housing: s("housing"),
      hasGarden,
      household: s("household"),
      otherPets: s("otherPets"),
      hoursAlone: s("hoursAlone"),
      dailyRhythm: s("dailyRhythm"),
      experience: s("experience"),
      sexPreference: s("sexPreference") || "Geen voorkeur",
      colorPreference: s("colorPreference"),
      timeframe: s("timeframe"),
      motivation: s("motivation"),
      puppyCourse,
      consent: fd.get("consent") === "on",
      website: s("website"),
    });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Controleer je antwoorden.");

    setLoading(true);
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) {
        setDone(true);
        requestAnimationFrame(() => document.getElementById("aanmelding")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      } else setError(res.error);
    } catch {
      setError("Het versturen is niet gelukt. Probeer het later opnieuw of stuur ons een WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="animate-rise border border-primary/40 bg-card p-10 text-center sm:p-14">
        <Check className="mx-auto size-10 text-primary" strokeWidth={1.25} />
        <h3 className="mt-6 font-display text-2xl tracking-[0.1em] uppercase">Bedankt voor je aanmelding</h3>
        <p className="mt-2 font-script text-4xl text-gold">we lezen het met liefde</p>
        <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-muted-foreground">
          We hebben je antwoorden goed ontvangen. Mitchell en Jill lezen ze persoonlijk door en nemen contact met je op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10 border border-border bg-card p-6 sm:p-10">
      <Step n="I" title="Over jou">
        <Field label="Naam *">
          <input name="fullName" required maxLength={100} autoComplete="name" className={cn(field, "h-12")} />
        </Field>
        <Field label="Woonplaats *">
          <input name="city" required maxLength={100} autoComplete="address-level2" className={cn(field, "h-12")} />
        </Field>
        <Field label="E-mailadres *">
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={cn(field, "h-12")} />
        </Field>
        <Field label="Telefoon (optioneel)">
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" className={cn(field, "h-12")} />
        </Field>
      </Step>

      <Step n="II" title="Woonsituatie">
        <Field label="Type woning *">
          <select name="housing" required defaultValue="" className={cn(field, "h-12")}>
            <option value="" disabled>
              Maak een keuze
            </option>
            {housingOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <div>
          <span className={labelText}>Heb je een tuin? *</span>
          <YesNo name="hasGarden" value={hasGarden} onChange={setHasGarden} />
        </div>
        <Field label="Wie wonen er in huis? *" hint="Bijvoorbeeld: 2 volwassenen en 2 kinderen van 6 en 9 jaar." className="sm:col-span-2">
          <textarea name="household" required maxLength={500} rows={2} className={cn(field, "py-3")} />
        </Field>
        <Field label="Andere huisdieren (optioneel)" className="sm:col-span-2">
          <input name="otherPets" maxLength={300} placeholder="Bijvoorbeeld een kat of een andere hond" className={cn(field, "h-12")} />
        </Field>
      </Step>

      <Step n="III" title="Leefritme">
        <Field label="Hoe lang is de pup alleen thuis? *">
          <select name="hoursAlone" required defaultValue="" className={cn(field, "h-12")}>
            <option value="" disabled>
              Maak een keuze
            </option>
            {hoursAloneOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <div className="hidden sm:block" />
        <Field label="Hoe ziet een gewone dag bij jullie eruit? (optioneel)" hint="Werk, school, wandelmomenten en weekenden." className="sm:col-span-2">
          <textarea name="dailyRhythm" maxLength={800} rows={3} className={cn(field, "py-3")} />
        </Field>
      </Step>

      <Step n="IV" title="Ervaring & wensen">
        <Field label="Ervaring met honden *">
          <select name="experience" required defaultValue="" className={cn(field, "h-12")}>
            <option value="" disabled>
              Maak een keuze
            </option>
            {experienceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Voorkeur reu of teef">
          <select name="sexPreference" defaultValue="Geen voorkeur" className={cn(field, "h-12")}>
            {sexOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Voorkeur kleur (optioneel)">
          <input name="colorPreference" maxLength={100} placeholder="Bijvoorbeeld cream of black & tan" className={cn(field, "h-12")} />
        </Field>
        <Field label="Wanneer zou je een pup willen? (optioneel)">
          <input name="timeframe" maxLength={100} placeholder="Bijvoorbeeld voorjaar 2027" className={cn(field, "h-12")} />
        </Field>
        <Field label="Waarom kies je voor een Pomeranian? *" className="sm:col-span-2">
          <textarea name="motivation" required maxLength={2000} rows={4} className={cn(field, "py-3")} />
        </Field>
        <div className="sm:col-span-2">
          <span className={labelText}>Wil je met je pup een puppycursus volgen? *</span>
          <YesNo name="puppyCourse" value={puppyCourse} onChange={setPuppyCourse} />
        </div>
      </Step>

      {/* Verborgen veld tegen spam */}
      <div className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 border-t border-border pt-8 font-serif text-lg text-muted-foreground">
        <input name="consent" type="checkbox" required className="mt-1.5 size-4 shrink-0 accent-primary" />
        <span>
          Ik geef Oro Del Amor toestemming om mijn antwoorden te bewaren, zodat ze contact met mij kunnen opnemen over de wachtlijst. *
        </span>
      </label>

      <div className="flex flex-col items-center gap-4">
        <Button type="submit" variant="gold" size="xl" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Bezig met versturen…" : "Aanmelding versturen"}
        </Button>
        {error && (
          <p role="alert" className="text-center font-serif text-lg text-destructive">
            {error}
          </p>
        )}
        <p className="text-center font-serif text-base text-muted-foreground">
          Liever eerst even kennismaken?{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">
            Stuur ons een WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  );
}
