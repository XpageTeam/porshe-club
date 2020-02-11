import domReady from "./xpage/ready";
import {Swiper, EffectFade, Navigation, Keyboard} from "swiper/js/swiper.esm"
import App from "./xpage/core";

Swiper.use([EffectFade, Navigation, Keyboard]);

domReady(() => {
	const aboutSliders = App.transformNodeListToArray(document.querySelectorAll(".about-slider"));

	for (const slider of aboutSliders)
		new Swiper(slider, {
			effect: "fade",
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			navigation: {
				prevEl: slider.querySelector(".swiper-button-prev") as HTMLElement,
				nextEl: slider.querySelector(".swiper-button-next") as HTMLElement
			}
		});
});