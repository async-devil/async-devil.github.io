export function randomIntArbitrary(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isInRange(value: number, min: number, max: number) {
	return value <= max && value >= min;
}
