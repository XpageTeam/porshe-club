import domReady from "./xpage/ready";
import App from "./xpage/core";

domReady(async () => {
	const aboutSliders = App.transformNodeListToArray(document.querySelectorAll(".about-slider"));

	if (!aboutSliders.length) return;

	const {Swiper, EffectFade, Navigation, Keyboard} = await import("swiper/js/swiper.esm");

	Swiper.use([EffectFade, Navigation, Keyboard]);

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