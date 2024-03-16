import {updatePageState} from "../modules/pageState.mjs";
import getUserData from "../modules/user/getUserData.mjs";
import deleteUser from "../modules/user/deleteUser.mjs";
import {displayLoggedIn} from "../modules/nav.mjs";
import editUser from "../modules/user/editUser.mjs";
import displayError from "../modules/displayError.mjs";

let successDisplay;

let nameInput;
let emailInput;
let musicianInput;
let writerInput;

let editUserBtn;
let userInfoWrapper;

let changePasswordBtn;
let editUserWrapper;
let changePasswordWrapper;
let editUserInfoWrapper;
let logOutBtn;
let deleteUserBtn;

export default function initDomElementsUserSettings() {
	initDomVariables();
	initEventListeners();
	loadOnRuntime();
}

function initDomVariables() {
	successDisplay = document.getElementById("successDisplay");
	nameInput = document.getElementById("nameInput");
	emailInput = document.getElementById("emailInput");
	musicianInput = document.getElementById("musicianInput");
	writerInput = document.getElementById("writerInput");
	editUserBtn = document.getElementById("editUserBtn");
	userInfoWrapper = document.getElementById("userInfoWrapper");
	changePasswordBtn = document.getElementById("changePasswordBtn");
	editUserWrapper = document.getElementById("editUserWrapper");
	changePasswordWrapper = document.getElementById("changePasswordWrapper");
	editUserInfoWrapper = document.getElementById("editUserInfoWrapper");
	logOutBtn = document.getElementById("logoutBtn");
	deleteUserBtn = document.getElementById("deleteUserBtn");
}

function initEventListeners() {
	logOutBtn.addEventListener("click", () => {
		localStorage.removeItem("token");
		displayLoggedIn(false);
		updatePageState("login");
	});

	deleteUserBtn.addEventListener("click", async () => {
		const confirmation = await window.confirm(
			"Are you sure you want to delete your user? You cannot undo this action. Your ideas will still be public. (You can delete your ideas manually on The Corner)"
		);

		if (confirmation) {
			const response = await deleteUser();
			if (typeof response !== "string") {
				successDisplay.textContent = response.message;
				setTimeout(() => {
					updatePageState("thecorner");
				}, 5000);
			} else {
				displayError(response);
			}
		}
	});

	editUserBtn.addEventListener("click", toggleEditUserWrapper);
	changePasswordBtn.addEventListener("click", toggleEditPasswordWrapper);
	document.getElementById("submitChangesBtn").addEventListener("click", submitChanges);
}

function loadOnRuntime() {
	updateUserDataDisplay();
}

async function updateUserDataDisplay() {
	const response = await getUserData();

	if (typeof response === "string") {
		displayLoggedIn(false);
		displayError(response);
		updatePageState("login");
	} else {
		displayUserData(response);
	}
}

function displayUserData(userData) {
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
}

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
			displayError(response.message);
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
			displayError(response.message);
		}
	}
}
