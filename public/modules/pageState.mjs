import {setNavBtns} from "./nav.mjs";
import updatePageContent from "./contentLoader.mjs";

let pageState = "thecorner";

export function getPageState() {
	return pageState;
}

if (sessionStorage.getItem("state")) {
	pageState = sessionStorage.getItem("state");
}

export function updatePageState(aState) {
	pageState = aState;
	updatePageContent(pageState);
	setNavBtns(pageState);

	sessionStorage.setItem("state", pageState);
}

updatePageContent(pageState);

//Disabling back and forth buttons in Browser
window.onpopstate = function (event) {
	event.preventDefault();
};
