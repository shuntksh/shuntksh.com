export interface Trip {
	text: string;
	country?: string;
	description: string;
	source?: string;
	done: boolean;
	year?: number;
	note?: string;
}

/** Sort a copy so the data file can use any entry order. */
export function sortTrips(trips: readonly Trip[]): Trip[] {
	return [...trips].sort((first, second) => first.text.localeCompare(second.text, "en"));
}

export function strikePath(random: () => number = Math.random): string {
	const y = (): string => (4 + random() * 4).toFixed(2);
	return `M 1 ${y()} Q 24 ${y()} 49 ${y()} T 99 ${y()}`;
}
