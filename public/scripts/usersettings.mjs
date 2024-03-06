import {updatePageState} from "../modules/pageState.mjs";
import getUserData from "../modules/getUserData.mjs";
import deleteUser from "../modules/deleteUser.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";

const editUserBtn = document.getElementById("editUserBtn");
const userInfoWrapper = document.getElementById("userInfoWrapper");

const changePasswordBtn = document.getElementById("changePasswordBtn");
const editUserWrapper = document.getElementById("editUserWrapper");
const changePasswordWrapper = document.getElementById("changePasswordWrapper");
const editUserInfoWrapper = document.getElementById("editUserInfoWrapper");
const logOutBtn = document.getElementById("logoutBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");

// Function to toggle visibility of editUserWrapper
editUserBtn.addEventListener("click", function () {
	if (userInfoWrapper.style.display === "flex") {
		userInfoWrapper.style.display = "none";
		editUserBtn.textContent = "Cancel User Edit";
		editUserBtn.classList.add("cancel");
		logOutBtn.style.display = "none";
	} else {
		userInfoWrapper.style.display = "flex";
		editUserBtn.textContent = "Edit User";
		editUserBtn.classList.remove("cancel");
		logOutBtn.style.display = "block";
	}
	editUserWrapper.style.display = editUserWrapper.style.display === "none" ? "flex" : "none";
});

// Function to toggle visibility of changePasswordWrapper
changePasswordBtn.addEventListener("click", function () {
	if (changePasswordWrapper.style.display === "none") {
		changePasswordWrapper.style.display = "block";
		editUserInfoWrapper.style.display = "none";
		changePasswordBtn.textContent = "Cancel Change Password";
		changePasswordBtn.classList.add("cancel");
		deleteUserBtn.style.display = "none";
	} else {
		changePasswordWrapper.style.display = "none";
		editUserInfoWrapper.style.display = "block";
		changePasswordBtn.textContent = "Change Password";
		changePasswordBtn.classList.remove("remove");
		deleteUserBtn.style.display = "block";
	}
});

// Function to gather input values and submit changes
function submitChanges() {
	const nameInput = document.querySelector("#editUserInfoWrapper input[type='text']:nth-of-type(1)").value;
	const emailInput = document.querySelector("#editUserInfoWrapper input[type='text']:nth-of-type(2)").value;
	const userTypeInput = document.querySelector("#editUserInfoWrapper input[type='radio']:checked").nextSibling.textContent.trim();

	console.log("Name: ", nameInput);
	console.log("Email: ", emailInput);
	console.log("User Type: ", userTypeInput);
}

const submitChangesBtn = document.getElementById("editUserBtn");
submitChangesBtn.addEventListener("click", submitChanges);

const userData = await getUserData();

if (typeof userData === "string") {
	localStorage.removeItem("token");
	displayLoggedIn(false);
	displayError(userData);
} else {
	displayUserData(userData);
}

logOutBtn.addEventListener("click", () => {
	localStorage.removeItem("token");
	displayLoggedIn(false);
	updatePageState("login");
});

deleteUserBtn.addEventListener("click", () => {
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
