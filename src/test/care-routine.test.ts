import { describe, expect, it } from "vitest";
import { ageChoices, focusOptions } from "@/data/care";
import { buildCareRoutine } from "@/lib/care-routine";

const allTasks = (r: ReturnType<typeof buildCareRoutine>) =>
  r.routine.moments.flatMap((m) => m.tasks.map((t) => t.task));

describe("verzorgingsroutine", () => {
  it("maakt voor elke leeftijd een routine zonder lege dagdelen", () => {
    for (const { months } of ageChoices) {
      const r = buildCareRoutine({ ageMonths: months, focus: [] });
      expect(r.routine.moments.length).toBeGreaterThanOrEqual(3);
      for (const m of r.routine.moments) expect(m.tasks.length).toBeGreaterThan(0);
    }
  });

  it("rekent voor een pup 5 minuten wandelen per levensmaand", () => {
    const r = buildCareRoutine({ ageMonths: 3, focus: [] });
    expect(r.stageLabel).toContain("Pup");
    expect(allTasks(r)).toContain("Korte wandeling van ongeveer 15 minuten");
  });

  it("kiest de levensfase bij de leeftijd", () => {
    expect(buildCareRoutine({ ageMonths: 8, focus: [] }).stageLabel).toContain("Jonge hond");
    expect(buildCareRoutine({ ageMonths: 36, focus: [] }).stageLabel).toContain("Volwassen");
    expect(buildCareRoutine({ ageMonths: 120, focus: [] }).stageLabel).toContain("Senior");
  });

  it("voegt per gekozen aandachtspunt extra taken toe, in elke levensfase", () => {
    for (const months of [3, 8, 36, 120]) {
      const base = allTasks(buildCareRoutine({ ageMonths: months, focus: [] })).length;
      for (const f of focusOptions) {
        const withFocus = allTasks(buildCareRoutine({ ageMonths: months, focus: [f.id] })).length;
        expect(withFocus, `${months} maanden, ${f.id}`).toBeGreaterThan(base);
      }
    }
  });

  it("gebruikt de naam van de hond en schoont die op", () => {
    const r = buildCareRoutine({ ageMonths: 24, dogName: " Nacho<script> ", focus: [] });
    expect(r.routine.title).toBe("Dagroutine voor Nachoscript");
  });
});
