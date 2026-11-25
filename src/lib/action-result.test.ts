import { describe, expect, it } from "vitest";
import { toActionResult } from "./action-result";

describe("toActionResult", () => {
  it("keeps the first message for each field", () => {
    const result = toActionResult({
      validationErrors: { fieldErrors: { amount: ["Too low", "Other"] } },
    });
    expect(result).toEqual({
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: { amount: "Too low" },
    });
  });

  it("passes server errors and data through", () => {
    expect(toActionResult({ serverError: "Boom" })).toEqual({
      ok: false,
      error: "Boom",
    });
    expect(toActionResult({ data: { ok: false, error: "Gone" } })).toEqual({
      ok: false,
      error: "Gone",
    });
    expect(toActionResult({ data: undefined })).toEqual({ ok: true });
  });
});
