import {updatePageState} from "../modules/pageState.mjs";
import getUserData from "../modules/getUserData.mjs";
import deleteUser from "../modules/deleteUser.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";

const userData = await getUserData();

if (typeof userData === "string") {
	localStorage.removeItem("token");
	displayLoggedIn(false);
	displayError(userData);
} else {
	displayUserData(userData);
}

document.getElementById("logoutBtn").addEventListener("click", () => {
	localStorage.removeItem("token");
	displayLoggedIn(false);
	updatePageState("login");
});

document.getElementById("deleteUserBtn").addEventListener("click", () => {
	deleteUser();
});

function displayUserData(userData) {
	console.log(userData.name);
	document.getElementById("nameDisplay").innerText = userData.name;
	document.getElementById("emailDisplay").innerText = userData.email;
}

function displayError(msg) {
	document.getElementById("errorDisplay").innerText = msg;
	setTimeout(() => {
		updatePageState("thecorner");
	}, 3000);
}
