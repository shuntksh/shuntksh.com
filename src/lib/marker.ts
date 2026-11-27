/** Make a broad chisel-tip stroke with small changes in pressure and direction. */
export function markerPath(random: () => number = Math.random): string {
	const offset = (): number => (random() - 0.5) * 3;
	const top = 8 + offset();
	const bottom = 28 + offset();
	return `M 2 ${top + 2} Q 25 ${top - 2 + offset()} 50 ${top + offset()} T 102 ${top - 1 + offset()} L 99 ${bottom - 1} Q 74 ${bottom + 2 + offset()} 50 ${bottom + offset()} T -1 ${bottom + offset()} Z`;
}

/** Repeatable pseudo-random numbers in [0, 1), for build output that must not change between runs. */
export function seededRandom(seed: number): () => number {
	let state = seed >>> 0;
	return (): number => {
		state = (state + 0x6d2b79f5) >>> 0;
		let value = state;
		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
		return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
	};
}
