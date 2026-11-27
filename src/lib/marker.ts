/** Make a broad chisel-tip stroke with small changes in pressure and direction. */
export function markerPath(random: () => number = Math.random): string {
	const offset = (): number => (random() - 0.5) * 3;
	const top = 8 + offset();
	const bottom = 28 + offset();
	return `M 2 ${top + 2} Q 25 ${top - 2 + offset()} 50 ${top + offset()} T 102 ${top - 1 + offset()} L 99 ${bottom - 1} Q 74 ${bottom + 2 + offset()} 50 ${bottom + offset()} T -1 ${bottom + offset()} Z`;
}
