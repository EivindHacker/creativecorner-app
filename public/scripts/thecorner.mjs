import calcRatingAverage from "../modules/idea/calcRatingAverage.mjs";
import getIdeas from "../modules/idea/getIdeas.mjs";
import getUserData from "../modules/user/getUserData.mjs";
import {updatePageState} from "../modules/pageState.mjs";
import submitCreation from "../modules/idea/submitCreation.mjs";
import submitIdea from "../modules/idea/submitIdea.mjs";
import submitRating from "../modules/idea/submitRating.mjs";
import createIdeaCard from "./ideasList.mjs";
import displayError from "../modules/displayError.mjs";
import submitIdeaEdit from "../modules/idea/submitIdeaEdit.mjs";
import genreDataConverter from "../modules/idea/genreDataConverter.mjs";
import deleteIdea from "../modules/idea/deleteIdea.mjs";

let sortBy = "beforeend";

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
	getStartedWrapper = document.getElementById("getStartedWrapper");
	createIdeaBtn = document.getElementById("createIdeaBtn");
	ideasList = document.getElementById("ideasList");
	showUserIdeasBtn = document.getElementById("showUserIdeasBtn");
}
function initEventListeners() {
	document.getElementById("sortByNewBtn").addEventListener("click", () => {
		sortBy = "beforeend";
		getAllIdeas();
	});

	document.getElementById("sortByOldBtn").addEventListener("click", () => {
		sortBy = "afterbegin";
		getAllIdeas();
	});

	document.getElementById("loginBtn").addEventListener("click", () => {
		updatePageState("login");
	});

	document.getElementById("signUpBtn").addEventListener("click", () => {
		updatePageState("signup");
	});

	//----------- CREATE IDEA -----------

	createIdeaBtn.addEventListener("click", () => {
		const createIdeaWrapper = document.getElementById("createIdeaWrapper");
		createIdeaWrapper.style.display = "block";
		createIdeaWrapper.scrollIntoView({behavior: "smooth", block: "center"});
		createIdeaBtn.style.display = "none";
	});

	document.getElementById("cancelIdeaBtn").addEventListener("click", hideCreateIdeaWrapper);

	let genreSuggestions = [];

	document.getElementById("addGenreBtn").addEventListener("click", () => {
		const genreInput = document.getElementById("genreInput");
		const genreHtml = `<span class="genre">${genreInput.value}<button class="cancel remove" id="remove-genre" data-genre="${genreInput.value}" >x</button></span>`;

		genreSuggestions.push(genreInput.value);

		document.getElementById("genreInputDisplay").innerHTML += genreHtml;
		genreInput.value = "";

		function initGenres() {
			const genreInputDisplay = document.getElementById("genreInputDisplay");

			const genreHtmlChildrenArray = Array.from(genreInputDisplay.children);

			const removeGenrebtns = Array.from(document.querySelectorAll("#remove-genre"));

			removeGenrebtns.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					findGenreChild(e.target.dataset.genre);
				});
			});

			function findGenreChild(genre) {
				genreHtmlChildrenArray.forEach((child) => {
					if (child.textContent.slice(0, -1) === genre) {
						child.remove();
						genreSuggestions = genreSuggestions.filter((item) => item !== child.textContent.slice(0, -1));
					}
				});
			}
		}

		initGenres();
	});

	document.getElementById("saveIdeaBtn").addEventListener("click", async () => {
		const idea = {
			title: document.getElementById("titleInput").value,
			description: document.getElementById("descriptionInput").value,
			genres: genreSuggestions,
		};

		const response = await submitIdea(idea);

		if (typeof response !== "string") {
			response.creations = null;
			getAllIdeas();
			hideCreateIdeaWrapper();
		} else {
			displayError(response);
		}
	});

	showUserIdeasBtn.addEventListener("click", getIdeasFromUser);
}

function hideCreateIdeaWrapper() {
	document.getElementById("createIdeaWrapper").style.display = "none";
	createIdeaBtn.style.display = "block";
}

//----------- IDEA CARDS -----------

function createCardListeners(id) {
	document.getElementById(`addCreationBtn_${id}`).addEventListener("click", () => {
		toggleCreationsWrapper(id);
	});

	document.getElementById(`submitRatingBtn_${id}`).addEventListener("click", async () => {
		const rating = document.getElementById(`ratingInput_${id}`);
		const ratingObject = {rating: rating.value, id};
		const response = await submitRating(ratingObject);

		if (typeof response == "string") {
			displayError(response);
		} else {
			const updatedRatingAverage = calcRatingAverage(response.rating);
			const ratingDisplay = document.getElementById(`rating_${id}`);
			ratingDisplay.textContent = updatedRatingAverage;
			ratingDisplay.classList.add("success");
			rating.parentNode.style.display = "none";
			//
		}
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

	if (typeof response !== "string") {
		displayIdeas(response);
	} else {
		displayError(response);
	}
}

async function displayIdeas(ideas) {
	const userData = await getUserData();

	let userId;

	if (typeof userData == "string") {
		userId = null;
	} else {
		userId = userData.id;
	}

	if (Array.isArray(ideas)) {
		ideas.forEach((idea) => {
			const ideaCardHtml = createIdeaCard(idea, userId);
			ideasList.insertAdjacentHTML(sortBy, ideaCardHtml);
			createCardListeners(idea.id);
		});
	}

	document.getElementById("editIdeaBtn").addEventListener("click", (e) => {
		toggleIdeaWrapper(e.target.dataset.ideadata);
	});
}

function toggleIdeaWrapper(ideaData) {
	const editIdeaWrapper = document.getElementById("editIdeaWrapper");
	editIdeaWrapper.style.display = "block";
	editIdeaWrapper.scrollIntoView({behavior: "smooth", block: "center"});

	const ideaDataArray = ideaData.split("_");
	let [id, creator_id, title, description, genres] = ideaDataArray;

	let updatedGenres = genres.split(",");

	const genreHtml = genreDataConverter(genres.split(","), true);

	function initGenres(reInit) {
		const genreInputDisplayEdit = document.getElementById("genreInputDisplayEdit");
		if (!reInit) {
			genreInputDisplayEdit.innerHTML = genreHtml;
		}

		const genreHtmlChildrenArray = Array.from(genreInputDisplayEdit.children);

		const removeGenrebtn = Array.from(document.querySelectorAll("#remove-genre"));

		removeGenrebtn.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				findGenreChild(e.target.dataset.genre);
			});
		});

		function findGenreChild(genre) {
			genreHtmlChildrenArray.forEach((child) => {
				if (child.textContent.slice(0, -1) === genre) {
					child.remove();
					//Remove from genre from array.
					updatedGenres = updatedGenres.filter((item) => item !== child.textContent.slice(0, -1));
				}
			});
		}
	}

	initGenres();

	function addGenre() {
		const genreInput = document.getElementById("genreInputEdit");
		updatedGenres.push(genreInput.value);
		const genreHtmlElement = `<span class="genre">${genreInput.value}<button class="cancel remove" id="remove-genre" data-genre="${genreInput.value}" >x</button></span>`;
		genreInputDisplayEdit.innerHTML += genreHtmlElement;
		initGenres(true);
		genreInput.value = "";
	}

	document.getElementById("addGenreBtnEdit").addEventListener("click", addGenre);

	const titleInputEdit = document.getElementById("titleInputEdit");
	titleInputEdit.value = title;
	const descriptionInputEdit = document.getElementById("descriptionInputEdit");
	descriptionInputEdit.value = description;

	document.getElementById("saveEditIdeaBtn").addEventListener("click", () => {
		const idea = {id, creator_id, title: titleInputEdit.value, description: descriptionInputEdit, genres: updatedGenres};
		submitIdeaEdit(idea);
	});

	document.getElementById("cancelEditIdeaBtn").addEventListener("click", () => {
		editIdeaWrapper.style.display = "none";
	});

	document.getElementById("deleteIdeaBtn", () => {
		deleteIdea(id);
	});
}

function clearIdeasDisplay() {
	ideasList.innerHTML = "";
}

async function getIdeasFromUser() {
	if (showUserIdeasBtn.textContent === "Your Ideas") {
		const userData = await getUserData();

		const ideasResponse = await getIdeas(userData.id);

		if (typeof ideasResponse !== "string") {
			clearIdeasDisplay();
			displayIdeas(ideasResponse);
			hideCreateIdeaWrapper();
		} else {
			displayError(ideasResponse);
			clearIdeasDisplay();
		}
		showUserIdeasBtn.textContent = "All Ideas";
		showUserIdeasBtn.classList.remove("cancel");
	} else {
		getAllIdeas();
		showUserIdeasBtn.textContent = "Your Ideas";
		showUserIdeasBtn.classList.add("cancel");
	}
}
