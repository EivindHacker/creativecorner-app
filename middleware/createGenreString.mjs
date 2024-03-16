import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {checkIllegalInput} from "../modules/inputTesters.mjs";

export default function createGenreString(req, res, next) {
	try {
		let genreString = "";

		const genres = req.body.genres;

		console.log(genres);

		genres.forEach((genre, index) => {
			if (checkIllegalInput(genre)) {
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
	} catch (error) {
		res.status(HTTPCodes.ServerErrorRespons.InternalErrorr).send(error.message).end();
	}
}
