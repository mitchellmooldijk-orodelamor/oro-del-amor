import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { DogFeature } from "@/components/site/DogFeature";
import { Ornament } from "@/components/site/Ornament";
import { dogs } from "@/data/dogs";

export const Route = createFileRoute("/onze-honden")({
  head: () => ({
    meta: [
      { title: "Onze honden — Nacho & Luna | Poms de Oro" },
      {
        name: "description",
        content: "Maak kennis met Nacho, onze black-tan dekreu, en Luna, onze crèmekleurige moederhond. Beiden met FCI-stamboom.",
      },
      { property: "og:title", content: "Onze honden — Nacho & Luna" },
      { property: "og:description", content: "De ouderdieren van kennel Poms de Oro, met FCI-stamboom." },
    ],
  }),
  component: OnzeHonden,
});

function OnzeHonden() {
  return (
    <>
      <PageHero
        eyebrow="Onze honden"
        title="Het hart van de kennel"
        script="Nacho & Luna"
        intro="Twee bijzondere Pomeranians met een FCI-stamboom, prachtige vacht en een karakter van goud."
      />
      <div className="mx-auto max-w-6xl space-y-28 px-5 py-24">
        {dogs.map((dog, i) => (
          <div key={dog.slug}>
            <DogFeature dog={dog} reverse={i % 2 === 1} />
            {i < dogs.length - 1 && <Ornament className="mt-28" />}
          </div>
        ))}
      </div>
    </>
  );
}
