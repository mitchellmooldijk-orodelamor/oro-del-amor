import { describe, expect, it } from "vitest";
import { contactSchema } from "@/data/contact";

const valid = { name: "Test Persoon", email: "test@example.com", message: "Hallo!" };

describe("contactformulier", () => {
  it("accepts name, e-mail and message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("requires a valid e-mail address", () => {
    expect(contactSchema.safeParse({ ...valid, email: "geen-email" }).success).toBe(false);
  });
  it("rejects an empty message and messages over 2000 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "  " }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(2001) }).success).toBe(false);
  });
});
