import { describe, expect, it } from "vitest";
import { MAPS_DIRECTIONS_URL, PHONE_DISPLAY, UBN_NUMBER, WHATSAPP_MESSAGE, WHATSAPP_URL } from "@/data/dogs";
import { puppyFaq, studFaq } from "@/data/faq";

describe("contact details", () => {
  it("WhatsApp opens a chat with 06 16 19 11 98", () => {
    expect(PHONE_DISPLAY).toBe("06 16 19 11 98");
    expect(WHATSAPP_URL.startsWith("https://wa.me/31616191198?text=")).toBe(true);
  });

  it("Google Maps route points to Mantaro 7, 2911 JE Nieuwerkerk aan den IJssel", () => {
    const destination = new URL(MAPS_DIRECTIONS_URL).searchParams.get("destination");
    expect(destination).toBe("Mantaro 7, 2911 JE Nieuwerkerk aan den IJssel");
  });
});

describe("kennel registration", () => {
  it("shows UBN 8976923", () => {
    expect(UBN_NUMBER).toBe("8976923");
  });

  it("WhatsApp greeting uses the kennel name Oro Del Amor", () => {
    expect(WHATSAPP_MESSAGE).toContain("Oro Del Amor");
    expect(WHATSAPP_MESSAGE).not.toContain("Poms de Oro");
  });
});

describe("FAQ", () => {
  it("has 11 puppy questions and 3 stud questions under #dekreu", () => {
    expect(puppyFaq.items).toHaveLength(11);
    expect(studFaq.items).toHaveLength(3);
    expect(studFaq.id).toBe("dekreu");
  });
});
