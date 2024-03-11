import {updatePageState} from "../modules/pageState.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";
import postTo from "../modules/postTo.mjs";

console.log("This is the singup script calling...");

document.getElementById("goToLoginBtn").addEventListener("click", async () => {
	updatePageState("login");
});

document.getElementById("createUserButton").onclick = async function (e) {
	clearErrorDisplay();

	const name = document.getElementById("nameInputSignUp").value;
	const email = document.getElementById("emailInputSignUp").value;
	const pswHash = document.getElementById("pswHashInputSignUp").value;

	const writerInput = document.getElementById("writerInput");
	const musicianInput = document.getElementById("musicianInput");

	let user = {};

	if (writerInput.checked) {
		user = {name, email, pswHash, role: "Writer"};
	} else {
		user = {name, email, pswHash, role: "Musician"};
	}

	try {
		const response = await postTo("/user/signUp", user);
		console.log(response);
		if (response.ok) {
			const data = await response.json();

			const token = JSON.parse(data);

			localStorage.setItem("token", token);

			displayLoggedIn(true);
			updatePageState("thecorner");
		}
	} catch (error) {
		console.log(error.message);
		displayError(error.message);
	}
};
function displayError(msg) {
	document.getElementById("errorDisplay").innerText = msg;
}

function clearErrorDisplay() {
	document.getElementById("errorDisplay").innerText = "";
}
