import { Bitmap } from "./Bitmap";

export class BitmapColors {
	static readonly firstTwoBitMask = 0b11;
	/** Produces 0, 85, 170, 255 from two bit values */
	static readonly colorMultiplier = 85;

	static readonly firstSixBitMask = 0b111111;
	/** Produces 0, 4 ... 248, 252 from six bit values */
	static readonly grayscaleMultiplier = 4;

	/** Get 0b00111111 bits and convert to 8bit value */
	static getGrayscaleValue(value: number) {
		return this.grayscaleMultiplier * Bitmap.getBitsByMaskAndShiftValues(value, 0b111111, 0);
	}

	/** Get 0b11000000 bits */
	static getInfoBitsValue(value: number) {
		return Bitmap.getBitsByMaskAndShiftValues(value, 0b11, 6);
	}

	/** Get 0b00110000 bits and convert to RGB value */
	static getRedCGABitsValue(value: number) {
		return this.colorMultiplier * Bitmap.getBitsByMaskAndShiftValues(value, 0b11, 4);
	}

	/** Get 0b00001100 bits and convert to RGB value */
	static getBlueCGABitsValue(value: number) {
		return this.colorMultiplier * Bitmap.getBitsByMaskAndShiftValues(value, 0b11, 2);
	}

	/** Get 0b00000011 bits and convert to RGB value */
	static getGreenCGABitsValue(value: number) {
		return this.colorMultiplier * Bitmap.getBitsByMaskAndShiftValues(value, 0b11, 0);
	}
}
