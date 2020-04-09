import $ from "jquery";
import is from "is_js";

window.jQuery = $
window.$ = $

require("./jquery.fancybox.js");

document.addEventListener("DOMContentLoaded", function(){

	if (!is.mobile())
		import("./404.js");

	$("body").on("keyup", ".lc-about textarea", function(){
		if(this.scrollTop > 0){
			this.style.height = this.scrollHeight + "px";
		  }
	});

	$(".fancybox").fancybox({
		trapFocus: false,
		touch: false,
		buttons: ["fullscreen", "close", "thumbs"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const phoneInputs = document.querySelectorAll(".phone-input");

	if (!phoneInputs.length)
		return;

	;(function(){
		import("imask").then((IMask) => {
			phoneInputsMask(phoneInputs, IMask);

			const config = {
				childList: true,
				subtree: true
			};

			// Функция обратного вызова при срабатывании мутации
			const callback = function(mutationsList, observer) {
				for (let mutation of mutationsList) {
					if (mutation.addedNodes.length)
						for (const node of mutation.addedNodes)
							if (node instanceof HTMLElement)
								phoneInputsMask(node.querySelectorAll(".phone-input"), IMask);
				}
			};

			// Создаем экземпляр наблюдателя с указанной функцией обратного вызова
			const observer = new MutationObserver(callback);

			// Начинаем наблюдение за настроенными изменениями целевого элемента
			observer.observe(document.body, config);
		});
	})();
});

const phoneInputsMask = (inputs, IMask) => {
	for (let i = 0; i < inputs.length; i++){
		const phoneInput = inputs[i];

		new IMask.default(phoneInput, {
			mask: '+# (000) 000-00-00',
			lazy: true,
			placeholder: {
				show: 'always'
			},
			definitions: {
				"#": "7",
			}
		});
	}
};