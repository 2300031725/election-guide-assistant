import { checkAge, validateState, getDaysUntilElection } from "../utils";

describe("checkAge", () => {
  it("18+ eligible to vote", () => {
    expect(checkAge(18)).toBe(true);
    expect(checkAge(45)).toBe(true);
    expect(checkAge("21")).toBe(true);
  });

  it("Under 18 not eligible", () => {
    expect(checkAge(17)).toBe(false);
    expect(checkAge(0)).toBe(false);
  });

  it("Invalid age returns false", () => {
    expect(checkAge("invalid")).toBe(false);
    expect(checkAge(-5)).toBe(false);
  });
});

describe("validateState", () => {
  it("Valid state returns true", () => {
    expect(validateState("Andhra Pradesh")).toBe(true);
    expect(validateState("telangana ")).toBe(true);
  });

  it("Empty state returns error", () => {
    expect(validateState("")).toBe(false);
    expect(validateState("   ")).toBe(false);
  });

  it("Invalid state returns false", () => {
    expect(validateState("New York")).toBe(false);
  });
});
