import { expect, test } from "bun:test";
import { sortTrips, strikePath, type Trip } from "./checklist";

test("sorts trail names without changing the source list or trip details", () => {
	const trips: Trip[] = [
		{ text: "Z Trail", description: "Last trail", done: false },
		{
			text: "Alta Via 2",
			description: "First trail",
			done: true,
			year: 2022,
			note: "Hiked it.",
		},
	];
	const sorted = sortTrips(trips);
	expect(sorted.map((trip) => trip.text)).toEqual(["Alta Via 2", "Z Trail"]);
	expect(trips[0]?.text).toBe("Z Trail");
	expect(sorted[0]).toBe(trips[1]);
	expect(sortTrips([])).toEqual([]);
});

test("varies the hand-drawn strike without invalid coordinates", () => {
	expect(strikePath(() => 0)).toBe("M 1 4.00 Q 24 4.00 49 4.00 T 99 4.00");
	expect(strikePath(() => 1)).not.toBe(strikePath(() => 0));
});
