import express from "express";
import User from "../model/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import {createHashPassword} from "../modules/hashPassword.mjs";
import DBManager from "../modules/storageManager.mjs";
import decryptUserToken from "../middleware/decryptUserToken.mjs";

const USER_API = express.Router();
USER_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

const users = [];

USER_API.get("/", (req, res, next) => {
	SuperLogger.log("Demo of logging tool");
	SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
});

USER_API.post("/signUp", async (req, res, next) => {
	const {name, email, pswHash} = req.body;

	if (name != "" && email != "" && pswHash != "") {
		let user = new User();
		user.name = name;
		user.email = email;

		user.pswHash = createHashPassword(pswHash);

		const token = btoa(user.email + " " + user.pswHash);

		///TODO: Does the user exist?
		let exists = false;

		if (!exists) {
			//TODO: What happens if this fails?
			user = await user.save();
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(token)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
	}
});

USER_API.post("/login", async (req, res, next) => {
	// This is using javascript object destructuring.
	// Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
	// https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
	const {email, pswHash} = req.body;

	if (email != "" && pswHash != "") {
		let user = new User();

		user.email = email;

		user.pswHash = createHashPassword(pswHash);

		user = await user.getUser();

		if (user.length !== 0) {
			const emailRes = user[0].email;
			const passRes = user[0].password;

			const token = btoa(emailRes + " " + passRes);

			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(token)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Wrong Username or Password").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Missing Data Fields").end();
	}
});

USER_API.post("/getUserData", decryptUserToken, async (req, res, next) => {
	let user = req.user;
	// This is using javascript object destructuring.
	// Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
	// https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
	if (user) {
		user = await user.getUserData();

		if (user.length !== 0) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Wrong Username or Password").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Missing Data Fields").end();
	}
});

USER_API.post("/deleteUser", decryptUserToken, async (req, res, next) => {
	let user = req.user;

	if (user) {
		user = await user.delete();

		if (user.length !== 0) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Wrong Username or Password").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Missing Data Fields").end();
	}
});

USER_API.post("/:id", (req, res, next) => {
	/// TODO: Edit user
	const user = new User(); //TODO: The user info comes as part of the request
	user.save();
});

export default USER_API;
