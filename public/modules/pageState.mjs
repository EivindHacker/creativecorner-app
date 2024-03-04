// index.js

import updatePageContent from "./contentLoader.mjs";
import {setNavBtns} from "./nav.mjs";

export let pageState = "thecorner";

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
