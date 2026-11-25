import { describe, expect, it } from "vitest";
import { splitMoney } from "./split-money";

describe("splitMoney", () => {
  it("splits dollars from cents", () => {
    expect(splitMoney(85825)).toEqual({ whole: "$858", fraction: ".25" });
    expect(splitMoney(123456700)).toEqual({
      whole: "$1,234,567",
      fraction: ".00",
    });
  });

  it("keeps the minus sign on the dollars", () => {
    expect(splitMoney(-4250).whole).toBe("-$42");
    expect(splitMoney(-4250).fraction).toBe(".50");
  });
});
