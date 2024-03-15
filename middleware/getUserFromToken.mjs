import User from "../model/user.mjs";

export default async function getUserFromToken(req, res, next) {
	const user = new User();
	user.email = req.emailFromToken;
	const userData = await user.getUserData();
	return userData.length ? userData[0] : null;
}