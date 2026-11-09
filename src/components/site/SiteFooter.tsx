import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/dogs";
import { Crown, Ornament } from "./Ornament";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="sparkle pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 text-center">
        <Crown className="mx-auto h-6" />
        <p className="mt-3 font-script text-5xl text-gold">Poms de Oro</p>
        <p className="mt-2 font-display text-[0.65rem] tracking-[0.5em] text-muted-foreground uppercase">
          Pomeranians
        </p>
        <Ornament className="mt-8" />
        <p className="mt-6 font-display text-[0.65rem] tracking-[0.3em] text-primary uppercase">
          Breeding with love · Excellence · Passion
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-serif text-lg text-foreground transition-colors hover:text-primary"
          >
            <Instagram className="size-4 text-primary" /> @{INSTAGRAM_HANDLE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 font-serif text-lg text-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4 text-primary" /> {CONTACT_EMAIL}
          </a>
        </div>

        <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { to: "/wie-zijn-wij", label: "Wie zijn wij" },
            { to: "/onze-honden", label: "Onze honden" },
            { to: "/pups", label: "Pups" },
            { to: "/over-ons", label: "Ons verhaal" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="mt-10 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Poms de Oro Pomeranians
        </p>
      </div>
    </footer>
  );
}
