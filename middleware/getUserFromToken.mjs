import User from "../model/user.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";

export default async function getUserFromToken(req, res, next) {
	const user = new User();
	user.email = req.emailFromToken;
	try {
		const userData = await user.getUserData();
		return userData.length ? userData[0] : null;
	} catch (error) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(ResMsg.UserMsg.cantFindUser).end();
	}
}
