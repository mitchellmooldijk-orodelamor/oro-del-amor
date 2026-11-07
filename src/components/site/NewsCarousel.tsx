import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { news } from "@/data/news";

const arrow =
  "static size-11 translate-y-0 rounded-none border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30";

export function NewsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: "start" }} className="mt-14" aria-label="Nieuwsberichten">
      <CarouselContent className="-ml-6">
        {news.map((item) => (
          <CarouselItem key={item.id} className="basis-[86%] pl-6 sm:basis-1/2 lg:basis-1/3">
            <article className="flex h-full flex-col border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">
                  {item.category}
                  {item.date && <span className="text-muted-foreground"> · {item.date}</span>}
                </p>
                <h3 className="mt-3 font-display text-lg tracking-[0.1em] uppercase">{item.title}</h3>
                <p className="mt-3 flex-1 font-serif text-lg leading-relaxed text-muted-foreground">{item.text}</p>
                {item.link && (
                  <Link
                    to={item.link.to}
                    className="mt-5 self-start font-display text-[0.65rem] tracking-[0.3em] text-primary uppercase underline decoration-primary/50 underline-offset-8 hover:decoration-primary"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-hidden="true">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-0.5 w-8 transition-colors",
                i === current ? "bg-primary" : "bg-border hover:bg-primary/50",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <CarouselPrevious className={arrow} aria-label="Vorig bericht" />
          <CarouselNext className={arrow} aria-label="Volgend bericht" />
        </div>
      </div>
    </Carousel>
  );
}
