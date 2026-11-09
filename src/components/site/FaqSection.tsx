import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqGroup } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqSection({
  group,
  open,
  onOpenChange,
  className,
}: {
  group: FaqGroup;
  open: string[];
  onOpenChange: (value: string[]) => void;
  className?: string;
}) {
  return (
    <div id={group.id} className={cn("scroll-mt-28", className)}>
      <p className="eyebrow">{group.eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl tracking-[0.1em] uppercase sm:text-3xl">{group.title}</h3>
      <Accordion type="multiple" value={open} onValueChange={onOpenChange} className="mt-8 border-t border-border">
        {group.items.map((item, i) => (
          <AccordionItem key={item.id} value={item.id} className="border-border">
            <AccordionTrigger className="gap-6 py-6 font-serif text-xl text-foreground hover:text-primary hover:no-underline sm:text-2xl [&>svg]:size-5 [&>svg]:text-primary">
              <span className="flex items-baseline gap-4">
                <span className="font-display text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-8 pl-0 font-serif text-lg leading-relaxed text-muted-foreground sm:pl-10">
              {item.answer.map((block, j) =>
                block.type === "p" ? (
                  <p key={j}>{block.text}</p>
                ) : (
                  <div key={j}>
                    {block.intro && <p>{block.intro}</p>}
                    <ul className="mt-3 space-y-3">
                      {block.items.map((li, k) => (
                        <li key={k} className="flex gap-3">
                          <span className="mt-3 size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                          <span>
                            {li.lead && <strong className="font-semibold text-foreground">{li.lead}: </strong>}
                            {li.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
