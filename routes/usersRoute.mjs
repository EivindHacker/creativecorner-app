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
import {fetchUserData} from "../middleware/fetchUserData.mjs";
import {checkIllegalInput} from "../modules/inputTesters.mjs";

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

	if (user) {
		user = await user.getUserData();

		if (user.id) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.wrongPassOrEmail).end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.missingDataFields).end();
	}
});

USER_API.post("/updateUserInfo", validateToken, fetchUserData, async (req, res, next) => {
	const {name, email, role} = req.body;

	if (checkIllegalInput(name) || checkIllegalInput(email, ["@", "_"])) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
	}

	let user = new User();
	user.id = req.userData.id;
	user.name = name;
	user.newEmail = email;

	const originalEmail = req.emailFromToken;
	user.email = originalEmail;
	user.role = role;

	user = await user.updateUserInfo();

	if (originalEmail !== email) {
		if (user === null) {
			return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.DbMsg.errorUpdatingData).end();
		}
	}

	const token = await updateToken(user.email);
	if (token === null) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UserMsg.couldNotUpdateToken).end();
	}
	const response = new ServerResponse();
	response.message = ResMsg.UserMsg.accountUpdateSuccess;
	response.data = token;
	res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
});

USER_API.post("/updateUserPassword", validateToken, createHashPassword, async (req, res, next) => {
	const {newPass} = req.body;

	if (checkIllegalInput(newPass)) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
	}

	let userFromDB = new User();
	userFromDB.email = req.emailFromToken;
	userFromDB = await userFromDB.getUserData();

	if (userFromDB.password !== req.oldPswHash) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.passwordMissMatch).end();
	}
	let user = new User();
	user.newPass = req.newPswHash;
	user.email = req.emailFromToken;
	user.id = userFromDB.id;
	user = await user.updateUserPassword();

	if (user.newPass !== req.newPswHash) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.passwordUpdateFailure).end();
	}

	const response = new ServerResponse();
	response.message = ResMsg.UserMsg.passwordUpdateSuccess;

	res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
});

USER_API.post("/deleteUser", validateToken, fetchUserData, async (req, res, next) => {
	const userData = req.userData;

	if (userData) {
		let user = new User();
		user.id = userData.id;
		user = await user.delete();

		if ([user.email, user.name, user.password, user.role].every((val) => val !== null)) {
			return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UserMsg.deleteAccountFailure).end();
		}

		const response = new ServerResponse();
		response.message = ResMsg.UserMsg.deleteUserSuccess;
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
	} else {
		res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UserMsg.cantFindUser).end();
	}
});

export default USER_API;
