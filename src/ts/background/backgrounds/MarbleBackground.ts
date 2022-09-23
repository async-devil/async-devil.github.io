import { isInRange, randomIntArbitrary } from "../../utils";
import { Config } from "../config";
import { Bitmap } from "../core/Bitmap";
import { BitmapColors } from "../core/BitmapColors";
import { Screen } from "../core/Screen";
import { IBackground } from "../IBackground";

export class MarbleBackground implements IBackground {
	constructor(
		protected readonly context: CanvasRenderingContext2D,
		protected readonly screen: Screen,
		protected readonly config: Config
	) {
		this.fill();
	}

	private readonly minColor = 5;
	private readonly maxColor = this.minColor + 5;

	private fill() {
		for (let y = 0; y < this.screen.yLength; y += 1) {
			for (let x = 0; x < this.screen.xLength; x += 1) {
				this.screen.setValue(x, y, randomIntArbitrary(this.minColor, this.maxColor));
			}
		}
	}

	private operatePoint(x: number, y: number) {
		const nearbyPointsValue = [
			this.screen.getNextValueByDirection(x, y, 0b1000),
			this.screen.getNextValueByDirection(x, y, 0b1001),
			this.screen.getNextValueByDirection(x, y, 0b0001),
			this.screen.getNextValueByDirection(x, y, 0b0011),
			this.screen.getNextValueByDirection(x, y, 0b0010),
			this.screen.getNextValueByDirection(x, y, 0b0110),
			this.screen.getNextValueByDirection(x, y, 0b0100),
			this.screen.getNextValueByDirection(x, y, 0b1100),
		];

		const point = this.screen.getValue(x, y);
		const pointValue = Bitmap.getBitsByMaskAndShiftValues(point, 0b111111, 0);

		const selectedPoints: number[] = nearbyPointsValue
			.filter((value) => value !== null)
			.map((value) => Bitmap.getBitsByMaskAndShiftValues(value || 0, 0b111111, 0))
			.filter((value) => isInRange(Math.abs(pointValue - value), 1, 1));

		if (selectedPoints.length >= 1) this.screen.setValue(x, y, selectedPoints[0]);
	}

	private draw(callback: (x: number, y: number) => unknown) {
		for (let y = 0; y < this.screen.yLength; y += 1) {
			for (let x = 0; x < this.screen.xLength; x += 1) {
				callback(x, y);

				const value = this.screen.getValue(x, y);

				const grayscale = BitmapColors.getGrayscaleValue(value);

				this.context.fillStyle = `rgb(${grayscale}, ${grayscale}, ${grayscale})`;

				this.context.fillRect(
					x * this.config.multiplier,
					y * this.config.multiplier,
					1 * this.config.multiplier,
					1 * this.config.multiplier
				);
			}
		}
	}

	public start() {
		this.draw(this.operatePoint.bind(this));
	}
}
