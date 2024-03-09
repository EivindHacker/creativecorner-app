import crypto from "crypto";

function createHashPassword(pass) {
	const hmac = crypto.createHmac("sha256", process.env.SECRET_KEY);
	hmac.update(pass);
	return hmac.digest("hex");
}
