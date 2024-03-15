import express, {response} from "express";
import Idea from "../model/idea.mjs";
import User from "../model/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import validateToken from "../middleware/validateToken.mjs";
import createGenreString from "../modules/createGenreString.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {checkRatingInput} from "../modules/inputTesters.mjs";
import {fetchUserData} from "../middleware/fetchUserData.mjs";
import {fetchIdeaData} from "../middleware/fetchIdeaData.mjs";

const IDEA_API = express.Router();

IDEA_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

IDEA_API.get("/", (req, res, next) => {
	SuperLogger.log("Demo of logging tool");
	SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
});

IDEA_API.get("/getIdeas/:id", async (req, res, next) => {
	const {id} = req.params;

	let ideas = new Idea();

	if (id) {
		ideas.id = id;
	}

	ideas = await ideas.getIdeas();

	if (ideas.length !== 0) {
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(ideas)).end();
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.IdeaMsg.noIdeasFound).end();
	}
});

IDEA_API.post("/createIdea", validateToken, async (req, res, next) => {
	const ideaInput = req.body;

	let idea = new Idea();
	idea.title = ideaInput.title;
	idea.description = ideaInput.description;
	idea.genres = createGenreString(ideaInput.genres);

	if (idea.title !== "" && idea.description !== "" && idea.genres !== "") {
		let user = new User();

		user.email = req.emailFromToken;

		user = await user.getUserData();

		if (user.length !== 0) {
			idea.creator_id = user[0].id;
			idea.creator_name = user[0].name;

			idea = await idea.createIdea();

			if (typeof idea.id === "number") {
				res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(idea)).end();
			} else {
				res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.IdeaMsg.cantCreateIdea).end();
			}
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.cantFindUser).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

IDEA_API.post("/rateIdea", validateToken, fetchUserData, fetchIdeaData, async (req, res, next) => {
	const userData = req.userData;
	const ideaData = req.ideaData;

	if (userData.id === ideaData.creator_id) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.IdeaMsg.ratingNotAllowed).end();
	}

	const ratingInput = req.body.rating;

	if (!checkRatingInput(ratingInput)) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
	}

	const idea = new Idea();
	idea.id = ideaData.id;
	idea.rated_by = ideaData.rated_by ? `${ideaData.rated_by},${userData.id}` : userData.id;
	idea.rating = ideaData.rating ? `${ideaData.rating},${ratingInput}` : ratingInput;

	try {
		const updatedIdea = await idea.rateIdea();
		if (updatedIdea.rating !== ideaData.rating) {
			return res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(updatedIdea)).end();
		} else {
			return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.IdeaMsg.cantRateIdea).end();
		}
	} catch (error) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(error.message).end();
	}
});

export default IDEA_API;
