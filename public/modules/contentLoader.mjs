import initDomElementsTheCorner from "../scripts/thecorner.mjs";
import initDomElementsUserSettings from "../scripts/usersettings.mjs";
import initDomElementsSignUp from "../scripts/signup.mjs";
import initDomElementsLogin from "../scripts/login.mjs";

export default async function updatePageContent(pageState) {
	try {
		await insertTemplate(pageState);
		updateURL(pageState);
	} catch (error) {
		console.error("Error updating page content:", error);
	}
}

async function insertTemplate(pageState) {
	const content = await fetch(`./templates/${pageState}.html`).then((d) => d.text());
	document.querySelector("main").innerHTML = content;
	initateScripts(pageState);
}

function initateScripts(pageState) {
	if (pageState === "thecorner") {
		initDomElementsTheCorner();
	} else if (pageState === "usersettings") {
		initDomElementsUserSettings();
	} else if (pageState === "signup") {
		initDomElementsSignUp();
	} else if (pageState === "login") {
		initDomElementsLogin();
	}
}

function updateURL(pageState) {
	history.pushState({pageState: pageState}, "", `/${pageState}`);
}
