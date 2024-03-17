import {HTTPCodes} from "../modules/httpConstants.mjs";
import {checkIllegalInput} from "../modules/inputTesters.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";

export default function extractCreationCreatorId(req, res, next) {
	const creationString = req.body.creation;

	const creationData = creationString.split("|");

	creationData.forEach((data) => {
		if (checkIllegalInput(data)) {
			return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
		}
	});

	req.creationCreatorId = parseInt(creationData[3]);
	next();
}
