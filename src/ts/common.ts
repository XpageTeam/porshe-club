import "./profile";
import "./forms";
import domReady from "./xpage/ready";
import App from "./xpage/core";

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