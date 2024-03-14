import express from "express";
import User from "../model/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import createHashPassword from "../middleware/createPswHash.mjs";
import createToken from "../middleware/createToken.mjs";
import updateToken from "../middleware/updateToken.mjs";
import validateToken from "../middleware/validateToken.mjs";
import {ServerResponse} from "../model/serverRes.mjs";

const USER_API = express.Router();
USER_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

USER_API.get("/", (req, res, next) => {
	SuperLogger.log("Demo of logging tool");
	SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
});

USER_API.post("/signUp", createHashPassword, createToken, async (req, res, next) => {
	const {name, email, pswHash, role} = req.body;

	if (name != "" && email != "" && pswHash != "") {
		let user = new User();
		user.name = name;
		user.email = email;
		user.role = role;

		user.pswHash = req.hashedPassword;

		const exists = await user.checkUserExistence();

		if (!exists) {
			user = await user.createUser();
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(req.token)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.userExists).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

USER_API.post("/login", createHashPassword, createToken, async (req, res, next) => {
	const {email, pswHash} = req.body;

	console.log("Token", req.token);

	if (email != "" && pswHash != "") {
		let user = new User();

		user.email = email;

		user.pswHash = req.hashedPassword;

		user = await user.login();

		if (user.length !== 0) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(req.token)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.wrongPassOrEmail).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

USER_API.post("/getUserData", validateToken, async (req, res, next) => {
	let user = new User();
	user.email = req.emailFromToken;

	console.log("Email from Token:", user.email);

	if (user) {
		user = await user.getUserData();

		if (user.length !== 0) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.wrongPassOrEmail).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

USER_API.post("/updateUserInfo", validateToken, createHashPassword, async (req, res, next) => {
	const {name, email, role} = req.body;

	if (name != "" && email != "") {
		let user = new User();
		user.name = name;
		user.newEmail = email;
		user.email = req.emailFromToken;
		user.role = role;

		console.log("User: ", user);

		user = await user.updateUserInfo();

		const token = await updateToken(user.email);
		const response = new ServerResponse();
		response.message = ResMsg.UserMsg.accountUpdateSuccess;
		response.data = token;
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

USER_API.post("/updateUserPassword", validateToken, createHashPassword, async (req, res, next) => {
	const {oldPass, newPass} = req.body;

	if (oldPass != "" && newPass != "") {
		let userFromDB = new User();
		userFromDB.email = req.emailFromToken;
		userFromDB = await userFromDB.getUserData();

		if (userFromDB[0].password === req.oldPswHash) {
			let user = new User();
			user.newPass = req.newPswHash;
			console.log("New Password in Routes:", user.newPass);
			user.email = req.emailFromToken;
			user = await user.updateUserPassword();

			if (user.newPass === req.newPswHash) {
				const response = new ServerResponse();
				response.message = ResMsg.UserMsg.passwordUpdateSuccess;

				res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
			} else {
				res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.passwordUpdateFailure).end();
			}
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.passwordMissMatch).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

USER_API.post("/deleteUser", validateToken, async (req, res, next) => {
	let user = req.token;

	if (user) {
		user = await user.delete();

		if (user.length !== 0) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.deleteAccountFailure).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.cantFindUser).end();
	}
});

export default USER_API;
