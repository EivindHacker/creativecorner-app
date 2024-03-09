export default function createIdeaCard(data) {
	console.log(data);

	const genres = data.genres.split(",");

	let genreHtml = "";

	genres.forEach((genre) => {
		genreHtml += `<span class="genre">${genre}</span>`;
	});

	let creationsHtml = "";

	if (data.creations !== null) {
		const creations = data.creations.split(",");

		creations.forEach((creation) => {
			const creationElements = creation.split("|");

			creationsHtml += `<li>
            Title: <span>${creationElements[0]}</span>&nbsp;By: <span>${creationElements[1]}</span>&nbsp;Link: <a href="${creationElements[2]}">${creationElements[2]}</a>
        </li>`;
		});
	} else {
		creationsHtml = "No creations yet...";
	}

	console.log(data.rating);

	const ideaCard = `
    <div class="idea-card" id="card_${data.id}">
        <h3 id="title">${data.title}</h3>
        <div class="creator-wrapper">
            <span>By:</span>
            <h4 id="creator">${data.creator_name}</h4>
        </div>

        <p class="description">
            ${data.description}
        </p>
        <h4>Genre Suggestions</h4>
        <div class="genre-wrapper">
            ${genreHtml}
        </div>
        <div id="cardUserInteractivesWrapper">
            <h4>Rating</h4>
            <div class="rating-wrapper">
                <span>⭐️</span><span class="rating">${data.rating ? data.rating : "-"}</span>
                <div style="height: 30px; width: 2px; background-color: gray; margin-left: 10px; margin-right: 10px"></div>
                <input id="ratingInput_${data.id}" style="width: 40px" type="number" min="0" max="5" /> <button id="submitRatingBtn_${
		data.id
	}" >Submit Rating</button>
            </div>
            <h4>Creations</h4>
            <ul class="creations-wrapper">
                ${creationsHtml}
            </ul>

            <!-- Only Visible for Musicians -->

            <div id="addCreationWrapper_${data.id}" style="display: none" class="add-creation-wrapper">
                <h4>Add Creation</h4>
                <div><label>Title: &nbsp; </label><input id="creationTitleInput_${data.id}" type="text" /></div>
                <div><label>Artist: </label><input id="creationArtistInput_${data.id}" type="text" /></div>
                <div><label>Link: &nbsp; </label><input id="crationLinkInput_${data.id}" type="url" /></div>
                <button id="saveCreationBtn_${data.id}" style="margin-top: 10px; border-color: greenyellow; color: greenyellow">Save Creation</button>
            </div>
            <button id="addCreationBtn_${data.id}" style="margin-top: 10px; display: block">Add Creation</button>
        </div>
    </div>`;

	return ideaCard;
}
