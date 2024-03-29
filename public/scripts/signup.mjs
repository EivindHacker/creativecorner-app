import {updatePageState} from "../modules/pageState.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";
import postTo from "../modules/httpmethods/postTo.mjs";
import displayError from "../modules/displayError.mjs";

export default function initDomElementsSignUp() {
	initDomVariables();
	initEventListeners();
	loadOnRuntime();
}

function initDomVariables() {}

function initEventListeners() {
	document.getElementById("goToLoginBtn").addEventListener("click", async () => {
		updatePageState("login");
	});
	document.getElementById("createUserButton").addEventListener("click", createUser);
}

function loadOnRuntime() {}

async function createUser() {
	const name = document.getElementById("nameInputSignUp").value;
	const email = document.getElementById("emailInputSignUp").value;
	const pswHash = document.getElementById("pswHashInputSignUp").value;

	const writerInput = document.getElementById("writerInput");

	let role = "Writer";

	if (writerInput.checked) {
		role = "Writer";
	} else {
		role = "Musician";
	}

	let language = "en";

	const enInput = document.getElementById("enInput");

	if (enInput.checked) {
		language = "en";
	} else {
		language = "no";
	}

	const user = {name, email, pswHash, role, language};

	try {
		const response = await postTo("/user/signUp", user);

		if (response.ok) {
			const data = await response.json();

			const token = JSON.parse(data);

			localStorage.setItem("token", token);

			displayLoggedIn(true);
			updatePageState("thecorner");
		}
	} catch (error) {
		displayError(error.message);
	}
}
