// index.js

import updatePageContent from "./contentLoader.mjs";

let pageState = "thecorner";
function updatePageState(aState) {
	pageState = aState;
	updatePageContent(pageState);
}

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const clickedButton = e.target.id;
		updatePageState(clickedButton);
		setNavBtns(clickedButton);
	});
});

export function setNavBtns(clickedButton) {
	navButtons.forEach((button) => {
		if (clickedButton !== button.id) {
			button.classList.remove("nav-btn-active");
		} else {
			button.classList.add("nav-btn-active");
		}
	});
}

setNavBtns(pageState);
updatePageContent(pageState);

// Handle page refresh
window.onload = function () {
	const pageState = window.location.pathname.replace("/", "");
	updatePageContent(pageState);
};
