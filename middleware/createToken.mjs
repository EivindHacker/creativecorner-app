import jwt from "jsonwebtoken";

export default async function createToken(req, res, next) {
	const {email} = req.body;

	const token = jwt.sign(
		{
			data: email,
		},
		process.env.SECRET_KEY,
		{expiresIn: "1h"}
	);

	req.token = token;

	next();
}
