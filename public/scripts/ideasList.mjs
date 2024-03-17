import calcRatingAverage from "../modules/idea/calcRatingAverage.mjs";
import genreDataConverter from "../modules/idea/genreDataConverter.mjs";

export default function createIdeaCard(data, userId, userRole) {
	if (data.title === null && data.creator_id === null) {
		return null;
	} // prettier-ignore

	const token = localStorage.getItem("token");

	let ratedByUser = false;

	if (data.rated_by) {
		const ratedByArray = data.rated_by.split(",");
		ratedByArray.forEach((rateId) => {
			if (rateId == userId) {
				ratedByUser = true;
			}
		});
	}

	let isUsersIdea = false;

	if (parseInt(data.creator_id) === userId) {
		isUsersIdea = true;
	}

	let genreHtml = "";

	if (data.genres) {
		const genresArray = data.genres.split(",");

		genreHtml = genreDataConverter(genresArray);
	}

	let creationsHtml = "";

	if (data.creations) {
		const creations = data.creations.split(",");

		creations.forEach((creation) => {
			const creationElements = creation.split("|");
			const creationsTitle = creationElements[0];
			const creationsArtist = creationElements[1];
			const creationsLink = creationElements[2];
			const creationsId = parseInt(creationElements[3]);

			creationsHtml += `<li>
            Title: <span>${creationsTitle}</span>&nbsp;By: <span>${creationsArtist}</span>&nbsp;Link: <a href="${creationsLink}">${creationsLink}</a>
			<button class="cancel remove" style="display: ${creationsId === userId ? "block" : "none"};" id="deleteCreation" data-creationid="${
				data.id
			}" data-creation="${creation}">x</button>
        </li>`;
		});
	} else {
		creationsHtml = "No creations yet...";
	}

	const ratingAverage = calcRatingAverage(data.rating);

	const ideaCard = `
    <div class="idea-card appear" id="card_${data.id}">
	<button data-ideadata="${data.id}_${data.creator_id}_${data.title}_${data.description}_${
		data.genres
	}" id="editIdeaBtn" class="edit-card-btn" style="display: ${isUsersIdea ? "block" : "none"}">Edit</button>
	<h3 id="title">${data.title}</h3>
	<div class="creator-wrapper">
		<span>By</span>
		<h4 id="creator">${data.creator_name}</h4>
	</div>

	<details><summary>Description</summary><p>${data.description}</p></details>
	
	<h4 style="margin-top: 15px">Genre Suggestions</h4>
	<div class="genre-wrapper">${genreHtml}</div>
	<div class="rating-wrapper">
		<h4>Rating</h4>
		<span>⭐️</span><span id="rating_${data.id}" class="rating">${ratingAverage ? ratingAverage : "-"}</span>
	</div>
	<div id="cardUserInteractivesWrapper" style="display: ${token ? "block" : "none"}">
		<div class="rating-input-wrapper" style="display: ${isUsersIdea || ratedByUser ? "none" : "block"}">
			<input id="ratingInput_${data.id}" style="width: 40px" type="number" min="0" max="5" />
			<button style="scale: 0.8;" id="submitRatingBtn_${data.id}">Submit Rating</button>
		</div>
        <div style="margin-top: -15px">
		    <h4>Creations</h4>
		    <ul class="creations-wrapper" >
		    	${creationsHtml}
		    </ul>
        </div>

		
		<!-- Only Visible for Musicians -->

		<div id="addCreationWrapper_${data.id}" style="display: none" class="add-creation-wrapper">
			<h4>Add Creation</h4>
			<div><label>Title: &nbsp; </label><input id="creationTitleInput_${data.id}" type="text" maxlength="64" /></div>
			<div><label>Artist: </label><input id="creationArtistInput_${data.id}" type="text" maxlength="64" /></div>
			<div><label>Link: &nbsp; </label><input id="creationLinkInput_${data.id}" type="url" maxlength="64" /></div>
			<button id="saveCreationBtn_${data.id}" class="green-btn" style="margin-top: 10px;">Save Creation</button>
		</div>
		<button id="addCreationBtn_${data.id}" style="margin-top: 10px; display: ${userRole === "Musician" ? "block" : "none"}">Add Creation</button>
	</div>
</div>
`;

	return ideaCard;
}
