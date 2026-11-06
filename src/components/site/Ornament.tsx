import { cn } from "@/lib/utils";

/** Gouden scheidingslijn met hartje in het midden, gebaseerd op het logo. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)} aria-hidden="true">
      <span className="gold-rule w-16 sm:w-24" />
      <svg viewBox="0 0 24 24" className="size-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
      <span className="gold-rule w-16 sm:w-24" />
    </div>
  );
}

export function Crown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 28"
      className={cn("h-5 w-auto text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <path d="M4 24h40M6 24 3 7l11 8 10-12 10 12 11-8-3 17" strokeLinejoin="round" />
      <circle cx="24" cy="3" r="1.6" fill="currentColor" />
      <circle cx="3" cy="7" r="1.3" fill="currentColor" />
      <circle cx="45" cy="7" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  script,
  className,
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  className?: string;
  tone?: "dark" | "beige";
}) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", tone === "beige" && "text-primary-deep")}>{eyebrow}</p>}
      <h2
        className={cn(
          "mt-4 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl",
          tone === "beige" ? "text-beige-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {script && (
        <p className={cn("mt-2 font-script text-3xl sm:text-4xl", tone === "beige" ? "text-beige-muted" : "text-gold")}>
          {script}
        </p>
      )}
      <Ornament className="mt-6" />
    </div>
  );
}
