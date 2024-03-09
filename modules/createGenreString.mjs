export default function createGenreString(genres) {
	let genreString = "";

	genres.forEach((genre, index) => {
		if (index + 1 !== genres.length) {
			genreString += genre + ",";
		} else {
			genreString += genre;
		}
	});

	return genreString;
}
