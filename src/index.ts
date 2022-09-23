import "./scss/styles.scss";
import "./scss/normalize.scss";
import "swiper/scss";

import Swiper, { Navigation } from "swiper";

import { callBackground } from "./ts/background/background";

new Swiper(".swiper", {
	modules: [Navigation],

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	loop: true,
});

callBackground();
