import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/wie-zijn-wij", label: "Wie zijn wij" },
  { to: "/onze-honden", label: "Onze honden" },
  { to: "/pups", label: "Pups" },
  { to: "/het-ras", label: "Het ras" },
  { to: "/over-ons", label: "Ons verhaal" },
  { to: "/faq", label: "Veelgestelde vragen" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20">
        <Link to="/" className="group flex flex-col items-center leading-none" onClick={() => setOpen(false)}>
          <span className="font-script text-3xl text-gold sm:text-4xl">Oro Del Amor</span>
          <span className="mt-0.5 pl-[0.5em] text-center font-display text-[0.55rem] tracking-[0.5em] text-muted-foreground uppercase">
            Pomeranians
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="font-display text-[0.7rem] tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-primary data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="text-primary lg:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="animate-rise border-t border-border bg-background lg:hidden">
          <ul className="flex flex-col px-5 py-4">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/50 py-4 font-display text-sm tracking-[0.25em] text-foreground uppercase data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
