import domReady from "./xpage/ready";
import App from "./xpage/core";
import Element from "./xpage/Element";
import EventListener from "./xpage/EventListener";

domReady(() => {
	App.each(".default-input__input--file", observerFileInput);

	const obsConfig: MutationObserverInit = {
		childList: true,
		subtree: true
	};

	const callback = (mutationList: Array<MutationRecord>) => {
		for (const mutation of mutationList)
			mutation.addedNodes.forEach((node: HTMLElement) => {
				if (node && node.classList && node.classList.contains("default-input__input--file"))
					observerFileInput(node);
				else if (node?.querySelectorAll && node.querySelectorAll(".default-input__input--file").length)
					for (const input of App.transformNodeListToArray(node.querySelectorAll(".default-input__input--file")))
						observerFileInput(input);
			});
	};

	const observer = new MutationObserver(callback);

	observer.observe(document.body, obsConfig);
});


function observerFileInput(input: HTMLElement): void{
	console.log(input);
	const textInput = new Element(input).closest(".default-input")
						.find(".default-input__input[type='text']").getHTMLElement(0);

	new EventListener(textInput).add("click", (input: HTMLInputElement) => {
		input.click()
	})

	new EventListener(input).add("change", (el: HTMLInputElement) => {
		let files: Array<string> = [];

		for (let i = 0; i < el.files.length; i++)
			files.push(el.files[i].name)

		if (!files.length)
			(textInput as HTMLInputElement).value = ""
		else{
			(textInput as HTMLInputElement).value = files.join(", ")
		}
	})
}










domReady(() => {
	new EventListener(".default-input__pass-toggler").add("click", (el: HTMLElement) => {
		const parent = el.closest(".default-input");

		if (!parent) return;

		const targetInput = parent.querySelector(".default-input__input") as HTMLInputElement;

		targetInput.type = targetInput.type == "password" ? "text" : "password";
	});
});












domReady(() => {
	App.each(".lc-img__input", observerImgInput);

	const obsConfig: MutationObserverInit = {
		childList: true,
		subtree: true
	};

	const callback = (mutationList: Array<MutationRecord>) => {
		for (const mutation of mutationList)
			mutation.addedNodes.forEach((node: HTMLElement) => {
				if (node?.classList?.contains("lc-img__input"))
					observerImgInput(node);
				else if (node?.querySelectorAll && node.querySelectorAll(".lc-img__input").length)
					for (const input of App.transformNodeListToArray(node.querySelectorAll(".lc-img__input")))
						observerImgInput(input);
			});
	};

	const observer = new MutationObserver(callback);

	observer.observe(document.body, obsConfig);
	
});

function observerImgInput(input: HTMLElement): void{
	const removeLink = input.closest(".lc-img").querySelector(".remove-link");

	new EventListener(removeLink).add("click", function(el: HTMLElement){
		const imgCont = el.closest(".lc-img");

		(input as HTMLInputElement).value = "";

		new EventListener(input).trigger("change");
	});

	new EventListener(input).add("change", function(el: HTMLInputElement){
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
}