import { describe, expect, it } from "vitest";
import { createPasswordSchema } from "./schemas";

describe("createPasswordSchema", () => {
  it("accepts matching passwords of 8+ characters", () => {
    expect(
      createPasswordSchema.safeParse({
        password: "Homelab26",
        confirm: "Homelab26",
      }).success,
    ).toBe(true);
  });

  it("rejects short passwords", () => {
    expect(
      createPasswordSchema.safeParse({ password: "short", confirm: "short" })
        .success,
    ).toBe(false);
  });

  it("rejects passwords that don't match", () => {
    const result = createPasswordSchema.safeParse({
      password: "Homelab26",
      confirm: "Homelab27",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["confirm"]);
  });
});
