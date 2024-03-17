import User from "../model/user.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";

export const fetchUserData = async (req, res, next) => {
	try {
		let user = new User();
		user.email = req.emailFromToken;
		req.userData = await user.getUserData();
		req.userData = req.userData[0];
		if (req.userData.email != req.emailFromToken) {
			throw new Error(ResMsg.UserMsg.cantFindUser);
		}
		next();
	} catch (error) {
		res.status(HTTPCodes.ServerErrorRespons.InternalError).send(error.message).end();
	}
};
