import domReady from "./xpage/ready";
import App from "./xpage/core";
import Element from "./xpage/Element";
import EventListener from "./xpage/EventListener";

domReady(() => {
	App.each(".default-input__input--file", (el: HTMLInputElement) => {
		const textInput = new Element(el).closest(".default-input")
							.find(".default-input__input[type='text']").getHTMLElement(0);

		new EventListener(textInput).add("click", (input: HTMLInputElement) => {
			el.click()
		})

		new EventListener(el).add("change", (el: HTMLInputElement) => {
			let files: Array<string> = [];

			for (let i = 0; i < el.files.length; i++)
				files.push(el.files[i].name)

			if (!files.length)
				(textInput as HTMLInputElement).value = ""
			else{
				(textInput as HTMLInputElement).value = files.join(", ")
			}
		})
	})
});

domReady(() => {
	new EventListener(".default-input__pass-toggler").add("click", (el: HTMLElement) => {
		const parent = el.closest(".default-input");

		if (!parent) return;

		const targetInput = parent.querySelector(".default-input__input") as HTMLInputElement;

		targetInput.type = targetInput.type == "password" ? "text" : "password";
	});
});

domReady(() => {
	new EventListener(".lc-img .remove-link").add("click", function(el: HTMLElement){
		const imgCont = el.closest(".lc-img");

		(imgCont.querySelector(".lc-img__input") as HTMLInputElement).value = "";

		new EventListener(imgCont.querySelector(".lc-img__input")).trigger("change");
	});


	new EventListener(".lc-img__input").add("change", function(el: HTMLInputElement){
		const imgCont = el.closest(".lc-img");

		imgCont.querySelector(".lc-img__img")?.remove();

		if (el.files.length){
			const reader = new FileReader(),
				img: HTMLImageElement = document.createElement("img");

			reader.onload = function(event: ProgressEvent<FileReader>){
				img.setAttribute("src", event.target.result as string);

				img.classList.add("lc-img__img");

				imgCont.appendChild(img);
			}

			reader.readAsDataURL(el.files[0]);
		}
	});
});