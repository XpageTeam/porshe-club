import "./profile";
import "./forms";
import domReady from "./xpage/ready";
import App from "./xpage/core";

declare global {
    interface Window {
    	$: Function;
		is: any;
		Cookies: any;
    }
}

domReady(() => {
	const loaderVideo = document.querySelector(".loader__video"),
		loader = document.querySelector(".loader");
		
	function mainVideoPlaying(){
		const inBtn = document.querySelector(".loader__btn .default-btn"),
		mainVideo = document.querySelector(".main-img__video video") as HTMLVideoElement;
		
		if (!mainVideo){
			loader?.classList.add("js__hidden");
			
			return;
		}
		
		if (inBtn)
			inBtn.addEventListener("click", function(){
				loader.classList.add("js__hidden");
				
				mainVideo.play();
				
				window.Cookies.set("loaderVisibled", "1");
			});

		mainVideo.addEventListener("timeupdate", function(){
			console.log([this]);			
		});
		
		const soundBtn = document.querySelector(".MuteButton_wrapper");
		
		if (!soundBtn)
			return;

		const spans = App.elementsGetter(".MuteButton_bar");

		if (window.Cookies.get("videoSoundMuted") == "true")
			for (const span of spans){
				span.classList.remove("MuteButton_bar-unmute");
				span.classList.add("MuteButton_bar-mute");
			}
		
		soundBtn.addEventListener("click", function(){
			if (!mainVideo.muted)
				for (const span of spans){
					span.classList.remove("MuteButton_bar-unmute");
					span.classList.add("MuteButton_bar-mute");
				}
			else
				for (const span of spans){
					span.classList.add("MuteButton_bar-unmute");
					span.classList.remove("MuteButton_bar-mute");
				}
			
			mainVideo.muted = !mainVideo.muted;
			
			window.Cookies.set("videoSoundMuted", mainVideo.muted);

			mainVideo.play();
		});
	}

	if (!loaderVideo || !loader){
		mainVideoPlaying();

		return;
	}
	
	setTimeout(function(){
		document.body.classList.remove("loading");
		document.body.classList.add("loaded");

		mainVideoPlaying();
	}, 1300);
});
	
domReady(async () => {
	let selects = App.transformNodeListToArray(document.querySelectorAll(".default-input__input--select"));

	if (!selects.length) return;

	selects = selects.filter((select: HTMLElement) => !select.closest(".popup"));

	const select = await import("./xpage/select");

	for (const sel of selects)
		new select.default(sel as HTMLSelectElement);
});

domReady(async () => {
	const mobileMenu = await import("./xpage/mobileMenu");

	const menu = new mobileMenu.default({
		burger: ".head__burger",
        menu: ".mobile-menu",
        menuActiveClass: "js__opened",
        bodyActiveClass: "js__menu-opened",
        ignoreWarnings: false,
        fixBody: true,
        media: "(max-width: 1000px)"
	})
});

function setViewportProperty(){
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

window.addEventListener('resize', setViewportProperty);
setViewportProperty();