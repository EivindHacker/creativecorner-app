import {activeKit} from "./playMusic.mjs";

export function setKitAnim(aKit) {
	const activeElement = document.getElementById(aKit.title);
	const activeKitImgs = activeElement.getElementsByTagName("img");
	// Convert the HTMLCollection to an array (optional, but makes it easier to use forEach)
	const imgArray = Array.from(activeKitImgs);
	let kitAnimation;
	imgArray.forEach((img) => {
		if (img.classList.contains("gradient-fx")) {
			kitAnimation = img;
		}
	});

	activeElement.style.backgroundColor = "#a5a5a510";

	kitAnimation.style.display = "block";
	const activeKitTxts = activeElement.getElementsByTagName("h2");
	const txtArray = Array.from(activeKitTxts);
	txtArray.forEach((txt) => {
		txt.style.color = "#ffc400";
	});
}

export function removeKitAnim() {
	if (activeKit !== undefined) {
		const activeElement = document.getElementById(activeKit.title);
		const activeKitImgs = activeElement.getElementsByTagName("img");
		// Convert the HTMLCollection to an array (optional, but makes it easier to use forEach)
		const imgArray = Array.from(activeKitImgs);
		console.log(activeKitImgs);
		let kitAnimation;
		imgArray.forEach((img) => {
			if (img.classList.contains("gradient-fx")) {
				kitAnimation = img;
			}
		});

		activeElement.style.background = "none";

		kitAnimation.style.display = "none";

		const activeKitTxts = activeElement.getElementsByTagName("h2");
		const txtArray = Array.from(activeKitTxts);
		txtArray.forEach((txt) => {
			txt.style.color = "white";
		});
	}
}
