import jwt from "jsonwebtoken";
import {ResMsg} from "../modules/responseMessages.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";

export default async function validateToken(req, res, next) {
	// Extract token from request headers, query parameters, or cookies
	const {token} = req.body; // Assuming token is sent in the Authorization header

	if (!token) {
		res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(ResMsg.UserMsg.missingToken);
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (decoded.exp <= Date.now() / 1000) {
			return res.status(HTTPCodes.ClientSideErrorRespons.Forbidden).send(ResMsg.UserMsg.tokenHasExpired);
		}

		req.emailFromToken = decoded.data;
		next();
	} catch (error) {
		res.status(HTTPCodes.ServerErrorRespons.InternalError).send(ResMsg.UserMsg.errorValidatingToken);
	}
}
