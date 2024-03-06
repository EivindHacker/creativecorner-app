import {updatePageState} from "../modules/pageState.mjs";

const cardUserInteractivesWrapper = document.getElementById("cardUserInteractivesWrapper");

const getStartedWrapper = document.getElementById("getStartedWrapper");

document.getElementById("loginBtn").addEventListener("click", () => {
	updatePageState("login");
});

document.getElementById("signUpBtn").addEventListener("click", () => {
	updatePageState("signup");
});

const createIdeaBtn = document.getElementById("createIdeaBtn");

if (localStorage.getItem("token")) {
	getStartedWrapper.style.display = "none";
	createIdeaBtn.style.display = "block";
	cardUserInteractivesWrapper.style.display = "block";
} else {
	getStartedWrapper.style.display = "block";
	createIdeaBtn.style.display = "none";
	cardUserInteractivesWrapper.style.display = "none";
}

createIdeaBtn.addEventListener("click", () => {});

const addCreationBtn = document.getElementById("addCreationBtn");

document.getElementById("addCreationBtn").addEventListener("click", () => {
	const addCreationWrapper = document.getElementById("addCreationWrapper");

	if (addCreationWrapper.style.display === "none") {
		addCreationWrapper.style.display = "block";
		addCreationBtn.textContent = "Cancel";
		addCreationBtn.classList.add("cancel");
	} else {
		addCreationWrapper.style.display = "none";
		addCreationBtn.textContent = "Add Creation";
		addCreationBtn.classList.remove("cancel");
	}
});
