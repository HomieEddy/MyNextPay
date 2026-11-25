import { z } from "zod";
import { parseAmount } from "@/domain/money";

function amount(minimum: "positive" | "nonnegative") {
  const message =
    minimum === "positive"
      ? "Enter an amount above $0."
      : "Enter an amount, or 0.";
  return z.string().transform((value, ctx) => {
    const cents = parseAmount(value);
    if (cents === null || (minimum === "positive" && cents === 0)) {
      ctx.addIssue({ code: "custom", message });
      return z.NEVER;
    }
    return cents;
  });
}

export const positiveAmount = amount("positive");
export const nonnegativeAmount = amount("nonnegative");
