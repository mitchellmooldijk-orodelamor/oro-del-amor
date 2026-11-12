import { WHATSAPP_URL } from "@/data/dogs";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Ronde gouden WhatsApp-knop die op elke pagina rechtsonder meeloopt. */
export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Stuur ons een WhatsApp-bericht"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden border border-primary/40 bg-background/90 px-4 py-2 font-display text-[0.65rem] tracking-[0.25em] text-primary uppercase opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 sm:block">
        WhatsApp ons
      </span>
      <span className="bg-gold shadow-glow relative overflow-hidden flex size-14 items-center justify-center rounded-full text-primary-foreground ring-1 ring-primary/50 transition-transform duration-300 group-hover:scale-105">
        <WhatsAppIcon className="relative size-7" />
        <span aria-hidden className="wa-shine pointer-events-none absolute inset-0" />
      </span>
    </a>
  );
}
