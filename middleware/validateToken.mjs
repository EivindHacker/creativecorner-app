import jwt from "jsonwebtoken";
import {ResMsg} from "../modules/responseMessages.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";

export default async function validateToken(req, res, next) {
	const {token} = req.body;

	try {
		if (!token) {
			throw new Error(ResMsg.UserMsg.missingToken);
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (decoded.exp <= Date.now() / 1000) {
			throw new Error(ResMsg.UserMsg.tokenHasExpired);
		}

		req.emailFromToken = decoded.data;
		next();
	} catch (error) {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(error.message);
	}
}
