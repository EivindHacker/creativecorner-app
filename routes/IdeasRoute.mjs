import express, {response} from "express";
import Idea from "../model/idea.mjs";
import User from "../model/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import validateToken from "../middleware/validateToken.mjs";
import createGenreString from "../modules/createGenreString.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";

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
			res
				.status(HTTPCodes.ClientSideErrorRespons.BadRequest)
				.send("Could not create Idea, if the error persist, contact the creator of the page...")
				.end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Your authentication token is not valid, try to re-login...").end();
	}
});

IDEA_API.post("/rateIdea", validateToken, async (req, res, next) => {
	let user = new User();

	user.email = req.token.email;
	user.pswHash = req.token.pswHash;

	user = await user.getUserData();

	if (user.length !== 0) {
		let idea = new Idea();

		idea.id = req.body.id;

		const selectedIdeaData = await idea.getIdea();

		const prevRatings = selectedIdeaData.rating;

		if (prevRatings) {
			const updatedRatings = prevRatings + "," + req.body.rating;

			idea.rating = updatedRatings;

			idea = await idea.rateIdea();
		} else {
			idea.rating = req.body.rating;

			idea = await idea.rateIdea();
		}

		if (typeof idea.id === "number" && idea.rating != prevRatings) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(idea)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Could not rate idea...").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Your authentication token is not valid, try to re-login...").end();
	}
});

export default IDEA_API;
