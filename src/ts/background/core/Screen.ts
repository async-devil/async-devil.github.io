import { Bitmap } from "./Bitmap";

export class Screen {
	public readonly data: Array<Uint8Array>;

	constructor(public readonly xLength: number, public readonly yLength: number) {
		this.data = [];

		for (let i = 0; i < yLength; i += 1) {
			this.data.push(new Uint8Array(xLength));
		}
	}

	public getValue(x: number, y: number) {
		return this.data[y][x];
	}

	public setValue(x: number, y: number, value: number) {
		this.data[y][x] = value;
	}

	/**
	 * @param direction 0b0000 - top, left, bottom, right
	 * @example getNextValueByDirection(2, 5, 0b1001) // returns value of 3,4 point, direction is top-right
	 */
	public getNextValueByDirection(x: number, y: number, direction = 0b0000) {
		const isRight = Bitmap.testBit(direction, 0);
		const isBottom = Bitmap.testBit(direction, 1);
		const isLeft = Bitmap.testBit(direction, 2);
		const isTop = Bitmap.testBit(direction, 3);

		// x - 0 + 1 if direction is right
		const nx = x - +isLeft + +isRight;
		const ny = y - +isTop + +isBottom;

		if (nx < 0 || nx >= this.xLength) return null;
		if (ny < 0 || ny >= this.yLength) return null;

		return this.getValue(nx, ny);
	}
}
