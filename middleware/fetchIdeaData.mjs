import Idea from "../model/idea.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";

export const fetchIdeaData = async (req, res, next) => {
	try {
		let idea = new Idea();
		idea.id = req.body.id;
		req.ideaData = await idea.getIdea();
		req.ideaData = req.ideaData[0];
		if (parseInt(req.body.id) !== req.ideaData.id) {
			throw new Error(ResMsg.IdeaMsg.cantFindIdea);
		}
		next();
	} catch (error) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(error.message).end();
	}
};
