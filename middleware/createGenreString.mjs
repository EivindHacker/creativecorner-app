import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {checkIllegalSymbols} from "../modules/inputTesters.mjs";

export default function createGenreString(req, res, next) {
	let genreString = "";

	const genres = req.body.genres;

	console.log(genres);

	genres.forEach((genre, index) => {
		if (checkIllegalSymbols(genre)) {
			return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
		}
		if (index + 1 !== genres.length) {
			genreString += genre + ",";
		} else {
			genreString += genre;
		}
	});

	req.genreString = genreString;
	next();
}
