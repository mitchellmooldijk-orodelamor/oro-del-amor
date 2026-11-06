import { Crown, Ornament } from "./Ornament";

export function PageHero({ eyebrow, title, script, intro }: { eyebrow: string; title: string; script: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-night absolute inset-0" aria-hidden="true" />
      <div className="sparkle animate-twinkle absolute inset-0" aria-hidden="true" />
      <div className="animate-rise relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
        <Crown className="mx-auto h-6" />
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl tracking-[0.08em] uppercase sm:text-5xl">{title}</h1>
        <p className="mt-3 font-script text-4xl text-gold sm:text-5xl">{script}</p>
        <Ornament className="mt-6" />
        {intro && (
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-muted-foreground">{intro}</p>
        )}
      </div>
    </section>
  );
}
