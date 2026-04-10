import { describe, expect, it } from "vitest";
import {
  parseTimeToMinutes,
  minutesToHHMM,
  minutesToDuration,
  MIN_INTERJORNADA_HORAS,
  MAX_HORA_EXTRA_HORAS
} from "./time";

describe("time utils", () => {
  it("parse HH:MM to minutes", () => {
    expect(parseTimeToMinutes("09:30")).toBe(570);
  });

  it("returns null for invalid time", () => {
    expect(parseTimeToMinutes("ab:cd")).toBeNull();
  });

  it("normalizes HH:MM for values above one day", () => {
    expect(minutesToHHMM(1500)).toBe("01:00");
  });

  it("formats duration", () => {
    expect(minutesToDuration(125)).toBe("2h 05min");
  });

  it("exposes CLT constants used by calculators", () => {
    expect(MIN_INTERJORNADA_HORAS).toBe(11);
    expect(MAX_HORA_EXTRA_HORAS).toBe(12);
  });
});
