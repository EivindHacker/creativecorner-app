import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {checkIllegalInput, removeComma} from "../modules/inputTesters.mjs";

export default function createGenreString(req, res, next) {
	try {
		let genreString = "";

		const genres = req.body.genres;

		genres.forEach((genre, index) => {
			if (checkIllegalInput(genre)) {
				throw new Error(ResMsg.InputMsg.illegalInput);
			}
			if (index + 1 !== genres.length) {
				genreString += genre + ",";
			} else {
				genreString += genre;
			}
		});

		req.genreString = removeComma(genreString);
		next();
	} catch (error) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(error.message).end();
	}
}
