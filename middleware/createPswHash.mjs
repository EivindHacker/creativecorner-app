import crypto from "crypto";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import {ResMsg} from "../modules/responseMessages.mjs";

function createHashPassword(req, res, next) {
	const {pswHash, newPass, oldPass} = req.body;

	if (!pswHash && !oldPass && !newPass) {
		return res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send(ResMsg.UniversalMsg.missingPrameters);
	}

	function hasher(password) {
		const hmac = crypto.createHmac("sha256", process.env.SECRET_KEY);
		hmac.update(password);
		return hmac.digest("hex");
	}

	if (pswHash) {
		req.hashedPassword = hasher(pswHash);
	}
	if (oldPass) {
		req.oldPswHash = hasher(oldPass);
	}
	if (newPass) {
		req.newPswHash = hasher(newPass);
	}

	next();
}

export default createHashPassword;
