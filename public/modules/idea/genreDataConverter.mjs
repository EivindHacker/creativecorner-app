export default function genreDataConverter(genres, edit) {
	if (genres) {
		let genreHtml = "";

		genres.forEach((genre) => {
			const removeBtnHtml = `<button class="cancel remove" id="remove-genre" data-genre="${genre}" >x</button>`;
			genreHtml += `<span class="genre">${genre}${edit ? removeBtnHtml : ""}</span>`;
		});

		return genreHtml;
	} else {
		return "";
	}
}
