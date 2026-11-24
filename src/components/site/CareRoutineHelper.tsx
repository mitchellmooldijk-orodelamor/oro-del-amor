import { Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CARE_DISCLAIMER, ageChoices, focusOptions, getAgeStage, type FocusId } from "@/data/care";
import { buildCareRoutine, type CareRoutineResult } from "@/lib/care-routine";
import { cn } from "@/lib/utils";

export function CareRoutineHelper() {
  const [ageMonths, setAgeMonths] = useState(3);
  const [dogName, setDogName] = useState("");
  const [focus, setFocus] = useState<FocusId[]>([]);
  const [result, setResult] = useState<CareRoutineResult | null>(null);

  const stage = getAgeStage(ageMonths);

  function toggleFocus(id: FocusId) {
    setFocus((v) => (v.includes(id) ? v.filter((f) => f !== id) : [...v, id]));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setResult(buildCareRoutine({ ageMonths, dogName, focus }));
    requestAnimationFrame(() =>
      document.getElementById("jouw-routine")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="border border-border bg-card p-6 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="font-display text-[0.7rem] tracking-[0.25em] text-primary uppercase">
              Leeftijd van je Pomeranian
            </span>
            <select
              value={ageMonths}
              onChange={(e) => setAgeMonths(Number(e.target.value))}
              className="mt-3 h-12 w-full border border-border bg-background px-3 font-serif text-lg text-foreground focus:border-primary focus:outline-none"
            >
              {ageChoices.map((c) => (
                <option key={c.months} value={c.months}>
                  {c.label}
                </option>
              ))}
            </select>
            <span className="mt-2 block font-serif text-base text-muted-foreground">
              Levensfase: {stage.label} ({stage.range})
            </span>
          </label>

          <label className="block">
            <span className="font-display text-[0.7rem] tracking-[0.25em] text-primary uppercase">
              Naam (optioneel)
            </span>
            <input
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              maxLength={30}
              placeholder="Bijvoorbeeld Nacho"
              className="mt-3 h-12 w-full border border-border bg-background px-3 font-serif text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </label>
        </div>

        <fieldset className="mt-8">
          <legend className="font-display text-[0.7rem] tracking-[0.25em] text-primary uppercase">
            Extra aandacht voor (optioneel)
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {focusOptions.map((f) => {
              const active = focus.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleFocus(f.id)}
                  className={cn(
                    "border px-4 py-2 font-sans text-sm transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Button type="submit" variant="gold" size="xl">
            <Sparkles />
            Maak mijn dagroutine
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center font-serif text-base text-muted-foreground italic">{CARE_DISCLAIMER}</p>

      {result && (
        <section id="jouw-routine" aria-live="polite" className="animate-rise mt-16 scroll-mt-28">
          <p className="eyebrow text-center">{result.stageLabel}</p>
          <h3 className="mt-3 text-center font-display text-2xl tracking-[0.08em] uppercase sm:text-3xl">
            {result.routine.title}
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-center font-serif text-xl leading-relaxed text-muted-foreground">
            {result.routine.intro}
          </p>

          <ol className="mt-12 space-y-px border border-border bg-border">
            {result.routine.moments.map((m) => (
              <li key={`${m.label}-${m.time}`} className="grid gap-4 bg-background p-6 sm:grid-cols-[11rem_1fr] sm:p-8">
                <div>
                  <p className="font-display text-sm tracking-[0.2em] text-primary uppercase">{m.label}</p>
                  <p className="mt-1 font-script text-3xl text-gold">{m.time}</p>
                </div>
                <ul className="space-y-4">
                  {m.tasks.map((t) => (
                    <li key={t.task}>
                      <p className="font-serif text-xl text-foreground">{t.task}</p>
                      <p className="mt-1 font-serif text-base text-muted-foreground">{t.tip}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {result.routine.weekly.length > 0 && (
            <div className="mt-10 bg-beige p-6 text-beige-foreground sm:p-8">
              <p className="eyebrow text-primary-deep">Niet elke dag, wel regelmatig</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 font-serif text-lg">
                {result.routine.weekly.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-10 text-center font-script text-3xl text-gold">{result.routine.kennelNote}</p>
          <p className="mt-6 text-center font-serif text-base text-muted-foreground italic">{CARE_DISCLAIMER}</p>
        </section>
      )}
    </div>
  );
}
