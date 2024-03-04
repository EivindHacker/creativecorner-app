import postTo from "../modules/postTo.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";
import {updatePageState} from "../modules/pageState.mjs";

const token = localStorage.getItem("token");

document.getElementById("logoutBtn").addEventListener("click", () => {
	localStorage.removeItem("token");
	displayLoggedIn(false);
	updatePageState("login");
});

try {
	const response = await postTo("/user/getUserData", {token});
	console.log(response);
	if (response.status !== 400) {
		const data = await response.json();

		const userData = JSON.parse(data)[0];

		displayUserData(userData);
	} else {
		console.log("Error...");
		displayError("Wrong Username or Password");
	}
} catch (error) {
	displayError("Something went wrong on the server... If the error persists, contact the creator of the page");
}

function displayUserData(userData) {
	console.log(userData.name);
	document.getElementById("nameDisplay").innerText = userData.name;
	document.getElementById("emailDisplay").innerText = userData.email;
}

function displayError(msg) {
	document.getElementById("errorDisplay").innerText = msg;
}
