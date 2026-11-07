import { describe, expect, it } from "vitest";
import { dogs } from "@/data/dogs";

const byName = (name: string) => dogs.find((d) => d.name === name)!;
const fact = (name: string, label: string) => byName(name).facts.find((f) => f.label === label)?.value;

describe("dog profiles", () => {
  it("Luna comes from kennel Poms Jewels of my heart", () => {
    expect(byName("Luna").origin).toBe("Poms Jewels of my heart");
  });

  it("Luna was born on 18-10-2025", () => {
    expect(fact("Luna", "Geboortedatum")).toBe("18-10-2025");
  });

  it("Nacho and Luna are both listed as tested on patella and SM/CM", () => {
    expect(fact("Nacho", "Gezondheid")).toBe("Getest op patella en SM/CM");
    expect(fact("Luna", "Gezondheid")).toBe("Getest op patella en SM/CM");
  });

  it("no dog shows a DNA-testen field anymore", () => {
    expect(dogs.flatMap((d) => d.facts.map((f) => f.label))).not.toContain("DNA-testen");
  });
});
