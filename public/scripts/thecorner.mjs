import calcRatingAverage from "../modules/calcRatingAverage.mjs";
import getIdeas from "../modules/getIdeas.mjs";
import getUserData from "../modules/getUserData.mjs";
import {updatePageState} from "../modules/pageState.mjs";
import submitCreation from "../modules/submitCreation.mjs";
import submitIdea from "../modules/submitIdea.mjs";
import submitRating from "../modules/submitRating.mjs";
import createIdeaCard from "./ideasList.mjs";

const errorDisplay = document.getElementById("errorDisplay");

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
} else {
	getStartedWrapper.style.display = "block";
	createIdeaBtn.style.display = "none";
}

//----------- CREATE IDEA -----------

createIdeaBtn.addEventListener("click", () => {
	document.getElementById("createIdeaWrapper").style.display = "block";
	createIdeaBtn.style.display = "none";
});

document.getElementById("cancelIdeaBtn").addEventListener("click", hideCreateIdeaWrapper);

function hideCreateIdeaWrapper() {
	document.getElementById("createIdeaWrapper").style.display = "none";
	createIdeaBtn.style.display = "block";
}

const genreSuggestions = [];

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

	if (typeof ideaResponse === "object") {
		clearIdeasDisplay();
		getAllIdeas();
		hideCreateIdeaWrapper();
	}
});

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

const ideasList = document.getElementById("ideasList");

async function getAllIdeas() {
	const response = await getIdeas();

	displayIdeas(response);
}

function displayIdeas(ideas) {
	if (Array.isArray(ideas)) {
		ideas.forEach((idea, index) => {
			const ideaCardHtml = createIdeaCard(idea, index);
			ideasList.insertAdjacentHTML("beforeend", ideaCardHtml);
			createCardListeners(idea.id);
		});
	} else {
		errorDisplay.textContent = response;
	}
}

getAllIdeas();

function clearIdeasDisplay() {
	ideasList.innerHTML = "";
}

const showUserIdeasBtn = document.getElementById("showUserIdeasBtn");

showUserIdeasBtn.addEventListener("click", async () => {
	const userData = await getUserData();

	const ideasResponse = await getIdeas(userData.id);
	if (typeof ideasResponse === "object") {
		clearIdeasDisplay();
		displayIdeas(ideasResponse);
		hideCreateIdeaWrapper();
	}
});
