import Idea from "../model/idea.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";

export const fetchIdeaData = async (req, res, next) => {
	try {
		let idea = new Idea();
		idea.id = req.body.id;
		req.ideaData = await idea.getIdea();
		if (parseInt(req.body.id) !== req.ideaData.id) {
			return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.IdeaMsg.cantFindIdea).end();
		}
		next();
	} catch (error) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalErrorr).send(ResMsg.IdeaMsg.cantFindIdea).end();
	}
};
