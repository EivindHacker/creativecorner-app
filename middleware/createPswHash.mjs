import crypto from "crypto";

function createHashPassword(req, res, next) {
	const {pswHash, newPass, oldPass} = req.body;

	function hasher(password) {
		const hmac = crypto.createHmac("sha256", process.env.SECRET_KEY);
		hmac.update(password);
		return hmac.digest("hex");
	}

	console.log("Running");

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
