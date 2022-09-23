import { MarbleBackground } from "./backgrounds/MarbleBackground";
import { config } from "./config";
import { Screen } from "./core/Screen";

const html = document.getElementsByTagName("html")[0];

const width = html.clientWidth;
const height = html.clientHeight;

const xLength = width / config.multiplier;
const yLength = height / config.multiplier;

const canvas = document.getElementById("background") as HTMLCanvasElement;
if (!canvas) throw new Error("No canvas found");

canvas.width = Math.ceil(html.clientWidth);
canvas.height = Math.ceil(html.clientHeight);

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("No context");

const screen = new Screen(xLength, yLength);

function render(fps: number, callback: () => unknown) {
	let then = new Date().getTime();

	const interval = 1000 / fps;

	callback();

	function loop() {
		window.requestAnimationFrame(loop);

		const now = new Date().getTime();
		const delta = now - then;

		if (delta > interval) {
			then = now - (delta % interval);

			callback();
		}
	}

	loop();
}

const background = new MarbleBackground(ctx, screen, config);

export function callBackground() {
	render(config.fps, background.start.bind(background));
}
