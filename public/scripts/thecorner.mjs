import getIdeas from "../modules/getIdeas.mjs";
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

const genreSuggestions = [];

document.getElementById("addGenreBtn").addEventListener("click", () => {
	const genreInput = document.getElementById("genreInput");
	const genreHtml = `<span class="genre">${genreInput.value}</span>`;

	genreSuggestions.push(genreInput.value);

	document.getElementById("genreInputDisplay").innerHTML += genreHtml;
	genreInput.value = "";
});

document.getElementById("saveIdeaBtn").addEventListener("click", () => {
	const idea = {
		title: document.getElementById("titleInput").value,
		description: document.getElementById("descriptionInput").value,
		genres: genreSuggestions,
	};

	submitIdea(idea);
});

//----------- IDEA CARDS -----------

function createCardListeners(id) {
	document.getElementById(`addCreationBtn_${id}`).addEventListener("click", () => {
		toggleCreationsWrapper(id);
	});

	document.getElementById(`submitRatingBtn_${id}`).addEventListener("click", () => {
		const rating = document.getElementById(`ratingInput_${id}`).value;
		submitRating(parseInt(rating));
	});

	document.getElementById(`saveCreationBtn_${id}`).addEventListener("click", () => {
		const title = document.getElementById(`creationTitleInput_${id}`).value;
		const artist = document.getElementById(`creationArtistInput_${id}`).value;
		const link = document.getElementById(`crationLinkInput_${id}`).value;
		const inputObject = {title, artist, link};
		submitCreation(inputObject);
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

async function displayIdeas() {
	const response = await getIdeas();

	if (Array.isArray(response)) {
		response.forEach((idea) => {
			const ideaCardHtml = createIdeaCard(idea);
			ideasList.insertAdjacentHTML("beforeend", ideaCardHtml);
			createCardListeners(idea.id);
		});
	} else {
		errorDisplay.textContent = response;
	}

	const cardUserInteractivesWrapper = document.querySelectorAll("#cardUserInteractivesWrapper");

	console.log(cardUserInteractivesWrapper);

	cardUserInteractivesWrapper.forEach((card) => {
		if (localStorage.getItem("token")) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
}

displayIdeas();
