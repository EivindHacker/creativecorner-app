import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {checkIllegalInput, removeComma} from "../modules/inputTesters.mjs";

export default function createCreationsString(req, res, next) {
	try {
		const {title, artist, link} = req.body;
		const userData = req.userData;

		if (checkIllegalInput(title) || checkIllegalInput(artist) || checkIllegalInput(link)) {
			throw new Error(ResMsg.InputMsg.illegalInput);
		}

		let creationsString = req.ideaData.creations;

		if (creationsString === null) {
			creationsString = `${title}|${artist}|${link}|${userData.id}`;
		} else {
			creationsString += `,${title}|${artist}|${link}|${userData.id}`;
		}

		req.updatedCreationString = removeComma(creationsString);

		next();
	} catch (error) {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(error.message).end();
	}
}
