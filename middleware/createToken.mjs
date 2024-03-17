import jwt from "jsonwebtoken";
import {ResMsg} from "../modules/responseMessages.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";

export default async function createToken(req, res, next) {
	try {
		const {email} = req.body;

		if (!email) {
			throw new Error(ResMsg.UniversalMsg.missingPrameters);
		}

		const token = jwt.sign(
			{
				data: email,
			},
			process.env.SECRET_KEY,
			{expiresIn: "1h"}
		);

		req.token = token;

		next();
	} catch (error) {
		return res.status(HTTPCodes.ServerErrorRespons.InternalError).send(error.message).end();
	}
}
