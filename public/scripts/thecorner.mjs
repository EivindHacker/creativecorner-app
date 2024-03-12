import calcRatingAverage from "../modules/idea/calcRatingAverage.mjs";
import getIdeas from "../modules/idea/getIdeas.mjs";
import getUserData from "../modules/user/getUserData.mjs";
import {updatePageState} from "../modules/pageState.mjs";
import submitCreation from "../modules/idea/submitCreation.mjs";
import submitIdea from "../modules/idea/submitIdea.mjs";
import submitRating from "../modules/idea/submitRating.mjs";
import createIdeaCard from "./ideasList.mjs";

let sortBy = "beforeend";

let errorDisplay;
let getStartedWrapper;
let createIdeaBtn;
let ideasList;
let showUserIdeasBtn;

export default function initDomElementsTheCorner() {
	initDomVaribles();
	initEventListeners();
	loadOnRuntime();
}

function loadOnRuntime() {
	getAllIdeas();

	if (localStorage.getItem("token")) {
		getStartedWrapper.style.display = "none";
		createIdeaBtn.style.display = "block";
		showUserIdeasBtn.style.display = "block";
	} else {
		getStartedWrapper.style.display = "block";
		createIdeaBtn.style.display = "none";
		showUserIdeasBtn.style.display = "none";
	}
}

function initDomVaribles() {
	errorDisplay = document.getElementById("errorDisplay");
	getStartedWrapper = document.getElementById("getStartedWrapper");
	createIdeaBtn = document.getElementById("createIdeaBtn");
	ideasList = document.getElementById("ideasList");
	showUserIdeasBtn = document.getElementById("showUserIdeasBtn");
}
function initEventListeners() {
	document.getElementById("sortByNewBtn").addEventListener("click", () => {
		sortBy = "beforeend";
		if (!showUserIdeasBtn.classList.contains("cancel")) {
			getAllIdeas();
		} else {
			getIdeasFromUser();
		}
	});

	document.getElementById("sortByOldBtn").addEventListener("click", () => {
		sortBy = "afterbegin";
		if (!showUserIdeasBtn.classList.contains("cancel")) {
			getAllIdeas();
		} else {
			getIdeasFromUser();
		}
	});

	document.getElementById("loginBtn").addEventListener("click", () => {
		updatePageState("login");
	});

	document.getElementById("signUpBtn").addEventListener("click", () => {
		updatePageState("signup");
	});

	//----------- CREATE IDEA -----------

	createIdeaBtn.addEventListener("click", () => {
		document.getElementById("createIdeaWrapper").style.display = "block";
		createIdeaBtn.style.display = "none";
	});

	document.getElementById("cancelIdeaBtn").addEventListener("click", hideCreateIdeaWrapper);

	document.getElementById("addGenreBtn").addEventListener("click", () => {
		const genreInput = document.getElementById("genreInput");
		const genreHtml = `<span class="genre">${genreInput.value}</span>`;

		genreSuggestions.push(genreInput.value);

		document.getElementById("genreInputDisplay").innerHTML += genreHtml;
		genreInput.value = "";
	});

	document.getElementById("saveIdeaBtn").addEventListener("click", async () => {
		const idea = {
			title: document.getElementById("titleInput").value,
			description: document.getElementById("descriptionInput").value,
			genres: genreSuggestions,
		};

		const response = await submitIdea(idea);

		const ideaResponse = JSON.parse(response);

		ideaResponse.creations = null;

		if (!ideaResponse.message) {
			getAllIdeas();
			hideCreateIdeaWrapper();
		} else {
			errorDisplay.innerText = ideaResponse.message;
		}
	});

	showUserIdeasBtn.addEventListener("click", getIdeasFromUser);
}

function hideCreateIdeaWrapper() {
	document.getElementById("createIdeaWrapper").style.display = "none";
	createIdeaBtn.style.display = "block";
}

const genreSuggestions = [];

//----------- IDEA CARDS -----------

function createCardListeners(id) {
	document.getElementById(`addCreationBtn_${id}`).addEventListener("click", () => {
		toggleCreationsWrapper(id);
	});

	document.getElementById(`submitRatingBtn_${id}`).addEventListener("click", async () => {
		const rating = document.getElementById(`ratingInput_${id}`).value;
		const ratingObject = {rating, id};
		const response = await submitRating(ratingObject);

		const updatedRatings = JSON.parse(response);
		const updatedRatingAverage = calcRatingAverage(updatedRatings.rating);
		document.getElementById(`rating_${id}`).textContent = updatedRatingAverage;
	});

	document.getElementById(`saveCreationBtn_${id}`).addEventListener("click", () => {
		const title = document.getElementById(`creationTitleInput_${id}`).value;
		const artist = document.getElementById(`creationArtistInput_${id}`).value;
		const link = document.getElementById(`crationLinkInput_${id}`).value;
		const inputObject = {title, artist, link};
		const response = submitCreation(inputObject);
		console.log(JSON.parse(response));
	});
}

function toggleCreationsWrapper(id) {
	const addCreationWrapper = document.getElementById(`addCreationWrapper_${id}`);
	const addCreationBtn = document.getElementById(`addCreationBtn_${id}`);

	if (addCreationWrapper.style.display === "none") {
		addCreationWrapper.style.display = "block";
		addCreationBtn.textContent = "Cancel";
		addCreationBtn.classList.add("cancel");
	} else {
		addCreationWrapper.style.display = "none";
		addCreationBtn.textContent = "Add Creation";
		addCreationBtn.classList.remove("cancel");
	}
}

async function getAllIdeas() {
	clearIdeasDisplay();
	const response = await getIdeas();

	displayIdeas(response);
}

async function displayIdeas(ideas) {
	const userData = await getUserData();
	const userId = userData.id;

	if (Array.isArray(ideas)) {
		ideas.forEach((idea) => {
			const ideaCardHtml = createIdeaCard(idea, userId);
			ideasList.insertAdjacentHTML(sortBy, ideaCardHtml);
			createCardListeners(idea.id);
		});
	} else {
		errorDisplay.textContent = userId.message;
	}
}

function clearIdeasDisplay() {
	ideasList.innerHTML = "";
}

async function getIdeasFromUser() {
	if (!showUserIdeasBtn.classList.contains("cancel")) {
		const userData = await getUserData();

		const ideasResponse = await getIdeas(userData.id);

		if (!ideasResponse.message) {
			clearIdeasDisplay();
			displayIdeas(ideasResponse);
			hideCreateIdeaWrapper();
		} else {
			console.log(ideasResponse);
			errorDisplay.textContent = ideasResponse.message;
			clearIdeasDisplay();
		}

		showUserIdeasBtn.classList.add("cancel");
		showUserIdeasBtn.textContent = "Show All Ideas";
	} else {
		getAllIdeas();
		showUserIdeasBtn.classList.remove("cancel");
		showUserIdeasBtn.textContent = "Show Your Ideas";
	}
}
