import { describe, expect, it } from "vitest";
import {
  clearFailedLogins,
  isLoginBlocked,
  recordFailedLogin,
} from "./login-limiter";

describe("login limiter", () => {
  it("blocks after five failures within fifteen minutes", () => {
    for (let i = 0; i < 5; i++) recordFailedLogin("ip-a", 1000 + i);
    expect(isLoginBlocked("ip-a", 2000)).toBe(true);
  });

  it("forgets failures older than the window", () => {
    for (let i = 0; i < 5; i++) recordFailedLogin("ip-b", 0);
    expect(isLoginBlocked("ip-b", 16 * 60 * 1000)).toBe(false);
  });

  it("clears on success", () => {
    for (let i = 0; i < 5; i++) recordFailedLogin("ip-c", 0);
    clearFailedLogins("ip-c");
    expect(isLoginBlocked("ip-c", 1)).toBe(false);
  });
});
