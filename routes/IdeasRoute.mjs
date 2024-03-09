import express, {response} from "express";
import Idea from "../model/idea.mjs";
import User from "../model/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import decryptUserToken from "../middleware/decryptUserToken.mjs";
import createGenreString from "../modules/createGenreString.mjs";

const IDEA_API = express.Router();

IDEA_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

IDEA_API.get("/", (req, res, next) => {
	SuperLogger.log("Demo of logging tool");
	SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
});

IDEA_API.get("/getIdeas", async (req, res, next) => {
	let ideas = new Idea();
	ideas = await ideas.getIdeas();

	if (ideas.length !== 0) {
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(ideas)).end();
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("No Ideas were found...").end();
	}
});

IDEA_API.post("/createIdea", decryptUserToken, async (req, res, next) => {
	const userData = req.body;

	let idea = new Idea();
	idea.title = userData.title;
	idea.description = userData.description;
	idea.genres = createGenreString(userData.genres);

	let user = new User();

	user.email = req.token.email;
	user.pswHash = req.token.pswHash;

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

export default IDEA_API;
