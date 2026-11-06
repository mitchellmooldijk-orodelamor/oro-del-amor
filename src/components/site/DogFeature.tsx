import type { Dog } from "@/data/dogs";
import { cn } from "@/lib/utils";

export function DogFeature({ dog, reverse = false }: { dog: Dog; reverse?: boolean }) {
  return (
    <article
      className={cn(
        "grid items-center gap-10 md:grid-cols-2 md:gap-16",
        reverse && "md:[&>*:first-child]:order-2",
      )}
    >
      <div className="relative">
        <div className="absolute -inset-3 border border-primary/30" aria-hidden="true" />
        <img
          src={dog.image}
          alt={`${dog.name}, ${dog.color} Pomeranian`}
          loading="lazy"
          width={1200}
          height={1300}
          className="relative w-full shadow-gold"
        />
      </div>

      <div>
        <p className="eyebrow">{dog.role}</p>
        <h3 className="mt-2 font-script text-7xl leading-none text-gold sm:text-8xl">{dog.name}</h3>
        <p className="mt-3 font-display text-xs tracking-[0.35em] text-muted-foreground uppercase">
          {dog.color} Pomeranian
        </p>
        <p className="mt-6 font-serif text-xl leading-relaxed text-foreground/90">{dog.description}</p>
        <p className="mt-4 font-serif text-lg text-primary italic">“{dog.tagline}”</p>

        <dl className="mt-8 grid grid-cols-2 gap-px border border-border bg-border">
          {dog.facts.map((f) => (
            <div key={f.label} className="bg-card px-4 py-3">
              <dt className="font-display text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                {f.label}
              </dt>
              <dd className="mt-1 font-serif text-lg text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
