import postTo from "../modules/postTo.mjs";
import {updatePageState} from "../modules/pageState.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";

console.log("This is the login script calling...");

document.getElementById("goToSignUpBtn").addEventListener("click", async () => {
	updatePageState("signup");
});

document.getElementById("loginBtn").addEventListener("click", async () => {
	clearErrorDisplay();
	const email = document.getElementById("emailInputLogin").value;
	const pswHash = document.getElementById("pswHashInputLogin").value;

	const user = {email, pswHash};
	try {
		const response = await postTo("/user/login", user);
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
});

function displayError(msg) {
	document.getElementById("errorDisplay").innerText = msg;
}

function clearErrorDisplay() {
	document.getElementById("errorDisplay").innerText = "";
}
