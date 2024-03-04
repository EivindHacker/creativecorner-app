import {updatePageState} from "../modules/pageState.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";
import postTo from "../modules/postTo.mjs";

console.log("This is the singup script calling...");

document.getElementById("goToLoginBtn").addEventListener("click", async () => {
	updatePageState("login");
});

document.getElementById("createUserButton").onclick = async function (e) {
	const name = document.getElementById("nameInputSignUp").value;
	const email = document.getElementById("emailInputSignUp").value;
	const pswHash = document.getElementById("pswHashInputSignUp").value;

	const user = {name, email, pswHash};
	try {
		const response = await postTo("/user/signUp", user);
		console.log(response);
		if (response.status === 200) {
			console.log("kommer inn");
			const data = await response.json();

			const token = JSON.parse(data);

			localStorage.setItem("token", token);

			displayLoggedIn(true);
			updatePageState("thecorner");
		} else {
			displayError("Something went wrong on the server... If the error persists, contact the creator of the page");
		}
	} catch (error) {
		displayError("Something went wrong on the server... If the error persists, contact the creator of the page");
	}
};
function displayError(msg) {
	document.getElementById("errorDisplay").innerText = msg;
}

function clearErrorDisplay() {
	document.getElementById("errorDisplay").innerText = "";
}
