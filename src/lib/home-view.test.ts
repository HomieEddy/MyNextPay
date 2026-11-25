import { describe, expect, it } from "vitest";
import { MAX_OFFSET, MIN_OFFSET, offsetHref, parseOffset } from "./home-view";

describe("parseOffset", () => {
  it("reads a cycle offset from the search param", () => {
    expect(parseOffset("-1")).toBe(-1);
    expect(parseOffset("2")).toBe(2);
  });

  it("falls back to the current cycle for missing or out-of-range values", () => {
    expect(parseOffset(undefined)).toBe(0);
    expect(parseOffset("abc")).toBe(0);
    expect(parseOffset("1.5")).toBe(0);
    expect(parseOffset(String(MAX_OFFSET + 1))).toBe(0);
    expect(parseOffset(String(MIN_OFFSET - 1))).toBe(0);
    expect(parseOffset(["1", "2"])).toBe(0);
  });
});

describe("offsetHref", () => {
  it("links the current cycle to the home page", () => {
    expect(offsetHref(0)).toBe("/");
  });

  it("links other cycles with the search param", () => {
    expect(offsetHref(-1)).toBe("/?c=-1");
    expect(offsetHref(1)).toBe("/?c=1");
  });

  it("returns null past the navigation limits", () => {
    expect(offsetHref(MAX_OFFSET + 1)).toBeNull();
    expect(offsetHref(MIN_OFFSET - 1)).toBeNull();
  });
});
