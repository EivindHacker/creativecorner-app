import {setNavBtns} from "./pageState.mjs";

export default async function updatePageContent(pageState) {
	try {
		console.log(pageState);
		await insertTemplatesFrom(pageState);
		updateURL(pageState); // Update the URL based on the page state
	} catch (error) {
		console.error("Error updating page content:", error);
	}
}

async function insertTemplatesFrom(pageState) {
	const content = await fetch(`./templates/${pageState}.html`).then((d) => d.text());
	document.querySelector("main").innerHTML = content;
	loadScripts(pageState);
}

function loadScripts(pageState) {
	const dynamicScript = document.getElementById("dynamicScript");
	if (dynamicScript) {
		dynamicScript.remove();
	}

	const timestamp = new Date().getTime();
	const newScript = document.createElement("script");
	newScript.type = "module";
	newScript.id = "dynamicScript";
	newScript.src = `./scripts/${pageState}.mjs?timestamp=${timestamp}`;

	document.body.appendChild(newScript);
}

function updateURL(pageState) {
	// Update the URL without triggering a full page refresh
	history.pushState({pageState: pageState}, "", `/${pageState}`);
}

window.onpopstate = function (event) {
	// Handle browser back/forward button clicks
	if (event.state) {
		updatePageContent(event.state.pageState);
		setNavBtns(event.state.pageState);
	}
};

// Initial rendering based on the URL pathname
const initialPageState = window.location.pathname.replace("/", "");
updatePageContent(initialPageState);
