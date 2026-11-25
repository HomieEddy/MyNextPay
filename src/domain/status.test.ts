import { describe, expect, it } from "vitest";
import { cycleStatus } from "./status";

describe("cycleStatus", () => {
  it("is healthy at or above the floor", () => {
    expect(cycleStatus(30000, 30000)).toBe("healthy");
    expect(cycleStatus(85825, 30000)).toBe("healthy");
  });

  it("is tight below the floor", () => {
    expect(cycleStatus(29999, 30000)).toBe("tight");
    expect(cycleStatus(0, 30000)).toBe("tight");
  });

  it("is a deficit below zero", () => {
    expect(cycleStatus(-1, 30000)).toBe("deficit");
  });
});
