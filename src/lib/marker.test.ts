import { describe, expect, test } from "bun:test";
import { markerPath } from "./marker";

describe("markerPath", () => {
	test("makes a closed stroke with finite coordinates at both random limits", () => {
		for (const value of [0, 0.5, 1]) {
			const path = markerPath(() => value);
			expect(path.startsWith("M ")).toBe(true);
			expect(path.endsWith(" Z")).toBe(true);
			const coordinates = path.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
			expect(coordinates.length).toBeGreaterThan(0);
			expect(coordinates.every((number) => Number.isFinite(number))).toBe(true);
			expect(Math.min(...coordinates)).toBeGreaterThanOrEqual(-2);
			expect(Math.max(...coordinates)).toBeLessThanOrEqual(104);
		}
	});

	test("changes the stroke with the random input", () => {
		expect(markerPath(() => 0)).not.toBe(markerPath(() => 1));
	});
});
