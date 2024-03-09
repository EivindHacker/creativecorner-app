import express from "express";
import User from "../model/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import createHashPassword from "../middleware/createPswHash.mjs";
import decryptUserToken from "../middleware/decryptUserToken.mjs";

const USER_API = express.Router();
USER_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

USER_API.get("/", (req, res, next) => {
	SuperLogger.log("Demo of logging tool");
	SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
});

USER_API.post("/signUp", createHashPassword, async (req, res, next) => {
	const {name, email, pswHash, role} = req.body;

	if (name != "" && email != "" && pswHash != "") {
		let user = new User();
		user.name = name;
		user.email = email;
		user.role = role;

		user.pswHash = req.hashedPassword;

		const exists = await user.checkUserExistence();

		console.log(exists);

		if (!exists) {
			const token = btoa(user.email + " " + user.pswHash);

			user = await user.createUser();
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(token)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("User already exists, login or use another email.").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields").end();
	}
});

USER_API.post("/login", createHashPassword, async (req, res, next) => {
	const {email, pswHash} = req.body;

	if (email != "" && pswHash != "") {
		let user = new User();

		user.email = email;

		user.pswHash = req.hashedPassword;

		user = await user.login();

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
	let user = req.token;

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

USER_API.post("/updateUserInfo", decryptUserToken, async (req, res, next) => {
	const {name, email, role, token} = req.body;

	if (name != "" && email != "") {
		let user = new User();
		user.name = name;
		user.newEmail = email;
		user.email = req.token.email;
		user.pswHash = req.token.pswHash;
		user.role = role;

		console.log("User: ", user);

		user = await user.updateUserInfo();

		const token = btoa(user.newEmail + " " + user.pswHash);
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(token)).end();
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields").end();
	}
});

USER_API.post("/updateUserPassword", decryptUserToken, createHashPassword, async (req, res, next) => {
	const {oldPass, newPass, token} = req.body;

	if (oldPass != "" && newPass != "") {
		let user = new User();
		user.email = req.token.email;
		user.pswHash = req.oldPswHash;

		console.log(user.pswHash);

		console.log(req.token.pswHash);

		if (user.pswHash === req.token.pswHash) {
			user.newPass = req.newPswHash;
			console.log(user.newPass);

			user = await user.updateUserPassword();

			const token = btoa(user.email + " " + user.newPass);
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(token)).end();
		} else {
			console.log("Wrong password");
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Your old password did not match your original password").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields").end();
	}
});

USER_API.post("/deleteUser", decryptUserToken, async (req, res, next) => {
	let user = req.token;

	if (user) {
		user = await user.delete();

		if (user.length !== 0) {
			res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Could not delete user...").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Could not find a user to delete...").end();
	}
});

export default USER_API;
