import {updatePageState} from "../modules/pageState.mjs";
import getUserData from "../modules/getUserData.mjs";
import deleteUser from "../modules/deleteUser.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";
import editUser from "../modules/editUser.mjs";

const successDisplay = document.getElementById("successDisplay");
const errorDisplay = document.getElementById("errorDisplay");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const musicianInput = document.getElementById("musicianInput");
const writerInput = document.getElementById("writerInput");

const editUserBtn = document.getElementById("editUserBtn");
const userInfoWrapper = document.getElementById("userInfoWrapper");

const changePasswordBtn = document.getElementById("changePasswordBtn");
const editUserWrapper = document.getElementById("editUserWrapper");
const changePasswordWrapper = document.getElementById("changePasswordWrapper");
const editUserInfoWrapper = document.getElementById("editUserInfoWrapper");
const logOutBtn = document.getElementById("logoutBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");

async function updateUserDataDisplay() {
	const userData = await getUserData();

	if (typeof userData === "string") {
		localStorage.removeItem("token");
		displayLoggedIn(false);
		displayError(userData);
	} else {
		displayUserData(userData);
	}
}

updateUserDataDisplay();

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
	document.getElementById("accountTypeDisplay").innerText = userData.role;

	if (userData.role === "Writer") {
		writerInput.checked = true;
		musicianInput.checked = false;
	} else {
		writerInput.checked = false;
		musicianInput.checked = true;
	}

	nameInput.value = userData.name;
	emailInput.value = userData.email;
}

function displayError(msg) {
	document.getElementById("errorDisplay").innerText = msg;
	setTimeout(() => {
		updatePageState("thecorner");
	}, 3000);
}

editUserBtn.addEventListener("click", toggleEditUserWrapper);

function toggleEditUserWrapper() {
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
	successDisplay.textContent = "";
	errorDisplay.textContent = "";
}

function toggleEditPasswordWrapper() {
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
		changePasswordBtn.classList.remove("cancel");
		deleteUserBtn.style.display = "block";
	}
	successDisplay.textContent = "";
	errorDisplay.textContent = "";
}

changePasswordBtn.addEventListener("click", toggleEditPasswordWrapper);

async function submitChanges() {
	if (changePasswordWrapper.style.display === "none") {
		let accountType = "";

		if (writerInput.checked) {
			accountType = "Writer";
		} else {
			accountType = "Musician";
		}

		const userInputs = {name: nameInput.value, email: emailInput.value, role: accountType};
		const response = await editUser("Info", userInputs);

		console.log(response);

		if (response.success) {
			toggleEditUserWrapper();
			updateUserDataDisplay();
			successDisplay.textContent = response.message;
		} else {
			errorDisplay.textContent = response.message;
		}
	} else {
		const oldPass = document.getElementById("oldPasswordInput");
		const newPass = document.getElementById("newPasswordInput");

		const passwords = {oldPass: oldPass.value, newPass: newPass.value};
		const response = await editUser("Password", passwords);

		if (response.success) {
			toggleEditUserWrapper();
			updateUserDataDisplay();
			toggleEditPasswordWrapper();
			successDisplay.textContent = response.message;
		} else {
			errorDisplay.textContent = response.message;
		}
	}
}

document.getElementById("submitChangesBtn").addEventListener("click", submitChanges);
