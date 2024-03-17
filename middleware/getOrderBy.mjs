import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";

export function getOrderBy(req, res, next) {
	const {data} = req.params;

	if (!data) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UniversalMsg.missingPrameters);
	}

	const dataArray = data.split("_");
	if (dataArray.length < 1) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.IdeaMsg.errorGettingIdeas);
	}

	req.sortBy = dataArray[0];
	req.orderBy = dataArray[1] != "undefined" ? dataArray[1] : null;

	next();
}

export function getOrderByAndID(req, res, next) {
	const {data} = req.params;

	if (!data) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UniversalMsg.missingPrameters);
	}

	const dataArray = data.split("_");
	if (dataArray.length < 2) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.IdeaMsg.errorGettingIdeas);
	}

	req.sortBy = dataArray[0];
	req.id = dataArray[1];

	next();
}
