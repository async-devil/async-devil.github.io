export class Bitmap {
	/**
	 * Index example:\
	 * 0b01010101\
	 * ##76543210
	 */
	static setBit(value: number, index: number) {
		return value | (1 << index);
	}

	/**
	 * Index example:\
	 * 0b01010101\
	 * ##76543210
	 */
	static clearBit(value: number, index: number) {
		return value & ~(1 << index);
	}

	/**
	 * Index example:\
	 * 0b01010101\
	 * ##76543210
	 */
	static testBit(value: number, index: number) {
		return (value >> index) % 2 !== 0;
	}

	static getBitsByMaskAndShiftValues(value: number, mask: number, shift: number) {
		return (value >> shift) & mask;
	}
}
