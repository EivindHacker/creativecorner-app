import User from "../model/user.mjs";

export default function decryptUserToken(req, res, next) {
	const {token} = req.body;
	const decryptedToken = atob(token);

	const userData = decryptedToken.split(" ");

	const user = new User();

	user.email = userData[0];

	user.pswHash = userData[1];

	req.user = user;

	next();
}
