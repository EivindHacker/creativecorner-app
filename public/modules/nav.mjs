import {updatePageState} from "./pageState.mjs";
import {pageState} from "./pageState.mjs";

const navButtons = document.querySelectorAll(".nav-btn");

const token = localStorage.getItem("token");

if (token) {
	displayLoggedIn(true);
} else {
	displayLoggedIn(false);
}

export function displayLoggedIn(loggedIn) {
	const userBtn = document.getElementById("usersettings");
	const signUpBtn = document.getElementById("signup");
	const loginBtn = document.getElementById("login");
	if (loggedIn) {
		userBtn.style.display = "block";
		signUpBtn.style.display = "none";
		loginBtn.style.display = "none";
	} else {
		userBtn.style.display = "none";
		signUpBtn.style.display = "block";
		loginBtn.style.display = "block";
	}
}

navButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const clickedButton = e.target.id;
		updatePageState(clickedButton);
	});
});

export function setNavBtns(clickedButton) {
	navButtons.forEach((button) => {
		if (clickedButton !== button.id) {
			button.classList.remove("nav-btn-active");
		} else {
			button.classList.add("nav-btn-active");
		}
	});
}

setNavBtns(pageState);
