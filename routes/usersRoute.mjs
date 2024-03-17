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

USER_API.post("/signUp", createHashPassword, createToken, async (req, res, next) => {
	const {name, email, pswHash, role} = req.body;

	if (checkIllegalInput(name) || checkIllegalInput(email, ["@"]) || checkIllegalInput(pswHash) || checkIllegalInput(role)) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
	}

	let user = new User();
	user.name = name;
	user.email = email;
	user.role = role;
	user.pswHash = req.hashedPassword;

	let exists;

	try {
		exists = await user.checkUserExistence();
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if (exists) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.userExists).end();
	}

	try {
		user = await user.createUser();
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if (user.id) {
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(req.token)).end();
	}
});

USER_API.post("/login", createHashPassword, createToken, async (req, res, next) => {
	const {email, pswHash} = req.body;

	if (checkIllegalInput(email, ["@"]) || checkIllegalInput(pswHash)) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
	}

	let user = new User();
	user.email = email;
	user.pswHash = req.hashedPassword;

	try {
		user = await user.login();
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if (user === null) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.wrongPassOrEmail).end();
	} else {
		user = user[0];
	}

	const response = new ServerResponse();
	response.message = ResMsg.UserMsg.loginSuccess;
	response.data = req.token;

	res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
});

USER_API.post("/getUserData", validateToken, async (req, res, next) => {
	let user = new User();
	user.email = req.emailFromToken;

	try {
		user = await user.getUserData();
		user = user[0];
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if (user === null) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.cantFindUser).end();
	}

	res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
});

USER_API.post("/updateUserInfo", validateToken, fetchUserData, async (req, res, next) => {
	const {name, email, role} = req.body;

	if (checkIllegalInput(name) || checkIllegalInput(email, ["@"])) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.InputMsg.illegalInput).end();
	}

	let user = new User();
	user.id = req.userData.id;
	user.name = name;
	user.newEmail = email;

	const originalEmail = req.emailFromToken;
	user.email = originalEmail;
	user.role = role;

	try {
		user = await user.updateUserInfo();
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if (originalEmail !== email) {
		if (user === null) {
			return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.DbMsg.errorUpdatingData).end();
		}
	}

	let token;

	try {
		token = await updateToken(user.email);
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

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

	try {
		userFromDB = await userFromDB.getUserData();
		if (userFromDB === null) {
			throw new Error(ResMsg.UserMsg.cantFindUser);
		}
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	userFromDB = userFromDB[0];
	if (userFromDB.password !== req.oldPswHash) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.passwordMissMatch).end();
	}
	let user = new User();
	user.newPass = req.newPswHash;
	user.email = req.emailFromToken;
	user.id = userFromDB.id;

	try {
		user = await user.updateUserPassword();
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if (user.newPass === req.newPswHash) {
		return res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(ResMsg.UserMsg.passwordUpdateFailure).end();
	}

	const response = new ServerResponse();
	response.message = ResMsg.UserMsg.passwordUpdateSuccess;

	res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
});

USER_API.post("/deleteUser", validateToken, fetchUserData, async (req, res, next) => {
	const userData = req.userData;

	if (userData) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UserMsg.cantFindUser).end();
	}

	let user = new User();
	user.id = userData.id;

	try {
		user = await user.delete();
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(error.message).end();
	}

	if ([user.email, user.name, user.password, user.role].every((val) => val !== null)) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UserMsg.deleteAccountFailure).end();
	}

	const response = new ServerResponse();
	response.message = ResMsg.UserMsg.deleteUserSuccess;
	res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(response)).end();
});

export default USER_API;
